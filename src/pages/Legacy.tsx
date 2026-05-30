import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { legacyEras } from "../data/legacy/eras";
import { legacyTimeline } from "../data/legacy/timeline";
import { awards } from "../data/media/awards";
import { mediaGallery } from "../data/media/galleryItems";
import { legacyPageSEO } from "../data/seo/pages/legacy.seo";

import { LegacyEraSection } from "../components/legacy/LegacyEraSection";
import { TimelineSection } from "../components/legacy/TimelineSection";
import { AwardsSection } from "../components/legacy/AwardsSection";
import { MediaGallerySection } from "../components/legacy/MediaGallerySection";

import { CinematicBackground } from '../components/common/CinematicBackground';

export default function LegacyPage() {
  return (
    <>
      <Helmet>
        <title>{legacyPageSEO.title}</title>
        <meta name="description" content={legacyPageSEO.description} />
        <meta property="og:title" content={legacyPageSEO.ogTitle} />
        <meta property="og:description" content={legacyPageSEO.ogDescription} />
        <meta property="og:image" content={legacyPageSEO.ogImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="bg-[#05070d] text-neutral-100 min-h-screen relative">
        <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="Legacy Background" />

        {/* HERO SECTION */}
        <section className="relative w-full min-h-[80vh] flex items-end justify-center overflow-hidden pb-32">
          <div className="absolute inset-0">
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
              src="/poster.jpg" 
              alt="Aşkın Şerbetçi Legacy Poster" 
              className="w-full h-full object-cover grayscale mix-blend-luminosity"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/legacy-poster/1920/1080?grayscale";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/20 via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-light tracking-wide text-white mb-6">
                Aşkın Şerbetçi — Legacy
              </h1>
              <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                A unified journey of music, culture, entrepreneurship, and world‑building.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 py-24 relative z-10">
          {/* ERAS */}
          <section className="legacy-eras space-y-20">
            {legacyEras.map(era => (
              <LegacyEraSection key={era.id} era={era} />
            ))}
          </section>

          {/* TIMELINE */}
          <section className="legacy-timeline mt-32">
            <h2 className="text-3xl font-light tracking-wide text-white mb-10">
              Timeline
            </h2>
            <TimelineSection events={legacyTimeline} />
          </section>

          {/* AWARDS */}
          <section className="legacy-awards mt-32">
            <h2 className="text-3xl font-light tracking-wide text-white mb-10">
              Awards & Recognitions
            </h2>
            <AwardsSection awards={awards} />
          </section>

          {/* MEDIA GALLERY */}
          <section className="legacy-media-gallery mt-32">
            <h2 className="text-3xl font-light tracking-wide text-white mb-10">
              Visual Media Gallery
            </h2>
            <MediaGallerySection items={mediaGallery} />
          </section>
        </div>

        {/* Closing Cinematic Photo */}
        <section className="relative h-[80vh] w-full overflow-hidden mt-16">
          <div className="absolute inset-0">
            <motion.img 
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 5, ease: "linear" }}
              src="/poster.jpg" 
              alt="Legacy in Motion" 
              className="w-full h-full object-cover opacity-40 grayscale"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/legacy-closing/1920/1080?grayscale";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-[#05070d]/40" />
          </div>
          <div className="absolute bottom-32 left-0 w-full text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-5xl md:text-7xl font-light tracking-wide text-white mb-4">The Journey Continues</h2>
              <span className="text-[#e6c15a] uppercase tracking-[0.5em] text-[10px] md:text-xs font-medium">
                Aşkın Şerbetçi
              </span>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
