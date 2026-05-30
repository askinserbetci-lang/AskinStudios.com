import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Play, Download, Youtube, Music, Sparkles, Share2, Clipboard, Check, TrendingUp } from 'lucide-react';
import { CinematicBackground } from '../components/common/CinematicBackground';

const Anthem = () => {
  const [copied, setCopied] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);

  // You can change this ID when the official video is launched!
  // Current working placeholder is the official "Mine Gecili Deli Gönül (2026 Version)" video.
  const [videoId, setVideoId] = useState("BiAViHwWBk4"); 

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
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] uppercase tracking-[0.2em] mb-6">
              <Sparkles size={12} /> Special Release • 2026 Dünya Kupası Özel
            </span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif italic mb-6 leading-tight text-white">
              Biz Demeden <span className="text-gold">Bitmez</span>
            </h1>
            <p className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 block leading-relaxed font-medium">
              Türkiye 2026 Dünya Kupası Resmi Olmayan Marşı • Produced by Aşkın Studios
            </p>
            <p className="text-paper/70 font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
              Türkiye’nin sarsılmaz birlik ruhunu ve coşkusunu, geleneksel Türk ritimleri ve modern sinematik orkestrasyonla harmanlayan muhteşem bir zafer marşı. Aşkın Studios gururla sunar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content (Branded Anthem Area) */}
      <section className="py-20 px-6 relative z-10">
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
                  <Youtube size={16} fill="currentColor" /> Watch on YouTube
                </a>
                <button 
                  onClick={() => setDownloadModal(true)}
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-8 py-4 border border-white/10 hover:border-gold/50 text-white font-semibold uppercase tracking-widest text-xs hover:bg-gold/5 hover:text-gold transition-all duration-500 rounded-sm"
                >
                  <Download size={16} /> Download MP3
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
                    <Music className="text-gold" size={20} /> Projenin Sanatsal Hikayesi & Yapım Notları
                  </h3>
                  <p className="text-paper/80 font-light text-base leading-relaxed text-justify">
                    <strong>"Biz Demeden Bitmez"</strong>, Türk spor tarihinin efsanevi inanmışlık ruhunu ve son saniyeye kadar pes etmeyen asil duruşunu küresel çağdaş müzikle canlandırmak için bestelendi. Aşkın Studios'un özgün vizyonuyla hayata geçen bu eser, geleneksel Türk tınılarının modern batı senfonisiyle buluştuğu yüksek enerjili bir <strong>cinematic world music</strong> projesidir.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
                  <h4 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                    Prodüksiyon & Enstrümantal Derinlik (Production & Instruments)
                  </h4>
                  <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                    Aşkın Şerbetçi liderliğinde gerçekleştirilen prodüksiyonda batının güçlü yaylı enstrümanları ve epik sinematik davulları, doğunun sarsıcı ve can alıcı nefeslileri ile bir araya geliyor. Bu özel <strong>traditional instrumental soul production</strong> tarzı, derinliği hisseden her dinleyicide doğrudan bir aidiyet ve zafer arzusu uyandırır. Yaylı düzenlemelerdeki ritmik dinamizm, sahadaki sarsılmaz iradeyi temsil ederken, solo enstrümanlar ise coğrafyamızın asil hüznünü ve tutkusunu taşır.
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-light text-paper/80 pt-2">
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      <span><strong>Ney & Kaval:</strong> Ruhun sonsuz sükunetini ve aynı zamanda fırtına öncesi o asil sessizliği tasvir eder.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      <span><strong>Asma Davul & Kudüm:</strong> Kalp atışlarımızı, stadyumu inleten o gök gürültülü taraftar coşkusunu simgeler.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      <span><strong>Orkestral Brass ve Strings:</strong> Modern Hollywood tınılarını aratmayan derinlikte epik bir zafer koridoru açar.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold">•</span>
                      <span><strong>Sentezleyici Atmosferleri:</strong> 2026 tınısını yakalayan, geleceğin modern soundscape'ini kuran elektronik katmanlar.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
                  <h4 className="text-gold uppercase tracking-[0.2em] text-xs font-semibold">
                    Müzikal Bölümler & Anlatım (The Musical Chapters)
                  </h4>
                  <p className="text-paper/70 font-light text-sm leading-relaxed text-justify">
                    Eser, doğrusal bir döngüden ziyade tıpkı heyecan dolu bir 90 dakika gibi sinematik bölümler (chapters) halinde dinleyiciyi sürükler:
                  </p>
                  <div className="space-y-3 pl-4 border-l border-gold/30">
                    <p className="text-xs text-paper/80 font-light">
                      <strong className="text-white font-serif italic">00:00 - Ney Girişi & Sessiz Ant:</strong> Sahaya ilk adım, sarsılmaz bir kararlılık ve tüm ülkenin nefesini tuttuğu o ilk anlar.
                    </p>
                    <p className="text-xs text-paper/80 font-light">
                      <strong className="text-white font-serif italic">00:35 - Ritmik Yükseliş & Mücadele:</strong> Davulların ve epik yaylıların oyuna girişi. Sahadaki ter, mücadele ve birliktelik.
                    </p>
                    <p className="text-xs text-paper/80 font-light">
                      <strong className="text-white font-serif italic">01:15 - Büyük Triumf (Zafer Teması):</strong> Tüm orkestra ve koronun birleşerek kırmızı-beyaz ruhu göklere çıkardığı doruk noktası.
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
                  Proje Künyesi
                </h4>
                <ul className="space-y-4 text-sm font-light text-paper/80">
                  <li className="flex justify-between">
                    <span className="text-paper/40">Yapım / Prodüksiyon</span>
                    <strong className="text-white font-medium">Aşkın Studios</strong>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-paper/40">Besteci / Aranjör</span>
                    <strong className="text-white font-medium">Aşkın Şerbetçi</strong>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-paper/40">Yayın Dönemi</span>
                    <strong className="text-white font-medium">2026 Dünya Kupası Özel</strong>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-paper/40">Tarz</span>
                    <strong className="text-white font-medium">Epic, Cinematic Fusion</strong>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-paper/40">Mevcut Durum</span>
                    <span className="px-2 py-0.5 rounded-sm bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] uppercase tracking-wider">
                      Viral Büyüme
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
                  İlk Günlerde İzlenme Oranı
                </span>
              </div>

              {/* Lyrics Block */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-sm space-y-6">
                <h4 className="text-gold uppercase tracking-widest text-xs font-semibold border-b border-white/10 pb-3">
                  Marş Sözleri (Tezahürat)
                </h4>
                <div className="space-y-6 font-serif italic text-base text-paper/90 leading-relaxed text-center">
                  <div>
                    <p>Yerde gökte sesimiz var,</p>
                    <p>Kalplerde bir tek sevdamız.</p>
                    <p>Son saniyeye kadar sürer,</p>
                    <p>Durmaz bizim kavgamız!</p>
                  </div>
                  <div>
                    <p className="text-gold font-bold">Biz demeden bitmez bu oyun,</p>
                    <p className="text-gold font-bold">Sahada dalgalansın şanlı kırmızı!</p>
                    <p className="text-gold font-bold">Tarih yazsın her adımımızı,</p>
                    <p className="text-gold font-bold">Biz demeden burda bitmez bu oyun!</p>
                  </div>
                  <div>
                    <p>Yürüyoruz engelleri aşarak,</p>
                    <p>Yıldızlara, güneşe şanlı koşarak.</p>
                    <p>Milyonlarca tek nefesiz,</p>
                    <p>Türkiye'yiz, sarsılmayız!</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Viral Growth & Project Info Section */}
      <section id="anthem-info" className="py-20 px-6 border-t border-white/5 bg-black/20 backdrop-blur-[2px] relative z-10">
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
                Viral Büyüme & Proje Özeti
              </h2>
            </div>

            <p className="text-paper/80 font-light text-base md:text-lg leading-relaxed text-justify">
              “Biz Demeden Bitmez” yayınlandıktan kısa süre sonra on binlerce izlenmeye ulaşarak güçlü bir viral ivme yakaladı. Yüksek izlenme süresi, yüksek beğeni oranı ve uluslararası izleyici kitlesiyle YouTube algoritmasında öne çıkan bir proje haline geldi.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm space-y-4">
                <h4 className="text-gold uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">
                  Milli İlgi & İzlenim İstatistikleri
                </h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-paper/60 font-light">İlk Günlerde</span>
                    <strong className="text-white font-medium">60.000+ izlenme</strong>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-paper/60 font-light">İzlenme Süresi</span>
                    <strong className="text-white font-medium">1.300+ saat</strong>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-paper/60 font-light">Beğeni Oranı</span>
                    <strong className="text-white font-medium">%94.4</strong>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm space-y-4">
                <h4 className="text-gold uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold">
                  Kitle & Cihaz Dağılımı
                </h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-paper/60 font-light">Ortalama İzlenme</span>
                    <strong className="text-white font-medium">%57.6 retention (tutundurma)</strong>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-paper/60 font-light">En Çok İzlenen Ülkeler</span>
                    <strong className="text-white font-medium text-right text-xs">Azerbaycan, Türkiye, ABD, Bosna, Almanya</strong>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-paper/60 font-light">Cihaz Dağılımı</span>
                    <strong className="text-white font-medium">%64 TV izleyicisi (yüksek etkileşim)</strong>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-paper/70 font-light text-base leading-relaxed text-justify">
              Bu proje, Türkiye’nin birlik ruhunu ve Dünya Kupası heyecanını sinematik bir anlatımla bir araya getirerek geniş bir kitleye ulaşmayı başardı. Studio Askin’in imzasını taşıyan bu marş, uluslararası izleyiciler tarafından da ilgiyle karşılandı.
            </p>
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
                <h3 className="text-2xl font-serif italic text-white">"Biz Demeden Bitmez" MP3</h3>
                <p className="text-paper/60 text-sm font-light">
                  Dünya Kupası Özel Marşı yakında tüm dijital platformlarda ve indirilebilir formatta yayında olacak! 
                </p>
                <p className="text-gold text-xs uppercase tracking-widest font-semibold pt-2">
                  Son Hazırlıklar Devam Ediyor
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <a 
                  href={`https://www.youtube.com/watch?v=${videoId}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-gold text-ink font-semibold uppercase tracking-widest text-[10px] hover:bg-white hover:text-ink transition-colors rounded-sm"
                >
                  YouTube'dan Dinle
                </a>
                <button 
                  onClick={() => setDownloadModal(false)}
                  className="flex-1 py-3 border border-white/10 hover:border-white/20 text-white font-semibold uppercase tracking-widest text-[10px] transition-colors rounded-sm"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Anthem;
