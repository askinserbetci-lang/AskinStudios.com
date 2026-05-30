import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { Play, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';
import { ALBUMS, COLLABORATORS } from '../constants';
import { theMeetingOfTheLegendsSEO } from '../data/seo/albums/theMeetingOfTheLegends.seo';
import { deliGonulSEO } from '../data/seo/singles/deliGonul.seo';
import { musicPageSEO } from '../data/seo/pages/music.seo';
import { useLightbox } from '../context/LightboxContext';

import { CinematicBackground } from '../components/common/CinematicBackground';

const Music = () => {
  const { slug } = useParams();
  const album = slug ? ALBUMS.find(a => a.id === slug) : null;
  const { showImage } = useLightbox();

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // ---------------------------------------------------------------------------
  // DETAIL VIEW
  // ---------------------------------------------------------------------------
  if (album) {
    const seo = album.id === 'legends' ? theMeetingOfTheLegendsSEO : album.id === 'deli-gonul' ? deliGonulSEO : null;

    const jsonLd = album.id === 'legends' ? {
      "@context": "https://schema.org",
      "@type": "MusicAlbum",
      "name": "The Meeting of the Legends",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aşkın Şerbetçi"
      },
      "genre": "Turkish World Music Fusion",
      "description": "A landmark fusion album blending Turkish classical heritage with cinematic world‑music storytelling. Winner of the 2016 Akademia Award for Best Instrumental / World Beat Album.",
      "url": `https://askinstudios.com/music/${album.id}`,
      "image": `https://askinstudios.com${album.image}`,
      "award": "2016 Akademia Award – Best Instrumental / World Beat Album"
    } : album.id === 'deli-gonul' ? {
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      "name": "Deli Gönül (2026 Version)",
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aşkın Şerbetçi"
      },
      "genre": "Turkish Classical Fusion",
      "description": "A cinematic reinterpretation of the Turkish classic 'Deli Gönül,' blending traditional emotion with modern world‑music sound design.",
      "url": `https://askinstudios.com/music/${album.id}`,
      "image": `https://askinstudios.com${album.image}`
    } : {
      "@context": "https://schema.org",
      "@type": "MusicAlbum",
      "name": album.title,
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aşkın Şerbetçi"
      },
      "genre": "Turkish World Music Fusion",
      "description": album.concept,
      "url": `https://askinstudios.com/music/${album.id}`,
      "image": `https://askinstudios.com${album.image}`
    };

    return (
      <div className="album-hero min-h-screen text-paper pt-56 pb-32 px-6 relative overflow-hidden">
        <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt={album.title} />
        <Helmet>
          <title>{seo?.title || `${album.title} – Aşkın Şerbetçi | Turkish World Music Fusion`}</title>
          <meta name="description" content={seo?.description || `Explore “${album.title},” a cinematic world‑music fusion project by Aşkın Şerbetçi blending Turkish classical heritage with modern atmospheric sound design.`} />
          
          <meta property="og:title" content={seo?.ogTitle || `${album.title} – Aşkın Şerbetçi`} />
          <meta property="og:description" content={seo?.ogDescription || 'A cinematic fusion of Turkish classical depth and modern world‑music storytelling.'} />
          <meta property="og:image" content={seo?.ogImage || album.image} />
          <meta property="og:type" content={album.id === 'deli-gonul' ? 'music.song' : 'music.album'} />
          
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        </Helmet>

        {/* Immersive Blurred Background */}
        <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
          <img 
            src={album.image} 
            alt="Background" 
            className="w-full h-full object-cover opacity-20 blur-3xl scale-110 saturate-50"
          />
          <div className="absolute inset-0 bg-midnight/60" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/music" className="inline-flex items-center gap-2 text-gold/80 hover:text-gold uppercase tracking-widest text-xs md:text-sm font-medium mb-12 transition-colors px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-sm">
            <ArrowLeft size={16} /> Back to Albums
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-12">
            
            {/* LEFT COLUMN (4 cols): Art & Listen Buttons */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative group cursor-zoom-in"
                onClick={() => showImage(album.image, album.title)}
              >
                <img 
                  src={album.image} 
                  alt={album.title} 
                  className="w-full h-auto object-contain rounded-sm border border-white/10 shadow-2xl shadow-black/80 group-hover:shadow-gold/20 transition-all duration-500 group-hover:scale-[1.02]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/album/800/800?grayscale";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white/50 text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">View Larger</span>
                </div>
              </motion.div>

              <div className="flex flex-col gap-4">
                {album.spotifyUrl ? (
                  <a href={album.spotifyUrl} target="_blank" rel="noopener noreferrer" className="w-full px-6 py-4 bg-gold text-ink font-semibold uppercase tracking-widest text-xs rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2">
                    <Play size={14} fill="currentColor" /> Listen on Spotify
                  </a>
                ) : (
                  <button className="w-full px-6 py-4 bg-gold text-ink font-semibold uppercase tracking-widest text-xs rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                    <Play size={14} fill="currentColor" /> Listen on Spotify
                  </button>
                )}

                {album.appleMusicUrl ? (
                  <a href={album.appleMusicUrl} target="_blank" rel="noopener noreferrer" className="w-full px-6 py-4 bg-white/10 text-white font-semibold uppercase tracking-widest text-xs rounded-sm hover:bg-white/20 transition-colors text-center block">
                    Listen on Apple Music
                  </a>
                ) : (
                  <button className="w-full px-6 py-4 bg-white/10 text-white font-semibold uppercase tracking-widest text-xs rounded-sm hover:bg-white/20 transition-colors opacity-50 cursor-not-allowed">
                    Listen on Apple Music
                  </button>
                )}

                {album.youtubeEmbedUrl && (
                  <a href={album.youtubeEmbedUrl} target="_blank" rel="noopener noreferrer" className="w-full px-6 py-4 bg-white/10 text-white font-semibold uppercase tracking-widest text-xs rounded-sm hover:bg-white/20 transition-colors text-center block">
                    Watch on YouTube
                  </a>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN (8 cols): Title, Info, Player, Tracklist */}
            <div className="lg:col-span-8 space-y-12 pb-32">
              
              {/* Header Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic mb-4 text-white leading-tight">
                  {album.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-gold text-sm uppercase tracking-widest mb-8">
                  <span>{album.year}</span>
                  <span className="text-white/30">•</span>
                  <span>{album.concept}</span>
                </div>
                
                {album.story && (
                  <div className="prose prose-invert max-w-4xl mb-12">
                    <p className="text-paper/80 text-lg md:text-xl leading-relaxed font-light whitespace-pre-wrap">
                      {album.story}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* BOTTOM SECTION: Tracklist & Credits */}
              <div className="space-y-20">
                {/* Tracklist */}
                {album.tracklist && album.tracklist.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-serif italic mb-8 text-gold">Tracklist</h2>
                    <ol className="space-y-0">
                        {album.tracklist.map((track, i) => (
                          track.isSectionHeader ? (
                            <li key={i} className="pt-8 pb-4">
                              <span className="text-xs uppercase tracking-[0.2em] text-gold/80 block">{track.title}</span>
                            </li>
                          ) : (
                            <li 
                              key={i} 
                              className="flex justify-between items-center py-4 border-b border-white/5 px-4 -mx-4 rounded-sm group"
                            >
                              <div className="flex items-center gap-4">
                                <span className="text-paper/30 text-xs w-6 text-center">
                                  {track.trackNumber || (i + 1)}
                                </span>
                                <span className="font-light text-paper/90">
                                  {track.title}
                                  {track.description && (
                                    <span className="block text-xs text-paper/50 mt-1 font-sans leading-relaxed max-w-xl">
                                      {track.description}
                                    </span>
                                  )}
                                  {track.commentary && (
                                    <span className="block text-[10px] italic text-gold/40 mt-2 font-serif tracking-wide">
                                      “{track.commentary}”
                                    </span>
                                  )}
                                </span>
                              </div>
                              {track.duration && (
                                <span className="text-xs font-mono text-gold/60">
                                  {track.duration}
                                </span>
                              )}
                            </li>
                          )
                        ))}
                      </ol>
                    </section>
                  )}

              {/* Credits */}
              {album.detailedCredits && album.detailedCredits.length > 0 && (
                <section>
                  <h2 className="text-2xl font-serif italic mb-8 text-gold">Credits</h2>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      {album.detailedCredits.map((credit, i) => (
                        <div key={i}>
                          <h3 className="text-gold text-xs uppercase tracking-widest mb-2">{credit.role}</h3>
                          <p className="text-white font-light text-lg">{credit.name}</p>
                        </div>
                      ))}
                    </div>
                    
                    {album.recordingInfo && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-gold text-xs uppercase tracking-widest mb-2">Recording & Production</h3>
                          <ul className="space-y-2">
                            {album.recordingInfo.map((info, i) => (
                              <li key={i} className="text-paper/60 font-light">{info}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Liner Notes */}
              {album.linerNotes && (
                <section>
                  <h2 className="text-2xl font-serif italic mb-8 text-gold">Notes</h2>
                  <div className="markdown-body text-paper/80 text-lg leading-relaxed font-light">
                    <Markdown>{album.linerNotes}</Markdown>
                  </div>
                </section>
              )}

              {/* BTS Gallery */}
              {(album.btsImages || album.btsImage) && (
                <section>
                  <h2 className="text-2xl font-serif italic mb-8 text-gold">Behind the Scenes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {album.btsImages ? (
                      album.btsImages.map((img, i) => (
                        <div 
                          key={i} 
                          className="aspect-[4/3] overflow-hidden rounded-sm border border-white/10 group cursor-zoom-in relative"
                          onClick={() => showImage(img, `Behind the Scenes ${i + 1}`)}
                        >
                          <img 
                            src={img} 
                            alt={`BTS ${i + 1}`} 
                            className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://picsum.photos/seed/bts${i}/600/400?grayscale`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="text-white/50 text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">View Larger</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div 
                        className="aspect-[21/9] md:col-span-2 lg:col-span-3 overflow-hidden rounded-sm border border-white/10 group cursor-zoom-in relative"
                        onClick={() => showImage(album.btsImage!, "Behind the Scenes")}
                      >
                        <img 
                          src={album.btsImage} 
                          alt="Behind the scenes" 
                          className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://picsum.photos/seed/bts/1200/500?grayscale";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="text-white/50 text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">View Larger</span>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}
              {/* Press Release */}
              {album.pressDescription && (
                <section className="border-t border-white/5 pt-16">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-gold text-xs uppercase tracking-[0.3em] mb-8 text-center">Press Release</h2>
                    <div className="bg-white/5 p-8 md:p-12 rounded-sm border border-white/10">
                      <p className="text-paper/60 text-sm leading-relaxed font-mono whitespace-pre-wrap italic">
                        {album.pressDescription}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  // ---------------------------------------------------------------------------
  // GRID VIEW (MAIN)
  // ---------------------------------------------------------------------------
  return (
    <div className="music-section min-h-screen text-paper relative pt-32">
      <CinematicBackground imageSrc="/Turkiye_Grammy_2013.jpg" imageAlt="Music Background" />
      <Helmet>
        <title>{musicPageSEO.title}</title>
        <meta name="description" content={musicPageSEO.description} />
        <meta property="og:title" content={musicPageSEO.ogTitle} />
        <meta property="og:description" content={musicPageSEO.ogDescription} />
        <meta property="og:image" content={musicPageSEO.ogImage} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="page-hero">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl md:text-8xl font-serif italic mb-6 leading-tight">Music</h1>
            <span className="text-gold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 block leading-relaxed font-medium">
              Albums • Singles • Collaborations
            </span>
            <p className="text-paper/80 font-light text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto">
              A curated collection of Aşkın’s albums, singles, collaborations, and featured works, blending Turkish classical tradition with cinematic world‑fusion and modern production.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Albums & Releases */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif italic mb-12 text-white">Albums & Releases</h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {ALBUMS.map((item, i) => (
              <Link 
                key={item.id} 
                to={`/music/${item.id}`}
                className={`group relative block overflow-hidden rounded-sm border border-white/10 ${item.id === 'legends' ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'}`}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 md:grayscale md:group-hover:grayscale-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/album${i}/800/600?grayscale`;
                  }}
                />
                
                {/* Persistent Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-black/40 group-hover:border-gold/50">
                    <Play className="text-white/80 fill-white/80 ml-1 group-hover:text-gold group-hover:fill-gold transition-colors" size={24} />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-center z-20">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <h3 className="text-2xl md:text-3xl font-serif italic mb-2 text-white">{item.title}</h3>
                    <p className="text-gold uppercase tracking-widest text-xs">{item.year}</p>
                  </motion.div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Singles & Featured Tracks */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif italic mb-12 text-white">Singles & Featured Tracks</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Deli Gönül", year: "2026", desc: "Cinematic Single", img: "/MINE_GECILI_DELI_GONUL.png" },
              { title: "Film Cues", year: "Various", desc: "Original Scoring", img: "/Askin Serbetci 02.jpg" },
              { title: "Live Sessions", year: "2024", desc: "Performance Recordings", img: "/Askin_Jamming.jpg" }
            ].map((item, i) => (
              <div key={i} className="group relative block overflow-hidden rounded-sm border border-white/10 aspect-square cursor-pointer">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 md:grayscale md:group-hover:grayscale-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/single${i}/600/600?grayscale`;
                  }}
                />

                {/* Persistent Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-black/40 group-hover:border-gold/50">
                    <Play className="text-white/80 fill-white/80 ml-1 group-hover:text-gold group-hover:fill-gold transition-colors" size={20} />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent flex flex-col justify-end p-8 z-20">
                  <h3 className="text-xl font-serif italic text-white mb-1">{item.title}</h3>
                  <p className="text-gold text-xs uppercase tracking-widest">{item.desc} • {item.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credits & Collaborators */}
      <section className="px-6 pb-48">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif italic mb-12 text-white">Credits & Collaborators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COLLABORATORS.map((collab, i) => (
              <div 
                key={i} 
                className="collab-item group relative overflow-hidden rounded-sm border border-white/10 bg-white/5 cursor-zoom-in"
                onClick={() => showImage(collab.image, collab.name)}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
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
                <div className="p-8 collab-hover transition-colors duration-500">
                  <p className="text-gold text-[10px] uppercase tracking-widest mb-2">
                    {collab.role}
                    {collab.isLegacy && <span className="ml-2 text-white/40">(Legacy)</span>}
                  </p>
                  <h3 className="text-2xl font-serif italic text-white mb-4">{collab.name}</h3>
                  <p className="text-paper/70 font-light text-sm leading-relaxed">
                    {collab.description || collab.story}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Music;
