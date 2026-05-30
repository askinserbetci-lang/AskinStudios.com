import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { videosPageSEO } from '../data/seo/pages/videos.seo';
import { Play, X, ArrowRight } from 'lucide-react';

import { CinematicBackground } from '../components/common/CinematicBackground';

const Videos = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
            onClick={() => setActiveVideo(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setActiveVideo(null)}
            >
              <X size={40} strokeWidth={1} />
            </button>
            <div className="w-full max-w-6xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl border border-white/10 relative">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="page-hero">
        <div className="absolute inset-0 pointer-events-none"
             style={{
               background: "radial-gradient(circle at 50% 80%, rgba(40,80,90,0.15), transparent 70%)"
             }}
        />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl md:text-8xl font-serif italic mb-6 leading-tight">Videos</h1>
            <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 block leading-relaxed font-medium">
              Cinematic Gallery • Live • Studio
            </span>
            <p className="text-paper/60 font-light text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto">
              A cinematic gallery of music videos, live performances, studio sessions, and documentary features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Categories */}
      <section className="px-6 pb-48">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Official Music Videos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-serif italic mb-12 text-white">Official Music Videos</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Mine Gecili Deli Gönül (2026 Version)", duration: "4:32", img: "/MINE_GECILI_DELI_GONUL.png", videoId: "FrDbL6ruWOA" },
                { title: "Crazy Heart", duration: "5:00", img: "https://img.youtube.com/vi/bCYDFfrzbbA/maxresdefault.jpg", videoId: "bCYDFfrzbbA" }
              ].map((video, i) => (
                <div 
                  key={i} 
                  className="group relative aspect-video rounded-sm overflow-hidden border border-white/10 cursor-pointer"
                  onClick={() => setActiveVideo(video.videoId)}
                >
                  <img 
                    src={video.img} 
                    alt={video.title} 
                    className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/video${i}/800/450?grayscale`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                      <Play className="text-white fill-white ml-1" size={24} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-xl font-serif italic text-white mb-1">{video.title}</h3>
                    <p className="text-gold text-xs uppercase tracking-widest">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live Performances */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-serif italic mb-12 text-white">Live Performances</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Omar Faruk Tekbilek - I Love You", duration: "5:56", img: "https://img.youtube.com/vi/nB9y-8dDtSU/maxresdefault.jpg", videoId: "nB9y-8dDtSU", external: true },
                { title: "Be Mine Tonight", duration: "3:45", img: "https://img.youtube.com/vi/1SRls-hyUaY/maxresdefault.jpg", videoId: "1SRls-hyUaY" },
                { title: "Dreamy Eyes", duration: "4:12", img: "https://img.youtube.com/vi/FJnyDZjhse8/maxresdefault.jpg", videoId: "FJnyDZjhse8" }
              ].map((video, i) => (
                <div 
                  key={i} 
                  className="group relative aspect-video rounded-sm overflow-hidden border border-white/10 cursor-pointer"
                  onClick={() => {
                    if (video.external) {
                      window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank');
                    } else {
                      setActiveVideo(video.videoId);
                    }
                  }}
                >
                  <img 
                    src={video.img} 
                    alt={video.title} 
                    className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/live${i}/800/450?grayscale`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                      <Play className="text-white fill-white ml-1" size={20} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-lg font-serif italic text-white mb-1">{video.title}</h3>
                    <p className="text-gold text-[10px] uppercase tracking-widest">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Studio Sessions & Documentary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-serif italic mb-12 text-white">Studio & Documentary</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Studio Performance", duration: "4:00", img: "https://img.youtube.com/vi/d_0tpKop3yI/maxresdefault.jpg", videoId: "d_0tpKop3yI" },
                { 
                  title: "Omar Faruk Tekbilek - School of Music", 
                  duration: "Playlist", 
                  img: "https://img.youtube.com/vi/nB9y-8dDtSU/maxresdefault.jpg", 
                  videoId: "", 
                  external: true,
                  url: "https://youtube.com/playlist?list=PLNz_ZD_4xYdET22_q-mPOL0hF9Tww8oy3&si=97rTwrrOOagqDBdP"
                }
              ].map((video, i) => (
                <div 
                  key={i} 
                  className="group relative aspect-video rounded-sm overflow-hidden border border-white/10 cursor-pointer"
                  onClick={() => {
                    if (video.external && video.url) {
                      window.open(video.url, '_blank');
                    } else if (video.external) {
                      window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank');
                    } else {
                      setActiveVideo(video.videoId);
                    }
                  }}
                >
                  <img 
                    src={video.img} 
                    alt={video.title} 
                    className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/doc${i}/800/450?grayscale`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                      <Play className="text-white fill-white ml-1" size={24} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-xl font-serif italic text-white mb-1">{video.title}</h3>
                    <p className="text-gold text-xs uppercase tracking-widest">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* YouTube Channel CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center text-center pt-16 border-t border-white/5 mt-24"
          >
            <h3 className="text-2xl font-serif italic text-white mb-6">Want to see more?</h3>
            <p className="text-paper/60 font-light mb-8 max-w-xl">
              Visit the official YouTube channel for the complete collection of live performances, music videos, and behind-the-scenes footage.
            </p>
            <a 
              href="https://www.youtube.com/@askinserbetci" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-gold/30 rounded-sm hover:bg-gold/10 transition-colors group"
            >
              <span className="text-gold text-xs md:text-sm uppercase tracking-[0.2em]">
                Visit YouTube Channel
              </span>
              <ArrowRight className="text-gold group-hover:translate-x-1 transition-transform" size={16} />
            </a>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default Videos;
