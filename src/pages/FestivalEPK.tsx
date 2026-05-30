import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Printer } from 'lucide-react';

import { CinematicBackground } from '../components/common/CinematicBackground';

const FestivalEPK = () => {
  return (
    <div className="bg-transparent min-h-screen text-paper relative print:bg-white print:text-black print:p-8">
      <Helmet>
        <title>Festival EPK | Aşkın Şerbetçi</title>
        <meta name="description" content="Festival-optimized one-page Electronic Press Kit for Aşkın Şerbetçi." />
      </Helmet>

      <div className="print:hidden">
        <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="Festival EPK Background" />
      </div>

      {/* Print Button (Screen Only) */}
      <div className="fixed top-24 right-8 z-50 print:hidden">
        <button 
          onClick={() => window.print()} 
          className="px-6 py-3 bg-gold text-ink font-medium uppercase tracking-widest text-[10px] hover:bg-white transition-all duration-500 rounded-sm flex items-center gap-2 shadow-lg"
        >
          <Printer size={16} /> Print One-Sheet
        </button>
      </div>

      {/* Content Container */}
      <div className="max-w-[210mm] mx-auto bg-white/5 border border-white/10 p-12 md:p-16 my-12 rounded-sm print:border-none print:p-0 print:m-0 print:bg-transparent print:w-full print:max-w-none">
        
        {/* Header */}
        <header className="text-center border-b border-white/10 print:border-black/10 pb-8 mb-8">
          <h1 className="text-5xl font-serif italic mb-2 text-white print:text-black">Aşkın Şerbetçi</h1>
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-medium mb-2 print:text-black/70">Composer • Producer • Multi‑Instrumentalist</p>
          <p className="font-serif italic text-paper/60 print:text-black/60">"Music for the Soul"</p>
        </header>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          
          {/* Left Column */}
          <div className="space-y-8">
            
            <section>
              <h2 className="text-gold uppercase tracking-widest text-[10px] mb-3 border-b border-white/10 print:border-black/10 pb-1 print:text-black font-bold">Artist Summary</h2>
              <p className="text-paper/80 font-light text-sm leading-relaxed print:text-black/80 text-justify">
                Aşkın Şerbetçi is a world‑fusion composer and multi‑instrumentalist blending Turkish classical tradition with cinematic orchestration. Shaped by cultural immersion in Türkiye and mentorship under Omar Faruk Tekbilek, he performs internationally and composes for film, documentary, and global audiences through Aşkın Studios.
              </p>
            </section>

            <section>
              <h2 className="text-gold uppercase tracking-widest text-[10px] mb-3 border-b border-white/10 print:border-black/10 pb-1 print:text-black font-bold">Short Bio</h2>
              <p className="text-paper/80 font-light text-sm leading-relaxed print:text-black/80 text-justify">
                Aşkın Şerbetçi is a world‑fusion composer, producer, and multi‑instrumentalist whose music bridges Turkish classical tradition with cinematic orchestration and contemporary global sound. His artistic identity was shaped through early clarinet training in the United States, deep cultural immersion in Türkiye, and mentorship under world‑renowned master Omar Faruk Tekbilek. Drawing from makam, folk tradition, and spiritual expression, Aşkın blends clarinet, kanun, ney, oud, piano, and world percussion with modern harmony and atmospheric textures.
                <br/><br/>
                His performances create an emotional journey that moves between ancient memory and modern imagination, offering audiences a rare fusion of cultural authenticity and cinematic storytelling. Aşkın has performed across the United States at cultural festivals, galas, and ceremonial events, and his work extends into film and documentary scoring through Aşkın Studios. His global artistic mission is captured in his signature phrase: <em>Music for the Soul</em>.
              </p>
            </section>

            <section>
              <h2 className="text-gold uppercase tracking-widest text-[10px] mb-3 border-b border-white/10 print:border-black/10 pb-1 print:text-black font-bold">Notable Highlights</h2>
              <ul className="text-paper/80 font-light text-sm leading-relaxed print:text-black/80 list-disc list-outside ml-4 space-y-1">
                <li>Performances across the United States at cultural festivals, galas, and ceremonial events.</li>
                <li>Longtime collaboration with master musician Omar Faruk Tekbilek.</li>
                <li>Film and documentary scoring with a focus on cultural storytelling.</li>
                <li>Aşkın Studios: world‑fusion composition and multi‑instrumental recording.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gold uppercase tracking-widest text-[10px] mb-3 border-b border-white/10 print:border-black/10 pb-1 print:text-black font-bold">Press Quotes</h2>
              <div className="space-y-2">
                <blockquote className="italic text-paper/80 font-light text-sm print:text-black/80">
                  “Aşkın bridges cultures with emotional clarity and cinematic depth.”
                </blockquote>
                <blockquote className="italic text-paper/80 font-light text-sm print:text-black/80">
                  “A master of East–West fusion with a sound that feels ancient and modern.”
                </blockquote>
              </div>
            </section>

          </div>

          {/* Right Column */}
          <div className="space-y-8">

            <div className="grid grid-cols-2 gap-6">
              <section>
                <h2 className="text-gold uppercase tracking-widest text-[10px] mb-3 border-b border-white/10 print:border-black/10 pb-1 print:text-black font-bold">Musical Style</h2>
                <p className="text-paper/80 font-light text-xs leading-relaxed print:text-black/80">
                  World Fusion • Turkish Classical • Middle Eastern • Cinematic • Ambient • Contemporary Global
                </p>
              </section>
              <section>
                <h2 className="text-gold uppercase tracking-widest text-[10px] mb-3 border-b border-white/10 print:border-black/10 pb-1 print:text-black font-bold">Instruments</h2>
                <p className="text-paper/80 font-light text-xs leading-relaxed print:text-black/80">
                  Clarinet • Kanun • Ney • Oud • Piano • World Percussion
                </p>
              </section>
            </div>

            <section>
              <h2 className="text-gold uppercase tracking-widest text-[10px] mb-3 border-b border-white/10 print:border-black/10 pb-1 print:text-black font-bold">Performance Formats</h2>
              <p className="text-paper/80 font-light text-sm leading-relaxed print:text-black/80">
                Solo • Duo/Trio • Full Ensemble<br/>
                Festival Stages • Concert Halls • Cultural Ceremonies • International Events
              </p>
            </section>

            <section>
              <h2 className="text-gold uppercase tracking-widest text-[10px] mb-3 border-b border-white/10 print:border-black/10 pb-1 print:text-black font-bold">Stage Plot & Tech</h2>
              <div className="text-paper/80 font-light text-sm leading-relaxed print:text-black/80 grid grid-cols-2 gap-4">
                <div>
                  <strong className="block font-medium text-xs uppercase mb-1">Stage Plot</strong>
                  <ul className="list-none space-y-0.5 text-xs">
                    <li>Center: Aşkın (multi-inst)</li>
                    <li>Optional: percussion, strings, keys</li>
                  </ul>
                </div>
                <div>
                  <strong className="block font-medium text-xs uppercase mb-1">Requirements</strong>
                  <ul className="list-none space-y-0.5 text-xs">
                    <li>1–2 instrument mics</li>
                    <li>DI boxes for keys/tracks</li>
                    <li>2 stage monitors</li>
                    <li>Warm, cinematic lighting</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-gold uppercase tracking-widest text-[10px] mb-3 border-b border-white/10 print:border-black/10 pb-1 print:text-black font-bold">Links & Assets</h2>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <strong className="block font-medium text-gold print:text-black mb-1">Music</strong>
                  <ul className="text-paper/60 print:text-black/60 space-y-0.5">
                    <li>Spotify</li>
                    <li>Apple Music</li>
                    <li>YouTube</li>
                    <li>SoundCloud</li>
                  </ul>
                </div>
                <div>
                  <strong className="block font-medium text-gold print:text-black mb-1">Video & Photo</strong>
                  <ul className="text-paper/60 print:text-black/60 space-y-0.5">
                    <li>Official Videos</li>
                    <li>Live Performances</li>
                    <li>Hi-Res Portraits</li>
                    <li>Performance Shots</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-gold uppercase tracking-widest text-[10px] mb-3 border-b border-white/10 print:border-black/10 pb-1 print:text-black font-bold">Contact</h2>
              <div className="text-paper/80 font-light text-sm leading-relaxed print:text-black/80 space-y-1">
                <p><span className="font-medium text-xs uppercase text-gold print:text-black/60 w-16 inline-block">Booking:</span> booking@askinstudios.com</p>
                <p><span className="font-medium text-xs uppercase text-gold print:text-black/60 w-16 inline-block">Press:</span> info@askinstudios.com</p>
                <p><span className="font-medium text-xs uppercase text-gold print:text-black/60 w-16 inline-block">General:</span> info@askinstudios.com</p>
                <p className="mt-2 text-xs"><span className="font-medium uppercase text-gold print:text-black/60">Studio:</span> Aşkın Studios, Rochester NY</p>
              </div>
            </section>

          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-white/10 print:border-black/10 text-center flex justify-between items-end">
             <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-paper/40 print:text-black/40">Branding Requirements</p>
                <p className="text-[10px] text-paper/60 print:text-black/60">Text‑based logo only • Gold/White hierarchy • Midnight Blue Theme</p>
             </div>
             <div className="text-right">
                <p className="text-gold font-serif italic print:text-black">askinstudios.com</p>
             </div>
        </footer>

      </div>
    </div>
  );
};

export default FestivalEPK;
