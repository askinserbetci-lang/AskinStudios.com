import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { videosPageSEO } from '../data/seo/pages/videos.seo';
import { Play, X, ArrowRight, Youtube, ListVideo } from 'lucide-react';

import { CinematicBackground } from '../components/common/CinematicBackground';
import { loadYouTube, shortDate, thumb, viewsText, YtFeed, YtVideo } from '../lib/youtubeFeed';

// Everything on this page comes straight from the YouTube channel: new uploads appear on their own.
// This short list only shows if YouTube can't be reached.
const BACKUP: YtFeed = {
  videos: [
    { id: '7pAdFokQahM', title: 'Be Mine Tonight: Cinematic World Music Suite', published: '2026-08-09', views: 0 },
    { id: 'BiAViHwWBk4', title: 'Biz Demeden Bitmez · Türkiye 2026 Anthem', published: '2026-05-28', views: 0 },
    { id: 'FrDbL6ruWOA', title: 'Mine Geçili · Deli Gönül (2026 Version)', published: '2026-02-10', views: 0 },
    { id: 'bCYDFfrzbbA', title: 'Crazy Heart', published: '', views: 0 },
    { id: '1SRls-hyUaY', title: 'Be Mine Tonight · The Meeting of the Legends', published: '', views: 0 },
    { id: 'FJnyDZjhse8', title: 'Dreamy Eyes', published: '', views: 0 },
    { id: 'd_0tpKop3yI', title: 'Studio Performance', published: '', views: 0 },
  ],
  shorts: [],
};

const MORE = [
  { title: 'Omar Faruk Tekbilek · School of Music', note: 'Playlist', url: 'https://youtube.com/playlist?list=PLNz_ZD_4xYdET22_q-mPOL0hF9Tww8oy3', img: thumb('nB9y-8dDtSU') },
  { title: 'Omar Faruk Tekbilek · I Love You', note: 'Live', url: 'https://www.youtube.com/watch?v=nB9y-8dDtSU', img: thumb('nB9y-8dDtSU') },
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
};

const Meta = ({ v }: { v: YtVideo }) => {
  const bits = [shortDate(v.published), viewsText(v.views)].filter(Boolean);
  return bits.length ? <p className="text-gold/80 text-[10px] uppercase tracking-[0.2em]">{bits.join(' · ')}</p> : null;
};

const Videos = () => {
  const [active, setActive] = useState<{ id: string; tall?: boolean } | null>(null);
  const [feed, setFeed] = useState<YtFeed | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let on = true;
    loadYouTube().then(d => on && setFeed(d || BACKUP));
    return () => { on = false; };
  }, []);

  const [latest, ...rest] = feed?.videos || [];
  const grid = showAll ? rest : rest.slice(0, 6);

  return (
    <div className="bg-transparent min-h-screen text-paper relative">
      <Helmet>
        <title>{videosPageSEO.title}</title>
        <meta name="description" content={videosPageSEO.description} />
        <meta property="og:title" content={videosPageSEO.ogTitle} />
        <meta property="og:description" content={videosPageSEO.ogDescription} />
        <meta property="og:image" content={videosPageSEO.ogImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="Videos Background" />

      {/* Player */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors" onClick={() => setActive(null)} aria-label="Close">
              <X size={40} strokeWidth={1} />
            </button>
            <div
              className={active.tall
                ? 'h-[85vh] aspect-[9/16] max-w-full bg-black rounded-sm overflow-hidden shadow-2xl border border-white/10 relative'
                : 'w-full max-w-6xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl border border-white/10 relative'}
              onClick={e => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="page-hero">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 80%, rgba(40,80,90,0.15), transparent 70%)' }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="text-5xl md:text-8xl font-serif italic mb-6 leading-tight">Videos</h1>
            <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 block leading-relaxed font-medium">
              Fresh from the channel • Music Videos • Shorts
            </span>
            <p className="text-paper/60 font-light text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto">
              The newest music videos, sessions and Shorts, straight from YouTube.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-48">
        <div className="max-w-7xl mx-auto space-y-28">
          {!feed ? (
            // Loading: placeholders in the shape of the page
            <div className="space-y-10 animate-pulse">
              <div className="aspect-video lg:aspect-[21/9] rounded-sm bg-white/5 border border-white/10" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[0, 1, 2].map(i => <div key={i} className="aspect-video rounded-sm bg-white/5 border border-white/10" />)}
              </div>
            </div>
          ) : (
            <>
              {/* Newest upload */}
              {latest && (
                <motion.div {...reveal} className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                  <button type="button" onClick={() => setActive({ id: latest.id })} className="lg:col-span-3 group relative aspect-video rounded-sm overflow-hidden border border-gold/20 shadow-[0_0_60px_rgba(223,186,107,0.12)] cursor-pointer" aria-label={`Play ${latest.title}`}>
                    <img src={thumb(latest.id, 'max')} alt={latest.title} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" onError={e => { (e.target as HTMLImageElement).src = thumb(latest.id); }} />
                    <span className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                      <span className="w-20 h-20 rounded-full bg-gold/90 text-black flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                        <Play className="fill-current ml-1" size={30} />
                      </span>
                    </span>
                  </button>
                  <div className="lg:col-span-2 space-y-5">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-gold flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Latest on YouTube</p>
                    <h2 className="text-3xl md:text-4xl font-serif italic text-white leading-tight">{latest.title}</h2>
                    <Meta v={latest} />
                    {latest.description && <p className="text-paper/60 font-light leading-relaxed line-clamp-4">{latest.description}</p>}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button type="button" onClick={() => setActive({ id: latest.id })} className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black text-[11px] font-semibold uppercase tracking-[0.2em] rounded-sm hover:bg-white transition-colors cursor-pointer">
                        <Play size={13} className="fill-current" /> Watch now
                      </button>
                      <a href={`https://www.youtube.com/watch?v=${latest.id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/80 text-[11px] uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
                        <Youtube size={14} /> On YouTube
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* More recent videos */}
              {!!rest.length && (
                <motion.div {...reveal}>
                  <h2 className="text-3xl md:text-4xl font-serif italic mb-10 text-white">Recent Videos</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                    {grid.map(v => (
                      <button key={v.id} type="button" onClick={() => setActive({ id: v.id })} className="group text-left cursor-pointer">
                        <span className="block relative aspect-video rounded-sm overflow-hidden border border-white/10 group-hover:border-gold/40 transition-colors">
                          <img src={thumb(v.id)} alt={v.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                            <span className="w-12 h-12 rounded-full bg-black/50 border border-white/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="text-white fill-white ml-0.5" size={18} />
                            </span>
                          </span>
                        </span>
                        <span className="block mt-4 space-y-1.5">
                          <span className="block text-lg font-serif italic text-white leading-snug line-clamp-2 group-hover:text-gold transition-colors">{v.title}</span>
                          <Meta v={v} />
                        </span>
                      </button>
                    ))}
                  </div>
                  {rest.length > 6 && !showAll && (
                    <div className="text-center mt-12">
                      <button type="button" onClick={() => setShowAll(true)} className="px-8 py-3 border border-gold/30 text-gold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-gold/10 transition-colors cursor-pointer">
                        Show {rest.length - 6} more
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Shorts */}
              {!!feed.shorts.length && (
                <motion.div {...reveal}>
                  <div className="flex items-end justify-between mb-10 gap-4">
                    <h2 className="text-3xl md:text-4xl font-serif italic text-white">Shorts</h2>
                    <a href="https://www.youtube.com/@askinserbetci/shorts" target="_blank" rel="noopener noreferrer" className="text-gold text-[10px] uppercase tracking-[0.2em] hover:underline shrink-0">All Shorts →</a>
                  </div>
                  <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory [scrollbar-width:thin]">
                    {feed.shorts.map(s => (
                      <button key={s.id} type="button" onClick={() => setActive({ id: s.id, tall: true })} className="group snap-start shrink-0 w-[180px] md:w-[210px] text-left cursor-pointer">
                        <span className="block relative aspect-[9/16] rounded-md overflow-hidden border border-white/10 group-hover:border-gold/40 transition-colors">
                          <img src={`https://i.ytimg.com/vi/${s.id}/oar2.jpg`} alt={s.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={e => { const img = e.target as HTMLImageElement; img.onerror = null; img.src = thumb(s.id); }} />
                          <span className="absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-black/90 to-transparent">
                            <span className="block text-sm text-white leading-snug line-clamp-2">{s.title}</span>
                            {s.views > 0 && <span className="block text-[10px] text-gold/80 mt-1">{viewsText(s.views)}</span>}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}

          {/* More to explore */}
          <motion.div {...reveal}>
            <h2 className="text-3xl md:text-4xl font-serif italic mb-10 text-white">More to Explore</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {MORE.map(m => (
                <a key={m.url} href={m.url} target="_blank" rel="noopener noreferrer" className="group relative aspect-[21/9] rounded-sm overflow-hidden border border-white/10 hover:border-gold/40 transition-colors">
                  <img src={m.img} alt={m.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <span className="absolute bottom-0 left-0 p-6">
                    <span className="flex items-center gap-2 text-gold text-[10px] uppercase tracking-[0.2em] mb-1"><ListVideo size={12} /> {m.note}</span>
                    <span className="block text-xl font-serif italic text-white">{m.title}</span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Channel */}
          <motion.div {...reveal} className="flex flex-col items-center justify-center text-center pt-16 border-t border-white/5">
            <h3 className="text-2xl font-serif italic text-white mb-6">Never miss a new release</h3>
            <p className="text-paper/60 font-light mb-8 max-w-xl">
              Subscribe on YouTube for new music videos, live performances and behind-the-scenes footage.
            </p>
            <a href="https://www.youtube.com/@askinserbetci?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-[#E00] hover:bg-[#c00] rounded-sm transition-colors group">
              <Youtube className="text-white" size={18} />
              <span className="text-white text-xs md:text-sm uppercase tracking-[0.2em] font-semibold">Subscribe</span>
              <ArrowRight className="text-white group-hover:translate-x-1 transition-transform" size={16} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Videos;
