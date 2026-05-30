import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { servicesPageSEO } from '../data/seo/pages/services.seo';

import { CinematicBackground } from '../components/common/CinematicBackground';

const Services = () => {
  return (
    <div className="bg-transparent min-h-screen text-paper relative">
      <Helmet>
        <title>{servicesPageSEO.title}</title>
        <meta name="description" content={servicesPageSEO.description} />
        <meta property="og:title" content={servicesPageSEO.ogTitle} />
        <meta property="og:description" content={servicesPageSEO.ogDescription} />
        <meta property="og:image" content={servicesPageSEO.ogImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="Services Background" />

      {/* Hero Section */}
      <section className="page-hero services-hero">
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
            <h1 className="text-5xl md:text-8xl font-serif italic mb-6 leading-tight">Services</h1>
            <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 block leading-relaxed font-medium">
              Cinematic Precision • Emotional Depth • Excellence
            </span>
            <p className="text-paper/60 font-light text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto">
              Aşkın Şerbetçi offers a suite of professional music and production services rooted in decades of performance, composition, cultural mastery, and world‑fusion artistry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider (Cinematic Cut) */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-16 md:my-32" />

      {/* Service Blocks - Placeholder for restored content */}
      <section className="px-6 pb-48">
        <div className="max-w-5xl mx-auto text-center">
            <p className="text-paper/60">Content is currently being restored.</p>
        </div>
      </section>
    </div>
  );
};

export default Services;
