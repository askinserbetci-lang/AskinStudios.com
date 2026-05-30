import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { pressPageSEO } from '../data/seo/pages/press.seo';

import { CinematicBackground } from '../components/common/CinematicBackground';

const PressKit = () => {
  return (
    <div className="bg-transparent min-h-screen text-paper relative">
      <Helmet>
        <title>{pressPageSEO.title}</title>
        <meta name="description" content={pressPageSEO.description} />
        <meta property="og:title" content={pressPageSEO.ogTitle} />
        <meta property="og:description" content={pressPageSEO.ogDescription} />
        <meta property="og:image" content={pressPageSEO.ogImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="Press Background" />

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
            <h1 className="text-5xl md:text-8xl font-serif italic mb-6 leading-tight">Press & Media</h1>
            <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 block leading-relaxed font-medium">
              Archive • Assets • Recognition
            </span>
            <p className="text-paper/60 font-light text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto">
              A curated archive of media coverage, interviews, features, and public recognition documenting Aşkın’s artistic journey, cultural impact, and professional achievements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-16 md:my-32" />

      {/* Featured Press Highlights */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-serif italic mb-12 text-center text-white">Featured Press Highlights</h2>
            <div className="space-y-8">
              {[
                "Interviews on Turkish classical heritage and world‑fusion innovation",
                "Coverage of performances at cultural festivals and international events",
                "Features on collaborations with master musicians",
                "Articles highlighting Aşkın’s role in bridging East and West through music"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 border-b border-white/5 pb-8">
                  <span className="text-gold mt-1.5 text-xs">0{i + 1}</span>
                  <p className="text-paper/70 font-light text-lg md:text-xl leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Assets */}
      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <h2 className="text-3xl md:text-4xl font-serif italic text-white">Media Assets</h2>
              <Link 
                to="/download-epk"
                className="mt-8 md:mt-0 px-8 py-3 border border-white/10 text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-ink transition-all duration-500 rounded-sm font-medium inline-block"
              >
                Download All Assets
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: "Artist Photos", desc: "High‑resolution portraits" },
                { title: "Performance", desc: "Live event photography" },
                { title: "Studio", desc: "Production environment" },
                { title: "Branding", desc: "Official logos & bio" }
              ].map((asset, i) => (
                <div key={i} className="aspect-square bg-white/5 border border-white/10 p-8 flex flex-col justify-between group hover:bg-white/10 transition-colors duration-500 cursor-pointer">
                  <div className="w-8 h-8 border border-gold/30 rounded-full flex items-center justify-center text-gold text-xs opacity-50 group-hover:opacity-100 transition-opacity">
                    ↓
                  </div>
                  <div>
                    <h3 className="text-lg font-serif italic text-white mb-2">{asset.title}</h3>
                    <p className="text-paper/40 text-xs uppercase tracking-widest">{asset.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="px-6 pb-48 text-center">
        <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 p-12 md:p-16 rounded-sm">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-serif italic mb-6 text-white">Press Contact</h2>
            <p className="text-paper/60 font-light text-lg mb-8">
              For interviews, features, or media inquiries:
            </p>
            <a href="mailto:info@askinstudios.com" className="text-2xl md:text-3xl font-serif italic text-gold hover:text-white transition-colors duration-300">
              info@askinstudios.com
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default PressKit;
