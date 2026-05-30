import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Download, Youtube, Music, Sparkles, Share2, Check, TrendingUp, BookOpen, Globe, Play } from 'lucide-react';
import { CinematicBackground } from '../components/common/CinematicBackground';

const Anthem = () => {
  const [copied, setCopied] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [videoId, setVideoId] = useState("BiAViHwWBk4"); 
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [liveViews, setLiveViews] = useState<number>(105000);

  useEffect(() => {
    let active = true;
    const fetchViews = async () => {
      // 1. Try shields.io first, as it has wildcard CORS and digests stats beautifully
      try {
        const response = await fetch('https://img.shields.io/youtube/views/BiAViHwWBk4.json');
        if (response.ok) {
          const data = await response.json();
          if (data && data.message) {
            const cleanMsg = data.message.toLowerCase().replace(/[^0-9k.m]/g, '');
            if (cleanMsg.includes('k')) {
              const num = Math.round(parseFloat(cleanMsg.replace('k', '')) * 1000);
              if (num > 10000) {
                if (active) {
                  setLiveViews(num);
                  return;
                }
              }
            } else if (cleanMsg.includes('m')) {
              const num = Math.round(parseFloat(cleanMsg.replace('m', '')) * 1000000);
              if (num > 10000) {
                if (active) {
                  setLiveViews(num);
                  return;
                }
              }
            } else {
              const num = parseInt(cleanMsg, 10);
              if (num > 10000) {
                if (active) {
                  setLiveViews(num);
                  return;
                }
              }
            }
          }
        }
      } catch (err) {
        console.warn("Shields.io fetch failed", err);
      }

      // 2. Try Invidious instances
      const instances = [
        'https://yewtu.be/api/v1/videos/BiAViHwWBk4',
        'https://invidious.nerdvpn.de/api/v1/videos/BiAViHwWBk4',
        'https://inv.vern.cc/api/v1/videos/BiAViHwWBk4',
        'https://vid.konst.fish/api/v1/videos/BiAViHwWBk4',
        'https://invidious.no-logs.com/api/v1/videos/BiAViHwWBk4'
      ];

      for (const endpoint of instances) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500);
          const res = await fetch(endpoint, { signal: controller.signal });
          clearTimeout(timeoutId);
          if (res.ok) {
            const data = await res.json();
            if (data && typeof data.viewCount === 'number' && data.viewCount > 10000) {
              if (active) {
                setLiveViews(data.viewCount);
                return;
              }
            }
          }
        } catch (e) {
          console.warn(`Invidious instance failed: ${endpoint}`, e);
        }
      }

      // 3. Try AllOrigins as final resort
      try {
        const url = `https://www.youtube.com/watch?v=BiAViHwWBk4`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (response.ok) {
          const data = await response.json();
          const html = data.contents;
          let views: number | null = null;
          
          const metaMatch = html.match(/itemprop="interactionCount"\s+content="(\d+)"/i) || 
                            html.match(/content="(\d+)"\s+itemprop="interactionCount"/i);
          if (metaMatch && metaMatch[1]) {
            views = parseInt(metaMatch[1], 10);
          } else {
            const jsonMatch = html.match(/"viewCount"\s*:\s*"(\d+)"/i) || 
                              html.match(/"viewCount"\s*:\s*(\d+)/i);
            if (jsonMatch && jsonMatch[1]) {
              views = parseInt(jsonMatch[1], 10);
            }
          }
          
          if (active && views && views > 10000) {
            setLiveViews(views);
          }
        }
      } catch (err) {
        console.warn("AllOrigins fallback failed", err);
      }
    };
    
    fetchViews();
    const interval = setInterval(fetchViews, 5 * 60 * 1000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const formatViews = (count: number) => {
    return count.toLocaleString(lang === 'TR' ? 'tr-TR' : 'en-US');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-transparent min-h-screen text-paper relative">
      <Helmet>
        <title>Biz Demeden Bitmez | Studio Askin</title>
        <meta name="description" content="Türkiye 2026 Dünya Kupası Marşı | Produced by Studio Askin. Discover the official cinematic soccer anthem blending traditional rhythms and epic orchestration." />
        <meta property="og:title" content="Biz Demeden Bitmez – Türkiye 2026 Dünya Kupası Marşı" />
        <meta property="og:description" content="Produced by Studio Askin. Feel the spirit of unity and victory with our epic cinematic anthem." />
        <meta property="og:type" content="music.song" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "Biz Demeden Bitmez - Türkiye 2026 Dünya Kupası Marşı",
            "description": "Türkiye’nin sarsılmaz birlik ruhunu ve coşkusunu, geleneksel Türk ritimleri ve modern sinematik orkestrasyonla harmanlayan muhteşem bir zafer marşı.",
            "thumbnailUrl": "https://askinstudios.com/Turkiye_Grammy_2013.jpg",
            "uploadDate": "2026-05-30",
            "embedUrl": `https://www.youtube.com/embed/${videoId}`
          })}
        </script>
      </Helmet>

      <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="Türkiye National Football Anthem" />

      {/* Hero Section & Campaign Poster Showcase */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pb-24 px-4 md:px-8 z-10 border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none bg-radial-at-t from-[#dfba6b]/5 via-transparent to-transparent" />
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Official World Cup 2026 Campaign Poster Replica */}
            <div className="lg:col-span-5 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full relative rounded-md overflow-hidden bg-gradient-to-br from-[#120a06] via-[#1a1209] to-[#040812] border-2 border-[#dfba6b]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 md:p-8 select-none"
                style={{
                  boxShadow: 'inset 0 0 40px rgba(223,186,107,0.15), 0 25px 60px rgba(0,0,0,0.85)'
                }}
              >
                {/* Riveted Iron Corner Brackets */}
                <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#dfba6b]/40 rounded-tl-sm" />
                <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#dfba6b]/40 rounded-tr-sm" />
                <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#dfba6b]/40 rounded-bl-sm" />
                <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#dfba6b]/40 rounded-br-sm" />
                
                {/* Subtle simulated studs / screw heads */}
                <span className="absolute top-3 left-3 w-1.5 h-1.5 bg-[#dfba6b]/30 rounded-full border border-black/50" />
                <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-[#dfba6b]/30 rounded-full border border-black/50" />
                <span className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-[#dfba6b]/30 rounded-full border border-black/50" />
                <span className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-[#dfba6b]/30 rounded-full border border-black/50" />

                {/* Back sparks lighting */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-amber-500/10 blur-[45px] pointer-events-none" />

                <div className="relative text-center space-y-4">
                  {/* STUDIO ASKIN logo label */}
                  <h5 className="text-[#dfba6b] uppercase text-[10px] md:text-xs tracking-[0.35em] font-extrabold">
                    STUDIO ASKIN
                  </h5>
                  
                  {/* WORLD CUP ANTHEM label */}
                  <h6 className="text-white uppercase text-[8px] md:text-[9px] tracking-[0.2em] font-light opacity-60">
                    WORLD CUP ANTHEM
                  </h6>

                  {/* SCRIPT TITLE: Biz Demeden Bitmez! */}
                  <div className="py-1">
                    <h2 
                      className="text-2xl md:text-4xl font-serif italic text-transparent bg-clip-text"
                      style={{
                        backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, #e6e6e6 70%, #999999 100%)',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                      }}
                    >
                      “Biz Demeden Bitmez!”
                    </h2>
                    <span className="text-white/40 text-[7px] uppercase tracking-[0.25em] block mt-1">
                      2026 TÜRKİYE DÜNYA KUPASI MARŞI
                    </span>
                  </div>

                  {/* Slogan Banner Block - "Birlikte Kazanırız!" */}
                  <div className="my-2 py-2 px-4 bg-gradient-to-r from-transparent via-[#dfba6b]/15 to-transparent border-y border-[#dfba6b]/20">
                    <h3 className="text-[#dfba6b] text-sm md:text-base tracking-[0.16em] uppercase font-serif font-black">
                      BİRLİKTE KAZANIRIZ!
                    </h3>
                  </div>

                  {/* Gigantic "2 [Trophy] 6" composition inside Poster */}
                  <div className="relative h-44 flex items-center justify-center">
                    <span 
                      className="text-[10rem] md:text-[11rem] font-serif font-extrabold select-none z-10 translate-x-2 text-transparent bg-clip-text"
                      style={{
                        backgroundImage: 'linear-gradient(180deg, #FFF2CC 0%, #D4AF37 40%, #AA7C11 85%, #DFBA6B 100%)',
                        filter: 'drop-shadow(0 4px 10px rgba(212,175,55,0.2))',
                        lineHeight: '1'
                      }}
                    >
                      2
                    </span>

                    {/* Glowing Trophy */}
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 z-20 w-32 h-32 flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.45)]">
                      <svg 
                        className="w-full h-full text-[#F2D37D]" 
                        viewBox="0 0 100 200" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <radialGradient id="poster-gold" cx="50%" cy="40%" r="60%">
                            <stop offset="0%" stopColor="#FFF2CC" />
                            <stop offset="30%" stopColor="#F2D37D" />
                            <stop offset="70%" stopColor="#D4AF37" />
                            <stop offset="100%" stopColor="#AA7C11" />
                          </radialGradient>
                        </defs>
                        <circle cx="50" cy="46" r="30" fill="url(#poster-gold)" opacity="0.1" filter="blur(10px)" />
                        <circle cx="50" cy="46" r="22" stroke="url(#poster-gold)" strokeWidth="1" strokeDasharray="3 3" />
                        <circle cx="50" cy="46" r="22" fill="none" stroke="url(#poster-gold)" strokeWidth="1" />
                        <path d="M28 46 C35 28 65 28 72 46 C65 64 35 64 28 46 Z" stroke="url(#poster-gold)" strokeWidth="0.75" />
                        <path d="M50 24 C42 31 42 61 50 68 C58 61 58 31 50 24 Z" stroke="url(#poster-gold)" strokeWidth="0.75" />
                        <path d="M50 156 C53 136 58 126 58 111 C58 94 48 81 40 72 C37 68 38 66 41 67 C45 69 50 77 52 86 C54 94 55 102 50 111 C46 119 44 131 47 156 Z" fill="url(#poster-gold)" opacity="0.9" />
                        <path d="M50 156 C47 136 42 126 42 111 C42 94 52 81 60 72 C63 68 62 66 59 67 C55 69 50 77 48 86 C46 94 45 102 50 111 C54 119 56 131 53 156 Z" fill="url(#poster-gold)" opacity="0.9" />
                        <path d="M35 121 C45 116 55 116 65 121" stroke="url(#poster-gold)" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M38 136 C46 131 54 131 62 136" stroke="url(#poster-gold)" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="43" cy="76" r="3" fill="url(#poster-gold)" />
                        <circle cx="57" cy="76" r="3" fill="url(#poster-gold)" />
                        <path d="M30 156 H70 V176 H30 Z" fill="none" stroke="url(#poster-gold)" strokeWidth="1.5" />
                        <rect x="33" y="161" width="34" height="2" fill="url(#poster-gold)" />
                        <rect x="33" y="168" width="34" height="2" fill="url(#poster-gold)" />
                      </svg>
                    </div>

                    <span 
                      className="text-[10rem] md:text-[11rem] font-serif font-extrabold select-none z-10 -translate-x-2 text-transparent bg-clip-text"
                      style={{
                        backgroundImage: 'linear-gradient(180deg, #FFF2CC 0%, #D4AF37 40%, #AA7C11 85%, #DFBA6B 100%)',
                        filter: 'drop-shadow(0 4px 10px rgba(212,175,55,0.25))',
                        lineHeight: '1'
                      }}
                    >
                      6
                    </span>
                  </div>

                  {/* Campaign footer info in Poster */}
                  <div className="space-y-1 mt-2">
                    <h4 className="text-white text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
                      FIFA WORLD CUP 2026
                    </h4>
                    <span className="text-[8px] font-mono tracking-[0.2em] text-[#dfba6b] uppercase block">
                      AskinStudios.com
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Hero Information & Cinematic Video Thumbnail Playback */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfba6b]/10 border border-[#dfba6b]/30 text-[#dfba6b] text-[10px] uppercase tracking-[0.2em]">
                  <Sparkles size={11} className="animate-pulse" /> {lang === 'TR' ? 'Özel Yayın • 2026 Dünya Kupası Özel' : 'Special Release • 2026 World Cup Special'}
                </span>

                {/* Elegant Language Pill Switcher */}
                <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm self-end">
                  <button
                    onClick={() => setLang('TR')}
                    className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${lang === 'TR' ? 'bg-[#dfba6b] text-[#05070e] shadow-md shadow-[#dfba6b]/20' : 'text-paper/60 hover:text-white'}`}
                  >
                    TR
                  </button>
                  <button
                    onClick={() => setLang('EN')}
                    className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${lang === 'EN' ? 'bg-[#dfba6b] text-[#05070e] shadow-md shadow-[#dfba6b]/20' : 'text-paper/60 hover:text-white'}`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Mega cinematic typography */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic font-extrabold tracking-tight text-white leading-none">
                  Biz Demeden <span className="text-[#dfba6b] block md:inline">Bitmez!</span>
                </h1>
                <p className="text-[#dfba6b] uppercase tracking-[0.25em] text-[10px] md:text-xs font-semibold block pt-1">
                  {lang === 'TR' 
                    ? 'TÜRKİYE 2026 DÜNYA KUPASI RESMİ OLMAYAN MARŞI • PRODUCED BY STUDIO ASKIN' 
                    : 'TURKEY 2026 WORLD CUP UNOFFICIAL ANTHEM • PRODUCED BY STUDIO ASKIN'}
                </p>
              </div>

              <p className="text-paper/85 font-light text-sm md:text-base leading-relaxed text-justify max-w-2xl">
                {lang === 'TR'
                  ? 'Türkiye’nin sarsılmaz birlik ruhunu ve coşkusunu, geleneksel Türk ritimleri ve modern sinematik orkestrasyonla harmanlayan muhteşem bir zafer marşı. Studio Askin gururla sunar.'
                  : 'A magnificent victory anthem blending Turkey’s unwavering spirit of unity and sports excitement with traditional Turkish rhythms and grand cinematic orchestration. Proudly presented by Studio Askin.'}
              </p>

              {/* REAL EXTREME HIGH-QUALITY VIDEO CARD PREVIEW / THUMBNAIL */}
              <div className="space-y-3 pt-2">
                <span className="text-paper/40 uppercase tracking-[0.2em] text-[9px] block font-semibold">
                  {lang === 'TR' ? 'SİNEMATİK FRAGMAN & OYNATICI' : 'CINEMATIC TRAILER & MULTIMEDIA'}
                </span>
                
                <div 
                  className="aspect-video w-full max-w-xl bg-black/60 rounded-md overflow-hidden border-2 border-[#dfba6b]/30 shadow-2xl relative group select-none transition-all duration-300 hover:scale-[1.01] hover:border-[#dfba6b]/70 cursor-pointer"
                  style={{
                    boxShadow: '0 15px 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(223,186,107,0.1)'
                  }}
                  onClick={() => { if(!isPlayingVideo) setIsPlayingVideo(true); }}
                >
                  {isPlayingVideo ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                      title="Biz Demeden Bitmez – Türkiye 2026 Dünya Kupası Marşı"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 w-full h-full">
                      {/* High-quality youtube maxresdefault thumbnail */}
                      <img 
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                        alt="Biz Demeden Bitmez Youtube Presentation"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback to high quality if maxres isn't available
                          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                        }}
                      />
                      {/* Warm red and gold cinematic overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85" />
                      
                      {/* Hover action banner */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <motion.div 
                          animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              '0 0 15px rgba(223,186,107,0.4)',
                              '0 0 30px rgba(223,186,107,0.7)',
                              '0 0 15px rgba(223,186,107,0.4)',
                            ]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-16 h-16 rounded-full bg-[#dfba6b] text-[#05070e] flex items-center justify-center pl-1 font-bold shadow-lg transition-transform duration-300 group-hover:scale-110 active:scale-95 cursor-pointer z-10"
                        >
                          <Play size={24} fill="currentColor" />
                        </motion.div>
                        <span className="text-white uppercase text-[10px] tracking-[0.25em] font-extrabold z-10 drop-shadow-md">
                          {lang === 'TR' ? 'TARAFTAR VİDEOSUNU BAŞLAT' : 'LAUNCH ANTHEM TRAILER'}
                        </span>
                        <span className="text-[#dfba6b] text-[8px] tracking-[0.2em] font-mono z-10 opacity-70">
                          BiAViHwWBk4 • INTERACTIVE PLAYER
                        </span>
                      </div>

                      {/* Small floating specs */}
                      <div className="absolute top-3 left-3 bg-[#05070e]/80 border border-[#dfba6b]/30 px-2 py-0.5 rounded-sm text-[8px] font-mono tracking-wider text-white">
                        4K ULTIMATE AUDIO
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Integrated Action buttons directly beneath players */}
              <div className="flex flex-wrap items-center gap-4 max-w-xl pb-3 pt-1">
                <a 
                  href={`https://www.youtube.com/watch?v=${videoId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[155px] inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-red-700 to-red-650 hover:from-white hover:to-white text-white hover:text-ink font-semibold uppercase tracking-widest text-[10px] transition-all duration-300 rounded-sm shadow-md cursor-pointer"
                >
                  <Youtube size={14} fill="currentColor" /> YouTube
                </a>
                <button 
                  onClick={() => setDownloadModal(true)}
                  className="flex-1 min-w-[155px] inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-transparent border border-white/10 hover:border-[#dfba6b]/60 text-white font-semibold uppercase tracking-widest text-[10px] hover:bg-[#dfba6b]/5 hover:text-[#dfba6b] transition-all duration-300 rounded-sm cursor-pointer"
                >
                  <Download size={14} /> MP3 Download
                </button>
                <button 
                  onClick={handleCopyLink}
                  className="w-12 h-[45px] flex items-center justify-center border border-white/10 hover:border-[#dfba6b]/50 text-paper/60 hover:text-[#dfba6b] transition-all duration-300 rounded-sm cursor-pointer"
                  title="Share Anthem Link"
                >
                  {copied ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content (Branded Anthem Area) */}
      <section className="py-12 md:py-20 px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Project Story / Concept */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif italic text-white flex items-center gap-3">
                    <Music className="text-gold" size={20} /> {lang === 'TR' ? 'Projenin Sanatsal Hikayesi & Yapım Notları' : 'Behind the Project & Production Notes'}
                  </h3>
                  <p className="text-paper/80 font-light text-base leading-relaxed text-justify">
                    {lang === 'TR' ? (
                      <>
                        <strong>"Biz Demeden Bitmez"</strong>, Türk spor tarihinin efsanevi inanmışlık ruhunu ve son saniyeye kadar pes etmeyen asil duruşunu küresel çağdaş müzikle canlandırmak için bestelendi. Aşkın Studios'un özgün vizyonuyla hayata geçen bu eser, geleneksel Türk tınılarının modern batı senfonisiyle buluştuğu yüksek enerjili bir <strong>cinematic world music</strong> projesidir.
                      </>
                    ) : (
                      <>
                        <strong>"Biz Demeden Bitmez"</strong> was composed to breathe life into the legendary spirit of faith in Turkish sports history, capturing the noble stance of never giving up until the final whistle. Brought to life by the distinct vision of Aşkın Studios, this high-energy cinematic world music project blends traditional oriental elements with grand Western orchestration.
                      </>
                    )}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
                  <h4 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                    {lang === 'TR' ? 'Prodüksiyon & Enstrümantal Derinlik (Production & Instruments)' : 'Production & Instrumental Richness'}
                  </h4>
                  <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                    {lang === 'TR' ? (
                      <>
                        Aşkın Şerbetçi liderliğinde gerçekleştirilen prodüksiyonda batının güçlü yaylı enstrümanları ve epik sinematik davulları, doğunun sarsıcı ve can alıcı nefeslileri ile bir araya geliyor. Bu özel <strong>traditional instrumental soul production</strong> tarzı, derinliği hisseden her dinleyicide doğrudan bir aidiyet ve zafer arzusu uyandırır. Yaylı düzenlemelerdeki ritmik dinamizm, sahadaki sarsılmaz iradeyi temsil ederken, solo enstrümanlar ise coğrafyamızın asil hüznünü ve tutkusunu taşır.
                      </>
                    ) : (
                      <>
                        Led by Aşkın Şerbetçi, the production unites powerful Western string and brass instruments with epic cinematic percussion and evocative Middle Eastern woodwinds. This authentic <strong>traditional instrumental soul production</strong> style ignites a deep sense of belonging and passion for victory in every listener.
                      </>
                    )}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-light text-paper/80 pt-2">
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      {lang === 'TR' ? (
                        <span><strong>Ney & Kaval:</strong> Ruhun sonsuz sükunetini ve aynı zamanda fırtına öncesi o asil sessizliği tasvir eder.</span>
                      ) : (
                        <span><strong>Ney & Kaval:</strong> Depicting the infinite tranquility of the soul and the noble silence before the storm.</span>
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      {lang === 'TR' ? (
                        <span><strong>Asma Davul & Kudüm:</strong> Kalp atışlarimizi, stadyumu inleten o gök gürültülü taraftar coşkusunu simgeler.</span>
                      ) : (
                        <span><strong>Asma Davul & Kudüm:</strong> Symbolizing our heartbeats and the thunderous, stadium-shaking energy of the fans.</span>
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      {lang === 'TR' ? (
                        <span><strong>Orkestral Brass ve Strings:</strong> Modern Hollywood tınılarını aratmayan derinlikte epik bir zafer koridoru açar.</span>
                      ) : (
                        <span><strong>Orkestral Brass & Strings:</strong> Forging an epic corridor of victory with Hollywood-level cinematic depth.</span>
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      {lang === 'TR' ? (
                        <span><strong>Sentezleyici Atmosferleri:</strong> 2026 tınısını yakalayan, geleceğin modern soundscape'ini kuran elektronik katmanlar.</span>
                      ) : (
                        <span><strong>Synthesized Textures:</strong> Electronic soundscapes establishing a futuristic 2026 sonic dimension.</span>
                      )}
                    </li>
                  </ul>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
                  <h4 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                    {lang === 'TR' ? 'Müzikal Bölümler & Anlatım (The Musical Chapters)' : 'Musical Chapters & Journey'}
                  </h4>
                  <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                    {lang === 'TR' ? 'Eser, doğrusal bir döngüden ziyade tıpkı heyecan dolu bir 90 dakika gibi sinematik bölümler (chapters) halinde dinleyiciyi sürükler:' : 'Rather than a linear loop, the experience propels the listener through cinematic chapters resembling an intense 90-minute match:'}
                  </p>
                  <div className="space-y-3 pl-4 border-l border-gold/30">
                    <p className="text-xs text-paper/80 font-light">
                      <strong className="text-white font-serif italic">00:00 - {lang === 'TR' ? 'Ney Girişi & Sessiz Ant:' : 'Ney Intro & Silent Oath:'}</strong> {lang === 'TR' ? 'Sahaya ilk adım, sarsılmaz bir kararlılık ve tüm ülkenin nefesini tuttuğu o ilk anlar.' : 'Stepping onto the pitch—unwavering determination as the entire nation holds its breath.'}
                    </p>
                    <p className="text-xs text-paper/80 font-light">
                      <strong className="text-white font-serif italic">00:35 - {lang === 'TR' ? 'Ritmik Yükseliş & Mücadele:' : 'Rhythmic Escalation & Struggle:'}</strong> {lang === 'TR' ? 'Davulların ve epik yaylıların oyuna girişi. Sahadaki ter, mücadele ve birliktelik.' : 'The grand entrance of heavy percussion and epic strings. Sweat, grit, and solidarity.'}
                    </p>
                    <p className="text-xs text-paper/80 font-light">
                      <strong className="text-white font-serif italic">01:15 - {lang === 'TR' ? 'Büyük Triumf (Zafer Teması):' : 'Grand Triumph:'}</strong> {lang === 'TR' ? 'Tüm orkestra ve koronun birleşerek kırmızı-beyaz ruhu göklere çıkardığı doruk noktası.' : 'The culmination of the entire orchestra and chorus lifting the red-and-white spirits to the heavens.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Metadata & Lyrics (Right Column) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Project Meta Card */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm space-y-6">
                <h4 className="text-gold uppercase tracking-widest text-xs font-semibold border-b border-white/10 pb-3">
                  {lang === 'TR' ? 'Proje Künyesi' : 'Project Credits'}
                </h4>
                <ul className="space-y-4 text-sm font-light text-paper/80">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-paper/40">{lang === 'TR' ? 'Yapımcı' : 'Produced By'}</span>
                    <strong className="text-white font-medium">Studio Askin</strong>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-paper/40">{lang === 'TR' ? 'Besteci / Aranjör' : 'Composer / Arranger'}</span>
                    <strong className="text-white font-medium">Aşkın Şerbetçi</strong>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-paper/40">{lang === 'TR' ? 'Yayın Dönemi' : 'Launch Period'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '2026 Dünya Kupası Özel' : '2026 World Cup Special'}</strong>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-paper/40">{lang === 'TR' ? 'Tarz' : 'Genre'}</span>
                    <strong className="text-white font-medium">Epic, Cinematic Fusion</strong>
                  </li>
                  <li className="flex justify-between items-center pb-1">
                    <span className="text-paper/40">{lang === 'TR' ? 'Mevcut Durum' : 'Status'}</span>
                    <span className="px-2 py-0.5 rounded-sm bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] uppercase tracking-wider">
                      {lang === 'TR' ? 'Viral Büyüme' : 'Viral Sensation'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Dynamic Stats Banner */}
              <div className="p-8 bg-gradient-to-b from-[#111a2e]/90 to-[#060a12]/95 border-2 border-[#dfba6b] rounded-md flex flex-col items-center justify-center text-center shadow-[0_0_35px_rgba(223,186,107,0.2)]">
                <span className="text-[#dfba6b] font-serif text-5xl md:text-6xl font-black tracking-tight mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] animate-fade-in">
                  {formatViews(liveViews)}+
                </span>
                <span className="text-xs text-white uppercase tracking-[0.25em] font-extrabold animate-pulse">
                  {lang === 'TR' ? 'İlk 3 Günde İzlenme' : 'Views in the First 3 Days'}
                </span>
              </div>

              {/* Lyrics Block */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm space-y-6">
                <h4 className="text-gold uppercase tracking-widest text-xs font-semibold border-b border-white/10 pb-3">
                  {lang === 'TR' ? 'Marş Sözleri (Tezahürat)' : 'Lyrics (Chant)'}
                </h4>
                <div className="space-y-6 font-serif italic text-base text-paper/90 leading-relaxed text-center">
                  {lang === 'TR' ? (
                    <>
                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Giriş / Verse 1</span>
                        <p>Haydi Kupaya, sahadayız şimdi</p>
                        <p>Ay yıldız uğruna savaşır her milli</p>
                        <p>Tribünde yankılanır tek bir isim <span className="text-gold font-bold font-sans not-italic">(Türkiye!)</span></p>
                        <p>Bu forma üstümüzde, kalptedir yemin</p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Verse 2</span>
                        <p>Dalgalanır bayrakla coşar nefesim</p>
                        <p>Doksanda da pes etmez canım milletim</p>
                        <p>Dalgalanır bayrakla coşar nefesim</p>
                      </div>

                      <div className="py-2 border-y border-white/5 bg-white/[0.02]">
                        <span className="block text-[9px] text-red-400 uppercase tracking-widest mb-1 not-italic font-sans font-semibold">[BREAK] [SILENCE, THEN EVERYONE]</span>
                        <p className="text-gold font-bold text-lg leading-relaxed scale-105 transform transition-all duration-300">
                          (SHHH!...) Biz Demeden Bitmez!
                        </p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Köprü / Build-Up</span>
                        <p>Senle gururum sınır tanımaz</p>
                        <p>Son dokunuşun gol olsun duam</p>
                        <p>Sahadaki aslanımızsın kalpten</p>
                        <p>Türkiye Evladıyla yürür kupaya</p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Gelişme</span>
                        <p>Son dokunuşun gol olsun duam</p>
                        <p>Sahadaki aslanımızsın kalpten</p>
                        <p>Bizim çocuklar yürür kupaya</p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans font-medium">Koro / Chorus</span>
                        <p>Senle gururum sınır tanımaz</p>
                        <p>Son dokunuşun gol olsun duam</p>
                        <p>Sahadaki aslanımızsın kalpten</p>
                        <p>Türkiye Evladıyla yürür kupaya</p>
                      </div>

                      <div className="py-2 border-y border-white/5 bg-white/[0.02]">
                        <span className="block text-[9px] text-red-400 uppercase tracking-widest mb-1 not-italic font-sans font-semibold">(Whole stadium silence and everyone)</span>
                        <p className="text-gold font-bold text-lg leading-relaxed scale-105 transform transition-all duration-300">
                          (SHHH!...) Biz Demeden Bitmez!
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="block text-[10px] text-gold uppercase tracking-widest mb-1 not-italic font-sans">Kapanış / Outro</span>
                        <p className="text-white font-medium">Kırmızı, Beyaz, Kırmızı, Beyaz,</p>
                        <p className="text-gold font-bold text-lg font-sans not-italic tracking-wide mt-1">En Büyük Türkiye,</p>
                        <p className="text-paper/80">Türkiye, Türkiye, Türkiye</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Intro / Verse 1</span>
                        <p>Off to the Cup, we're on the pitch now</p>
                        <p>Every national battles for the crescent and star</p>
                        <p>A single name echoes in the stands <span className="text-gold font-bold font-sans not-italic">(Turkey!)</span></p>
                        <p>This jersey is on us, our oath is in our hearts</p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Verse 2</span>
                        <p>Our breath overflows as the flag waves</p>
                        <p>My beloved nation never gives up, even in the 90th</p>
                        <p>Our breath overflows as the flag waves</p>
                      </div>

                      <div className="py-2 border-y border-white/5 bg-white/[0.02]">
                        <span className="block text-[9px] text-red-400 uppercase tracking-widest mb-1 not-italic font-sans font-semibold">[BREAK] [SILENCE, THEN EVERYONE]</span>
                        <p className="text-gold font-bold text-lg leading-relaxed scale-105 transform transition-all duration-300">
                          (SHHH!...) It's Not Over Till We Say So!
                        </p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Bridge / Build-Up</span>
                        <p>My pride in you knows no bounds</p>
                        <p>My prayer is that your last touch becomes a goal</p>
                        <p>You are our lion on the field, from the heart</p>
                        <p>Turkey marches to the cup with its children</p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Development</span>
                        <p>My prayer is that your last touch becomes a goal</p>
                        <p>You are our lion on the field, from the heart</p>
                        <p>Our boys march to the cup</p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans font-medium">Chorus</span>
                        <p>My pride in you knows no bounds</p>
                        <p>My prayer is that your last touch becomes a goal</p>
                        <p>You are our lion on the field, from the heart</p>
                        <p>Turkey marches to the cup with its children</p>
                      </div>

                      <div className="py-2 border-y border-white/5 bg-white/[0.02]">
                        <span className="block text-[9px] text-red-400 uppercase tracking-widest mb-1 not-italic font-sans font-semibold">(Whole stadium silence and everyone)</span>
                        <p className="text-gold font-bold text-lg leading-relaxed scale-105 transform transition-all duration-300">
                          (SHHH!...) It's Not Over Till We Say So!
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="block text-[10px] text-gold uppercase tracking-widest mb-1 not-italic font-sans">Outro</span>
                        <p className="text-white font-medium">Red, White, Red, White,</p>
                        <p className="text-gold font-bold text-lg font-sans not-italic tracking-wide mt-1">Greatest is Turkey,</p>
                        <p className="text-paper/80">Turkey, Turkey, Turkey</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Viral Growth & Project Info Section */}
      <section id="anthem-info" className="py-12 md:py-20 px-4 md:px-8 border-t border-white/5 bg-black/20 backdrop-blur-[2px] relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold">
                <TrendingUp size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif italic text-gold">
                {lang === 'TR' ? 'Viral Büyüme & Proje Özeti' : 'Viral Growth & Project Summary'}
              </h2>
            </div>

            <p className="text-paper/80 font-light text-base md:text-lg leading-relaxed text-justify">
              {lang === 'TR' 
                ? '“Biz Demeden Bitmez” yayınlandıktan kısa süre sonra on binlerce izlenmeye ulaşarak güçlü bir viral ivme yakaladı. Yüksek izlenme süresi, yüksek beğeni oranı ve uluslararası izleyici kitlesiyle YouTube algoritmasında öne çıkan bir proje haline geldi.'
                : 'Shortly after its release, "Biz Demeden Bitmez" swept digital spaces, generating tens of thousands of video views and a powerful viral momentum. Its stellar audience retention and overwhelmingly high appreciation rate have made it a standout performance on the YouTube algorithm.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm space-y-4">
                <h4 className="text-gold uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">
                  {lang === 'TR' ? 'Milli İlgi & İzlenim İstatistikleri' : 'National Resonance & Watch Metrics'}
                </h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-paper/60 font-light">{lang === 'TR' ? 'İlk 3 Günde' : 'First 3 Days'}</span>
                    <strong className="text-white font-medium">{formatViews(liveViews)}+ {lang === 'TR' ? 'izlenme' : 'Views'}</strong>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-paper/60 font-light">{lang === 'TR' ? 'İzlenme Süresi' : 'Watch Time'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '2.200+ saat' : '2,200+ Hours'}</strong>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-paper/60 font-light">{lang === 'TR' ? 'Beğeni Oranı' : 'Appreciation Ratio'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '%94.4' : '94.4% Positive'}</strong>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm space-y-4">
                <h4 className="text-gold uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">
                  {lang === 'TR' ? 'Kitle & Cihaz Dağılımı' : 'Demographics & Device Metrics'}
                </h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-paper/60 font-light">{lang === 'TR' ? 'Ortalama İzlenme' : 'Average Retention'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '%57.6 retention (tutundurma)' : '57.6% (Exceptional)'}</strong>
                  </li>
                  <li className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-paper/60 font-light">{lang === 'TR' ? 'En Çok İzlenen Ülkeler' : 'Top Geographies'}</span>
                    <strong className="text-white font-medium text-right text-xs">
                      {lang === 'TR' ? 'Azerbaycan, Türkiye, ABD, Bosna, Almanya' : 'Azerbaijan, Turkey, USA, Bosnia, Germany'}
                    </strong>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-paper/60 font-light">{lang === 'TR' ? 'Cihaz Dağılımı' : 'Device Split'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '%64 TV izleyicisi (yüksek etkileşim)' : '64% Connected TV (High Engagement)'}</strong>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-paper/70 font-light text-base leading-relaxed text-justify">
              {lang === 'TR'
                ? 'Bu proje, Türkiye’nin birlik ruhunu ve Dünya Kupası heyecanını sinematik bir anlatımla bir araya getirerek geniş bir kitleye ulaşmayı başardı. Studio Askin’in imzasını taşıyan bu marş, uluslararası izleyiciler tarafından da ilgiyle karşılandı.'
                : 'By blending the unwavering spirit of Turkey’s national team with standard world-class cinematic orchestrations, this unofficial anthem succeeds in gathering a broad demographic under one rhythmic pulse. Released independently under Studio Aşkın, it has captured the attention of dynamic global audiences.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Behind the Anthem - Brand Aligned Section */}
      <section id="behind-anthem" className="py-16 md:py-24 px-4 md:px-8 border-t border-white/5 bg-[#0a0f1c]/40 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold bg-[#0a0f1c]">
                <BookOpen size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif italic text-gold">
                {lang === 'TR' ? 'Marşın Ardındaki Hikâye' : 'Story Behind the Anthem'}
              </h2>
            </div>

            <p className="text-paper/80 font-light text-base md:text-lg leading-relaxed text-justify">
              {lang === 'TR'
                ? '“Biz Demeden Bitmez”, Türkiye’nin birlik, güç ve dayanışma ruhunu yansıtmak için sinematik bir yaklaşımla tasarlandı. Bu proje, sadece bir marş değil; milyonların aynı anda hissettiği ortak bir enerji fikri üzerine inşa edildi.'
                : '"Biz Demeden Bitmez" was envisioned to encapsulate Turkey\'s deep-rooted solidarity, raw power, and passion on the grandest stages. It represents more than a song; it\'s a dynamic acoustic frequency uniting millions under one colossal pulse.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <h3 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                  {lang === 'TR' ? 'Vizyon' : 'The Vision'}
                </h3>
                <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                  {lang === 'TR'
                    ? 'Amaç, modern prodüksiyon tekniklerini geleneksel Türk ritimleriyle birleştirerek uluslararası arenada yankı uyandıracak bir marş yaratmaktı. Büyük davullar, koro katmanları, darbuka dokunuşları ve epik sinematik unsurlar bu vizyonun temelini oluşturdu.'
                    : 'The primary objective was to align cutting-edge modern pop-orchestral production with authentic Turkish rhythms, achieving a world-class hybrid sound. Massive stadium drums, epic choral walls, responsive darbuka rolls, and brass stabs form the pillars of this release.'}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                  {lang === 'TR' ? 'Prodüksiyon Süreci' : 'Production Process'}
                </h3>
                <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                  {lang === 'TR'
                    ? 'Stüdyo aşamasında yüzlerce vokal katmanı, geniş stereo davul kayıtları ve orkestral elementler bir araya getirildi. Her bölüm, stadyum atmosferini hissettirecek şekilde tasarlandı. Sessizlikten sonra gelen toplu “Biz Demeden Bitmez” çıkışı, marşın imza anı olarak planlandı.'
                    : 'Engineered at Studio Aşkın over extensive tracking sessions, the arrangement weaves together hundreds of backing vocal layers, wide acoustic drum room recordings, and custom orchestral patches. Every dynamic crescendo was curated to echo standard stadium atmospheres.'}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                  {lang === 'TR' ? 'Duygusal Çekirdek' : 'Emotional Core'}
                </h3>
                <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                  {lang === 'TR'
                    ? <>Marşın merkezinde tek bir fikir var: <strong className="text-white font-medium">“Birlik olmadan zafer olmaz.”</strong> Bu duygu, hem müzikal yapıda hem de sözlerin ritminde kendini gösteriyor.</>
                    : <>At the absolute focus is a singular, humble message: <strong className="text-white font-medium font-sans">"Without unity, there can be no victory."</strong> This emotional core is felt in the heavy, breathless pacing of the lyrics and instrumentation.</>}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                  {lang === 'TR' ? 'Küresel Etki' : 'Global Reach'}
                </h3>
                <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                  {lang === 'TR'
                    ? 'Yayınlandıktan sonra marş, Türkiye’nin ötesine geçerek Azerbaycan, ABD, Almanya ve Balkan ülkelerinde hızla yayılmaya başladı. Yüksek izlenme süresi ve güçlü izleyici tutma oranı, marşın uluslararası izleyiciler tarafından benimsendiğini gösteriyor.'
                    : 'Immediately following its debut, the anthem crossed borders and captured listeners across Azerbaijan, the United States, Germany, and the Balkans. High playback rates and dynamic audience retention demonstrate its cross-cultural appeal.'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* International Reach - Brand Aligned Section */}
      <section id="international-reach" className="py-16 md:py-24 px-4 md:px-8 border-t border-white/5 bg-black/10 backdrop-blur-[2px] relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold bg-[#0a0f1c]">
                <Globe size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif italic text-gold">
                {lang === 'TR' ? 'Uluslararası Erişim' : 'International Reach'}
              </h2>
            </div>

            <p className="text-paper/80 font-light text-base md:text-lg leading-relaxed text-justify">
              {lang === 'TR'
                ? '“Biz Demeden Bitmez”, yayınlandıktan kısa süre sonra yalnızca Türkiye’de değil, dünya genelinde de güçlü bir izleyici kitlesine ulaştı. Marş, diaspora toplulukları, spor kültürü ve uluslararası müzik dinleyicileri arasında hızla yayılıyor.'
                : 'After its release, “Biz Demeden Bitmez” quickly expanded beyond Turkey and began resonating with audiences worldwide. The anthem is spreading rapidly among diaspora communities, sports culture, and international music listeners.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm space-y-4">
                <h4 className="text-gold uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">
                  {lang === 'TR' ? 'Küresel Yayılım' : 'Global Distribution'}
                </h4>
                <ul className="space-y-3 font-light text-sm text-paper/80">
                  <li className="flex justify-between items-start border-b border-white/5 pb-2">
                    <strong className="text-gold font-medium">{lang === 'TR' ? 'Azerbaycan:' : 'Azerbaijan:'}</strong>
                    <span className="text-right pl-4">{lang === 'TR' ? 'Güçlü kültürel bağlar ve yüksek izlenme oranı.' : 'Strong cultural ties and high engagement.'}</span>
                  </li>
                  <li className="flex justify-between items-start border-b border-white/5 pb-2">
                    <strong className="text-gold font-medium">{lang === 'TR' ? 'Türkiye:' : 'Turkey:'}</strong>
                    <span className="text-right pl-4">{lang === 'TR' ? 'Ana izleyici kitlesi ve yoğun etkileşim.' : 'Primary audience with intense interaction.'}</span>
                  </li>
                  <li className="flex justify-between items-start border-b border-white/5 pb-2">
                    <strong className="text-gold font-medium">{lang === 'TR' ? 'Amerika Birleşik Devletleri:' : 'United States:'}</strong>
                    <span className="text-right pl-4">{lang === 'TR' ? 'Türk diasporası ve spor toplulukları.' : 'Turkish diaspora and sports communities.'}</span>
                  </li>
                  <li className="flex justify-between items-start border-b border-white/5 pb-2">
                    <strong className="text-gold font-medium">{lang === 'TR' ? 'Almanya:' : 'Germany:'}</strong>
                    <span className="text-right pl-4">{lang === 'TR' ? 'Avrupa’daki en büyük Türk topluluklarından biri.' : 'One of Europe’s largest Turkish populations.'}</span>
                  </li>
                  <li className="flex justify-between items-start">
                    <strong className="text-gold font-medium">{lang === 'TR' ? 'Balkanlar:' : 'The Balkans:'}</strong>
                    <span className="text-right pl-4">{lang === 'TR' ? 'Ritmik yapı ve kültürel yakınlık nedeniyle güçlü ilgi.' : 'Strong interest due to rhythmic and cultural familiarity.'}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-gold uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">
                    {lang === 'TR' ? 'Küresel Birlik Mesajı' : 'Global Message of Unity'}
                  </h4>
                  <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                    {lang === 'TR'
                      ? 'Bu uluslararası dağılım, marşın yalnızca bir şarkı değil, ortak bir duygu ve birlik çağrısı olarak benimsendiğini gösteriyor. Sınırları aşan melodilerimiz, taraftarları nerede olurlarsa olsunlar tek bir yürek halinde birleştiriyor.'
                      : 'This global distribution shows that the anthem is embraced not just as a song, but as a shared emotion and a call for unity. Our border-crossing melodies unite fans into a single heartbeat, wherever they may be.'}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-between items-center text-xs font-medium text-gold">
                  <span>{lang === 'TR' ? 'Küresel Hedef Kitle' : 'Global Reach Target'}</span>
                  <span className="px-2 py-0.5 rounded-sm bg-gold/10 border border-gold/20 text-[10px] uppercase tracking-wider">
                    WORLDWIDE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download Alert Modal */}
      <AnimatePresence>
        {downloadModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setDownloadModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-[#0B1222] border border-gold/30 p-8 rounded-sm max-w-md w-full text-center space-y-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto text-gold">
                <Music size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif italic text-white">{lang === 'TR' ? '"Biz Demeden Bitmez" MP3' : '"Biz Demeden Bitmez" MP3'}</h3>
                <p className="text-paper/60 text-sm font-light">
                  {lang === 'TR' 
                    ? 'Dünya Kupası Özel Marşı MP3 dosyasını doğrudan Google Drive üzerinden cihazınıza indirebilirsiniz!'
                    : 'Download the World Cup Special Anthem wave/MP3 directly to your device via Google Drive!'}
                </p>
                <p className="text-gold text-xs uppercase tracking-widest font-semibold pt-2">
                  {lang === 'TR' ? 'Resmi Yüksek Kaliteli Sürüm (320kbps)' : 'Official Premium Master (320kbps)'}
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-4">
                <a 
                  href="https://drive.google.com/file/d/1bkDNe9FfWJFr7Ao3o-h7uWYLWQRkAH1c/view?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-gold text-ink font-semibold uppercase tracking-widest text-[10px] hover:bg-white hover:text-ink transition-all duration-300 rounded-sm text-center flex items-center justify-center gap-2"
                >
                  <Download size={14} /> {lang === 'TR' ? "MP3 DOSYASINI İNDİR (GOOGLE DRIVE)" : "DOWNLOAD MP3 FILE (GOOGLE DRIVE)"}
                </a>
                <div className="flex gap-3 w-full">
                  <a 
                    href={`https://www.youtube.com/watch?v=${videoId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 border border-white/10 hover:border-gold/30 hover:bg-gold/5 text-paper/85 font-semibold uppercase tracking-widest text-[9px] hover:text-gold transition-colors rounded-sm text-center"
                  >
                    {lang === 'TR' ? "YouTube'dan Dinle" : "Listen on YouTube"}
                  </a>
                  <button 
                    onClick={() => setDownloadModal(false)}
                    className="flex-1 py-2.5 border border-white/10 hover:bg-white/5 text-paper/60 font-semibold uppercase tracking-widest text-[9px] transition-colors rounded-sm"
                  >
                    {lang === 'TR' ? "Vazgeç" : "Cancel"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Anthem;
 