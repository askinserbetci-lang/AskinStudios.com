export interface Single {
  slug: string;
  id: string;
  title: string;
  year: number | string;
  coverImage: string;
  duration: string;
  description: string;
  linerNotes?: string;
  image?: string;
  concept?: string;
  story?: string;
  tracklist?: any[];
  youtubeEmbedUrl?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  spotifyEmbedUrl?: string;
  detailedCredits?: any[];
  recordingInfo?: string[];
  btsImage?: string;
  btsImages?: string[];
  pressDescription?: string;
}
