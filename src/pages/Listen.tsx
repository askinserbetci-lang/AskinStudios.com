import React, { useMemo } from 'react';
import { Youtube } from 'lucide-react';
import { FanSignup } from '../components/FanSignup';

// Where the Facebook and Instagram ads' "Watch more" button lands: the suite plays right here at the
// viewer's language chapter (plays on this page count as YouTube views), with the fan list just
// below and a button to open it in the YouTube app. /listen?lang=ar
const VIDEO = '7pAdFokQahM';
const CHAPTERS: Record<string, { start: number; dir?: 'rtl'; title: string; line: string; play: string; open: string; join: string }> = {
  en: { start: 1614, title: 'Be Mine Tonight', line: 'The English duet, live with ney, kanun and oud.', play: 'Press play: it starts at your language', open: 'Open in YouTube', join: 'Hear my next songs before anyone else' },
  tr: { start: 1837, title: 'Anla Beni', line: 'Türkçe düet: ney, kanun ve ud ile canlı.', play: 'Oynat: senin dilinden başlar', open: "YouTube'da aç", join: 'Yeni şarkılarımı herkesten önce dinle' },
  ar: { start: 2114, dir: 'rtl', title: 'كوني لي الليلة', line: 'دويتو بالعربية مع الناي والقانون والعود، عزف حي.', play: 'اضغط للتشغيل: يبدأ من لغتك', open: 'افتح في يوتيوب', join: 'استمع إلى أغانيّ الجديدة قبل الجميع' },
  ru: { start: 2312, title: 'Будь моей сегодня ночью', line: 'Русский дуэт: ней, канун и уд вживую.', play: 'Нажмите play: начнётся с вашего языка', open: 'Открыть в YouTube', join: 'Слушайте мои новые песни первыми' },
  es: { start: 2530, title: 'Sé mía esta noche', line: 'Dúo en español, en vivo con ney, kanun y oud.', play: 'Dale play: empieza en tu idioma', open: 'Abrir en YouTube', join: 'Escucha mis nuevas canciones antes que nadie' },
  it: { start: 2744, title: 'Sarai mia stanotte', line: 'Duetto in italiano, dal vivo con ney, kanun e oud.', play: 'Premi play: parte dalla tua lingua', open: 'Apri su YouTube', join: 'Ascolta le mie nuove canzoni prima di tutti' },
  el: { start: 2950, title: 'Να είσαι δική μου απόψε', line: 'Ελληνικό ντουέτο, ζωντανά με νέι, κανονάκι και ούτι.', play: 'Πάτα play: ξεκινά από τη γλώσσα σου', open: 'Άνοιγμα στο YouTube', join: 'Άκου τα νέα μου τραγούδια πρώτος' },
  az: { start: 3160, title: 'Bu gecə mənim ol', line: 'Azərbaycanca duet, ney, qanun və ud ilə canlı.', play: 'Play basın: sizin dilinizdən başlayır', open: "YouTube'da aç", join: 'Yeni mahnılarımı hamıdan əvvəl dinləyin' },
  fr: { start: 3364, title: 'Sois à moi ce soir', line: 'Duo en français, en live avec ney, kanun et oud.', play: 'Appuie sur play : ça commence dans ta langue', open: 'Ouvrir dans YouTube', join: 'Écoute mes nouvelles chansons avant tout le monde' },
};

export default function Listen() {
  const lang = useMemo(() => {
    const q = new URLSearchParams(window.location.search).get('lang') || '';
    return CHAPTERS[q] ? q : 'en';
  }, []);
  const c = CHAPTERS[lang];
  const t = Number(new URLSearchParams(window.location.search).get('t')) || c.start;
  return (
    <div dir={c.dir} className="min-h-screen bg-[#07060a] text-white flex flex-col items-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-3xl space-y-5">
        <div className="text-center space-y-1">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Aşkın Şerbetçi · Be Mine Tonight</p>
          <h1 className="text-3xl sm:text-4xl font-serif italic">{c.title}</h1>
          <p className="text-white/60 text-sm">{c.line}</p>
        </div>
        <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-gold/30 bg-black shadow-[0_0_60px_rgba(223,186,107,0.15)]">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO}?start=${t}&autoplay=1&playsinline=1&rel=0&modestbranding=1`}
            title={c.title} className="absolute inset-0 w-full h-full" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen
          />
        </div>
        <p className="text-center text-xs text-white/45">{c.play}</p>
        <a href={`https://www.youtube.com/watch?v=${VIDEO}&t=${t}s`} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#ff0033] hover:bg-[#e0002c] text-white text-sm font-semibold uppercase tracking-[0.15em] rounded-sm">
          <Youtube size={18} /> {c.open}
        </a>
        <div className="pt-2 border-t border-white/10">
          <p className="text-center text-lg font-serif italic text-white mt-5 mb-4">{c.join}</p>
          <FanSignup compact />
        </div>
        <p className="text-center text-[11px] text-white/35"><a href="/" className="hover:text-gold">askinstudios.com</a></p>
      </div>
    </div>
  );
}
