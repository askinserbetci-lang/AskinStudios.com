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


/**
 * Vocal pitch correction (auto-tune), TD-PSOLA engine — formant-preserving.
 *  1. YIN pitch detection (decimated copy, 8 ms hop, octave-jump guard)
 *  2. pitch marks one period apart, each refined by cross-correlation with the previous one
 *     (marks sit on the same point of every vocal cycle)
 *  3. each output cycle is a Hann-windowed 2-period grain taken from the nearest mark and laid
 *     down at the corrected period → pitch moves, the throat/mouth resonances (formants) stay put,
 *     so the voice never sounds "chipmunk" or "giant"
 *  4. optional formant shift (grain resampling) for voice character, independent of pitch
 *  5. consonants / breaths (unvoiced) pass through untouched, cross-faded
 * Musical controls: retune speed, amount, humanize (sustained notes get gentler correction),
 * flex (ornaments / slides far from a note are left alone), scale incl. makam quarter-tones.
 * Fixed latency ≈ 22 ms.
 */
class TuneProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const sr = sampleRate;
    this.N = 1 << 16;
    this.M = this.N - 1;
    this.buf = new Float32Array(this.N);
    this.ola = new Float32Array(this.N);
    this.ws = new Float32Array(this.N);
    this.w = 0;
    this.pMin = Math.round(sr / 1100);
    this.pMax = Math.round(sr / 105);
    this.fMax = 1.35;
    this.L = Math.ceil(this.pMax * (1 + this.fMax)) + 8;
    this.P = Math.round(sr / 200);
    this.marks = [];
    this.lastMark = -Infinity;
    this.nextSyn = -1;
    this.ratio = 1;
    this.tRatio = 1;
    this.voiced = 0;
    this.vmix = 0;
    // detection (decimated)
    this.D = sr > 60000 ? 4 : 2;
    this.r = sr / this.D;
    this.dec = new Float32Array(4096);
    this.dw = 0;
    this.acc = 0;
    this.accN = 0;
    this.hop = Math.round(0.008 * this.r);
    this.sinceHop = 0;
    this.W = Math.round(0.02 * this.r);
    this.maxLag = Math.round(this.r / 95);
    this.minLag = Math.round(this.r / 1100);
    this.d = new Float32Array(this.maxLag + 2);
    this.lastHz = 0;
    this.lastVoicedAt = -1e9;
    // correction
    this.corr = 0;
    this.curIdx = -1;
    this.held = 0;
    this.reportN = 0;
    // params
    this.on = false;
    this.tonic = 220;
    this.scale = [0, 200, 400, 500, 700, 900, 1100];
    this.speedMs = 30;
    this.amount = 1;
    this.formant = 1;
    this.humanize = 0;
    this.flex = 0;
    this.port.onmessage = (e) => {
      const m = e.data || {};
      if (m.on !== undefined && !!m.on !== this.on) { this.on = !!m.on; this.reset(); }
      if (m.tonicHz > 0) this.tonic = m.tonicHz;
      if (Array.isArray(m.scale) && m.scale.length) { this.scale = m.scale.slice().sort((a, b) => a - b); this.curIdx = -1; }
      if (m.speedMs !== undefined) this.speedMs = Math.max(0, m.speedMs);
      if (m.amount !== undefined) this.amount = Math.max(0, Math.min(1, m.amount));
      if (m.formantSt !== undefined) this.formant = Math.min(this.fMax, Math.max(1 / this.fMax, Math.pow(2, m.formantSt / 12)));
      if (m.humanize !== undefined) this.humanize = Math.max(0, Math.min(1, m.humanize));
      if (m.flex !== undefined) this.flex = Math.max(0, Math.min(1, m.flex));
    };
    const init = options && options.processorOptions;
    if (init) this.port.onmessage({ data: init });
  }

  reset() {
    this.ola.fill(0);
    this.ws.fill(0);
    this.marks = [];
    this.lastMark = -Infinity;
    this.nextSyn = -1;
    this.corr = 0;
    this.ratio = this.tRatio = 1;
    this.vmix = 0;
  }

  // Catmull-Rom read of the input ring (clean highs when resampling grains)
  at(pos) {
    const i = Math.floor(pos), t = pos - i, b = this.buf, M = this.M;
    const y0 = b[(i - 1) & M], y1 = b[i & M], y2 = b[(i + 1) & M], y3 = b[(i + 2) & M];
    return y1 + 0.5 * t * (y2 - y0 + t * (2 * y0 - 5 * y1 + 4 * y2 - y3 + t * (3 * (y1 - y2) + y3 - y0)));
  }

  detect() {
    const W = this.W, maxLag = this.maxLag, d = this.d, buf = this.dec;
    const start = this.dw - W - maxLag;
    let energy = 0;
    for (let i = 0; i < W; i++) { const x = buf[(start + i) & 4095]; energy += x * x; }
    if (energy / W < 2e-6) return 0;
    d[0] = 1;
    let run = 0, tau = -1;
    for (let t = 1; t <= maxLag; t++) {
      let sum = 0;
      for (let i = 0; i < W; i++) {
        const diff = buf[(start + i) & 4095] - buf[(start + i + t) & 4095];
        sum += diff * diff;
      }
      run += sum;
      d[t] = run > 0 ? (sum * t) / run : 1;
      if (tau < 0 && t > this.minLag + 1 && d[t - 1] < 0.2 && d[t - 1] < d[t - 2] && d[t - 1] <= d[t]) tau = t - 1;
    }
    if (tau < 0) return 0;
    const a = d[tau - 1], b = d[tau], c = d[tau + 1];
    const den = a - 2 * b + c;
    const sh = den !== 0 ? (0.5 * (a - c)) / den : 0;
    return this.r / (tau + Math.max(-1, Math.min(1, sh)));
  }

  analyse() {
    let hz = this.detect();
    const hopSec = this.hop / this.r;
    const now = this.w;
    // octave-jump guard: a sudden ×2 / ×½ right after a voiced frame is a detection slip
    if (hz && this.lastHz && now - this.lastVoicedAt < 0.06 * sampleRate) {
      const q = hz / this.lastHz;
      if (Math.abs(q - 2) < 0.12) hz /= 2;
      else if (Math.abs(q - 0.5) < 0.03) hz *= 2;
    }
    if (hz >= 105 && hz <= 1100) {
      this.voiced = 1;
      this.P = sampleRate / hz;
      this.lastVoicedAt = now;
      const cents = 1200 * Math.log2(hz / this.tonic);
      const pos = ((cents % 1200) + 1200) % 1200;
      const sc = this.scale, n = sc.length;
      const dist = (i) => sc[((i % n) + n) % n] + 1200 * Math.floor(i / n) - pos;
      let best = 0, bestAbs = Infinity;
      for (let i = -1; i <= n; i++) { const x = Math.abs(dist(i)); if (x < bestAbs) { bestAbs = x; best = i; } }
      if (this.curIdx !== -1 && this.curIdx !== ((best % n) + n) % n) {
        let keep = best, keepAbs = Infinity;
        for (const k of [this.curIdx - n, this.curIdx, this.curIdx + n]) { const x = Math.abs(dist(k)); if (x < keepAbs) { keepAbs = x; keep = k; } }
        if (keepAbs < bestAbs + 25) { best = keep; bestAbs = keepAbs; }
      }
      const idx = ((best % n) + n) % n;
      this.held = idx === this.curIdx ? this.held + hopSec : 0;
      this.curIdx = idx;
      let target = Math.max(-300, Math.min(300, dist(best)));
      // flex: ornaments, slides and bends far from the note are left alone
      if (this.flex > 0) {
        const wnd = 100 - 80 * this.flex;
        if (bestAbs > wnd) target *= Math.max(0, 1 - (bestAbs - wnd) / 30);
      }
      target *= this.amount;
      // humanize: once a note is sustained, correct it more gently so it stays alive
      let ms = this.speedMs;
      if (this.humanize > 0 && this.held > 0.15) ms += this.humanize * 250 * Math.min(1, (this.held - 0.15) / 0.3);
      const k = ms <= 1 ? 1 : 1 - Math.exp(-hopSec / (ms / 1000));
      this.corr += (target - this.corr) * k;
      this.lastHz = hz;
    } else {
      this.voiced = 0;
      this.lastHz = 0;
      this.held = 0;
      this.corr *= Math.exp(-hopSec / 0.04);
    }
    this.tRatio = Math.pow(2, this.corr / 1200);
    if (++this.reportN >= 8) {
      this.reportN = 0;
      this.port.postMessage({ hz: this.lastHz, idx: this.lastHz ? this.curIdx : -1, corr: this.corr });
    }
  }

  /** next pitch mark: one period on, nudged to where the waveform best matches the last cycle */
  addMarks() {
    const b = this.buf, M = this.M;
    for (;;) {
      const P = Math.max(this.pMin, Math.min(this.pMax, this.P));
      let cand = this.lastMark < this.w - 4 * this.pMax ? this.w - this.L : this.lastMark + P;
      if (cand + P * this.fMax + 3 > this.w) return;
      if (this.voiced && cand - this.lastMark < 2 * this.pMax) {
        // fractional refinement: correlation peak + parabolic interpolation (no ±1-sample jitter)
        const span = Math.max(2, Math.round(P * 0.15)), half = Math.round(P * 0.5), lm = this.lastMark, c0 = Math.round(cand);
        const corrAt = (r) => {
          let s = 0;
          for (let k = -half; k <= half; k += 2) s += this.at(c0 + r + k) * this.at(lm + k);
          return s;
        };
        let bestR = 0, bestS = -Infinity, sm = 0, sp = 0;
        for (let r = -span; r <= span; r++) { const v = corrAt(r); if (v > bestS) { bestS = v; bestR = r; } }
        sm = corrAt(bestR - 1); sp = corrAt(bestR + 1);
        const den = sm - 2 * bestS + sp;
        const frac = den < 0 ? Math.max(-0.5, Math.min(0.5, (0.5 * (sm - sp)) / den)) : 0;
        cand = c0 + bestR + frac;
      }
      const per = isFinite(this.lastMark) ? Math.max(this.pMin, Math.min(this.pMax, cand - this.lastMark)) : P;
      this.marks.push(cand, per);
      this.lastMark = cand;
    }
  }

  /** lay down output grains at the corrected period */
  synth(upTo) {
    const mk = this.marks;
    if (this.nextSyn < 0) this.nextSyn = upTo;
    while (this.nextSyn <= upTo) {
      const ts = this.nextSyn;
      // nearest analysis mark
      while (mk.length >= 4 && Math.abs(mk[2] - ts) <= Math.abs(mk[0] - ts)) mk.splice(0, 2);
      let ta = ts, per = Math.max(this.pMin, Math.min(this.pMax, this.P));
      if (mk.length >= 2) { ta = mk[0]; per = mk[1]; }
      const H = per, F = this.formant, M = this.M;
      const j0 = Math.ceil(ts - H), j1 = Math.floor(ts + H);
      for (let jj = j0; jj <= j1; jj++) {
        const k = jj - ts;
        const win = 0.5 + 0.5 * Math.cos((Math.PI * k) / H);
        const j = jj & M;
        this.ola[j] += this.at(ta + k * F) * win;
        this.ws[j] += win;
      }
      this.ratio += (this.tRatio - this.ratio) * 0.5;
      this.nextSyn += per / this.ratio;
    }
  }

  process(inputs, outputs) {
    const output = outputs[0];
    if (!output || !output.length) return true;
    const inCh = inputs[0] && inputs[0].length ? inputs[0][0] : null;
    const n = output[0].length;
    if (!this.on) {
      for (let ch = 0; ch < output.length; ch++) for (let i = 0; i < n; i++) output[ch][i] = inCh ? inCh[i] : 0;
      return true;
    }
    const M = this.M, vk = 1 - Math.exp(-1 / (0.012 * sampleRate));
    const out = output[0];
    for (let i = 0; i < n; i++) {
      const x = inCh ? inCh[i] : 0;
      this.buf[this.w & M] = x;
      this.w++;
      this.acc += x;
      if (++this.accN === this.D) {
        this.dec[this.dw & 4095] = this.acc / this.D;
        this.dw++;
        this.acc = 0;
        this.accN = 0;
        if (++this.sinceHop >= this.hop) { this.sinceHop = 0; if (this.dw > this.W + this.maxLag + 2) this.analyse(); }
      }
      this.addMarks();
      const o = this.w - this.L;
      this.synth(o + this.pMax);
      const j = o & M;
      const wsum = this.ws[j];
      const tuned = wsum > 1e-3 ? this.ola[j] / Math.max(wsum, 0.35) : 0;
      this.ola[j] = 0;
      this.ws[j] = 0;
      this.vmix += (this.voiced - this.vmix) * vk;
      out[i] = o >= 0 ? this.vmix * tuned + (1 - this.vmix) * this.buf[j] : 0;
    }
    for (let ch = 1; ch < output.length; ch++) output[ch].set(out);
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
registerProcessor('kdsp-tune', TuneProcessor);
