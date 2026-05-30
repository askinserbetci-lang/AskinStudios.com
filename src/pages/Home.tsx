import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ALBUMS } from '../constants';
import { homePageSEO } from '../data/seo/pages/home.seo';
import { useLightbox } from '../context/LightboxContext';

import { CinematicBackground } from '../components/common/CinematicBackground';

const Home = () => {
  const featuredAlbum = ALBUMS[0];
  const { showImage } = useLightbox();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="bg-transparent min-h-screen text-paper relative">
      <Helmet>
        <title>{homePageSEO.title}</title>
        <meta name="description" content={homePageSEO.description} />
        <meta property="og:title" content={homePageSEO.ogTitle} />
        <meta property="og:description" content={homePageSEO.ogDescription} />
        <meta property="og:image" content={homePageSEO.ogImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="Türkiye Grammy 2013" />

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

      {/* 1. Hero Section (Cinematic Centered) */}
      <section className="home-hero relative min-h-screen flex flex-col justify-center items-center px-6 pt-48 pb-32 overflow-hidden">

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
            
            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl md:text-9xl lg:text-[10rem] font-serif mb-12 tracking-tighter leading-none"
            >
              <span className="text-gold italic">Aşkın</span> <br className="md:hidden" /> <span className="text-white">Şerbetçi</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mb-16"
            >
                <span className="text-gold/80 uppercase tracking-[0.5em] text-[10px] md:text-xs font-medium block">
                    Music for the Soul
                </span>
                <span className="text-paper/80 uppercase tracking-[0.2em] text-[9px] md:text-[10px] font-light block mt-4">
                    Composer • Producer • Multi‑Instrumentalist • World‑Fusion Artist
                </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-6"
            >
                <Link 
                  to="/music" 
                  className="px-10 py-4 border border-gold/30 text-gold hover:bg-gold hover:text-ink transition-all duration-500 text-[10px] uppercase tracking-[0.25em] rounded-sm"
                >
                  Listen
                </Link>
                <Link 
                  to="/videos" 
                  className="px-10 py-4 border border-white/10 text-white hover:bg-white hover:text-ink transition-all duration-500 text-[10px] uppercase tracking-[0.25em] rounded-sm"
                >
                  Watch
                </Link>
                <Link 
                  to="/booking" 
                  className="px-10 py-4 border border-white/10 text-paper/60 hover:text-white transition-all duration-500 text-[10px] uppercase tracking-[0.25em] rounded-sm"
                >
                  Book Aşkın
                </Link>
            </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] border-b border-white/5 mt-32" />

      {/* 2. Featured World Cup Anthem Spotlight */}
      <section className="py-40 px-6 relative overflow-hidden bg-radial-at-t from-blue-950/20 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold block mb-3">
                New Special Production • Özel Çalışma
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic text-white leading-tight">
                Biz Demeden Bitmez
              </h2>
            </div>
            <Link to="/anthem" className="text-gold text-[10px] uppercase tracking-widest hover:text-white transition-colors mt-6 md:mt-0 flex items-center gap-1">
              Explore Dedicated Album Page <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Frame Left */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-video rounded-sm overflow-hidden border border-gold/30 hover:border-gold transition-colors duration-1000 cursor-pointer shadow-2xl"
                onClick={() => setActiveVideo("BiAViHwWBk4")}
              >
                <img 
                  src="/Turkiye_Grammy_2013.jpg" 
                  alt="Biz Demeden Bitmez - Türkiye 2026 Dünya Kupası Marşı" 
                  className="w-full h-full object-cover opacity-80 md:grayscale md:group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                />
                
                {/* Gold Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-black/30 to-transparent opacity-90" />

                {/* Big Glow Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-[#e6c15a]/40 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:border-[#e6c15a] transition-all duration-500 shadow-2xl">
                    <Play size={30} className="text-[#e6c15a] fill-[#e6c15a] ml-1.5" />
                  </div>
                </div>

                {/* Text Indicator */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#e6c15a] font-medium block mb-1">Official Anthem Teaser</span>
                  <p className="text-white text-lg font-serif italic">Watch Cinematic Production</p>
                </div>
              </motion.div>
            </div>

            {/* Context/Story Right */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-sm bg-gold/10 border border-gold/20 text-gold text-[9px] uppercase tracking-[0.15em] font-medium">
                  Official 2026 Anthem Project
                </span>
                <h3 className="text-2xl md:text-3xl font-serif italic text-white">
                  Türkiye 2026 Dünya Kupası Marşı
                </h3>
                <p className="text-paper/70 font-light text-base md:text-lg leading-relaxed text-justify">
                  Sarsılmaz inancı, milli heyecanı ve zafere olan sönmez tutkuyu simgeleyen yeni Dünya Kupası Marşımız. Aşkın Studios'un büyük orkestrasyonu, davulları ve geleneksel motiflerle bezeli görkemli yapımıyla sahaya iniyor.
                </p>
              </div>

              {/* Specs */}
              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-paper/40 font-light">Prodüksiyon / Yapım</span>
                  <span className="text-white font-medium">Aşkın Studios</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-paper/40 font-light">Makam / Melodi</span>
                  <span className="text-white font-medium">Epic Cinematic World-Fusion</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-paper/40 font-light">Viral Büyüme Sonucu</span>
                  <span className="text-gold font-medium">60,000+ İzlenme</span>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center gap-4 pt-4">
                <Link 
                  to="/anthem" 
                  className="px-8 py-3.5 bg-gold text-ink text-[10px] uppercase tracking-[0.2em] font-semibold rounded-sm hover:bg-white hover:text-ink transition-colors duration-500 shadow-md"
                >
                  Explore Lyrics & MP3
                </Link>
                <button 
                  onClick={() => setActiveVideo("BiAViHwWBk4")}
                  className="px-8 py-3.5 border border-white/10 text-white text-[10px] uppercase tracking-[0.2em] font-semibold rounded-sm hover:bg-white/5 transition-colors duration-500"
                >
                  Play Video
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] border-b border-white/5" />

      {/* 3. Artist Statement */}
      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-serif italic mb-8 text-white">Artist Statement</h2>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-12">
              Aşkın’s music bridges East and West, weaving Turkish classical heritage with cinematic world‑music and contemporary production. His sound is defined by emotional storytelling, cultural depth, and a lifelong devotion to melody, rhythm, and spiritual expression.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Featured Music */}
      <section className="py-40 px-6 relative overflow-hidden bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-3xl md:text-4xl font-serif italic text-white">Featured Music</h2>
            <Link to="/music" className="text-gold text-[10px] uppercase tracking-widest hover:text-white transition-colors mt-6 md:mt-0">
              Explore Music <ArrowRight size={12} className="inline ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-sm overflow-hidden border border-white/10 group max-w-md mx-auto w-full cursor-zoom-in">
              <img 
                src={featuredAlbum.image} 
                alt={featuredAlbum.title} 
                className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-1000" 
                onClick={() => showImage(featuredAlbum.image, featuredAlbum.title)}
              />
              <div className="absolute inset-0 bg-midnight/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Link to={`/music/${featuredAlbum.id}`} className="w-16 h-16 rounded-full bg-gold text-ink flex items-center justify-center hover:scale-110 transition-transform">
                  <Play size={24} fill="currentColor" />
                </Link>
              </div>
            </div>
            
            <div className="space-y-8">
              <span className="text-gold uppercase tracking-[0.3em] text-xs">Latest Release</span>
              <h3 className="text-4xl md:text-5xl font-serif italic text-white">{featuredAlbum.title}</h3>
              <p className="text-paper/60 font-light text-lg leading-relaxed">
                {featuredAlbum.story.substring(0, 150)}...
              </p>
              
              <div className="space-y-4 pt-4">
                {[
                  "Signature world‑fusion tracks",
                  "Film and documentary cues",
                  "Collaborative works"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <Play size={12} className="text-gold fill-gold" />
                    <span className="text-paper/80 font-light text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/music" className="inline-block mt-8 px-8 py-3 border border-white/10 hover:bg-white hover:text-ink transition-all duration-300 text-[10px] uppercase tracking-widest rounded-sm">
                Explore Music
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Videos */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-3xl md:text-4xl font-serif italic text-white">Featured Videos</h2>
            <Link to="/videos" className="text-gold text-[10px] uppercase tracking-widest hover:text-white transition-colors mt-6 md:mt-0">
              View All Videos <ArrowRight size={12} className="inline ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              { title: "Mine Gecili Deli Gönül (2026 Version)", img: "/MINE_GECILI_DELI_GONUL.png", type: "video", videoId: "FrDbL6ruWOA" },
              { title: "Fantacy", img: "/2012 The Meeting of the Legends Cover.jpg", type: "video", videoId: "1SRls-hyUaY" }
            ].map((video, i) => (
              video.type === "video" ? (
                <div 
                  key={i} 
                  className="group relative aspect-video rounded-sm overflow-hidden border border-white/10 block cursor-pointer"
                  onClick={() => setActiveVideo(video.videoId!)}
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
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </div>
      </section>

      {/* 5. About Preview */}
      <section className="py-32 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-serif italic mb-8 text-white">About Aşkın</h2>
            <p className="text-paper/70 font-light leading-[1.75] text-lg mb-14">
              Aşkın Şerbetçi is a visionary composer and multi‑instrumentalist whose work blends Turkish classical tradition with cinematic world‑fusion. His journey spans cultural immersion in Türkiye, mentorship under world‑renowned master Omar Faruk Tekbilek, and decades of performance, composition, and global collaboration.
            </p>
            <Link 
              to="/about"
              className="inline-block px-8 py-3 border border-white/10 hover:bg-white hover:text-ink hover:border-white transition-all duration-300 text-[10px] uppercase tracking-widest rounded-sm"
            >
              Read Full Bio
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 6. Legacy Preview */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-serif italic mb-8 text-white">Legacy</h2>
            <p className="text-paper/70 font-light leading-[1.75] text-lg mb-14">
              Aşkın’s legacy spans two worlds: a lifelong musical journey rooted in Turkish heritage and global fusion, and a 25‑year chapter shaping Rochester’s automotive landscape through leadership, innovation, and entrepreneurship.
            </p>
            <Link 
              to="/legacy"
              className="inline-block px-8 py-3 border border-white/10 hover:bg-white hover:text-ink hover:border-white transition-all duration-300 text-[10px] uppercase tracking-widest rounded-sm"
            >
              Explore Legacy
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 7. Services Preview */}
      <section className="py-32 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif italic mb-6 text-white">Services</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Music Production", desc: "Original composition and cinematic scoring." },
              { title: "Live Performance", desc: "Solo, ensemble, and full band events." },
              { title: "Aşkın Studios", desc: "Full-service recording and production." }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-white/10 rounded-sm transition-colors hover:border-gold/30"
              >
                <h3 className="text-xl font-serif italic text-gold mb-4">{service.title}</h3>
                <p className="text-paper/60 font-light text-sm leading-relaxed mb-6">{service.desc}</p>
                <Link to="/services" className="text-[10px] uppercase tracking-widest text-paper/40 hover:text-gold transition-colors">
                  View Services
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Booking CTA */}
      <section className="py-40 px-6 bg-gold/90 backdrop-blur-sm text-midnight text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif italic mb-8">Booking & Collaboration</h2>
            <p className="text-midnight/70 font-medium text-lg mb-12 max-w-xl mx-auto">
              For performances, collaborations, film scoring, workshops, or studio production.
            </p>
            <Link 
              to="/booking"
              className="inline-block px-12 py-4 bg-midnight text-gold font-medium uppercase tracking-widest text-[10px] hover:bg-white hover:text-midnight transition-all duration-500 rounded-sm"
            >
              Book Aşkın
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
