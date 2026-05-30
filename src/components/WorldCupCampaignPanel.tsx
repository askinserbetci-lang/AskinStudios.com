import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Award, Music, Sparkles, Youtube, ExternalLink } from 'lucide-react';

export const WorldCupCampaignPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    return count.toLocaleString('tr-TR');
  };

  // Custom golden trophy SVG representation
  const renderTrophySVG = (className = "w-full h-full text-gold") => (
    <svg 
      className={className} 
      viewBox="0 0 100 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="gold-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF2CC" />
          <stop offset="30%" stopColor="#F2D37D" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA7C11" />
        </radialGradient>
      </defs>
      
      {/* Soft back aura */}
      <circle cx="50" cy="46" r="30" fill="url(#gold-glow)" opacity="0.15" filter="blur(15px)" />
      
      {/* Upper Globe */}
      <circle cx="50" cy="46" r="22" stroke="url(#gold-glow)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="50" cy="46" r="22" fill="none" stroke="url(#gold-glow)" strokeWidth="5" opacity="0.08" />
      <circle cx="50" cy="46" r="22" fill="none" stroke="url(#gold-glow)" strokeWidth="1" />
      
      {/* Latitude / longitude lines */}
      <path d="M28 46 C35 28 65 28 72 46 C65 64 35 64 28 46 Z" stroke="url(#gold-glow)" strokeWidth="0.75" />
      <path d="M50 24 C42 31 42 61 50 68 C58 61 58 31 50 24 Z" stroke="url(#gold-glow)" strokeWidth="0.75" />
      <line x1="50" y1="24" x2="50" y2="68" stroke="url(#gold-glow)" strokeWidth="0.75" />
      <line x1="28" y1="46" x2="72" y2="46" stroke="url(#gold-glow)" strokeWidth="0.75" />

      {/* Wrapping structures forming body */}
      <path d="M50 156 C53 136 58 126 58 111 C58 94 48 81 40 72 C37 68 38 66 41 67 C45 69 50 77 52 86 C54 94 55 102 50 111 C46 119 44 131 47 156 Z" fill="url(#gold-glow)" opacity="0.9" />
      <path d="M50 156 C47 136 42 126 42 111 C42 94 52 81 60 72 C63 68 62 66 59 67 C55 69 50 77 48 86 C46 94 45 102 50 111 C54 119 56 131 53 156 Z" fill="url(#gold-glow)" opacity="0.9" />
      
      {/* Decorative center bands */}
      <path d="M35 121 C45 116 55 116 65 121" stroke="url(#gold-glow)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 136 C46 131 54 131 62 136" stroke="url(#gold-glow)" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Model heads in trophy */}
      <circle cx="43" cy="76" r="3" fill="url(#gold-glow)" />
      <circle cx="57" cy="76" r="3" fill="url(#gold-glow)" />

      {/* Weighted metallic Base with bands */}
      <path d="M30 156 H70 V176 H30 Z" fill="none" stroke="url(#gold-glow)" strokeWidth="1.5" />
      <rect x="33" y="161" width="34" height="2" fill="url(#gold-glow)" />
      <rect x="33" y="168" width="34" height="2" fill="url(#gold-glow)" />
    </svg>
  );

  return (
    <>
      {/* ========================================== */}
      {/* DESKTOP SIDEBAR PANEL (lg screens)          */}
      {/* ========================================== */}
      <div 
        className="hidden lg:flex fixed left-0 top-0 h-screen w-[420px] bg-[#05070e] border-r border-[#dfba6b]/15 z-40 flex-col justify-between p-8 overflow-y-auto select-none"
        style={{
          boxShadow: '10px 0 30px rgba(0,0,0,0.5)',
          background: 'linear-gradient(135deg, #05070e 0%, #070d19 100%)'
        }}
      >
        {/* Particle/Dust ambient overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#dfba6b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        {/* Soft glowing ambient lighting in bg */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#dfba6b]/5 blur-[70px] pointer-events-none" />

        {/* Top Campaign Branding Header */}
        <div className="relative pt-6 space-y-2 text-center">
          <span className="text-[#dfba6b] uppercase text-[9px] tracking-[0.4em] font-bold block">
            Studio Aşkın Present
          </span>
          <span className="text-white uppercase text-[8px] tracking-[0.25em] font-light block opacity-60">
            2026 World Cup Campaign
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#dfba6b]/50 to-transparent mx-auto mt-3" />
        </div>

        {/* Centerpiece "2 [Trophy] 6" Silhouette composition */}
        <div className="relative py-4 flex flex-col items-center justify-center">
          
          {/* Real-time Youtube Views Badge - Beautifully Styled Cinematic Badge */}
          <div 
            className="w-[85%] mx-auto mb-4 p-4 px-6 bg-gradient-to-b from-[#111a2e]/90 to-[#050811]/95 border-2 border-[#dfba6b]/45 rounded-lg flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(223,186,107,0.2)] pointer-events-auto"
            style={{ minHeight: '84px' }}
          >
            <span className="text-[#dfba6b] font-serif text-3xl md:text-3.5xl font-black tracking-tight mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {formatViews(liveViews)}+
            </span>
            <span className="text-[10px] text-white/95 uppercase tracking-[0.22em] font-extrabold leading-none pt-0.5">
              İLK 3 GÜNDE İZLENME
            </span>
            <span className="text-[8px] text-paper/40 uppercase tracking-[0.15em] font-light mt-1">
              Views in the First 3 Days
            </span>
          </div>
          
          <div className="flex items-center justify-center relative w-full h-52">
            {/* Massive Metallic "2" */}
            <span 
              className="text-[13rem] font-serif font-extrabold select-none z-10 translate-x-2 text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(180deg, #FFF2CC 0%, #D4AF37 40%, #AA7C11 80%, #DFBA6B 100%)',
                filter: 'drop-shadow(0 4px 15px rgba(212,175,55,0.25))',
                lineHeight: '1'
              }}
            >
              2
            </span>

            {/* Glowing Golden Cup Trophy */}
            <motion.div 
              animate={{
                y: [0, -4, 0],
                filter: [
                  'drop-shadow(0 8px 20px rgba(212,175,55,0.3))',
                  'drop-shadow(0 12px 30px rgba(212,175,55,0.5))',
                  'drop-shadow(0 8px 20px rgba(212,175,55,0.3))'
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute left-1/2 top-10 -translate-x-1/2 z-20 w-36 h-36 flex items-center justify-center"
            >
              {renderTrophySVG("w-full h-full text-[#F2D37D]")}
            </motion.div>

            {/* Massive Metallic "6" */}
            <span 
              className="text-[13rem] font-serif font-extrabold select-none z-10 -translate-x-2 text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(180deg, #FFF2CC 0%, #D4AF37 40%, #AA7C11 80%, #DFBA6B 100%)',
                filter: 'drop-shadow(0 4px 15px rgba(212,175,55,0.25))',
                lineHeight: '1'
              }}
            >
              6
            </span>
          </div>

          {/* Labeled '26 World Cup' and 'FIFA World Cup 2026' explicitly */}
          <div className="text-center space-y-2 mt-2">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase">
              FIFA WORLD CUP 2026
            </h4>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#dfba6b]/10 border border-[#dfba6b]/20 text-[#dfba6b] text-[9px] font-bold uppercase tracking-[0.15em]">
              <Sparkles size={10} className="animate-pulse text-[#dfba6b]" />
              26 World Cup Campaign
            </div>
          </div>
        </div>

        {/* Dynamic Theme Content / Action Toggles */}
        <div className="relative space-y-6 pb-6 text-center">
          
          <div className="space-y-1">
            <h3 className="font-serif italic text-2xl text-white">Biz Demeden <span className="text-[#dfba6b]">Bitmez!</span></h3>
            <p className="text-[10px] tracking-[0.15em] uppercase text-paper/40 font-medium">Birlikte Kazanırız • Together We Win</p>
          </div>

          {/* Quick Stats or Promo Box */}
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-sm space-y-2 text-left mx-4">
            <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-1.5">
              <span className="text-paper/40 uppercase">Anthem Status</span>
              <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                Viral Success
              </span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-paper/40 uppercase">Global Reaches</span>
              <span className="text-white font-medium">Worldwide Release</span>
            </div>
          </div>

          {/* Campaign Action Button */}
          {location.pathname !== '/anthem' && (
            <button
              onClick={() => navigate('/anthem')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#dfba6b] hover:bg-white text-black font-bold uppercase tracking-widest text-[9px] rounded-sm shadow-md hover:shadow-[#dfba6b]/10 transition-all duration-300 mx-auto cursor-pointer"
            >
              <Music size={12} /> Live Anthem Page <ExternalLink size={8} />
            </button>
          )}

          {/* Small Branding URL */}
          <p className="text-[9px] font-mono tracking-[0.2em] text-[#dfba6b]/40 uppercase pt-2">
            ASKINSTUDIOS.COM
          </p>
        </div>
      </div>

      {/* ========================================== */}
      {/* MOBILE/TABLET FLOATING BADGE (< lg screens) */}
      {/* ========================================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => navigate('/anthem')}
        className="lg:hidden fixed left-4 bottom-6 z-40 bg-[#05070e]/95 backdrop-blur-md border border-[#dfba6b]/35 shadow-lg shadow-black/80 rounded-full py-2 pl-3.5 pr-4 flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
        style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.6)' }}
      >
        {/* Animated Mini Gold Trophy */}
        <div className="w-6 h-6 shrink-0 relative flex items-center justify-center filter drop-shadow-[0_0_4px_rgba(212,175,55,0.5)]">
          {renderTrophySVG("w-full h-full text-[#dfba6b]")}
        </div>
        
        {/* Express label */}
        <div className="flex flex-col leading-tight pr-1">
          <span className="text-[#dfba6b] text-[10px] uppercase font-bold tracking-widest block font-sans">
            26 World Cup
          </span>
          <span className="text-white/60 text-[8px] uppercase tracking-wider block font-light">
            Anthem Hub
          </span>
        </div>
      </motion.div>
    </>
  );
};
 