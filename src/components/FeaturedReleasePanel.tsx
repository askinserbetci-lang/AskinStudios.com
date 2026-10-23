import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Play, Youtube, Music2 } from 'lucide-react';

// The left panel on large screens (and a small pill on phones): the newest release, Be Mine Tonight.
// The nine duet languages cycle one at a time, each with its title in its own language.
const DUETS = [
  { lang: 'English', title: 'Be Mine Tonight', start: 1614 },
  { lang: 'Türkçe', title: 'Anla Beni', start: 1837 },
  { lang: 'العربية', title: 'كوني لي الليلة', start: 2114 },
  { lang: 'Русский', title: 'Будь Моей Сегодня Ночью', start: 2312 },
  { lang: 'Español', title: 'Sé Mía Esta Noche', start: 2530 },
  { lang: 'Italiano', title: 'Sarai Mia Stanotte', start: 2744 },
  { lang: 'Ελληνικά', title: 'Να Είσαι Δική Μου Απόψε', start: 2950 },
  { lang: 'Azərbaycan', title: 'Bu Gecə Mənim Ol', start: 3160 },
  { lang: 'Français', title: 'Sois à Moi Ce Soir', start: 3364 },
];
const SUITE = '7pAdFokQahM';
const SPOTIFY = 'https://open.spotify.com/album/4o269Yv7AzI2sFmfAlzWq5';
const PAGE = '/music/be-mine-tonight';

export const FeaturedReleasePanel = () => {
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % DUETS.length), 3200);
    return () => clearInterval(t);
  }, []);
  const duet = DUETS[i];

  return (
    <>
      {/* Desktop: the whole left column */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-screen w-[420px] z-40 flex-col justify-between p-8 overflow-y-auto select-none border-r border-[#dfba6b]/15"
        style={{ background: 'linear-gradient(160deg, #0a0806 0%, #07090f 55%, #05070e 100%)', boxShadow: '10px 0 30px rgba(0,0,0,0.5)' }}
        aria-label="New release: Be Mine Tonight"
      >
        <div className="space-y-1 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#dfba6b]">New Release · 2026</p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">Studio Aşkın Music Productions</p>
        </div>

        <button type="button" onClick={() => navigate(PAGE)} className="group relative mx-auto w-full max-w-[300px] aspect-square rounded-sm overflow-hidden border border-[#dfba6b]/25 shadow-[0_0_60px_rgba(223,186,107,0.15)] cursor-pointer" aria-label="Open Be Mine Tonight">
          <img src="/BE_MINE_TONIGHT_SUITE.jpg" alt="Be Mine Tonight: Cinematic World Music Suite" className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
            <span className="w-14 h-14 rounded-full bg-[#dfba6b] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Play size={22} fill="currentColor" /></span>
          </span>
        </button>

        <div className="text-center space-y-3">
          <h2 className="font-serif italic text-4xl text-white leading-tight">Be Mine <span className="text-[#dfba6b]">Tonight</span></h2>
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/50">Cinematic World Music Suite</p>
          <p className="text-sm text-white/60 font-light leading-relaxed px-2">One love story in 17 scenes. One song, sung as duets in nine languages.</p>
        </div>

        {/* The duet languages, one at a time */}
        <a href={`https://www.youtube.com/watch?v=${SUITE}&t=${duet.start}s`} target="_blank" rel="noopener noreferrer" className="block rounded-sm border border-white/10 bg-white/[0.03] px-5 py-4 text-center hover:border-[#dfba6b]/40 transition-colors" title="Watch this duet on YouTube">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1.5">Now in · {i + 1} of 9</p>
          <div className="h-12 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.45 }} className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[#dfba6b] text-xs uppercase tracking-[0.25em]">{duet.lang}</span>
                <span className="text-white font-serif italic text-lg truncate max-w-full" dir="auto">{duet.title}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </a>

        <div className="space-y-3">
          <button type="button" onClick={() => navigate(PAGE)} className="w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-[#dfba6b] text-black text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-white transition-colors cursor-pointer">
            <Play size={13} fill="currentColor" /> Explore the Suite
          </button>
          <div className="grid grid-cols-2 gap-3">
            <a href={SPOTIFY} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 rounded-sm border border-white/10 text-white/80 text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-colors">
              <Music2 size={12} /> Spotify
            </a>
            <a href={`https://www.youtube.com/watch?v=${SUITE}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 rounded-sm border border-white/10 text-white/80 text-[10px] uppercase tracking-[0.2em] hover:bg-white/5 transition-colors">
              <Youtube size={12} /> YouTube
            </a>
          </div>
          <p className="text-center text-[10px] text-white/30 tracking-[0.2em] uppercase pt-1">With Omar Faruk Tekbilek · Ney, Kanun, Oud</p>
        </div>
      </aside>

      {/* Phones and tablets: a small pill that opens the release */}
      <button
        type="button"
        onClick={() => navigate(PAGE)}
        className="lg:hidden fixed left-4 bottom-6 z-40 bg-[#05070e]/95 backdrop-blur-md border border-[#dfba6b]/35 shadow-lg shadow-black/80 rounded-full py-1.5 pl-1.5 pr-4 flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="New release: Be Mine Tonight"
      >
        <img src="/BE_MINE_TONIGHT_SUITE.jpg" alt="" className="w-9 h-9 rounded-full object-cover" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dfba6b]">New · Be Mine Tonight</span>
          <span className="block text-[10px] text-white/60">Cinematic suite · 9 languages</span>
        </span>
      </button>
    </>
  );
};
