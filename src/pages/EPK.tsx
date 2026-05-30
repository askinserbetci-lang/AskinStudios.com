import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Printer } from 'lucide-react';
import { pressPageSEO } from '../data/seo/pages/press.seo';

import { CinematicBackground } from '../components/common/CinematicBackground';

const EPK = () => {
  return (
    <div className="bg-transparent min-h-screen text-paper relative print:bg-white print:text-black">
      <Helmet>
        <title>Electronic Press Kit | Aşkın Şerbetçi</title>
        <meta name="description" content="Official Electronic Press Kit (EPK) for Aşkın Şerbetçi. Bio, photos, music, videos, and press assets for media and booking." />
      </Helmet>

      <div className="print:hidden">
        <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="EPK Background" />
      </div>

      {/* Hero Section */}
      <section className="page-hero print:pt-12 print:pb-8 print:min-h-0">
        <div className="absolute inset-0 pointer-events-none print:hidden"
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
            <h1 className="text-5xl md:text-8xl font-serif italic mb-6 leading-tight print:text-black">Electronic Press Kit</h1>
            <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 block leading-relaxed font-medium print:text-black">
              Official Media & Booking Assets
            </span>
            
            <button 
              onClick={() => window.print()} 
              className="mt-8 px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-ink transition-all duration-500 text-[10px] uppercase tracking-[0.25em] rounded-sm inline-flex items-center gap-2 print:hidden"
            >
              <Printer size={16} /> Print / Save as PDF
            </button>

            <div className="mt-6 flex justify-center gap-4 print:hidden">
              <Link 
                to="/download-epk" 
                className="px-8 py-3 bg-white/5 border border-white/10 text-white hover:bg-white hover:text-ink transition-all duration-500 text-[10px] uppercase tracking-[0.25em] rounded-sm"
              >
                Download Assets (Grant & Festival)
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EPK Content */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto space-y-24">
          
          {/* Artist Name & Tagline */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-2">Aşkın Şerbetçi</h2>
            <p className="text-gold uppercase tracking-widest text-xs mb-4">Composer • Producer • Multi‑Instrumentalist • World‑Fusion Artist</p>
            <p className="text-paper/60 font-serif italic text-lg">"Music for the Soul"</p>
          </div>

          {/* Short Bio */}
          <div>
            <h3 className="text-gold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Short Bio</h3>
            <p className="text-paper/80 font-light text-lg leading-relaxed">
              Aşkın Şerbetçi is a world‑fusion composer and multi‑instrumentalist blending Turkish classical tradition with cinematic orchestration and contemporary production. His music bridges East and West through emotional storytelling, cultural depth, and a lifelong devotion to melody and rhythm.
            </p>
          </div>

          {/* Full Bio */}
          <div>
            <h3 className="text-gold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Full Bio</h3>
            <div className="space-y-6 text-paper/80 font-light text-lg leading-relaxed">
              <p>
                Aşkın Şerbetçi is a visionary composer, producer, and multi‑instrumentalist whose work unites Turkish classical heritage with modern world‑fusion and cinematic sound design. His musical identity was shaped through early clarinet training in the United States, deep cultural immersion in Türkiye, and mentorship under world‑renowned master Omar Faruk Tekbilek.
              </p>
              <p>
                Performing across the United States at cultural festivals, weddings, galas, and presidential ceremonies, Aşkın developed a signature sound rooted in makam, folk tradition, and spiritual expression. His compositions blend clarinet, kanun, ney, oud, piano, and world percussion with modern harmony and cinematic textures.
              </p>
              <p>
                Today, Aşkın leads Aşkın Studios, creating original compositions, producing artists, scoring for film and documentary, and performing internationally. His global tagline—<em>Music for the Soul</em>—captures the essence of his artistic mission.
              </p>
            </div>
          </div>

          {/* Genres & Instruments */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-gold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Genres</h3>
              <ul className="space-y-2 text-paper/80 font-light">
                <li>World Fusion</li>
                <li>Turkish Classical</li>
                <li>Middle Eastern</li>
                <li>Cinematic / Orchestral</li>
                <li>Ambient / Spiritual</li>
                <li>Contemporary Global Music</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Instruments</h3>
              <ul className="space-y-2 text-paper/80 font-light">
                <li>Clarinet</li>
                <li>Kanun</li>
                <li>Ney</li>
                <li>Oud</li>
                <li>Piano</li>
                <li>World Percussion</li>
              </ul>
            </div>
          </div>

          {/* Notable Collaborations */}
          <div>
            <h3 className="text-gold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Notable Collaborations</h3>
            <ul className="space-y-2 text-paper/80 font-light">
              <li>Omar Faruk Tekbilek</li>
              <li>Regional and international world‑music ensembles</li>
              <li>Cultural organizations and festival networks</li>
            </ul>
          </div>

          {/* Performance Formats */}
          <div>
            <h3 className="text-gold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Performance Formats</h3>
            <ul className="space-y-2 text-paper/80 font-light">
              <li>Solo</li>
              <li>Duo / Trio</li>
              <li>Full world‑fusion ensemble</li>
              <li>Cultural ceremonies</li>
              <li>Concert halls</li>
              <li>Festivals</li>
              <li>Private and corporate events</li>
            </ul>
          </div>

          {/* Selected Performances */}
          <div>
            <h3 className="text-gold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Selected Performances</h3>
            <ul className="space-y-2 text-paper/80 font-light">
              <li>Cultural festivals across the United States</li>
              <li>International weddings and ceremonial events</li>
              <li>Concert collaborations with master musicians</li>
              <li>Studio sessions and documentary scoring</li>
            </ul>
          </div>

          {/* Music Links */}
          <div>
             <h3 className="text-gold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Music</h3>
             <div className="flex gap-4">
                <a href="#" className="px-6 py-3 border border-white/10 text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors">Spotify</a>
                <a href="#" className="px-6 py-3 border border-white/10 text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors">Apple Music</a>
                <a href="#" className="px-6 py-3 border border-white/10 text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors">YouTube</a>
                <a href="#" className="px-6 py-3 border border-white/10 text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors">SoundCloud</a>
             </div>
          </div>

           {/* Video Links */}
           <div>
             <h3 className="text-gold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Videos</h3>
             <div className="grid md:grid-cols-2 gap-6">
                {['Official Music Videos', 'Live Performances', 'Studio Sessions', 'Documentary Excerpts'].map((item, i) => (
                    <div key={i} className="aspect-video bg-white/5 border border-white/10 flex items-center justify-center text-paper/40 text-xs uppercase tracking-widest">
                        {item} Thumbnail
                    </div>
                ))}
             </div>
          </div>

          {/* Press Quotes */}
          <div>
            <h3 className="text-gold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Press Quotes</h3>
            <blockquote className="border-l-2 border-gold pl-6 italic text-paper/80 font-light text-lg mb-6">
              “Aşkın bridges cultures with emotional clarity and cinematic depth.”
            </blockquote>
            <blockquote className="border-l-2 border-gold pl-6 italic text-paper/80 font-light text-lg">
              “A master of East–West fusion with a sound that feels ancient and modern.”
            </blockquote>
          </div>

          {/* High-Resolution Photos */}
          <div>
             <h3 className="text-gold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">High-Resolution Photos</h3>
             <div className="flex gap-4">
                <button className="px-6 py-3 border border-white/10 text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors">Download Portraits</button>
                <button className="px-6 py-3 border border-white/10 text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors">Download Live Shots</button>
             </div>
          </div>

          {/* Stage Plot & Tech Rider */}
          <div>
            <h3 className="text-gold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Stage Plot & Tech Rider</h3>
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h4 className="text-white font-serif italic mb-4">Stage Plot</h4>
                    <ul className="space-y-2 text-paper/80 font-light text-sm">
                        <li>• Central position: Aşkın (clarinet/kanun/ney/oud)</li>
                        <li>• Optional ensemble positions: percussion, strings, keys</li>
                        <li>• Clean, minimalist layout</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-serif italic mb-4">Tech Rider</h4>
                    <ul className="space-y-2 text-paper/80 font-light text-sm">
                        <li>• 1 vocal mic (if needed)</li>
                        <li>• 1–2 instrument mics (depending on setup)</li>
                        <li>• DI boxes for keys or backing tracks</li>
                        <li>• Stage monitors (2 minimum)</li>
                        <li>• Clean, warm lighting preferred</li>
                        <li>• No strobe or harsh LED effects</li>
                    </ul>
                </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white/5 border border-white/10 p-12 rounded-sm">
            <h3 className="text-gold uppercase tracking-widest text-xs mb-8 border-b border-white/10 pb-2">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <p className="text-xs uppercase tracking-widest text-paper/40 mb-1">Booking</p>
                    <a href="mailto:booking@askinstudios.com" className="text-white hover:text-gold transition-colors block mb-6">booking@askinstudios.com</a>

                    <p className="text-xs uppercase tracking-widest text-paper/40 mb-1">Press</p>
                    <a href="mailto:info@askinstudios.com" className="text-white hover:text-gold transition-colors block mb-6">info@askinstudios.com</a>
                </div>
                <div>
                    <p className="text-xs uppercase tracking-widest text-paper/40 mb-1">General</p>
                    <a href="mailto:info@askinstudios.com" className="text-white hover:text-gold transition-colors block mb-6">info@askinstudios.com</a>

                    <p className="text-xs uppercase tracking-widest text-paper/40 mb-1">Studio</p>
                    <p className="text-white">Aşkın Studios<br/>Rochester, NY (by appointment)</p>
                </div>
            </div>
          </div>

          {/* Branding Requirements */}
          <div>
            <h3 className="text-gold uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-2">Branding Requirements</h3>
            <ul className="space-y-2 text-paper/80 font-light text-sm">
              <li>• Text‑based studio logo only</li>
              <li>• Gold + white hierarchy for name presentation</li>
              <li>• Midnight Blue Cinematic Theme</li>
              <li>• No backgrounds baked into logos</li>
              <li>• Maintain clean, minimalist spacing</li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
};

export default EPK;
