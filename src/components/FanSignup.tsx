import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Heart, Mail, X } from 'lucide-react';
import { useFollow, sendToAiq } from '../lib/aiq';

// "Become a Fan": an email sign-up that lands in AiQ Creator's fan list.
// `compact` is the one-line version for the footer.
// Remembered on this device: joined (never ask again) or "Not now" (ask again in two weeks)
const JOINED = 'aiq_fan_joined';
const LATER = 'aiq_fan_later';
const store = { get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } } };

export const FanSignup = ({ compact = false, popup = false, onClose }: { compact?: boolean; popup?: boolean; onClose?: () => void }) => {
  const FOLLOW = useFollow();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [trap, setTrap] = useState(''); // left empty by people; robots fill it in
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setError('Please enter a valid email.'); setState('error'); return; }
    setState('sending');
    setError('');
    try {
      await sendToAiq('fan', { email: email.trim(), name: name.trim(), website: trap, language: navigator.language, source: window.location.pathname.startsWith('/listen') ? `listen${window.location.search}`.slice(0, 40) : popup ? 'popup' : compact ? 'footer' : 'home' });
      store.set(JOINED, '1');
      setState('done');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setState('error');
    }
  };

  const field = 'w-full bg-white/5 border border-white/15 rounded-sm px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-gold/70 transition-colors';
  const honeypot = (
    <input type="text" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={e => setTrap(e.target.value)} className="absolute -left-[9999px] w-px h-px opacity-0" aria-hidden="true" />
  );

  const thanks = (
    <div className={compact ? 'text-center space-y-3' : 'text-center space-y-6'}>
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 text-gold"><Check size={22} /></div>
      <p className={compact ? 'text-white font-serif italic text-lg' : 'text-white font-serif italic text-3xl'}>Welcome to the family{name ? `, ${name.split(' ')[0]}` : ''}.</p>
      <p className="text-paper/60 text-sm">You'll hear new songs before they're released, and I'd love to know what you think. Follow along here too:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {FOLLOW.map(f => (
          <a key={f.name} href={f.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-white/15 rounded-full text-[10px] uppercase tracking-[0.2em] text-white/80 hover:border-gold/60 hover:text-gold transition-colors">{f.name}</a>
        ))}
      </div>
    </div>
  );

  if (popup) {
    return (
      <div className="relative w-full max-w-md border border-gold/30 rounded-sm bg-[#0b0906]/95 px-6 py-10 sm:px-10 shadow-[0_0_80px_rgba(223,186,107,0.15)]" onClick={e => e.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-3 right-3 p-2 text-white/50 hover:text-white cursor-pointer"><X size={18} /></button>
        {state === 'done' ? thanks : (
          <form onSubmit={submit} className="relative text-center space-y-5">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold flex items-center justify-center gap-2"><Heart size={12} /> Join the fan list</p>
            <h2 className="text-3xl font-serif italic text-white leading-tight">Hear my new songs before anyone else</h2>
            <p className="text-paper/60 text-sm leading-relaxed">Fans on the list get new music ahead of release, to listen first and tell me what they think.</p>
            <div className="space-y-2 text-left">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="First name" className={field} aria-label="First name" autoComplete="given-name" />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className={field} aria-label="Email address" autoComplete="email" />
            </div>
            {honeypot}
            <button type="submit" disabled={state === 'sending'} className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gold text-black text-xs font-semibold uppercase tracking-[0.25em] rounded-sm hover:bg-white transition-colors disabled:opacity-60 cursor-pointer">
              <Mail size={14} /> {state === 'sending' ? 'Joining…' : 'Join the Fan List'}
            </button>
            {state === 'error' && <p className="text-red-300 text-xs">{error}</p>}
            <button type="button" onClick={onClose} className="text-white/40 text-xs hover:text-white/70 cursor-pointer">Not now</button>
          </form>
        )}
      </div>
    );
  }

  if (compact) {
    return (
      <div className="w-full max-w-xl mx-auto px-6 mb-12">
        {state === 'done' ? thanks : (
          <form onSubmit={submit} className="relative text-center space-y-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold flex items-center justify-center gap-2"><Heart size={12} /> Become a Fan</p>
            <p className="text-paper/60 text-sm">Hear new songs before release and tell me what you think.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className={field} aria-label="Your email" />
              <button type="submit" disabled={state === 'sending'} className="shrink-0 px-6 py-3 bg-gold text-black text-[11px] font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-white transition-colors disabled:opacity-60 cursor-pointer">
                {state === 'sending' ? 'Joining…' : 'Join'}
              </button>
            </div>
            {honeypot}
            {state === 'error' && <p className="text-red-300 text-xs">{error}</p>}
          </form>
        )}
      </div>
    );
  }

  return (
    <section className="py-32 px-6 relative" id="fans">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(223,186,107,0.09), transparent 65%)' }} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-3xl mx-auto border border-gold/20 rounded-sm bg-black/30 backdrop-blur-sm px-6 py-14 md:px-16 md:py-16 shadow-[0_0_80px_rgba(223,186,107,0.08)]"
      >
        {state === 'done' ? thanks : (
          <form onSubmit={submit} className="relative text-center space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold flex items-center justify-center gap-2"><Heart size={12} /> Become a Fan</p>
              <h2 className="text-4xl md:text-5xl font-serif italic text-white leading-tight">Be the first to hear it</h2>
              <p className="text-paper/60 font-light text-lg max-w-xl mx-auto leading-relaxed">
                Join the fan list and hear my new songs before they're released. Listen first, tell me what you think, and help shape the final version. No spam, and you can leave anytime.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-left">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="First name" className={field} aria-label="First name" autoComplete="given-name" />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className={field} aria-label="Email address" autoComplete="email" />
            </div>
            {honeypot}
            <div className="space-y-3">
              <button type="submit" disabled={state === 'sending'} className="inline-flex items-center gap-2 px-10 py-4 bg-gold text-black text-xs font-semibold uppercase tracking-[0.25em] rounded-sm hover:bg-white transition-colors disabled:opacity-60 cursor-pointer">
                <Mail size={14} /> {state === 'sending' ? 'Joining…' : 'Join the Fan List'}
              </button>
              {state === 'error' && <p className="text-red-300 text-sm">{error}</p>}
              <p className="text-white/35 text-xs">By joining you agree to receive occasional emails from Aşkın Şerbetçi / Studio Aşkın. Every email has an unsubscribe link.</p>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  );
};

// The sign-up box in front of the page: for first-time visitors after a few seconds, or right away
// when they arrive from a link to the fan list (#fans or ?fans). Once joined it never shows again;
// "Not now" keeps it away for two weeks.
export const FanPopup = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // The ad landing page has its own sign-up right under the video
    if (store.get(JOINED) || window.location.pathname.startsWith('/listen')) return;
    const direct = /#fans|[?&]fans\b/.test(window.location.hash + window.location.search);
    const later = Number(store.get(LATER) || 0);
    if (!direct && later && Date.now() - later < 14 * 86_400_000) return;
    const t = setTimeout(() => setOpen(true), direct ? 600 : 8000);
    return () => clearTimeout(t);
  }, []);
  const close = () => { setOpen(false); if (!store.get(JOINED)) store.set(LATER, String(Date.now())); };
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label="Join the fan list"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={close}>
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <FanSignup popup onClose={close} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
