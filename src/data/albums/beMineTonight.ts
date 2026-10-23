import { Album } from "../../types/music";

// Be Mine Tonight: Cinematic World Music Suite (2026). One love story in 17 scenes, from the
// opening theme through duets in nine languages. Each track jumps to its scene in the 1-hour video.
const SUITE = "7pAdFokQahM";
const at = (m: number, s: number) => m * 60 + s;

export const beMineTonight: Album = {
  id: "be-mine-tonight",
  slug: "be-mine-tonight-cinematic-world-music-suite",
  title: "Be Mine Tonight: Cinematic World Music Suite",
  year: 2026,
  coverImage: "/BE_MINE_TONIGHT_SUITE.jpg",
  image: "/BE_MINE_TONIGHT_SUITE.jpg",
  concept: "Cinematic Suite · 9-Language Duets",
  description:
    "One love story told in 17 scenes: a one-hour cinematic world-music suite with ney, kanun, oud and bağlama, and the same love song sung as duets in nine languages.",
  story:
    "One love story, told in seventeen scenes. Be Mine Tonight opens with the theme first recorded with the legends of The Meeting of the Legends, drifts through piano, saxophone and an Istanbul bağlama romance, rises into an Anatolian rock version, and then becomes a journey around the world: the same love song sung as duets in English, Turkish, Arabic, Russian, Spanish, Italian, Greek, Azerbaijani and French. The suite closes with a rock 'n' roll outro. Composed and produced by Aşkın Şerbetçi, with Omar Faruk Tekbilek on ney, bağlama and oud, Hasan Işıkkut on kanun and violin, and an ensemble recorded across the United States, Türkiye and Europe.",
  youtubeEmbedUrl: `https://www.youtube.com/embed/${SUITE}`,
  spotifyUrl: "https://open.spotify.com/album/4o269Yv7AzI2sFmfAlzWq5",
  spotifyEmbedUrl: "https://open.spotify.com/embed/album/4o269Yv7AzI2sFmfAlzWq5?utm_source=generator",
  highlights: [
    "17 cinematic scenes, one hour, one love story",
    "Duets in nine languages, from English to Azerbaijani",
    "Ney, kanun, oud and bağlama with Omar Faruk Tekbilek",
  ],
  themes: ["Love", "Longing", "East meets West", "One song, nine languages"],
  instrumentsPerformed: ["Ney", "Kanun", "Oud", "Bağlama", "Piano", "Saxophone", "Guitars", "Strings", "Percussion"],
  tracklist: [
    { title: "The Instrumental Scenes", isSectionHeader: true },
    { trackNumber: 1, title: "Be Mine Tonight (The Legends Live · Opening Theme)", duration: "5:38", youtubeVideoId: SUITE, startSeconds: 0 },
    { trackNumber: 2, title: "Piano Soothing", duration: "3:14", youtubeVideoId: SUITE, startSeconds: at(5, 38) },
    { trackNumber: 3, title: "Vocal Edition", duration: "4:53", youtubeVideoId: SUITE, startSeconds: at(8, 52) },
    { trackNumber: 4, title: "Sax Instrumental Dream", duration: "3:17", youtubeVideoId: SUITE, startSeconds: at(13, 45) },
    { trackNumber: 5, title: "Bağlama Romance (Istanbul)", duration: "2:55", youtubeVideoId: SUITE, startSeconds: at(17, 2) },
    { trackNumber: 6, title: "Acoustic Instrumental", duration: "3:02", youtubeVideoId: SUITE, startSeconds: at(19, 57) },
    { trackNumber: 7, title: "Anatolian Rock Version", duration: "3:55", youtubeVideoId: SUITE, startSeconds: at(22, 59) },
    { title: "The Duets: One Love Song, Nine Languages", isSectionHeader: true },
    { trackNumber: 8, title: "English · Be Mine Tonight", duration: "3:43", youtubeVideoId: SUITE, startSeconds: at(26, 54) },
    { trackNumber: 9, title: "Türkçe · Anla Beni (Rock Duet)", duration: "4:37", youtubeVideoId: SUITE, startSeconds: at(30, 37) },
    { trackNumber: 10, title: "Arabic · كوني لي الليلة", duration: "3:18", youtubeVideoId: SUITE, startSeconds: at(35, 14) },
    { trackNumber: 11, title: "Russian · Будь Моей Сегодня Ночью", duration: "3:38", youtubeVideoId: SUITE, startSeconds: at(38, 32) },
    { trackNumber: 12, title: "Español · Sé Mía Esta Noche", duration: "3:34", youtubeVideoId: SUITE, startSeconds: at(42, 10) },
    { trackNumber: 13, title: "Italiano · Sarai Mia Stanotte", duration: "3:26", youtubeVideoId: SUITE, startSeconds: at(45, 44) },
    { trackNumber: 14, title: "Greek · Να Είσαι Δική Μου Απόψε", duration: "3:30", youtubeVideoId: SUITE, startSeconds: at(49, 10) },
    { trackNumber: 15, title: "Azərbaycan · Bu Gecə Mənim Ol", duration: "3:24", youtubeVideoId: SUITE, startSeconds: at(52, 40) },
    { trackNumber: 16, title: "Français · Sois à Moi Ce Soir", duration: "3:21", youtubeVideoId: SUITE, startSeconds: at(56, 4) },
    { title: "Finale", isSectionHeader: true },
    { trackNumber: 17, title: "English Rock 'n' Roll Outro", youtubeVideoId: SUITE, startSeconds: at(59, 25) },
  ],
  detailedCredits: [
    { role: "Composer & Producer", name: "Aşkın Şerbetçi" },
    { role: "Ney, Bağlama, Oud", name: "Omar Faruk Tekbilek" },
    { role: "Kanun, Violin", name: "Hasan Işıkkut" },
    { role: "Acoustic & Electric Guitar", name: "Brian Keane" },
    { role: "Oud", name: "Ara Dinkjian" },
    { role: "Piano, Acoustic Guitar", name: "Christopher Rosser" },
    { role: "Bass", name: "Eliot Wadopian (in memoriam)" },
    { role: "Percussion", name: "River Guerguerian, Murat Tekbilek" },
    { role: "Turkish Lyrics", name: "Burak Yorulmazlar" },
    { role: "Label", name: "Studio Askin Music Productions" },
  ],
  recordingInfo: [
    "Recorded across the United States, Türkiye and Europe",
    "Studio Askin Music Productions · Hollow Reed Studios · Brian Keane Music",
    "Human-composed and performed; duet vocals use a studio-engineered vocal persona",
    "Released August 2026 · ℗ 2026 Studio Askin Music Productions",
  ],
};
