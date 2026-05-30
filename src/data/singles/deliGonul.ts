import { Single } from "../../types/single";
import { linerNotes } from "../notes/deliGonul/linerNotes";

export const deliGonul: Single = {
  slug: "deli-gonul-2026",
  title: "Deli Gönül (2026 Version)",
  year: 2026,
  coverImage: "/MINE_GECILI_DELI_GONUL.png", // Using existing image path
  duration: "4:23",
  description:
    "A modern cinematic reimagining of the Turkish classic, performed by Mine Geçili and produced in Istanbul and New York. This 2026 single blends traditional emotional depth with contemporary world‑music fusion, honoring the song’s heritage while introducing a fresh, cinematic sound.",
  linerNotes,
  // Rich fields for UI
  id: "deli-gonul",
  image: "/MINE_GECILI_DELI_GONUL.png",
  concept: "Turkish Classical Fusion",
  story: "A modern cinematic reimagining of the Turkish classic, performed by Mine Geçili and produced in Istanbul and New York. This 2026 single blends traditional emotional depth with contemporary world‑music fusion, honoring the song’s heritage while introducing a fresh, cinematic sound.",
  tracklist: [
    { trackNumber: 1, title: "Deli Gönül (2026 Version)", duration: "4:23", youtubeVideoId: "dQw4w9WgXcQ" }
  ]
};
