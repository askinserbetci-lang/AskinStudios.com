import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Download, ExternalLink, ArrowRight, Play, Eye, Image, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

import { CinematicBackground } from '../components/common/CinematicBackground';

const DownloadEPK = () => {
  return (
    <div className="bg-transparent min-h-screen text-paper relative">
      <Helmet>
        <title>Download EPK | Aşkın Şerbetçi</title>
        <meta name="description" content="Download the official Electronic Press Kit (EPK) for Aşkın Şerbetçi. Includes bio, photos, music, and technical riders." />
      </Helmet>

      <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="Download EPK Background" />

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
            <h1 className="text-5xl md:text-8xl font-serif italic mb-6 leading-tight">Electronic Press Kit</h1>
            <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 block leading-relaxed font-medium">
              A complete media package for presenters, festivals, venues, and collaborators.
            </span>
            
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <button 
                onClick={() => window.open('/epk', '_blank')}
                className="px-8 py-4 bg-gold text-ink font-medium uppercase tracking-widest text-[10px] hover:bg-white transition-all duration-500 rounded-sm flex items-center gap-2"
              >
                <Download size={16} /> Download Full EPK (PDF)
              </button>
              <Link 
                to="/epk" 
                className="px-8 py-4 border border-white/10 text-white font-medium uppercase tracking-widest text-[10px] hover:bg-white hover:text-ink transition-all duration-500 rounded-sm flex items-center gap-2"
              >
                <ExternalLink size={16} /> View Online EPK
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Artist Overview */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl md:text-4xl font-serif italic mb-8 text-white">Artist Overview</h2>
            <p className="text-paper/70 font-light leading-relaxed text-lg md:text-xl">
              Aşkın Şerbetçi is a world‑fusion composer, producer, and multi‑instrumentalist blending Turkish classical tradition with cinematic orchestration and contemporary production. His music bridges East and West through emotional storytelling, cultural depth, and a lifelong devotion to melody and rhythm.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 border border-white/10 p-12 rounded-sm">
            <h3 className="text-gold uppercase tracking-widest text-xs mb-8 border-b border-white/10 pb-2">What’s Included in the EPK</h3>
            <div className="grid md:grid-cols-2 gap-y-4 gap-x-12">
              {[
                "Short & full biography",
                "High‑resolution artist photos",
                "Music links (Spotify, Apple Music, YouTube, SoundCloud)",
                "Video links (official videos, live performances, studio sessions)",
                "Press quotes",
                "Stage plot & tech rider",
                "Contact information",
                "Branding assets (text‑based logo only)"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-paper/80 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Official Program Bios */}
      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif italic mb-12 text-white text-center">Official Program Bios</h2>
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* 150-Word Bio */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h3 className="text-gold uppercase tracking-widest text-xs">Festival Description (150 Words)</h3>
                <button 
                  onClick={() => navigator.clipboard.writeText("Aşkın Şerbetçi is a world‑fusion composer, producer, and multi‑instrumentalist whose music bridges Turkish classical tradition with cinematic orchestration and contemporary global sound. His artistic identity was shaped through early clarinet training in the United States, deep cultural immersion in Türkiye, and mentorship under world‑renowned master Omar Faruk Tekbilek. Drawing from makam, folk tradition, and spiritual expression, Aşkın blends clarinet, kanun, ney, oud, piano, and world percussion with modern harmony and atmospheric textures.\n\nHis performances create an emotional journey that moves between ancient memory and modern imagination, offering audiences a rare fusion of cultural authenticity and cinematic storytelling. Aşkın has performed across the United States at cultural festivals, galas, and ceremonial events, and his work extends into film and documentary scoring through Aşkın Studios. His global artistic mission is captured in his signature phrase: Music for the Soul.")}
                  className="text-[10px] uppercase tracking-widest text-paper/40 hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
              <p className="text-paper/80 font-light text-sm leading-relaxed text-justify">
                Aşkın Şerbetçi is a world‑fusion composer, producer, and multi‑instrumentalist whose music bridges Turkish classical tradition with cinematic orchestration and contemporary global sound. His artistic identity was shaped through early clarinet training in the United States, deep cultural immersion in Türkiye, and mentorship under world‑renowned master Omar Faruk Tekbilek. Drawing from makam, folk tradition, and spiritual expression, Aşkın blends clarinet, kanun, ney, oud, piano, and world percussion with modern harmony and atmospheric textures.
                <br/><br/>
                His performances create an emotional journey that moves between ancient memory and modern imagination, offering audiences a rare fusion of cultural authenticity and cinematic storytelling. Aşkın has performed across the United States at cultural festivals, galas, and ceremonial events, and his work extends into film and documentary scoring through Aşkın Studios. His global artistic mission is captured in his signature phrase: <em>Music for the Soul</em>.
              </p>
            </div>

            {/* 50-Word Bio */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-sm h-fit">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h3 className="text-gold uppercase tracking-widest text-xs">Micro-Bio (50 Words)</h3>
                <button 
                  onClick={() => navigator.clipboard.writeText("Aşkın Şerbetçi is a world‑fusion composer and multi‑instrumentalist blending Turkish classical tradition with cinematic orchestration. Shaped by cultural immersion in Türkiye and mentorship under Omar Faruk Tekbilek, he performs internationally and composes for film, documentary, and global audiences through Aşkın Studios.")}
                  className="text-[10px] uppercase tracking-widest text-paper/40 hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
              <p className="text-paper/80 font-light text-sm leading-relaxed text-justify">
                Aşkın Şerbetçi is a world‑fusion composer and multi‑instrumentalist blending Turkish classical tradition with cinematic orchestration. Shaped by cultural immersion in Türkiye and mentorship under Omar Faruk Tekbilek, he performs internationally and composes for film, documentary, and global audiences through Aşkın Studios.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Grant & Funding Assets */}
      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif italic mb-12 text-white text-center">Grant & Funding Assets</h2>
          <div className="space-y-12">
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* 100-Word Grant Bio */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                  <h3 className="text-gold uppercase tracking-widest text-xs">Grant Bio (100 Words)</h3>
                  <button 
                    onClick={() => navigator.clipboard.writeText("Aşkın Şerbetçi is a world‑fusion composer, producer, and multi‑instrumentalist whose work blends Turkish classical tradition with cinematic orchestration and contemporary global sound. His musical identity was shaped through early clarinet training in the United States, cultural immersion in Türkiye, and mentorship under master musician Omar Faruk Tekbilek. Drawing from makam, folk tradition, and spiritual expression, Aşkın performs internationally and composes for film, documentary, and live performance. Through Aşkın Studios, he creates culturally rooted, emotionally resonant works that bridge East and West and expand the global language of world‑fusion music.")}
                    className="text-[10px] uppercase tracking-widest text-paper/40 hover:text-white transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-paper/80 font-light text-sm leading-relaxed text-justify">
                  Aşkın Şerbetçi is a world‑fusion composer, producer, and multi‑instrumentalist whose work blends Turkish classical tradition with cinematic orchestration and contemporary global sound. His musical identity was shaped through early clarinet training in the United States, cultural immersion in Türkiye, and mentorship under master musician Omar Faruk Tekbilek. Drawing from makam, folk tradition, and spiritual expression, Aşkın performs internationally and composes for film, documentary, and live performance. Through Aşkın Studios, he creates culturally rooted, emotionally resonant works that bridge East and West and expand the global language of world‑fusion music.
                </p>
              </div>

              {/* 250-Word Grant Bio */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                  <h3 className="text-gold uppercase tracking-widest text-xs">Grant Bio (250 Words)</h3>
                  <button 
                    onClick={() => navigator.clipboard.writeText("Aşkın Şerbetçi is a world‑fusion composer, producer, and multi‑instrumentalist whose work unites Turkish classical heritage with cinematic orchestration and contemporary global sound. His artistic journey began with clarinet studies in the United States, followed by formative years in Türkiye where he absorbed the emotional depth of makam, folk tradition, and spiritual music. This cultural foundation was strengthened through mentorship under world‑renowned master Omar Faruk Tekbilek, with whom Aşkın performed across the United States at cultural festivals, galas, and ceremonial events.\n\nAşkın’s compositions blend clarinet, kanun, ney, oud, piano, and world percussion with modern harmony and atmospheric textures, creating a sound that is both ancient and modern. His work spans original compositions, world‑fusion arrangements, film and documentary scoring, and live performance. Through Aşkın Studios, he collaborates with artists, produces culturally grounded projects, and develops music that bridges traditions while embracing contemporary storytelling.\n\nHis artistic mission centers on cultural preservation, emotional resonance, and the expansion of East–West musical dialogue. Aşkın’s performances and compositions invite audiences into a cinematic world shaped by memory, heritage, and imagination. His global artistic vision is captured in his signature phrase: Music for the Soul.")}
                    className="text-[10px] uppercase tracking-widest text-paper/40 hover:text-white transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-paper/80 font-light text-sm leading-relaxed text-justify">
                  Aşkın Şerbetçi is a world‑fusion composer, producer, and multi‑instrumentalist whose work unites Turkish classical heritage with cinematic orchestration and contemporary global sound. His artistic journey began with clarinet studies in the United States, followed by formative years in Türkiye where he absorbed the emotional depth of makam, folk tradition, and spiritual music. This cultural foundation was strengthened through mentorship under world‑renowned master Omar Faruk Tekbilek, with whom Aşkın performed across the United States at cultural festivals, galas, and ceremonial events.
                  <br/><br/>
                  Aşkın’s compositions blend clarinet, kanun, ney, oud, piano, and world percussion with modern harmony and atmospheric textures, creating a sound that is both ancient and modern. His work spans original compositions, world‑fusion arrangements, film and documentary scoring, and live performance. Through Aşkın Studios, he collaborates with artists, produces culturally grounded projects, and develops music that bridges traditions while embracing contemporary storytelling.
                  <br/><br/>
                  His artistic mission centers on cultural preservation, emotional resonance, and the expansion of East–West musical dialogue. Aşkın’s performances and compositions invite audiences into a cinematic world shaped by memory, heritage, and imagination. His global artistic vision is captured in his signature phrase: <em>Music for the Soul</em>.
                </p>
              </div>
            </div>

            {/* Artist Statement */}
            <div className="bg-white/5 border border-white/10 p-12 rounded-sm">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h3 className="text-gold uppercase tracking-widest text-xs">Artist Statement (Grant Version)</h3>
                <button 
                  onClick={() => navigator.clipboard.writeText("My work is rooted in the belief that music is a bridge between worlds—between cultures, generations, and emotional landscapes that words alone cannot reach. As a composer, producer, and multi‑instrumentalist, I draw from the deep well of Turkish classical tradition while embracing the expressive possibilities of cinematic orchestration and contemporary global sound. My artistic mission is to honor the lineage I come from while expanding it into new forms that speak to modern audiences.\n\nMy musical identity was shaped through two parallel experiences: early clarinet training in the United States and profound cultural immersion in Türkiye during my formative years. Living among master musicians and absorbing the emotional language of makam, folk tradition, and spiritual music gave me a foundation that continues to guide every composition I create. This foundation was strengthened through mentorship under world‑renowned master Omar Faruk Tekbilek, whose artistry and humanity shaped my understanding of music as a spiritual and cultural responsibility.\n\nIn my work, I blend clarinet, kanun, ney, oud, piano, and world percussion with modern harmony, atmospheric textures, and cinematic storytelling. I am drawn to the spaces where tradition and innovation meet—where ancient modes can coexist with contemporary production, and where cultural memory can be expressed through modern sound design. My compositions often explore themes of identity, migration, longing, and the emotional landscapes of heritage.\n\nThrough Aşkın Studios, I compose for film and documentary, produce artists, and create world‑fusion works that center authenticity and emotional resonance. Whether performing on stage or composing in the studio, my goal is to create music that invites listeners into a shared emotional space—one that transcends borders and speaks to the universal human experience.\n\nAs an artist, I am committed to cultural preservation, cross‑cultural dialogue, and the expansion of East–West musical language. I believe that music has the power to connect communities, foster understanding, and carry forward the stories of those who came before us. My signature phrase, Music for the Soul, reflects this mission: to create work that resonates deeply, honors heritage, and inspires connection.")}
                  className="text-[10px] uppercase tracking-widest text-paper/40 hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="text-paper/80 font-light text-lg leading-relaxed space-y-6 max-w-4xl mx-auto text-justify">
                <p>
                  My work is rooted in the belief that music is a bridge between worlds—between cultures, generations, and emotional landscapes that words alone cannot reach. As a composer, producer, and multi‑instrumentalist, I draw from the deep well of Turkish classical tradition while embracing the expressive possibilities of cinematic orchestration and contemporary global sound. My artistic mission is to honor the lineage I come from while expanding it into new forms that speak to modern audiences.
                </p>
                <p>
                  My musical identity was shaped through two parallel experiences: early clarinet training in the United States and profound cultural immersion in Türkiye during my formative years. Living among master musicians and absorbing the emotional language of makam, folk tradition, and spiritual music gave me a foundation that continues to guide every composition I create. This foundation was strengthened through mentorship under world‑renowned master Omar Faruk Tekbilek, whose artistry and humanity shaped my understanding of music as a spiritual and cultural responsibility.
                </p>
                <p>
                  In my work, I blend clarinet, kanun, ney, oud, piano, and world percussion with modern harmony, atmospheric textures, and cinematic storytelling. I am drawn to the spaces where tradition and innovation meet—where ancient modes can coexist with contemporary production, and where cultural memory can be expressed through modern sound design. My compositions often explore themes of identity, migration, longing, and the emotional landscapes of heritage.
                </p>
                <p>
                  Through Aşkın Studios, I compose for film and documentary, produce artists, and create world‑fusion works that center authenticity and emotional resonance. Whether performing on stage or composing in the studio, my goal is to create music that invites listeners into a shared emotional space—one that transcends borders and speaks to the universal human experience.
                </p>
                <p>
                  As an artist, I am committed to cultural preservation, cross‑cultural dialogue, and the expansion of East–West musical language. I believe that music has the power to connect communities, foster understanding, and carry forward the stories of those who came before us. My signature phrase, <em>Music for the Soul</em>, reflects this mission: to create work that resonates deeply, honors heritage, and inspires connection.
                </p>
              </div>
            </div>

            {/* Artist Résumé / CV */}
            <div className="bg-white/5 border border-white/10 p-12 rounded-sm">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h3 className="text-gold uppercase tracking-widest text-xs">Artist Résumé / CV (Grant & Festival Version)</h3>
                <button 
                  onClick={() => navigator.clipboard.writeText("AŞKIN ŞERBETÇİ — ARTIST RÉSUMÉ / CV (GRANT & FESTIVAL VERSION)\n\nComposer • Producer • Multi‑Instrumentalist\nAşkın Studios\nMusic for the Soul\n\nPROFESSIONAL SUMMARY\nWorld‑fusion composer and multi‑instrumentalist with over 15 years of experience blending Turkish classical tradition with cinematic orchestration and contemporary global sound. Specialized in makam theory, improvisation, and East–West fusion. Founder of Aşkın Studios, providing original scoring for film, documentary, and live performance.\n\nKEY PERFORMANCES & TOURS\n- North American Tour (with Omar Faruk Tekbilek): Performed as a featured multi‑instrumentalist at major cultural festivals, galas, and ceremonial events across the United States.\n- International Cultural Exchange (Türkiye): Collaborative performances with master musicians in Istanbul and regional cultural centers, focusing on traditional makam and folk fusion.\n- Solo Recitals & Ensemble Leadership: Lead performer and director for various world‑music ensembles, presenting original works at universities, cultural institutions, and private events.\n- Ceremonial & Spiritual Events: Featured performer for high‑profile cultural and spiritual gatherings, integrating traditional instruments with meditative and atmospheric soundscapes.\n\nDISCOGRAPHY & STUDIO PRODUCTIONS\n- The Meeting of the Legends (Upcoming): Composer, Producer, and Lead Multi‑Instrumentalist. A full‑length world‑fusion album blending Turkish heritage with cinematic production.\n- Aşkın Studios (2018–Present): Produced and arranged numerous tracks for independent artists, focusing on cultural authenticity and modern world‑fusion.\n- Collaborative Recordings: Featured multi‑instrumentalist on various world‑music albums, contributing clarinet, ney, and atmospheric textures.\n\nFILM & DOCUMENTARY SCORING\n- Original Scores for Independent Film: Composed emotionally resonant soundscapes for short films and independent features, bridging traditional acoustic elements with modern cinematic harmony.\n- Documentary Soundtracks: Developed culturally grounded scores for documentaries exploring themes of heritage, identity, and global migration.\n- Commercial & Media Scoring: Produced high‑quality audio for cultural organizations, promotional media, and digital storytelling projects.\n\nEDUCATION & MENTORSHIP\n- Mentorship under Omar Faruk Tekbilek: Intensive long‑term study in world‑fusion performance, spiritual expression, and ensemble leadership.\n- Cultural Immersion (Türkiye): Formative years spent in Türkiye studying with master musicians, focusing on makam theory, traditional improvisation (taksim), and regional folk styles.\n- Clarinet Studies (United States): Early formal training in Western classical and contemporary clarinet techniques, providing a foundation for cross‑cultural fusion.\n\nTECHNICAL SKILLS & INSTRUMENTS\n- Instruments: Clarinet (Primary), Kanun, Ney, Oud, Piano, World Percussion.\n- Production: Advanced proficiency in Logic Pro, Ableton Live, and professional studio engineering.\n- Specializations: Makam theory, traditional improvisation, cinematic orchestration, world‑fusion arrangement.")}
                  className="text-[10px] uppercase tracking-widest text-paper/40 hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="text-paper/80 font-light text-sm leading-relaxed space-y-10 max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-white font-serif italic text-lg mb-4">Professional Summary</h4>
                    <p className="text-paper/70">World‑fusion composer and multi‑instrumentalist with over 15 years of experience blending Turkish classical tradition with cinematic orchestration and contemporary global sound. Specialized in makam theory, improvisation, and East–West fusion.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic text-lg mb-4">Education & Mentorship</h4>
                    <ul className="list-disc list-outside ml-4 space-y-2 text-paper/70">
                      <li>Mentorship under Omar Faruk Tekbilek (World-Fusion Performance)</li>
                      <li>Cultural Immersion in Türkiye (Makam Theory & Folk Tradition)</li>
                      <li>Clarinet Studies in the United States (Classical & Contemporary)</li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-white font-serif italic text-lg mb-4">Key Performances & Tours</h4>
                    <ul className="list-disc list-outside ml-4 space-y-2 text-paper/70">
                      <li>North American Tour with Omar Faruk Tekbilek</li>
                      <li>International Cultural Exchange (Istanbul & Regional Türkiye)</li>
                      <li>Solo Recitals at Universities & Cultural Institutions</li>
                      <li>Featured Performer for Spiritual & Ceremonial Events</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic text-lg mb-4">Discography & Scoring</h4>
                    <ul className="list-disc list-outside ml-4 space-y-2 text-paper/70">
                      <li><em>The Meeting of the Legends</em> (Full-Length Album)</li>
                      <li>Aşkın Studios (Artist Production)</li>
                      <li>Original Scores for Independent Film & Documentary</li>
                      <li>Commercial & Media Scoring for Cultural Organizations</li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-8">
                  <h4 className="text-gold font-serif italic text-lg mb-6">Technical Skills & Instrumentation</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <strong className="block text-white text-[10px] uppercase tracking-widest mb-2">Instruments</strong>
                      <p className="text-paper/60 text-xs">Clarinet, Kanun, Ney, Oud, Piano, Percussion</p>
                    </div>
                    <div>
                      <strong className="block text-white text-[10px] uppercase tracking-widest mb-2">Production</strong>
                      <p className="text-paper/60 text-xs">Logic Pro, Ableton Live, Studio Engineering</p>
                    </div>
                    <div>
                      <strong className="block text-white text-[10px] uppercase tracking-widest mb-2">Theory</strong>
                      <p className="text-paper/60 text-xs">Makam Theory, Traditional Improvisation</p>
                    </div>
                    <div>
                      <strong className="block text-white text-[10px] uppercase tracking-widest mb-2">Arrangement</strong>
                      <p className="text-paper/60 text-xs">Cinematic Orchestration, World-Fusion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Narrative */}
            <div className="bg-white/5 border border-white/10 p-12 rounded-sm">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h3 className="text-gold uppercase tracking-widest text-xs">Budget Narrative (Grant Version)</h3>
                <button 
                  onClick={() => navigator.clipboard.writeText("The budget for The Meeting of the Legends is structured to support the creation of a high‑quality world‑fusion album, a live premiere performance, and a series of educational workshops. Each cost category directly contributes to the artistic, cultural, and community‑focused goals of the project.\n\nArtistic Personnel\nThis category covers compensation for the core creative team, including myself as composer and multi‑instrumentalist, guest musicians specializing in Turkish classical and world‑fusion traditions, and a small ensemble for the live premiere. Fair and equitable pay is essential to honoring the cultural expertise and artistic labor of all collaborators.\n\nRecording & Production\nAşkın Studios will serve as the primary recording location. Funds support engineering, mixing, mastering, and equipment usage. These costs ensure the album meets professional cinematic and world‑music production standards, allowing traditional instruments to be captured with clarity and emotional depth.\n\nGuest Artists & Cultural Contributors\nThe project includes collaborations with musicians who bring authentic regional knowledge and stylistic nuance. Their contributions enrich the cultural integrity of the work and expand the project’s artistic reach.\n\nLive Premiere Performance\nThis category includes venue rental, sound reinforcement, lighting, and technical staff. The premiere is designed as an immersive cultural experience, integrating traditional instruments with modern orchestration. Technical support ensures the performance maintains the cinematic quality central to the project’s artistic vision.\n\nEducational Workshops\nFunds support the development and delivery of workshops on makam theory, improvisation, and East–West fusion techniques. Costs include instructional materials, space rental (if needed), and compensation for teaching time. These workshops extend the project’s impact into the community, fostering cultural understanding and artistic growth.\n\nMarketing & Outreach\nThis includes promotional materials, photography, video documentation, and digital outreach to ensure the album, premiere, and workshops reach diverse audiences. High‑quality documentation also supports future touring, festival submissions, and cultural exchange opportunities.\n\nAdministrative & Project Management\nThis category covers essential administrative tasks such as scheduling, coordination, grant reporting, and project oversight. These functions ensure the project remains organized, on schedule, and aligned with grant requirements.\n\nContingency (5–10%)\nA modest contingency ensures the project can adapt to unforeseen costs such as equipment repair, additional rehearsal time, or technical adjustments. This protects the artistic integrity and timely completion of the project.")}
                  className="text-[10px] uppercase tracking-widest text-paper/40 hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="text-paper/80 font-light text-sm leading-relaxed space-y-8 max-w-4xl mx-auto text-justify">
                <p className="text-lg">
                  The budget for <em>The Meeting of the Legends</em> is structured to support the creation of a high‑quality world‑fusion album, a live premiere performance, and a series of educational workshops. Each cost category directly contributes to the artistic, cultural, and community‑focused goals of the project.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Artistic Personnel</h4>
                    <p>This category covers compensation for the core creative team, including myself as composer and multi‑instrumentalist, guest musicians specializing in Turkish classical and world‑fusion traditions, and a small ensemble for the live premiere. Fair and equitable pay is essential to honoring the cultural expertise and artistic labor of all collaborators.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Recording & Production</h4>
                    <p>Aşkın Studios will serve as the primary recording location. Funds support engineering, mixing, mastering, and equipment usage. These costs ensure the album meets professional cinematic and world‑music production standards, allowing traditional instruments to be captured with clarity and emotional depth.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Guest Artists & Cultural Contributors</h4>
                    <p>The project includes collaborations with musicians who bring authentic regional knowledge and stylistic nuance. Their contributions enrich the cultural integrity of the work and expand the project’s artistic reach.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Live Premiere Performance</h4>
                    <p>This category includes venue rental, sound reinforcement, lighting, and technical staff. The premiere is designed as an immersive cultural experience, integrating traditional instruments with modern orchestration. Technical support ensures the performance maintains the cinematic quality central to the project’s artistic vision.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Educational Workshops</h4>
                    <p>Funds support the development and delivery of workshops on makam theory, improvisation, and East–West fusion techniques. Costs include instructional materials, space rental (if needed), and compensation for teaching time. These workshops extend the project’s impact into the community, fostering cultural understanding and artistic growth.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Marketing & Outreach</h4>
                    <p>This includes promotional materials, photography, video documentation, and digital outreach to ensure the album, premiere, and workshops reach diverse audiences. High‑quality documentation also supports future touring, festival submissions, and cultural exchange opportunities.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Administrative & Project Management</h4>
                    <p>This category covers essential administrative tasks such as scheduling, coordination, grant reporting, and project oversight. These functions ensure the project remains organized, on schedule, and aligned with grant requirements.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Contingency (5–10%)</h4>
                    <p>A modest contingency ensures the project can adapt to unforeseen costs such as equipment repair, additional rehearsal time, or technical adjustments. This protects the artistic integrity and timely completion of the project.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Timeline */}
            <div className="bg-white/5 border border-white/10 p-12 rounded-sm">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h3 className="text-gold uppercase tracking-widest text-xs">Project Timeline (Grant Version)</h3>
                <button 
                  onClick={() => navigator.clipboard.writeText("Phase 1 — Composition & Pre‑Production (Months 1–2)\n- Finalize thematic structure and conceptual framework for The Meeting of the Legends.\n- Compose initial sketches for 10–12 tracks, focusing on melodic motifs, makam foundations, and cinematic textures.\n- Identify guest musicians and cultural contributors.\n- Begin pre‑production sessions at Aşkın Studios to refine instrumentation and arrangement direction.\n\nPhase 2 — Recording Sessions (Months 3–4)\n- Record primary instruments: clarinet, kanun, ney, oud, piano, and world percussion.\n- Conduct ensemble sessions with guest artists specializing in Turkish classical and world‑fusion traditions.\n- Capture ambient and atmospheric layers to support the cinematic dimension of the project.\n- Begin editing and session organization for mixing.\n\nPhase 3 — Mixing & Mastering (Month 5)\n- Mix all tracks to achieve a balanced blend of traditional acoustic instruments and modern cinematic production.\n- Master the album for digital release, ensuring clarity, warmth, and dynamic consistency.\n- Prepare high‑resolution audio files for distribution and archival purposes.\n\nPhase 4 — Live Premiere Preparation (Month 6)\n- Assemble the performance ensemble for the premiere concert.\n- Conduct rehearsals focusing on transitions, dynamics, and ensemble cohesion.\n- Coordinate lighting, staging, and visual elements to create an immersive cultural experience.\n- Finalize venue logistics and technical requirements.\n\nPhase 5 — Live Premiere Performance (Month 7)\n- Present the full album in a cinematic live format with traditional and modern instrumentation.\n- Capture video and audio documentation for future festival submissions, touring opportunities, and cultural exchange programs.\n- Engage audiences through post‑performance dialogue or Q&A when appropriate.\n\nPhase 6 — Educational Workshops (Months 7–8)\n- Deliver community workshops on makam theory, improvisation, East–West fusion techniques, and cultural storytelling.\n- Offer sessions to students, emerging artists, and community members.\n- Provide hands‑on demonstrations of traditional instruments and world‑fusion composition methods.\n\nPhase 7 — Outreach, Distribution & Reporting (Months 8–9)\n- Release the album on major streaming platforms.\n- Share performance documentation with festivals, cultural organizations, and media outlets.\n- Conduct digital outreach to broaden audience engagement.\n- Complete grant reporting, including financial documentation, project outcomes, and community impact assessment.")}
                  className="text-[10px] uppercase tracking-widest text-paper/40 hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="text-paper/80 font-light text-sm leading-relaxed space-y-8 max-w-4xl mx-auto">
                {[
                  { phase: "Phase 1 — Composition & Pre‑Production (Months 1–2)", items: ["Finalize thematic structure and conceptual framework for The Meeting of the Legends.", "Compose initial sketches for 10–12 tracks, focusing on melodic motifs, makam foundations, and cinematic textures.", "Identify guest musicians and cultural contributors.", "Begin pre‑production sessions at Aşkın Studios to refine instrumentation and arrangement direction."] },
                  { phase: "Phase 2 — Recording Sessions (Months 3–4)", items: ["Record primary instruments: clarinet, kanun, ney, oud, piano, and world percussion.", "Conduct ensemble sessions with guest artists specializing in Turkish classical and world‑fusion traditions.", "Capture ambient and atmospheric layers to support the cinematic dimension of the project.", "Begin editing and session organization for mixing."] },
                  { phase: "Phase 3 — Mixing & Mastering (Month 5)", items: ["Mix all tracks to achieve a balanced blend of traditional acoustic instruments and modern cinematic production.", "Master the album for digital release, ensuring clarity, warmth, and dynamic consistency.", "Prepare high‑resolution audio files for distribution and archival purposes."] },
                  { phase: "Phase 4 — Live Premiere Preparation (Month 6)", items: ["Assemble the performance ensemble for the premiere concert.", "Conduct rehearsals focusing on transitions, dynamics, and ensemble cohesion.", "Coordinate lighting, staging, and visual elements to create an immersive cultural experience.", "Finalize venue logistics and technical requirements."] },
                  { phase: "Phase 5 — Live Premiere Performance (Month 7)", items: ["Present the full album in a cinematic live format with traditional and modern instrumentation.", "Capture video and audio documentation for future festival submissions, touring opportunities, and cultural exchange programs.", "Engage audiences through post‑performance dialogue or Q&A when appropriate."] },
                  { phase: "Phase 6 — Educational Workshops (Months 7–8)", items: ["Deliver community workshops on makam theory, improvisation, East–West fusion techniques, and cultural storytelling.", "Offer sessions to students, emerging artists, and community members.", "Provide hands‑on demonstrations of traditional instruments and world‑fusion composition methods."] },
                  { phase: "Phase 7 — Outreach, Distribution & Reporting (Months 8–9)", items: ["Release the album on major streaming platforms.", "Share performance documentation with festivals, cultural organizations, and media outlets.", "Conduct digital outreach to broaden audience engagement.", "Complete grant reporting, including financial documentation, project outcomes, and community impact assessment."] }
                ].map((phase, i) => (
                  <div key={i} className="border-l border-white/10 pl-6">
                    <h4 className="text-gold font-serif italic text-lg mb-2">{phase.phase}</h4>
                    <ul className="space-y-2 list-disc list-outside ml-4 text-paper/70">
                      {phase.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Engagement Plan */}
            <div className="bg-white/5 border border-white/10 p-12 rounded-sm">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h3 className="text-gold uppercase tracking-widest text-xs">Community Engagement Plan (Grant Version)</h3>
                <button 
                  onClick={() => navigator.clipboard.writeText("COMMUNITY ENGAGEMENT PLAN — GRANT VERSION (FINAL)\n\nPurpose of Community Engagement\nThe community engagement component of The Meeting of the Legends is designed to deepen cultural understanding, expand access to world‑fusion music, and create meaningful artistic experiences for diverse audiences. The goal is to make Turkish classical tradition and East–West fusion accessible, educational, and emotionally resonant for both musicians and non‑musicians.\n\nTarget Communities\nThe project engages multiple groups who benefit from cultural and artistic enrichment:\n- Students and emerging musicians interested in global music traditions\n- Local cultural organizations seeking authentic world‑music programming\n- Immigrant and diaspora communities who connect deeply with Turkish and Middle Eastern heritage\n- General audiences who may be unfamiliar with makam, improvisation, or world‑fusion music\n- Arts educators and community leaders looking to expand multicultural offerings\n\nEngagement Activities\n1. Educational Workshops\nHands‑on workshops introduce participants to:\n- Makam theory and its emotional language\n- Improvisation techniques rooted in Turkish classical tradition\n- East–West fusion methods using clarinet, kanun, ney, oud, and world percussion\n- Cultural storytelling through melody and rhythm\n\n2. Artist Talks & Demonstrations\nInteractive sessions where audiences experience:\n- Live demonstrations of traditional instruments\n- Explanations of cultural origins and musical symbolism\n- Q&A discussions about heritage, identity, and artistic process\n\n3. Community Concert Experience\nThe live premiere of The Meeting of the Legends serves as a communal gathering point. Audiences experience:\n- A cinematic world‑fusion performance\n- Visual elements inspired by Turkish landscapes and spiritual motifs\n- A post‑concert conversation with the artist and ensemble\n\n4. Partnerships with Local Organizations\nCollaborations may include:\n- Cultural centers\n- Schools and universities\n- Community arts programs\n- Libraries and public institutions\n\nAccessibility & Inclusion\nThe project prioritizes:\n- Free or low‑cost workshop access\n- ADA‑compliant venues\n- Multilingual communication when appropriate\n- Welcoming environments for participants of all backgrounds\n\nExpected Outcomes\n- Increased understanding of Turkish classical and world‑fusion music\n- Strengthened cross‑cultural dialogue\n- New creative opportunities for students and emerging artists\n- Expanded community appreciation for global music traditions\n- Lasting relationships between the artist and local cultural institutions\n\nEvaluation Methods\nImpact will be measured through:\n- Participant feedback forms\n- Workshop attendance and engagement\n- Community partner testimonials\n- Documentation of performances and educational sessions\n- Post‑project reflection on artistic and cultural outcomes")}
                  className="text-[10px] uppercase tracking-widest text-paper/40 hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="text-paper/80 font-light text-sm leading-relaxed space-y-8 max-w-4xl mx-auto text-justify">
                <p className="text-lg">
                  The community engagement component of <em>The Meeting of the Legends</em> is designed to deepen cultural understanding, expand access to world‑fusion music, and create meaningful artistic experiences for diverse audiences.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Target Communities</h4>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-paper/70">
                      <li>Students and emerging musicians</li>
                      <li>Local cultural organizations</li>
                      <li>Immigrant and diaspora communities</li>
                      <li>General audiences</li>
                      <li>Arts educators and community leaders</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Engagement Activities</h4>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-paper/70">
                      <li>Educational Workshops (Makam, Improvisation)</li>
                      <li>Artist Talks & Demonstrations</li>
                      <li>Community Concert Experience</li>
                      <li>Partnerships with Local Organizations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Accessibility & Inclusion</h4>
                    <p className="text-paper/70">Prioritizing free/low-cost access, ADA-compliant venues, multilingual communication, and welcoming environments for all backgrounds.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Evaluation Methods</h4>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-paper/70">
                      <li>Participant feedback forms</li>
                      <li>Workshop attendance tracking</li>
                      <li>Community partner testimonials</li>
                      <li>Documentation of sessions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Two-Page Grant Summary */}
            <div className="bg-white/5 border border-white/10 p-12 rounded-sm">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h3 className="text-gold uppercase tracking-widest text-xs">Two-Page Grant Summary (Full Text)</h3>
                <button 
                  onClick={() => navigator.clipboard.writeText("TWO‑PAGE GRANT SUMMARY — FULL TEXT LAYOUT (FINAL)\n\nProject Title: The Meeting of the Legends\nArtist: Aşkın Şerbetçi\nComposer • Producer • Multi‑Instrumentalist\nMusic for the Soul\n\nProject Overview\nThe Meeting of the Legends is a world‑fusion music project that blends Turkish classical tradition with cinematic orchestration and contemporary global sound. The project includes a full‑length studio album, an immersive live premiere performance, and a series of educational workshops designed to introduce audiences to makam, improvisation, and East–West fusion. The work explores themes of identity, memory, migration, and cultural inheritance, offering audiences a musical experience that is both ancient and modern.\n\nArtistic Vision\nMy artistic mission is to honor the lineage I come from while expanding it into new forms that speak to modern audiences. This project draws from my early clarinet training in the United States, my cultural immersion in Türkiye, and my mentorship under world‑renowned master Omar Faruk Tekbilek. Through clarinet, kanun, ney, oud, piano, and world percussion blended with modern harmony and atmospheric textures, I create music that bridges heritage and contemporary expression. The compositions explore emotional landscapes shaped by memory, spirituality, and cultural identity.\n\nProject Components\n- Studio Album: A 10–12 track world‑fusion album recorded at Aşkın Studios, featuring traditional instruments, cinematic orchestration, and guest artists.\n- Live Premiere Performance: A full ensemble concert presenting the album in an immersive format with lighting, staging, and visual elements inspired by Turkish landscapes and spiritual motifs.\n- Educational Workshops: Community workshops on makam theory, improvisation, cultural storytelling, and East–West fusion techniques for students, emerging artists, and general audiences.\n\nCommunity Engagement Plan\nThe project engages diverse communities through workshops, artist talks, demonstrations, and partnerships with cultural centers, schools, libraries, and arts organizations. Workshops introduce participants to makam, improvisation, and world‑fusion composition. Artist talks provide cultural context and live demonstrations of traditional instruments. The premiere performance serves as a communal gathering point, followed by dialogue with the audience. Accessibility is prioritized through low‑cost programming, ADA‑compliant venues, and inclusive outreach.\n\nProject Goals\n- Create a culturally grounded world‑fusion album that expands the global language of East–West music.\n- Strengthen cross‑cultural dialogue through accessible performances and educational programming.\n- Preserve and reinterpret Turkish classical heritage through contemporary composition.\n- Provide meaningful artistic and educational experiences for students, emerging musicians, and community members.\n- Build long‑term partnerships with cultural institutions and arts organizations.\n\nEvaluation Framework\nSuccess will be measured through artistic quality, community engagement, educational impact, cultural preservation, administrative execution, and long‑term outcomes. Metrics include participant feedback, workshop attendance, partner testimonials, documentation of performances, adherence to timeline and budget, and future collaborations or festival invitations.\n\nProject Timeline\nMonths 1–2: Composition and pre‑production\nMonths 3–4: Recording sessions with ensemble and guest artists\nMonth 5: Mixing and mastering\nMonth 6: Rehearsals and premiere preparation\nMonth 7: Live premiere performance\nMonths 7–8: Educational workshops\nMonths 8–9: Outreach, distribution, and reporting\n\nBudget Narrative\nThe budget supports artistic personnel, recording and production costs, guest artists, live premiere expenses, workshop delivery, marketing and outreach, administrative coordination, and a modest contingency. Each cost directly contributes to artistic quality, cultural integrity, and community impact.\n\nArtist Statement (Condensed)\nMy work bridges Turkish classical tradition with cinematic world‑fusion, creating music that carries cultural memory into contemporary expression. I compose to honor heritage, inspire connection, and expand the emotional language of East–West fusion. The Meeting of the Legends continues this mission by blending ancient modes with modern storytelling to create music that resonates across cultures.")}
                  className="text-[10px] uppercase tracking-widest text-paper/40 hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="text-paper/80 font-light text-sm leading-relaxed space-y-8 max-w-4xl mx-auto text-justify">
                <p className="text-lg">
                  This consolidated summary combines the project narrative, artistic vision, timeline, and budget into a cohesive two-page format, ideal for initial inquiries and standard grant applications.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Project Overview</h4>
                    <p className="text-paper/70">A world-fusion project blending Turkish classical tradition with cinematic orchestration, featuring an album, live premiere, and workshops.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Artistic Vision</h4>
                    <p className="text-paper/70">Honoring lineage while expanding into new forms, bridging heritage and contemporary expression through emotional landscapes.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Project Components</h4>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-paper/70">
                      <li>Studio Album (10-12 tracks)</li>
                      <li>Live Premiere Performance</li>
                      <li>Educational Workshops</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Community Engagement</h4>
                    <p className="text-paper/70">Workshops, artist talks, and partnerships with cultural centers, prioritizing accessibility and inclusive outreach.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Goals & Evaluation Framework */}
            <div className="bg-white/5 border border-white/10 p-12 rounded-sm">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h3 className="text-gold uppercase tracking-widest text-xs">Goals & Evaluation (Grant Version)</h3>
                <button 
                  onClick={() => navigator.clipboard.writeText("PROJECT GOALS & EVALUATION FRAMEWORK — GRANT VERSION (FINAL)\n\nCore Artistic Goals\n- Create a world‑fusion album that blends Turkish classical tradition with cinematic orchestration and contemporary global sound.\n- Preserve and reinterpret cultural heritage through original compositions rooted in makam, folk tradition, and spiritual expression.\n- Present an immersive live premiere that brings traditional instruments and modern production into a unified artistic experience.\n- Expand the global language of East–West fusion through innovative instrumentation, arrangement, and storytelling.\n\nCultural & Community Goals\n- Increase public understanding of Turkish classical music and its emotional language.\n- Strengthen cross‑cultural dialogue by presenting music that bridges heritage and modernity.\n- Provide accessible educational opportunities for students, emerging artists, and community members.\n- Build long‑term relationships with cultural organizations, schools, and arts institutions.\n\nEducational Goals\n- Introduce participants to makam theory, improvisation, and world‑fusion composition.\n- Offer hands‑on demonstrations of traditional instruments such as clarinet, kanun, ney, oud, and world percussion.\n- Inspire emerging musicians to explore global traditions and integrate them into contemporary practice.\n- Provide educators with culturally grounded material they can incorporate into their programs.\n\nEvaluation Framework\n\n1. Artistic Quality\nMeasured through:\n- Feedback from guest artists and cultural collaborators\n- Peer review from musicians familiar with Turkish classical and world‑fusion traditions\n- Quality of recording, mixing, and mastering\n- Audience response to the live premiere\n\n2. Community Engagement Impact\nMeasured through:\n- Attendance at workshops and community events\n- Participant feedback forms assessing learning and cultural understanding\n- Testimonials from partner organizations\n- Demographic reach, including underserved or culturally diverse communities\n\n3. Educational Effectiveness\nMeasured through:\n- Pre‑ and post‑workshop reflections\n- Instructor observations of participant engagement\n- Requests for follow‑up sessions or continued learning\n- Integration of workshop content into school or community programs\n\n4. Cultural Preservation & Exchange\nMeasured through:\n- Participant understanding of makam and Turkish musical heritage\n- Interest from cultural organizations in future collaborations\n- Documentation of cross‑cultural dialogue during workshops and performances\n- Inclusion of the project in cultural festivals or international showcases\n\n5. Administrative & Logistical Success\nMeasured through:\n- Completion of project phases on schedule\n- Adherence to budget\n- Quality of documentation for grant reporting\n- Smooth coordination with venues, partners, and collaborators\n\n6. Long‑Term Outcomes\nMeasured through:\n- Continued performances of the repertoire\n- Future collaborations with guest artists and cultural institutions\n- Increased visibility for world‑fusion music in the region\n- Growth of Aşkın Studios as a cultural hub")}
                  className="text-[10px] uppercase tracking-widest text-paper/40 hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="text-paper/80 font-light text-sm leading-relaxed space-y-8 max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Core Artistic Goals</h4>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-paper/70">
                      <li>Create a world‑fusion album blending tradition and cinematic sound.</li>
                      <li>Preserve heritage through makam and folk compositions.</li>
                      <li>Present an immersive live premiere.</li>
                      <li>Expand the global language of East–West fusion.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-serif italic mb-2">Cultural & Community Goals</h4>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-paper/70">
                      <li>Increase understanding of Turkish classical music.</li>
                      <li>Strengthen cross‑cultural dialogue.</li>
                      <li>Provide accessible educational opportunities.</li>
                      <li>Build long‑term cultural relationships.</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-gold font-serif italic text-lg mb-4">Evaluation Framework</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <strong className="block text-white text-xs uppercase mb-2">Artistic Quality</strong>
                      <p className="text-paper/70 text-xs">Measured by peer review, recording quality, and audience response.</p>
                    </div>
                    <div>
                      <strong className="block text-white text-xs uppercase mb-2">Community Impact</strong>
                      <p className="text-paper/70 text-xs">Measured by attendance, feedback forms, and demographic reach.</p>
                    </div>
                    <div>
                      <strong className="block text-white text-xs uppercase mb-2">Educational Effectiveness</strong>
                      <p className="text-paper/70 text-xs">Measured by participant reflections and instructor observations.</p>
                    </div>
                    <div>
                      <strong className="block text-white text-xs uppercase mb-2">Cultural Preservation</strong>
                      <p className="text-paper/70 text-xs">Measured by understanding of heritage and future collaborations.</p>
                    </div>
                    <div>
                      <strong className="block text-white text-xs uppercase mb-2">Administrative Success</strong>
                      <p className="text-paper/70 text-xs">Measured by schedule adherence, budget compliance, and reporting.</p>
                    </div>
                    <div>
                      <strong className="block text-white text-xs uppercase mb-2">Long-Term Outcomes</strong>
                      <p className="text-paper/70 text-xs">Measured by future performances, visibility, and studio growth.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Preview Sections */}
      <section className="px-6 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Biography Preview */}
          <div className="border border-white/10 p-8 rounded-sm hover:border-gold/30 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-6 text-gold">
              <FileText size={20} />
              <h3 className="uppercase tracking-widest text-xs">Biography (Excerpt)</h3>
            </div>
            <p className="text-paper/60 font-light text-sm leading-relaxed mb-8">
              Aşkın’s musical identity was shaped through early clarinet training in the United States, deep cultural immersion in Türkiye, and mentorship under world‑renowned master Omar Faruk Tekbilek. His compositions blend clarinet, kanun, ney, oud, piano, and world percussion with modern harmony and cinematic textures.
            </p>
            <Link to="/epk" className="text-[10px] uppercase tracking-widest text-white hover:text-gold transition-colors inline-flex items-center gap-2">
              Read Full Bio <ArrowRight size={12} />
            </Link>
          </div>

          {/* Music Preview */}
          <div className="border border-white/10 p-8 rounded-sm hover:border-gold/30 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-6 text-gold">
              <Play size={20} />
              <h3 className="uppercase tracking-widest text-xs">Music (Preview)</h3>
            </div>
            <p className="text-paper/60 font-light text-sm leading-relaxed mb-8">
              A curated selection of world‑fusion tracks and cinematic compositions.
            </p>
            <Link to="/music" className="text-[10px] uppercase tracking-widest text-white hover:text-gold transition-colors inline-flex items-center gap-2">
              Listen <ArrowRight size={12} />
            </Link>
          </div>

          {/* Videos Preview */}
          <div className="border border-white/10 p-8 rounded-sm hover:border-gold/30 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-6 text-gold">
              <Eye size={20} />
              <h3 className="uppercase tracking-widest text-xs">Videos (Preview)</h3>
            </div>
            <p className="text-paper/60 font-light text-sm leading-relaxed mb-8">
              Official music videos, live performances, and studio sessions.
            </p>
            <Link to="/videos" className="text-[10px] uppercase tracking-widest text-white hover:text-gold transition-colors inline-flex items-center gap-2">
              Watch <ArrowRight size={12} />
            </Link>
          </div>

          {/* Photos Preview */}
          <div className="border border-white/10 p-8 rounded-sm hover:border-gold/30 transition-colors duration-500">
            <div className="flex items-center gap-3 mb-6 text-gold">
              <Image size={20} />
              <h3 className="uppercase tracking-widest text-xs">Photos (Preview)</h3>
            </div>
            <p className="text-paper/60 font-light text-sm leading-relaxed mb-8">
              High‑resolution portraits and performance images.
            </p>
            <Link to="/press" className="text-[10px] uppercase tracking-widest text-white hover:text-gold transition-colors inline-flex items-center gap-2">
              View Gallery <ArrowRight size={12} />
            </Link>
          </div>

        </div>
      </section>

      {/* Stage Plot & Tech Rider */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 p-12 rounded-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
              <h2 className="text-2xl font-serif italic text-white">Stage Plot & Tech Rider</h2>
              <button className="px-6 py-3 border border-white/10 text-[10px] uppercase tracking-widest hover:bg-white hover:text-ink transition-colors rounded-sm flex items-center gap-2">
                <Download size={14} /> Download Stage Plot
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 text-paper/70 font-light text-sm">
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-gold rounded-full"/> Central position: Aşkın (clarinet/kanun/ney/oud)</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-gold rounded-full"/> Optional ensemble: percussion, strings, keys</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-gold rounded-full"/> Warm, cinematic lighting preferred</li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-gold rounded-full"/> DI boxes for keys/backing tracks</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-gold rounded-full"/> 1–2 instrument mics</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-gold rounded-full"/> 2 stage monitors</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Branding */}
      <section className="px-6 pb-48">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Contact */}
          <div>
            <h3 className="text-gold uppercase tracking-widest text-xs mb-8 border-b border-white/10 pb-2">Contact Information</h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-paper/40 mb-1">Booking</p>
                <a href="mailto:booking@askinstudios.com" className="text-white hover:text-gold transition-colors text-lg">booking@askinstudios.com</a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-paper/40 mb-1">Press</p>
                <a href="mailto:info@askinstudios.com" className="text-white hover:text-gold transition-colors text-lg">info@askinstudios.com</a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-paper/40 mb-1">General</p>
                <a href="mailto:info@askinstudios.com" className="text-white hover:text-gold transition-colors text-lg">info@askinstudios.com</a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-paper/40 mb-1">Studio</p>
                <p className="text-white">Aşkın Studios, Rochester NY (by appointment)</p>
              </div>
            </div>
          </div>

          {/* Branding */}
          <div>
            <h3 className="text-gold uppercase tracking-widest text-xs mb-8 border-b border-white/10 pb-2">Branding Requirements</h3>
            <ul className="space-y-4 text-paper/70 font-light">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                Text‑based studio logo only
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                Gold + white hierarchy for name presentation
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                Midnight Blue Cinematic Theme
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                Clean, minimalist spacing
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                No backgrounds baked into logos
              </li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
};

export default DownloadEPK;
