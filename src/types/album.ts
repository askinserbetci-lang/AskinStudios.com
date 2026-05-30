export interface Track {
  trackNumber?: number | string;
  title: string;
  duration?: string;
  description?: string;
  youtubeVideoId?: string;
}

export interface Album {
  slug: string;
  title: string;
  year: number | string;
  coverImage?: string;
  description?: string;
  tracks?: Track[];
  linerNotes?: string;
  commentary?: Record<string, string>;
  id: string;
  concept?: string;
  story?: string;
  image?: string;
  tracklist?: Track[];
  youtubeEmbedUrl?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  spotifyEmbedUrl?: string;
  detailedCredits?: any[];
  recordingInfo?: string[];
}
