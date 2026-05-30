import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Download, Youtube, Music, Sparkles, Share2, Check, TrendingUp, BookOpen, Globe } from 'lucide-react';
import { CinematicBackground } from '../components/common/CinematicBackground';

const Anthem = () => {
  const [copied, setCopied] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [videoId, setVideoId] = useState("BiAViHwWBk4"); 
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-transparent min-h-screen text-paper relative">
      <Helmet>
        <title>Biz Demeden Bitmez | Aşkın Studios</title>
        <meta name="description" content="Türkiye 2026 Dünya Kupası Marşı | Produced by Aşkın Studios. Discover the official cinematic soccer anthem blending traditional rhythms and epic orchestration." />
        <meta property="og:title" content="Biz Demeden Bitmez – Türkiye 2026 Dünya Kupası Marşı" />
        <meta property="og:description" content="Produced by Aşkın Studios. Feel the spirit of unity and victory with our epic cinematic anthem." />
        <meta property="og:type" content="music.song" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "Biz Demeden Bitmez - Türkiye 2026 Dünya Kupası Marşı",
            "description": "Türkiye’nin sarsılmaz birlik ruhunu ve coşkusunu, geleneksel Türk ritimleri ve modern sinematik orkestrasyonla harmanlayan muhteşem bir zafer marşı.",
            "thumbnailUrl": "https://askinstudios.com/Turkiye_Grammy_2013.jpg",
            "uploadDate": "2026-05-30",
            "embedUrl": `https://www.youtube.com/embed/${videoId}`
          })}
        </script>
      </Helmet>

      <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="Türkiye National Football Anthem" />

      {/* Hero Section */}
      <section className="page-hero pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-radial-at-b from-blue-950/20 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Elegant Language Pill Switcher */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <button
                  onClick={() => setLang('TR')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${lang === 'TR' ? 'bg-gold text-ink font-bold shadow-lg shadow-gold/20' : 'text-paper/60 hover:text-white'}`}
                >
                  Türkçe
                </button>
                <button
                  onClick={() => setLang('EN')}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${lang === 'EN' ? 'bg-gold text-ink font-bold shadow-lg shadow-gold/20' : 'text-paper/60 hover:text-white'}`}
                >
                  English
                </button>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] uppercase tracking-[0.2em] mb-6">
              <Sparkles size={12} /> {lang === 'TR' ? 'Özel Yayın • 2026 Dünya Kupası Özel' : 'Special Release • 2026 World Cup Special'}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic mb-6 leading-tight text-white">
              Biz Demeden <span className="text-gold">Bitmez</span>
            </h1>
            <p className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 block leading-relaxed font-medium">
              {lang === 'TR' 
                ? 'Türkiye 2026 Dünya Kupası Resmi Olmayan Marşı • Produced by Aşkın Studios' 
                : 'Turkey 2026 World Cup Unofficial Anthem • Produced by Aşkın Studios'}
            </p>
            <p className="text-paper/70 font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
              {lang === 'TR'
                ? 'Türkiye’nin sarsılmaz birlik ruhunu ve coşkusunu, geleneksel Türk ritimleri ve modern sinematik orkestrasyonla harmanlayan muhteşem bir zafer marşı. Aşkın Studios gururla sunar.'
                : 'A magnificent victory anthem blending Turkey’s unwavering spirit of unity and sports excitement with traditional Turkish rhythms and grand cinematic orchestration. Proudly presented by Aşkın Studios.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content (Branded Anthem Area) */}
      <section className="py-12 md:py-20 px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Visualizer & Video Frame (Left Column) */}
            <div className="lg:col-span-8 space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="aspect-video bg-black/45 rounded-sm overflow-hidden shadow-2xl border border-white/10 relative group"
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0`}
                  title="Biz Demeden Bitmez – Türkiye 2026 Dünya Kupası Marşı"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href={`https://www.youtube.com/watch?v=${videoId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-8 py-4 bg-gold text-ink font-semibold uppercase tracking-widest text-xs hover:bg-white hover:text-ink transition-all duration-500 rounded-sm shadow-lg"
                >
                  <Youtube size={16} fill="currentColor" /> {lang === 'TR' ? "YouTube'dan Dinle" : "Watch on YouTube"}
                </a>
                <button 
                  onClick={() => setDownloadModal(true)}
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-8 py-4 border border-white/10 hover:border-gold/50 text-white font-semibold uppercase tracking-widest text-xs hover:bg-gold/5 hover:text-gold transition-all duration-500 rounded-sm"
                >
                  <Download size={16} /> {lang === 'TR' ? "MP3 Dosyasını İndir" : "Download MP3"}
                </button>
                <button 
                  onClick={handleCopyLink}
                  className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-gold/50 text-paper/60 hover:text-gold transition-colors duration-300 rounded-sm"
                  title="Share Anthem Link"
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <Share2 size={18} />}
                </button>
              </div>

              {/* Project Story / Concept */}
              <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif italic text-white flex items-center gap-3">
                    <Music className="text-gold" size={20} /> {lang === 'TR' ? 'Projenin Sanatsal Hikayesi & Yapım Notları' : 'Behind the Project & Production Notes'}
                  </h3>
                  <p className="text-paper/80 font-light text-base leading-relaxed text-justify">
                    {lang === 'TR' ? (
                      <>
                        <strong>"Biz Demeden Bitmez"</strong>, Türk spor tarihinin efsanevi inanmışlık ruhunu ve son saniyeye kadar pes etmeyen asil duruşunu küresel çağdaş müzikle canlandırmak için bestelendi. Aşkın Studios'un özgün vizyonuyla hayata geçen bu eser, geleneksel Türk tınılarının modern batı senfonisiyle buluştuğu yüksek enerjili bir <strong>cinematic world music</strong> projesidir.
                      </>
                    ) : (
                      <>
                        <strong>"Biz Demeden Bitmez"</strong> was composed to breathe life into the legendary spirit of faith in Turkish sports history, capturing the noble stance of never giving up until the final whistle. Brought to life by the distinct vision of Aşkın Studios, this high-energy cinematic world music project blends traditional oriental elements with grand Western orchestration.
                      </>
                    )}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
                  <h4 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                    {lang === 'TR' ? 'Prodüksiyon & Enstrümantal Derinlik (Production & Instruments)' : 'Production & Instrumental Richness'}
                  </h4>
                  <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                    {lang === 'TR' ? (
                      <>
                        Aşkın Şerbetçi liderliğinde gerçekleştirilen prodüksiyonda batının güçlü yaylı enstrümanları ve epik sinematik davulları, doğunun sarsıcı ve can alıcı nefeslileri ile bir araya geliyor. Bu özel <strong>traditional instrumental soul production</strong> tarzı, derinliği hisseden her dinleyicide doğrudan bir aidiyet ve zafer arzusu uyandırır. Yaylı düzenlemelerdeki ritmik dinamizm, sahadaki sarsılmaz iradeyi temsil ederken, solo enstrümanlar ise coğrafyamızın asil hüznünü ve tutkusunu taşır.
                      </>
                    ) : (
                      <>
                        Led by Aşkın Şerbetçi, the production unites powerful Western string and brass instruments with epic cinematic percussion and evocative Middle Eastern woodwinds. This authentic <strong>traditional instrumental soul production</strong> style ignites a deep sense of belonging and passion for victory in every listener.
                      </>
                    )}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-light text-paper/80 pt-2">
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      {lang === 'TR' ? (
                        <span><strong>Ney & Kaval:</strong> Ruhun sonsuz sükunetini ve aynı zamanda fırtına öncesi o asil sessizliği tasvir eder.</span>
                      ) : (
                        <span><strong>Ney & Kaval:</strong> Depicting the infinite tranquility of the soul and the noble silence before the storm.</span>
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      {lang === 'TR' ? (
                        <span><strong>Asma Davul & Kudüm:</strong> Kalp atışlarimizi, stadyumu inleten o gök gürültülü taraftar coşkusunu simgeler.</span>
                      ) : (
                        <span><strong>Asma Davul & Kudüm:</strong> Symbolizing our heartbeats and the thunderous, stadium-shaking energy of the fans.</span>
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      {lang === 'TR' ? (
                        <span><strong>Orkestral Brass ve Strings:</strong> Modern Hollywood tınılarını aratmayan derinlikte epik bir zafer koridoru açar.</span>
                      ) : (
                        <span><strong>Orkestral Brass & Strings:</strong> Forging an epic corridor of victory with Hollywood-level cinematic depth.</span>
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      {lang === 'TR' ? (
                        <span><strong>Sentezleyici Atmosferleri:</strong> 2026 tınısını yakalayan, geleceğin modern soundscape'ini kuran elektronik katmanlar.</span>
                      ) : (
                        <span><strong>Synthesized Textures:</strong> Electronic soundscapes establishing a futuristic 2026 sonic dimension.</span>
                      )}
                    </li>
                  </ul>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
                  <h4 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                    {lang === 'TR' ? 'Müzikal Bölümler & Anlatım (The Musical Chapters)' : 'Musical Chapters & Journey'}
                  </h4>
                  <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                    {lang === 'TR' ? 'Eser, doğrusal bir döngüden ziyade tıpkı heyecan dolu bir 90 dakika gibi sinematik bölümler (chapters) halinde dinleyiciyi sürükler:' : 'Rather than a linear loop, the experience propels the listener through cinematic chapters resembling an intense 90-minute match:'}
                  </p>
                  <div className="space-y-3 pl-4 border-l border-gold/30">
                    <p className="text-xs text-paper/80 font-light">
                      <strong className="text-white font-serif italic">00:00 - {lang === 'TR' ? 'Ney Girişi & Sessiz Ant:' : 'Ney Intro & Silent Oath:'}</strong> {lang === 'TR' ? 'Sahaya ilk adım, sarsılmaz bir kararlılık ve tüm ülkenin nefesini tuttuğu o ilk anlar.' : 'Stepping onto the pitch—unwavering determination as the entire nation holds its breath.'}
                    </p>
                    <p className="text-xs text-paper/80 font-light">
                      <strong className="text-white font-serif italic">00:35 - {lang === 'TR' ? 'Ritmik Yükseliş & Mücadele:' : 'Rhythmic Escalation & Struggle:'}</strong> {lang === 'TR' ? 'Davulların ve epik yaylıların oyuna girişi. Sahadaki ter, mücadele ve birliktelik.' : 'The grand entrance of heavy percussion and epic strings. Sweat, grit, and solidarity.'}
                    </p>
                    <p className="text-xs text-paper/80 font-light">
                      <strong className="text-white font-serif italic">01:15 - {lang === 'TR' ? 'Büyük Triumf (Zafer Teması):' : 'Grand Triumph:'}</strong> {lang === 'TR' ? 'Tüm orkestra ve koronun birleşerek kırmızı-beyaz ruhu göklere çıkardığı doruk noktası.' : 'The culmination of the entire orchestra and chorus lifting the red-and-white spirits to the heavens.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Metadata & Lyrics (Right Column) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Project Meta Card */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm space-y-6">
                <h4 className="text-gold uppercase tracking-widest text-xs font-semibold border-b border-white/10 pb-3">
                  {lang === 'TR' ? 'Proje Künyesi' : 'Project Credits'}
                </h4>
                <ul className="space-y-4 text-sm font-light text-paper/80">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-paper/40">{lang === 'TR' ? 'Yapım / Prodüksiyon' : 'Production'}</span>
                    <strong className="text-white font-medium">Aşkın Studios</strong>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-paper/40">{lang === 'TR' ? 'Besteci / Aranjör' : 'Composer / Arranger'}</span>
                    <strong className="text-white font-medium">Aşkın Şerbetçi</strong>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-paper/40">{lang === 'TR' ? 'Yayın Dönemi' : 'Launch Period'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '2026 Dünya Kupası Özel' : '2026 World Cup Special'}</strong>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-paper/40">{lang === 'TR' ? 'Tarz' : 'Genre'}</span>
                    <strong className="text-white font-medium">Epic, Cinematic Fusion</strong>
                  </li>
                  <li className="flex justify-between items-center pb-1">
                    <span className="text-paper/40">{lang === 'TR' ? 'Mevcut Durum' : 'Status'}</span>
                    <span className="px-2 py-0.5 rounded-sm bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] uppercase tracking-wider">
                      {lang === 'TR' ? 'Viral Büyüme' : 'Viral Sensation'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Dynamic Stats Banner */}
              <div className="p-6 bg-[#0B1222]/80 border border-gold/20 rounded-sm flex flex-col items-center justify-center text-center">
                <span className="text-gold font-serif text-3xl font-bold tracking-tight mb-1">
                  60,000+
                </span>
                <span className="text-[10px] text-paper/40 uppercase tracking-[0.2em]">
                  {lang === 'TR' ? 'İlk Günlerde İzlenme' : 'Views in the Opening Days'}
                </span>
              </div>

              {/* Lyrics Block */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm space-y-6">
                <h4 className="text-gold uppercase tracking-widest text-xs font-semibold border-b border-white/10 pb-3">
                  {lang === 'TR' ? 'Marş Sözleri (Tezahürat)' : 'Lyrics (Chant)'}
                </h4>
                <div className="space-y-6 font-serif italic text-base text-paper/90 leading-relaxed text-center">
                  {lang === 'TR' ? (
                    <>
                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Giriş / Verse 1</span>
                        <p>Haydi Kupaya, sahadayız şimdi</p>
                        <p>Ay yıldız uğruna savaşır her milli</p>
                        <p>Tribünde yankılanır tek bir isim <span className="text-gold font-bold font-sans not-italic">(Türkiye!)</span></p>
                        <p>Bu forma üstümüzde, kalptedir yemin</p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Verse 2</span>
                        <p>Dalgalanır bayrakla coşar nefesim</p>
                        <p>Doksanda da pes etmez canım milletim</p>
                        <p>Dalgalanır bayrakla coşar nefesim</p>
                      </div>

                      <div className="py-2 border-y border-white/5 bg-white/[0.02]">
                        <span className="block text-[9px] text-red-400 uppercase tracking-widest mb-1 not-italic font-sans font-semibold">[BREAK] [SILENCE, THEN EVERYONE]</span>
                        <p className="text-gold font-bold text-lg leading-relaxed scale-105 transform transition-all duration-300">
                          (SHHH!...) Biz Demeden Bitmez!
                        </p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Köprü / Build-Up</span>
                        <p>Senle gururum sınır tanımaz</p>
                        <p>Son dokunuşun gol olsun duam</p>
                        <p>Sahadaki aslanımızsın kalpten</p>
                        <p>Türkiye Evladıyla yürür kupaya</p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Gelişme</span>
                        <p>Son dokunuşun gol olsun duam</p>
                        <p>Sahadaki aslanımızsın kalpten</p>
                        <p>Bizim çocuklar yürür kupaya</p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans font-medium">Koro / Chorus</span>
                        <p>Senle gururum sınır tanımaz</p>
                        <p>Son dokunuşun gol olsun duam</p>
                        <p>Sahadaki aslanımızsın kalpten</p>
                        <p>Türkiye Evladıyla yürür kupaya</p>
                      </div>

                      <div className="py-2 border-y border-white/5 bg-white/[0.02]">
                        <span className="block text-[9px] text-red-400 uppercase tracking-widest mb-1 not-italic font-sans font-semibold">(Whole stadium silence and everyone)</span>
                        <p className="text-gold font-bold text-lg leading-relaxed scale-105 transform transition-all duration-300">
                          (SHHH!...) Biz Demeden Bitmez!
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="block text-[10px] text-gold uppercase tracking-widest mb-1 not-italic font-sans">Kapanış / Outro</span>
                        <p className="text-white font-medium">Kırmızı, Beyaz, Kırmızı, Beyaz,</p>
                        <p className="text-gold font-bold text-lg font-sans not-italic tracking-wide mt-1">En Büyük Türkiye,</p>
                        <p className="text-paper/80">Türkiye, Türkiye, Türkiye</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Intro / Verse 1</span>
                        <p>Off to the Cup, we're on the pitch now</p>
                        <p>Every national battles for the crescent and star</p>
                        <p>A single name echoes in the stands <span className="text-gold font-bold font-sans not-italic">(Turkey!)</span></p>
                        <p>This jersey is on us, our oath is in our hearts</p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Verse 2</span>
                        <p>Our breath overflows as the flag waves</p>
                        <p>My beloved nation never gives up, even in the 90th</p>
                        <p>Our breath overflows as the flag waves</p>
                      </div>

                      <div className="py-2 border-y border-white/5 bg-white/[0.02]">
                        <span className="block text-[9px] text-red-400 uppercase tracking-widest mb-1 not-italic font-sans font-semibold">[BREAK] [SILENCE, THEN EVERYONE]</span>
                        <p className="text-gold font-bold text-lg leading-relaxed scale-105 transform transition-all duration-300">
                          (SHHH!...) It's Not Over Till We Say So!
                        </p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Bridge / Build-Up</span>
                        <p>My pride in you knows no bounds</p>
                        <p>My prayer is that your last touch becomes a goal</p>
                        <p>You are our lion on the field, from the heart</p>
                        <p>Turkey marches to the cup with its children</p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans">Development</span>
                        <p>My prayer is that your last touch becomes a goal</p>
                        <p>You are our lion on the field, from the heart</p>
                        <p>Our boys march to the cup</p>
                      </div>

                      <div>
                        <span className="block text-[10px] text-paper/40 uppercase tracking-widest mb-1 not-italic font-sans font-medium">Chorus</span>
                        <p>My pride in you knows no bounds</p>
                        <p>My prayer is that your last touch becomes a goal</p>
                        <p>You are our lion on the field, from the heart</p>
                        <p>Turkey marches to the cup with its children</p>
                      </div>

                      <div className="py-2 border-y border-white/5 bg-white/[0.02]">
                        <span className="block text-[9px] text-red-400 uppercase tracking-widest mb-1 not-italic font-sans font-semibold">(Whole stadium silence and everyone)</span>
                        <p className="text-gold font-bold text-lg leading-relaxed scale-105 transform transition-all duration-300">
                          (SHHH!...) It's Not Over Till We Say So!
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="block text-[10px] text-gold uppercase tracking-widest mb-1 not-italic font-sans">Outro</span>
                        <p className="text-white font-medium">Red, White, Red, White,</p>
                        <p className="text-gold font-bold text-lg font-sans not-italic tracking-wide mt-1">Greatest is Turkey,</p>
                        <p className="text-paper/80">Turkey, Turkey, Turkey</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Viral Growth & Project Info Section */}
      <section id="anthem-info" className="py-12 md:py-20 px-4 md:px-8 border-t border-white/5 bg-black/20 backdrop-blur-[2px] relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold">
                <TrendingUp size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif italic text-gold">
                {lang === 'TR' ? 'Viral Büyüme & Proje Özeti' : 'Viral Growth & Project Summary'}
              </h2>
            </div>

            <p className="text-paper/80 font-light text-base md:text-lg leading-relaxed text-justify">
              {lang === 'TR' 
                ? '“Biz Demeden Bitmez” yayınlandıktan kısa süre sonra on binlerce izlenmeye ulaşarak güçlü bir viral ivme yakaladı. Yüksek izlenme süresi, yüksek beğeni oranı ve uluslararası izleyici kitlesiyle YouTube algoritmasında öne çıkan bir proje haline geldi.'
                : 'Shortly after its release, "Biz Demeden Bitmez" swept digital spaces, generating tens of thousands of video views and a powerful viral momentum. Its stellar audience retention and overwhelmingly high appreciation rate have made it a standout performance on the YouTube algorithm.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm space-y-4">
                <h4 className="text-gold uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">
                  {lang === 'TR' ? 'Milli İlgi & İzlenim İstatistikleri' : 'National Resonance & Watch Metrics'}
                </h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-paper/60 font-light">{lang === 'TR' ? 'İlk Günlerde' : 'Early Days'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '60.000+ izlenme' : '60,000+ Views'}</strong>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-paper/60 font-light">{lang === 'TR' ? 'İzlenme Süresi' : 'Watch Time'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '1.300+ saat' : '1,300+ Hours'}</strong>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-paper/60 font-light">{lang === 'TR' ? 'Beğeni Oranı' : 'Appreciation Ratio'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '%94.4' : '94.4% Positive'}</strong>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm space-y-4">
                <h4 className="text-gold uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">
                  {lang === 'TR' ? 'Kitle & Cihaz Dağılımı' : 'Demographics & Device Metrics'}
                </h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-paper/60 font-light">{lang === 'TR' ? 'Ortalama İzlenme' : 'Average Retention'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '%57.6 retention (tutundurma)' : '57.6% (Exceptional)'}</strong>
                  </li>
                  <li className="flex justify-between text-sm border-b border-white/5 pb-2">
                    <span className="text-paper/60 font-light">{lang === 'TR' ? 'En Çok İzlenen Ülkeler' : 'Top Geographies'}</span>
                    <strong className="text-white font-medium text-right text-xs">
                      {lang === 'TR' ? 'Azerbaycan, Türkiye, ABD, Bosna, Almanya' : 'Azerbaijan, Turkey, USA, Bosnia, Germany'}
                    </strong>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-paper/60 font-light">{lang === 'TR' ? 'Cihaz Dağılımı' : 'Device Split'}</span>
                    <strong className="text-white font-medium">{lang === 'TR' ? '%64 TV izleyicisi (yüksek etkileşim)' : '64% Connected TV (High Engagement)'}</strong>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-paper/70 font-light text-base leading-relaxed text-justify">
              {lang === 'TR'
                ? 'Bu proje, Türkiye’nin birlik ruhunu ve Dünya Kupası heyecanını sinematik bir anlatımla bir araya getirerek geniş bir kitleye ulaşmayı başardı. Studio Askin’in imzasını taşıyan bu marş, uluslararası izleyiciler tarafından da ilgiyle karşılandı.'
                : 'By blending the unwavering spirit of Turkey’s national team with standard world-class cinematic orchestrations, this unofficial anthem succeeds in gathering a broad demographic under one rhythmic pulse. Released independently under Studio Aşkın, it has captured the attention of dynamic global audiences.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Behind the Anthem - Brand Aligned Section */}
      <section id="behind-anthem" className="py-16 md:py-24 px-4 md:px-8 border-t border-white/5 bg-[#0a0f1c]/40 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold bg-[#0a0f1c]">
                <BookOpen size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif italic text-gold">
                {lang === 'TR' ? 'Marşın Ardındaki Hikâye' : 'Story Behind the Anthem'}
              </h2>
            </div>

            <p className="text-paper/80 font-light text-base md:text-lg leading-relaxed text-justify">
              {lang === 'TR'
                ? '“Biz Demeden Bitmez”, Türkiye’nin birlik, güç ve dayanışma ruhunu yansıtmak için sinematik bir yaklaşımla tasarlandı. Bu proje, sadece bir marş değil; milyonların aynı anda hissettiği ortak bir enerji fikri üzerine inşa edildi.'
                : '"Biz Demeden Bitmez" was envisioned to encapsulate Turkey\'s deep-rooted solidarity, raw power, and passion on the grandest stages. It represents more than a song; it\'s a dynamic acoustic frequency uniting millions under one colossal pulse.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <h3 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                  {lang === 'TR' ? 'Vizyon' : 'The Vision'}
                </h3>
                <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                  {lang === 'TR'
                    ? 'Amaç, modern prodüksiyon tekniklerini geleneksel Türk ritimleriyle birleştirerek uluslararası arenada yankı uyandıracak bir marş yaratmaktı. Büyük davullar, koro katmanları, darbuka dokunuşları ve epik sinematik unsurlar bu vizyonun temelini oluşturdu.'
                    : 'The primary objective was to align cutting-edge modern pop-orchestral production with authentic Turkish rhythms, achieving a world-class hybrid sound. Massive stadium drums, epic choral walls, responsive darbuka rolls, and brass stabs form the pillars of this release.'}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                  {lang === 'TR' ? 'Prodüksiyon Süreci' : 'Production Process'}
                </h3>
                <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                  {lang === 'TR'
                    ? 'Stüdyo aşamasında yüzlerce vokal katmanı, geniş stereo davul kayıtları ve orkestral elementler bir araya getirildi. Her bölüm, stadyum atmosferini hissettirecek şekilde tasarlandı. Sessizlikten sonra gelen toplu “Biz Demeden Bitmez” çıkışı, marşın imza anı olarak planlandı.'
                    : 'Engineered at Studio Aşkın over extensive tracking sessions, the arrangement weaves together hundreds of backing vocal layers, wide acoustic drum room recordings, and custom orchestral patches. Every dynamic crescendo was curated to echo standard stadium atmospheres.'}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                  {lang === 'TR' ? 'Duygusal Çekirdek' : 'Emotional Core'}
                </h3>
                <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                  {lang === 'TR'
                    ? <>Marşın merkezinde tek bir fikir var: <strong className="text-white font-medium">“Birlik olmadan zafer olmaz.”</strong> Bu duygu, hem müzikal yapıda hem de sözlerin ritminde kendini gösteriyor.</>
                    : <>At the absolute focus is a singular, humble message: <strong className="text-white font-medium font-sans">"Without unity, there can be no victory."</strong> This emotional core is felt in the heavy, breathless pacing of the lyrics and instrumentation.</>}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                  {lang === 'TR' ? 'Küresel Etki' : 'Global Reach'}
                </h3>
                <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                  {lang === 'TR'
                    ? 'Yayınlandıktan sonra marş, Türkiye’nin ötesine geçerek Azerbaycan, ABD, Almanya ve Balkan ülkelerinde hızla yayılmaya başladı. Yüksek izlenme süresi ve güçlü izleyici tutma oranı, marşın uluslararası izleyiciler tarafından benimsendiğini gösteriyor.'
                    : 'Immediately following its debut, the anthem crossed borders and captured listeners across Azerbaijan, the United States, Germany, and the Balkans. High playback rates and dynamic audience retention demonstrate its cross-cultural appeal.'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* International Reach - Brand Aligned Section */}
      <section id="international-reach" className="py-16 md:py-24 px-4 md:px-8 border-t border-white/5 bg-black/10 backdrop-blur-[2px] relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold bg-[#0a0f1c]">
                <Globe size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif italic text-gold">
                {lang === 'TR' ? 'Uluslararası Erişim' : 'International Reach'}
              </h2>
            </div>

            <p className="text-paper/80 font-light text-base md:text-lg leading-relaxed text-justify">
              {lang === 'TR'
                ? '“Biz Demeden Bitmez”, yayınlandıktan kısa süre sonra yalnızca Türkiye’de değil, dünya genelinde de güçlü bir izleyici kitlesine ulaştı. Marş, diaspora toplulukları, spor kültürü ve uluslararası müzik dinleyicileri arasında hızla yayılıyor.'
                : 'After its release, “Biz Demeden Bitmez” quickly expanded beyond Turkey and began resonating with audiences worldwide. The anthem is spreading rapidly among diaspora communities, sports culture, and international music listeners.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm space-y-4">
                <h4 className="text-gold uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">
                  {lang === 'TR' ? 'Küresel Yayılım' : 'Global Distribution'}
                </h4>
                <ul className="space-y-3 font-light text-sm text-paper/80">
                  <li className="flex justify-between items-start border-b border-white/5 pb-2">
                    <strong className="text-gold font-medium">{lang === 'TR' ? 'Azerbaycan:' : 'Azerbaijan:'}</strong>
                    <span className="text-right pl-4">{lang === 'TR' ? 'Güçlü kültürel bağlar ve yüksek izlenme oranı.' : 'Strong cultural ties and high engagement.'}</span>
                  </li>
                  <li className="flex justify-between items-start border-b border-white/5 pb-2">
                    <strong className="text-gold font-medium">{lang === 'TR' ? 'Türkiye:' : 'Turkey:'}</strong>
                    <span className="text-right pl-4">{lang === 'TR' ? 'Ana izleyici kitlesi ve yoğun etkileşim.' : 'Primary audience with intense interaction.'}</span>
                  </li>
                  <li className="flex justify-between items-start border-b border-white/5 pb-2">
                    <strong className="text-gold font-medium">{lang === 'TR' ? 'Amerika Birleşik Devletleri:' : 'United States:'}</strong>
                    <span className="text-right pl-4">{lang === 'TR' ? 'Türk diasporası ve spor toplulukları.' : 'Turkish diaspora and sports communities.'}</span>
                  </li>
                  <li className="flex justify-between items-start border-b border-white/5 pb-2">
                    <strong className="text-gold font-medium">{lang === 'TR' ? 'Almanya:' : 'Germany:'}</strong>
                    <span className="text-right pl-4">{lang === 'TR' ? 'Avrupa’daki en büyük Türk topluluklarından biri.' : 'One of Europe’s largest Turkish populations.'}</span>
                  </li>
                  <li className="flex justify-between items-start">
                    <strong className="text-gold font-medium">{lang === 'TR' ? 'Balkanlar:' : 'The Balkans:'}</strong>
                    <span className="text-right pl-4">{lang === 'TR' ? 'Ritmik yapı ve kültürel yakınlık nedeniyle güçlü ilgi.' : 'Strong interest due to rhythmic and cultural familiarity.'}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-gold uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">
                    {lang === 'TR' ? 'Küresel Birlik Mesajı' : 'Global Message of Unity'}
                  </h4>
                  <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                    {lang === 'TR'
                      ? 'Bu uluslararası dağılım, marşın yalnızca bir şarkı değil, ortak bir duygu ve birlik çağrısı olarak benimsendiğini gösteriyor. Sınırları aşan melodilerimiz, taraftarları nerede olurlarsa olsunlar tek bir yürek halinde birleştiriyor.'
                      : 'This global distribution shows that the anthem is embraced not just as a song, but as a shared emotion and a call for unity. Our border-crossing melodies unite fans into a single heartbeat, wherever they may be.'}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-between items-center text-xs font-medium text-gold">
                  <span>{lang === 'TR' ? 'Küresel Hedef Kitle' : 'Global Reach Target'}</span>
                  <span className="px-2 py-0.5 rounded-sm bg-gold/10 border border-gold/20 text-[10px] uppercase tracking-wider">
                    WORLDWIDE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download Alert Modal */}
      <AnimatePresence>
        {downloadModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setDownloadModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-[#0B1222] border border-gold/30 p-8 rounded-sm max-w-md w-full text-center space-y-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto text-gold">
                <Music size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif italic text-white">{lang === 'TR' ? '"Biz Demeden Bitmez" MP3' : '"Biz Demeden Bitmez" MP3'}</h3>
                <p className="text-paper/60 text-sm font-light">
                  {lang === 'TR' 
                    ? 'Dünya Kupası Özel Marşı MP3 dosyasını doğrudan Google Drive üzerinden cihazınıza indirebilirsiniz!'
                    : 'Download the World Cup Special Anthem wave/MP3 directly to your device via Google Drive!'}
                </p>
                <p className="text-gold text-xs uppercase tracking-widest font-semibold pt-2">
                  {lang === 'TR' ? 'Resmi Yüksek Kaliteli Sürüm (320kbps)' : 'Official Premium Master (320kbps)'}
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-4">
                <a 
                  href="https://drive.google.com/file/d/1bkDNe9FfWJFr7Ao3o-h7uWYLWQRkAH1c/view?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-gold text-ink font-semibold uppercase tracking-widest text-[10px] hover:bg-white hover:text-ink transition-all duration-300 rounded-sm text-center flex items-center justify-center gap-2"
                >
                  <Download size={14} /> {lang === 'TR' ? "MP3 DOSYASINI İNDİR (GOOGLE DRIVE)" : "DOWNLOAD MP3 FILE (GOOGLE DRIVE)"}
                </a>
                <div className="flex gap-3 w-full">
                  <a 
                    href={`https://www.youtube.com/watch?v=${videoId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 border border-white/10 hover:border-gold/30 hover:bg-gold/5 text-paper/85 font-semibold uppercase tracking-widest text-[9px] hover:text-gold transition-colors rounded-sm text-center"
                  >
                    {lang === 'TR' ? "YouTube'dan Dinle" : "Listen on YouTube"}
                  </a>
                  <button 
                    onClick={() => setDownloadModal(false)}
                    className="flex-1 py-2.5 border border-white/10 hover:bg-white/5 text-paper/60 font-semibold uppercase tracking-widest text-[9px] transition-colors rounded-sm"
                  >
                    {lang === 'TR' ? "Vazgeç" : "Cancel"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Anthem;
 