import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Download, Youtube, Music, Sparkles, Share2, Check, TrendingUp, BookOpen, Globe, Play, FileText, ExternalLink } from 'lucide-react';
import { CinematicBackground } from '../components/common/CinematicBackground';

const Anthem = () => {
  const [copied, setCopied] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [videoId, setVideoId] = useState("BiAViHwWBk4"); 
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [liveViews, setLiveViews] = useState<number>(105000);
  const [elapsedDays, setElapsedDays] = useState<number>(3);

  useEffect(() => {
    const launch = new Date('2026-05-28T00:00:00');
    const now = new Date();
    const diffMs = now.getTime() - launch.getTime();
    const calculatedDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
    setElapsedDays(Math.max(3, calculatedDays));
  }, []);

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
      <section className="relative overflow-hidden pt-12 pb-16 md:pb-20 px-4 md:px-8 z-10 border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none bg-radial-at-t from-[#dfba6b]/5 via-transparent to-transparent" />
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Official World Cup 2026 Campaign Poster Artwork */}
            <div className="lg:col-span-5 relative z-10 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-sm aspect-[4/5] relative rounded-lg overflow-hidden bg-gradient-to-b from-[#0a0c14] to-[#121522] border border-gold/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-8 select-none flex flex-col justify-between"
                style={{
                  boxShadow: 'inset 0 0 30px rgba(223,186,107,0.05), 0 25px 60px rgba(0,0,0,0.85)'
                }}
              >
                {/* Elegant subtle double border outline */}
                <div className="absolute inset-2 border border-white/5 pointer-events-none rounded-md" />
                <div className="absolute inset-3 border border-gold/10 pointer-events-none rounded-sm" />
                
                {/* Delicate corner markers */}
                <span className="absolute top-4 left-4 w-2.5 h-2.5 border-t border-l border-gold/40" />
                <span className="absolute top-4 right-4 w-2.5 h-2.5 border-t border-r border-gold/40" />
                <span className="absolute bottom-4 left-4 w-2.5 h-2.5 border-b border-l border-gold/40" />
                <span className="absolute bottom-4 right-4 w-2.5 h-2.5 border-b border-r border-gold/40" />

                {/* Header branding */}
                <div className="text-center space-y-1.5 z-10 relative">
                  <span className="text-[9px] font-mono tracking-[0.35em] text-gold uppercase block">
                    STUDIO AŞKIN
                  </span>
                  <span className="text-[7px] tracking-[0.25em] text-paper/40 uppercase block font-semibold">
                    TURKEY 2026 CAMPAIGN MASTER
                  </span>
                </div>

                {/* Elegant central physical lockup - minimalist wireframe gold trophy */}
                <div className="relative flex flex-col items-center justify-center py-6">
                  {/* Subtle radial gold aura */}
                  <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full" />
                  
                  {/* Minimal gold outline trophy SVG */}
                  <div className="w-24 h-24 relative z-10 filter drop-shadow-[0_4px_10px_rgba(223,186,107,0.2)]">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold/80">
                      <path d="M30 20 H70 V40 C70 52 60 62 48 64 C44 64.5 40 64.5 36 63 M64 63.5 C59 62 50 63 50 63" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M50 64 V80 M40 80 H60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="50" cy="35" r="12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                      <path d="M22 28 C16 30 16 38 20 42 C23 45 30 43 30 40" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      <path d="M78 28 C84 30 84 38 80 42 C77 45 70 43 70 40" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Red/White graphic banner details with vertical letters */}
                  <div className="mt-4 text-center">
                    <span className="text-[50px] font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 tracking-normal block leading-tight font-black filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                      2026
                    </span>
                    <span className="text-[8px] font-mono tracking-[0.25em] text-red-500 uppercase font-black block mt-1">
                      TÜRKİYE MILLI TAKIMI
                    </span>
                  </div>
                </div>

                {/* Footer and Slogan typography in Artwork */}
                <div className="text-center space-y-3 z-10 relative">
                  <div className="border-t border-white/5 pt-2">
                    <span className="text-[10px] tracking-[0.2em] font-serif italic text-white font-bold block">
                      “Biz Demeden Bitmez!”
                    </span>
                    <span className="text-[7px] tracking-[0.3em] font-mono text-gold uppercase block mt-1.5 font-bold">
                      BİRLİKTE KAZANIRIZ
                    </span>
                  </div>
                  <div className="text-[6px] tracking-[0.25em] text-paper/30 font-mono uppercase">
                    © 2026 STUDIO ASKIN RECORDINGS • ALL RIGHTS RESERVED
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
              <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
                <h4 className="text-gold uppercase tracking-widest text-[11px] font-semibold border-b border-white/10 pb-2.5">
                  {lang === 'TR' ? 'Proje Künyesi' : 'Project Credits'}
                </h4>
                <ul className="space-y-3 text-xs font-light text-paper/80">
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
                  <li className="flex justify-between items-center">
                    <span className="text-paper/40">{lang === 'TR' ? 'Mevcut Durum' : 'Status'}</span>
                    <span className="px-2 py-0.5 rounded-sm bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] uppercase tracking-wider font-semibold">
                      {lang === 'TR' ? 'Viral Büyüme' : 'Viral Sensation'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Dynamic Stats Banner with Consolidated Expanded Insights */}
              <div className="bg-gradient-to-b from-[#111a2e]/90 to-[#060a12]/95 border border-[#dfba6b]/40 rounded-sm p-6 text-center space-y-4 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
                <div>
                  <span className="text-[#dfba6b] font-serif text-4xl md:text-5xl font-black tracking-tight mb-1 block drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] animate-fade-in">
                    {formatViews(liveViews)}+
                  </span>
                  <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold block">
                    {lang === 'TR' ? `İLK ${elapsedDays} GÜN GENEL İZLENME` : `WATCH METRICS IN FIRST ${elapsedDays} DAYS`}
                  </span>
                </div>
                
                <div className="border-t border-white/5 pt-4 space-y-2 text-xs font-light text-paper/70">
                  <div className="flex justify-between">
                    <span>{lang === 'TR' ? 'Beğeni Oranı' : 'Like Ratio'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '%94.4' : '94.4%'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === 'TR' ? 'İzleme Süresi' : 'Watch Time'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '2.200+ Saat' : '2,200+ Hrs'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === 'TR' ? 'Cihaz Dağılımı' : 'Device Split'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '%64 SMART TV' : '64% Smart TV'}</strong>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2">
                    <span className="text-[#dfba6b] font-medium">{lang === 'TR' ? 'Kilit Bölgeler' : 'Top Geographies'}</span>
                    <strong className="text-white font-medium text-right max-w-[150px] leading-tight">
                      {lang === 'TR' ? 'TR, AZ, USA, DE' : 'TR, AZ, US, DE'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Lyrics Block with Scroll Capabilities for Space Optimization */}
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <h4 className="text-gold uppercase tracking-widest text-[#dfba6b] text-xs font-semibold">
                    {lang === 'TR' ? 'Marş Sözleri & Tezahürat' : 'Lyrics & Chant'}
                  </h4>
                  <span className="text-[9px] text-[#dfba6b]/60 tracking-wider uppercase font-mono border border-[#dfba6b]/15 px-2 py-0.5 rounded-sm">
                    {lang === 'TR' ? 'DİKEY KAYDIR' : 'SCROLL TO READ'}
                  </span>
                </div>
                
                <div className="max-h-[360px] overflow-y-auto pr-2 space-y-6 font-serif italic text-sm text-paper/90 leading-relaxed text-center scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {lang === 'TR' ? (
                    <>
                      <div>
                        <span className="block text-[9px] text-paper/40 uppercase tracking-widest mb-1.5 not-italic font-sans">Giriş / Verse 1</span>
                        <p>Haydi Kupaya, sahadayız şimdi</p>
                        <p>Ay yıldız uğruna savaşır her milli</p>
                        <p>Tribünde yankılanır tek bir isim <span className="text-gold font-bold font-sans not-italic">(Türkiye!)</span></p>
                        <p>Bu forma üstümüzde, kalptedir yemin</p>
                      </div>

                      <div>
                        <span className="block text-[9px] text-paper/40 uppercase tracking-widest mb-1.5 not-italic font-sans">Verse 2</span>
                        <p>Dalgalanır bayrakla coşar nefesim</p>
                        <p>Doksanda da pes etmez canım milletim</p>
                        <p>Dalgalanır bayrakla coşar nefesim</p>
                      </div>

                      <div className="py-2 border-y border-white/5 bg-white/[0.02]">
                        <span className="block text-[8px] text-red-500 uppercase tracking-widest mb-1 not-italic font-sans font-semibold">[BREAK] [SILENCE, THEN EVERYONE]</span>
                        <p className="text-gold font-bold text-base leading-relaxed">
                          (SHHH!...) Biz Demeden Bitmez!
                        </p>
                      </div>

                      <div>
                        <span className="block text-[9px] text-paper/40 uppercase tracking-widest mb-1.5 not-italic font-sans">Köprü / Build-Up</span>
                        <p>Senle gururum sınır tanımaz</p>
                        <p>Son dokunuşun gol olsun duam</p>
                        <p>Sahadaki aslanımızsın kalpten</p>
                        <p>Türkiye Evladıyla yürür kupaya</p>
                      </div>

                      <div>
                        <span className="block text-[9px] text-paper/40 uppercase tracking-widest mb-1.5 not-italic font-sans">Gelişme</span>
                        <p>Son dokunuşun gol olsun duam</p>
                        <p>Sahadaki aslanımızsın kalpten</p>
                        <p>Bizim çocuklar yürür kupaya</p>
                      </div>

                      <div>
                        <span className="block text-[9px] text-paper/40 uppercase tracking-widest mb-1.5 not-italic font-sans font-medium">Koro / Chorus</span>
                        <p>Senle gururum sınır tanımaz</p>
                        <p>Son dokunuşun gol olsun duam</p>
                        <p>Sahadaki aslanımızsın kalpten</p>
                        <p>Türkiye Evladıyla yürür kupaya</p>
                      </div>

                      <div className="py-2 border-y border-white/5 bg-white/[0.02]">
                        <span className="block text-[8px] text-red-500 uppercase tracking-widest mb-1 not-italic font-sans font-semibold">(Whole stadium silence and everyone)</span>
                        <p className="text-gold font-bold text-base leading-relaxed">
                          (SHHH!...) Biz Demeden Bitmez!
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="block text-[9px] text-gold uppercase tracking-widest mb-1.5 not-italic font-sans font-medium">Kapanış / Outro</span>
                        <p className="text-white font-medium">Kırmızı, Beyaz, Kırmızı, Beyaz,</p>
                        <p className="text-gold font-bold text-base font-sans not-italic tracking-wide mt-1">En Büyük Türkiye,</p>
                        <p className="text-[#bf9d53]">Türkiye, Türkiye, Türkiye</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="block text-[9px] text-paper/40 uppercase tracking-widest mb-1.5 not-italic font-sans">Intro / Verse 1</span>
                        <p>Off to the Cup, we're on the pitch now</p>
                        <p>Every national battles for the crescent and star</p>
                        <p>A single name echoes in the stands <span className="text-gold font-bold font-sans not-italic">(Turkey!)</span></p>
                        <p>This jersey is on us, our oath is in our hearts</p>
                      </div>

                      <div>
                        <span className="block text-[9px] text-paper/40 uppercase tracking-widest mb-1.5 not-italic font-sans">Verse 2</span>
                        <p>Our breath overflows as the flag waves</p>
                        <p>My beloved nation never gives up, even in the 90th</p>
                        <p>Our breath overflows as the flag waves</p>
                      </div>

                      <div className="py-2 border-y border-white/5 bg-white/[0.02]">
                        <span className="block text-[8px] text-red-500 uppercase tracking-widest mb-1 not-italic font-sans font-semibold">[BREAK] [SILENCE, THEN EVERYONE]</span>
                        <p className="text-gold font-bold text-base leading-relaxed">
                          (SHHH!...) It's Not Over Till We Say So!
                        </p>
                      </div>

                      <div>
                        <span className="block text-[9px] text-paper/40 uppercase tracking-widest mb-1.5 not-italic font-sans">Bridge / Build-Up</span>
                        <p>My pride in you knows no bounds</p>
                        <p>My prayer is that your last touch becomes a goal</p>
                        <p>You are our lion on the field, from the heart</p>
                        <p>Turkey marches to the cup with its children</p>
                      </div>

                      <div>
                        <span className="block text-[9px] text-paper/40 uppercase tracking-widest mb-1.5 not-italic font-sans">Development</span>
                        <p>My prayer is that your last touch becomes a goal</p>
                        <p>You are our lion on the field, from the heart</p>
                        <p>Our boys march to the cup</p>
                      </div>

                      <div>
                        <span className="block text-[9px] text-paper/40 uppercase tracking-widest mb-1.5 not-italic font-sans font-medium">Chorus</span>
                        <p>My pride in you knows no bounds</p>
                        <p>My prayer is that your last touch becomes a goal</p>
                        <p>You are our lion on the field, from the heart</p>
                        <p>Turkey marches to the cup with its children</p>
                      </div>

                      <div className="py-2 border-y border-white/5 bg-white/[0.02]">
                        <span className="block text-[8px] text-red-500 uppercase tracking-widest mb-1 not-italic font-sans font-semibold">(Whole stadium silence and everyone)</span>
                        <p className="text-gold font-bold text-base leading-relaxed">
                          (SHHH!...) It's Not Over Till We Say So!
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="block text-[9px] text-gold uppercase tracking-widest mb-1.5 not-italic font-sans">Outro</span>
                        <p className="text-white font-medium">Red, White, Red, White,</p>
                        <p className="text-gold font-bold text-base font-sans not-italic tracking-wide mt-1">Greatest is Turkey,</p>
                        <p className="text-[#bf9d53]">Turkey, Turkey, Turkey</p>
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
                    <span className="text-paper/60 font-light">{lang === 'TR' ? `İlk ${elapsedDays} Günde` : `First ${elapsedDays} Days`}</span>
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
                <div className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                  {lang === 'TR'
                    ? <>Marşın merkezinde tek bir fikir var: <strong className="text-white font-medium">“Birlik olmadan zafer olmaz.”</strong> Bu duygu, hem müzikal yapıda hem de sözlerin ritminde kendini gösteriyor.</>
                    : <>At the absolute focus is a singular, humble message: <strong className="text-white font-medium font-sans">"Without unity, there can be no victory."</strong> This emotional core is felt in the heavy, pacing of the lyrics and instrumentation.</>}
                </div>
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

      {/* Official Press Release Section */}
      <section id="anthem-press-release" className="py-16 md:py-24 px-4 md:px-8 border-t border-white/5 bg-[#0a0f1c]/20 relative z-10 animate-fade-in">
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
                <FileText size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif italic text-gold">
                {lang === 'TR' ? 'Resmi Basın Bülteni' : 'Official Press Release'}
              </h2>
            </div>

            <p className="text-paper/80 font-light text-base md:text-lg leading-relaxed text-justify">
              {lang === 'TR'
                ? '“Biz Demeden Bitmez” marşının resmi basın bültenine hem Türkçe hem de İngilizce olarak doğrudan aşağıdaki bağlantılardan erişebilir, habercilik ve yayıncılık çalışmalarınızda serbestçe kullanabilirsiniz.'
                : 'Access the official press releases for the anthem "Biz Demeden Bitmez" directly in Turkish or English using the links below for your news, editorial, or media coverage.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Turkish Press Release */}
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded-sm bg-gold/10 border border-gold/20 text-[9px] uppercase tracking-wider text-gold font-medium">
                      TÜRKÇE / TURKISH
                    </span>
                    <span className="text-[10px] font-mono text-paper/40">EPK-TR-2026</span>
                  </div>
                  <h3 className="text-2xl font-serif italic text-white">
                    Basın Bülteni (TR)
                  </h3>
                  <p className="text-paper/60 font-light text-sm leading-relaxed text-justify">
                    “Biz Demeden Bitmez” marşının çıkış hikayesi, prodüksiyon detayları ve projenin ardındaki milli birlik ruhunu anlatan resmi basın metni.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5 mt-6">
                  <a
                    href="https://drive.google.com/file/d/1sEc3TYm4Duwn5d8HValQaFL2ZaJRF5k0/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-gold text-ink font-semibold uppercase tracking-widest text-[10px] hover:bg-white hover:text-ink transition-all duration-300 rounded-sm text-center flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={14} /> GÖRÜNTÜLE & İNDİR (GOOGLE DRIVE)
                  </a>
                </div>
              </div>

              {/* English Press Release */}
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded-sm bg-white/10 border border-white/20 text-[9px] uppercase tracking-wider text-paper/85 font-medium">
                      İNGİLİZCE / ENGLISH
                    </span>
                    <span className="text-[10px] font-mono text-paper/40">EPK-EN-2026</span>
                  </div>
                  <h3 className="text-2xl font-serif italic text-white">
                    Press Release (EN)
                  </h3>
                  <p className="text-paper/60 font-light text-sm leading-relaxed text-justify">
                    The official press release detailing the creation, production background, and global reach of the Turkey National Anthem project.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5 mt-6">
                  <a
                    href="https://drive.google.com/file/d/16mRdO7sbJtnSSKJzwoOpGNRpDLSvk0wJ/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 border border-white/10 hover:border-gold/30 hover:bg-gold/5 text-paper hover:text-white font-semibold uppercase tracking-widest text-[10px] transition-all duration-300 rounded-sm text-center flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={14} /> VIEW & DOWNLOAD (GOOGLE DRIVE)
                  </a>
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
 