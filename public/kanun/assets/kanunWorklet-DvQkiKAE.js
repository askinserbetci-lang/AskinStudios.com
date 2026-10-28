/**
 * KanunDSP AudioWorklet processors (runs on the real-time audio thread).
 *
 *  - kdsp-gate   : noise gate keyed from its OWN input (no deadlock), hysteresis + hold,
 *                  also reports input peak level for meters.
 *  - kdsp-pitch  : WSOLA-style pitch shifter (correlation-aligned splices, short cross-fades).
 *                  N voices, each with its own ratio and gain + dry.
 *                  Used for live transpose, harmonizer, octaver and reverb shimmer.
 *  - kdsp-wah    : envelope-following (auto) or pedal-controlled resonant SVF wah.
 *
 * All parameters arrive via port messages and are smoothed per sample, so knob moves
 * and footswitch changes never click.
 */

const dbToLin = (db) => Math.pow(10, db / 20);

class GateProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.enabled = true;
    this.thresholdDb = -55;
    this.attack = 0.002;
    this.release = 0.12;
    this.holdSamples = Math.round(0.06 * sampleRate);
    this.env = 0;
    this.gain = 1;
    this.open = true;
    this.holdCounter = 0;
    this.peakSinceReport = 0;
    this.reportEvery = Math.round(sampleRate / 30); // ~30 Hz meter updates
    this.reportCounter = 0;
    this.port.onmessage = (e) => {
      const d = e.data || {};
      if (d.enabled !== undefined) this.enabled = !!d.enabled;
      if (d.thresholdDb !== undefined) this.thresholdDb = d.thresholdDb;
      if (d.attackMs !== undefined) this.attack = Math.max(0.0005, d.attackMs / 1000);
      if (d.releaseMs !== undefined) this.release = Math.max(0.01, d.releaseMs / 1000);
    };
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];
    if (!output || output.length === 0) return true;
    const n = output[0].length;
    const inCh = input && input.length ? input[0] : null;

    const envRel = Math.exp(-1 / (0.05 * sampleRate));
    const atkCoef = Math.exp(-1 / (this.attack * sampleRate));
    const relCoef = Math.exp(-1 / (this.release * sampleRate));
    const openLin = dbToLin(this.thresholdDb);
    const closeLin = dbToLin(this.thresholdDb - 4); // 4 dB hysteresis

    for (let i = 0; i < n; i++) {
      const x = inCh ? inCh[i] : 0;
      const a = Math.abs(x);
      if (a > this.peakSinceReport) this.peakSinceReport = a;
      this.env = a > this.env ? a : this.env * envRel;

      let target = 1;
      if (this.enabled) {
        if (this.env >= openLin) {
          this.open = true;
          this.holdCounter = this.holdSamples;
        } else if (this.env < closeLin) {
          if (this.holdCounter > 0) this.holdCounter--;
          else this.open = false;
        }
        target = this.open ? 1 : 0;
      } else {
        this.open = true;
      }
      const c = target > this.gain ? atkCoef : relCoef;
      this.gain = target + (this.gain - target) * c;
      const y = x * this.gain;
      for (let ch = 0; ch < output.length; ch++) output[ch][i] = y;
    }

    this.reportCounter += n;
    if (this.reportCounter >= this.reportEvery) {
      this.port.postMessage({ open: this.open, peak: this.peakSinceReport });
      this.peakSinceReport = 0;
      this.reportCounter = 0;
    }
    return true;
  }
}

const BUF_SIZE = 1 << 17; // ~2.7 s at 48 kHz
const BUF_MASK = BUF_SIZE - 1;

/**
 * Pitch shifter with correlation-aligned splicing (WSOLA-style).
 * Each voice reads the input delay line at `ratio` speed. When the read head runs out of room,
 * it jumps by ~one window — but first searches ±searchMs for the jump target whose waveform best
 * matches what is playing now, then cross-fades. Periodic material (kanun notes) splices
 * phase-coherently, so there is no warble or chorus-like flutter.
 */
class PitchProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const opts = (options && options.processorOptions) || {};
    this.voices = Math.max(1, opts.voices || 1);
    this.buf = new Float32Array(BUF_SIZE);
    this.w = 0;
    this.setWindow(opts.windowMs || 40);
    this.v = [];
    for (let i = 0; i < this.voices; i++) {
      this.v.push({ ratio: 1, target: 1, gain: 0, tgain: 0, read: -this.dMin - this.jump * 0.5, old: 0, fade: 0 });
    }
    this.dry = opts.dry !== undefined ? opts.dry : 0;
    this.targetDry = this.dry;
    this.port.onmessage = (e) => {
      const d = e.data || {};
      if (Array.isArray(d.ratios)) d.ratios.forEach((r, i) => { if (i < this.voices && r > 0) this.v[i].target = Math.min(4, Math.max(0.2, r)); });
      if (Array.isArray(d.gains)) d.gains.forEach((g, i) => { if (i < this.voices) this.v[i].tgain = g; });
      if (d.dry !== undefined) this.targetDry = d.dry;
      if (d.windowMs !== undefined) this.setWindow(d.windowMs);
    };
  }

  setWindow(ms) {
    this.jump = Math.round((ms / 1000) * sampleRate); // splice distance
    this.corrLen = Math.round(0.006 * sampleRate); // compare 6 ms of waveform
    this.search = Math.round(0.0125 * sampleRate); // ±12.5 ms → aligns notes down to ~80 Hz
    this.fadeLen = Math.round(0.008 * sampleRate);
    this.dMin = this.corrLen + 8;
    this.dMax = this.dMin + this.jump + this.search * 2;
  }

  sample(pos) {
    const i0 = Math.floor(pos);
    const f = pos - i0;
    const a = this.buf[i0 & BUF_MASK];
    return a + (this.buf[(i0 + 1) & BUF_MASK] - a) * f;
  }

  /** best read position near `center` whose next corrLen samples match those after `ref` */
  align(ref, center) {
    let best = center, bestScore = -Infinity;
    const L = this.corrLen;
    const r0 = Math.floor(ref);
    for (let c = Math.floor(center - this.search); c <= center + this.search; c += 2) {
      let dot = 0, en = 1e-9;
      for (let n = 0; n < L; n += 2) {
        const y = this.buf[(c + n) & BUF_MASK];
        dot += this.buf[(r0 + n) & BUF_MASK] * y;
        en += y * y;
      }
      const score = dot / Math.sqrt(en);
      if (score > bestScore) { bestScore = score; best = c + (ref - r0); }
    }
    return best;
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];
    if (!output || output.length === 0) return true;
    const n = output[0].length;
    const inCh = input && input.length ? input[0] : null;
    const smooth = 0.0015;
    for (let i = 0; i < n; i++) {
      const x = inCh ? inCh[i] : 0;
      this.buf[this.w & BUF_MASK] = x;
      this.dry += (this.targetDry - this.dry) * smooth;
      let y = x * this.dry;
      for (let k = 0; k < this.voices; k++) {
        const v = this.v[k];
        v.gain += (v.tgain - v.gain) * smooth;
        v.ratio += (v.target - v.ratio) * smooth * 3;
        if (v.gain < 1e-5 && v.tgain === 0) {
          v.read = this.w - this.dMin - this.jump * 0.5;
          v.fade = 0;
          continue;
        }
        const delay = this.w - v.read;
        if (v.fade === 0) {
          const guard = Math.max(0, v.ratio - 1) * this.fadeLen + 2;
          if (delay < this.dMin + guard) {
            v.old = v.read;
            v.read = this.align(v.read, v.read - this.jump);
            v.fade = this.fadeLen;
          } else if (delay > this.dMax) {
            v.old = v.read;
            v.read = this.align(v.read, v.read + this.jump);
            v.fade = this.fadeLen;
          }
        }
        let s = this.sample(v.read);
        if (v.fade > 0) {
          const t = v.fade / this.fadeLen; // 1 → 0
          const wOld = 0.5 - 0.5 * Math.cos(Math.PI * t);
          s = s * (1 - wOld) + this.sample(v.old) * wOld;
          v.old += v.ratio;
          v.fade--;
        }
        v.read += v.ratio;
        y += s * v.gain;
      }
      for (let ch = 0; ch < output.length; ch++) output[ch][i] = y;
      this.w++;
    }
    return true;
  }
}

class WahProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.mode = 'auto';
    this.sens = 0.5;
    this.lowHz = 350;
    this.highHz = 2400;
    this.q = 4;
    this.mix = 1;
    this.pedal = 0.5;
    this.env = 0;
    this.pos = 0;
    this.ic1 = 0;
    this.ic2 = 0;
    this.port.onmessage = (e) => {
      const d = e.data || {};
      if (d.mode !== undefined) this.mode = d.mode;
      if (d.sens !== undefined) this.sens = d.sens;
      if (d.lowHz !== undefined) this.lowHz = d.lowHz;
      if (d.highHz !== undefined) this.highHz = d.highHz;
      if (d.q !== undefined) this.q = Math.max(0.5, d.q);
      if (d.mix !== undefined) this.mix = d.mix;
      if (d.pedal !== undefined) this.pedal = d.pedal;
    };
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];
    if (!output || output.length === 0) return true;
    const n = output[0].length;
    const inCh = input && input.length ? input[0] : null;
    const atk = Math.exp(-1 / (0.003 * sampleRate));
    const rel = Math.exp(-1 / (0.12 * sampleRate));
    const posSmooth = Math.exp(-1 / (0.01 * sampleRate));
    const k = 1 / this.q;
    const gainComp = 1 + this.q * 0.15;

    for (let i = 0; i < n; i++) {
      const x = inCh ? inCh[i] : 0;
      const a = Math.abs(x);
      this.env = a > this.env ? a + (this.env - a) * atk : a + (this.env - a) * rel;
      let target;
      if (this.mode === 'pedal') target = this.pedal;
      else target = Math.min(1, this.env * (2 + this.sens * 30));
      this.pos = target + (this.pos - target) * posSmooth;
      const fc = this.lowHz * Math.pow(this.highHz / this.lowHz, this.pos);
      // TPT state-variable filter (Zavalishin), stable under fast modulation
      const g = Math.tan((Math.PI * Math.min(fc, sampleRate * 0.45)) / sampleRate);
      const a1 = 1 / (1 + g * (g + k));
      const a2 = g * a1;
      const a3 = g * a2;
      const v3 = x - this.ic2;
      const v1 = a1 * this.ic1 + a2 * v3;
      const v2 = this.ic2 + a2 * this.ic1 + a3 * v3;
      this.ic1 = 2 * v1 - this.ic1;
      this.ic2 = 2 * v2 - this.ic2;
      const wet = (v1 * k * 1.6 + v2 * 0.4) * gainComp; // band + a touch of low for body
      const y = x * (1 - this.mix) + wet * this.mix;
      for (let ch = 0; ch < output.length; ch++) output[ch][i] = y;
    }
    return true;
  }
}

registerProcessor('kdsp-gate', GateProcessor);
registerProcessor('kdsp-pitch', PitchProcessor);
registerProcessor('kdsp-wah', WahProcessor);
