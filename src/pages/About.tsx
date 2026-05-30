import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import Signature from '../components/Signature';
import { aboutPageSEO } from '../data/seo/pages/about.seo';
import { useLightbox } from '../context/LightboxContext';

import { CinematicBackground } from '../components/common/CinematicBackground';
import { COLLABORATORS } from '../constants';

const About = () => {
  const { showImage } = useLightbox();

  return (
    <div className="bg-transparent min-h-screen text-paper relative">
      <Helmet>
        <title>{aboutPageSEO.title}</title>
        <meta name="description" content={aboutPageSEO.description} />
        <meta property="og:title" content={aboutPageSEO.ogTitle} />
        <meta property="og:description" content={aboutPageSEO.ogDescription} />
        <meta property="og:image" content={aboutPageSEO.ogImage} />
        <meta property="og:type" content="profile" />
      </Helmet>

      <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="Aşkın Şerbetçi" />

      {/* Hero Section (Portrait + Text) */}
      <section className="page-hero">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center text-left">
            {/* Text Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 md:order-1"
            >
              <h1 className="text-5xl md:text-8xl font-serif italic mb-6 leading-tight">Aşkın Şerbetçi</h1>
              <div className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 leading-relaxed font-medium">
                <span className="block mb-2">VISIONARY COMPOSER, PRODUCER, MULTI‑INSTRUMENTALIST</span>
                <span className="block">ARCHITECT OF EAST–WEST CINEMATIC WORLD MUSIC</span>
              </div>
              <div className="text-paper/60 font-light text-lg md:text-xl leading-relaxed mb-10 max-w-[600px] space-y-6">
                <p>
                  Aşkın Şerbetçi is a composer, producer, and multi‑instrumentalist whose work bridges Turkish classical tradition with cinematic world‑music and contemporary production. His sound is defined by emotional storytelling, deep cultural lineage, and a lifelong devotion to music that began in childhood and evolved through decades of global collaboration.
                </p>
                <p>
                  Born into a family rooted in Turkish culture, Aşkın carries the expressive vocabulary of makam, folk tradition, and spiritual music into every composition. His artistry blends clarinet, kanun, ney, oud, piano, and world percussion with modern harmony and cinematic textures, creating a signature sound that is both ancient and modern.
                </p>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-8 mb-4"
              >
                <Signature size="lg" />
              </motion.div>
            </motion.div>
            
            {/* Portrait Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="order-1 md:order-2 relative aspect-[4/5] rounded-sm overflow-hidden border border-white/10 shadow-2xl shadow-midnight/50 cursor-zoom-in group"
              onClick={() => showImage("/Askin CD cover1.jpg", "Aşkın Şerbetçi")}
            >
              <img 
                src="/Askin CD cover1.jpg" 
                alt="Aşkın Şerbetçi" 
                className="w-full h-full object-cover object-top md:grayscale md:hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white/50 text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">View Larger</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider (Cinematic Cut) */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-12 md:my-16" />

      {/* Visual Interlude: Instrument Detail Strip */}
      <section className="py-8 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="absolute inset-0 pointer-events-none"
               style={{
                 background: "radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.08), transparent 70%)"
               }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {[
              { src: "/Askin_Performing.jpg", alt: "Live Performance", caption: "Performance" },
              { src: "/Askin_Jamming.jpg", alt: "Musical Dialogue", caption: "Dialogue" },
              { src: "/Kanun_Askin.png", alt: "Kanun Detail", caption: "Kanun" }
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-white/5 cursor-zoom-in"
                onClick={() => showImage(img.src, img.alt)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="text-gold uppercase tracking-widest text-[10px]">{img.caption}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="pb-24 pt-12 px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* SECTION 2 — ORIGIN & MUSICAL LINEAGE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-serif italic mt-12 mb-8">Origin & Musical Lineage</h2>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              Aşkın’s musical identity is grounded in the sounds of Türkiye—saz, oud, kanun, darbuka, and the emotional depth of Turkish classical and folk traditions. These influences shaped his earliest understanding of melody, rhythm, and spiritual expression long before formal training began.
            </p>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              His artistic foundation deepened during his formative years in Türkiye (1985–1988), where he lived, studied, and absorbed the nuances of traditional performance surrounded by master musicians. This period became the bridge between his cultural heritage and his emerging musical voice.
            </p>
          </motion.div>

          {/* SECTION 3 — EARLY TRAINING & AWAKENING */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-serif italic mt-16 mb-8">Early Training & Awakening</h2>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              Aşkın began his formal musical training in the United States, playing clarinet as a 3rd‑grade student. Even at that young age, he demonstrated a natural sensitivity to melody and emotional phrasing, carrying the spirit of his Turkish roots into every note.
            </p>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              This early training, combined with his cultural immersion in Türkiye, formed the dual identity that would later define his East–West fusion style.
            </p>
          </motion.div>

          {/* SECTION 4 — MENTORSHIP & PROFESSIONAL ERA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-serif italic mt-16 mb-8">Mentorship & Professional Era</h2>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              After returning to the United States, Aşkın began working closely with world‑renowned master <strong>Omar Faruk Tekbilek</strong>, who became his mentor and artistic guide. Their collaboration led to performances across the country—weddings, galas, cultural festivals, and presidential ceremonies—shaping Aşkın’s professional identity and expanding his musical world.
            </p>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              This mentorship became the foundation of his lifelong commitment to bridging cultures through music.
            </p>
          </motion.div>

          {/* SECTION 5 — EAST–WEST FUSION & ARTISTIC VISION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-serif italic mt-16 mb-8">East–West Fusion & Artistic Vision</h2>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              Aşkın’s music blends Middle Eastern modes with Western harmony, cinematic orchestration, and contemporary production. His compositions are defined by emotional depth, cultural authenticity, and a modern cinematic sensibility.
            </p>
            <div className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              <p className="mb-4">His work spans:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Original compositions</li>
                <li>Film and documentary scoring</li>
                <li>World‑fusion arrangements</li>
                <li>Live performance and touring</li>
                <li>Studio production and collaboration</li>
                <li>Multi‑instrumental performance across clarinet, kanun, ney, oud, piano, and percussion</li>
              </ul>
            </div>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              This fusion reflects a lifetime of cultural immersion, technical mastery, and artistic exploration.
            </p>
          </motion.div>

          {/* Mid-Page Visual Anchor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 mb-16 max-w-[500px] mx-auto overflow-hidden rounded-sm border border-white/5 shadow-2xl shadow-midnight/50 cursor-zoom-in group relative"
            onClick={() => showImage("/Askin Serbetci 02.jpg", "Aşkın Şerbetçi Detail")}
          >
            <img 
              src="/Askin Serbetci 02.jpg" 
              alt="Aşkın Şerbetçi Detail" 
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="text-white/50 text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">View Larger</span>
            </div>
          </motion.div>

          {/* SECTION 6 — ENTREPRENEURSHIP & WORLD‑BUILDING */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-serif italic mt-16 mb-8">Entrepreneurship & World‑Building</h2>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              Beyond music, Aşkın spent 25 years shaping Rochester’s automotive landscape. Together with his brother, he launched <strong>Carlisle Auto Sales</strong> in 1994, expanding into Carlisle Mitsubishi and earning national recognition and multiple Rochester Top 100 awards.
            </p>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              After selling the dealerships in 2005, he served as <strong>General Manager at Bob Johnson Chevrolet (2005–2010)</strong>, the #1‑selling Chevrolet dealership in the United States. In 2010, he reunited with his brother to co‑found <strong>eCarsUSA</strong>, which grew rapidly and was sold in 2019.
            </p>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              This chapter reflects Aşkın’s mastery of leadership, operations, and large‑scale organizational growth—skills that now support his artistic and production endeavors.
            </p>
          </motion.div>

          {/* SECTION 7 — TODAY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-serif italic mt-16 mb-8">Today</h2>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              Today, Aşkın leads <strong>Aşkın Studios</strong>, creating cinematic world‑fusion music, producing artists, composing for film, and performing internationally. His work honors his heritage while expanding it into new sonic landscapes, offering listeners a bridge between cultures and a journey into emotional storytelling.
            </p>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl mb-6 max-w-[650px]">
              His global tagline—<strong>Music for the Soul</strong>—captures the essence of his artistic mission: to create music that heals, inspires, and connects people across borders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8 — COLLABORATORS */}
      <section className="py-24 px-6 bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-serif italic mb-6 text-white">Collaborators & Mentors</h2>
            <p className="text-paper/70 font-light text-lg max-w-2xl mx-auto">
              The artists, visionaries, and masters who have shaped the sound and soul of Aşkın’s musical journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COLLABORATORS.map((collab, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="collab-item group relative overflow-hidden rounded-sm border border-white/10 bg-midnight/40 cursor-zoom-in"
                onClick={() => showImage(collab.image, collab.name)}
              >
                <div className="aspect-[4/3] overflow-hidden relative border-b border-white/10">
                  <img 
                    src={collab.image} 
                    alt={collab.name} 
                    className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/collab${i}/800/600?grayscale`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white/50 text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">View Larger</span>
                  </div>
                </div>
                <div className="p-8 collab-hover transition-colors duration-500 h-full">
                  <p className="text-gold text-[10px] uppercase tracking-widest mb-2">
                    {collab.role}
                    {collab.isLegacy && <span className="ml-2 text-white/40">(Legacy)</span>}
                  </p>
                  <h3 className="text-2xl font-serif italic text-white mb-4">{collab.name}</h3>
                  <p className="text-paper/70 font-light text-sm leading-relaxed">
                    {collab.description || collab.story}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Closing Line */}
      <section className="pb-48 pt-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-paper/50 font-serif italic text-2xl md:text-4xl leading-relaxed">
            "We take heart in Aşkın’s music because it reminds us that emotion leads."
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
