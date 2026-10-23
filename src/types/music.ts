import { Album as BaseAlbum, Track as BaseTrack } from './album';
import { Single as BaseSingle } from './single';

export interface Credit {
  role: string;
  name: string;
  description?: string;
}

export interface Track extends Partial<BaseTrack> {
  title: string;
  duration?: string;
  isSectionHeader?: boolean;
  trackNumber?: string | number;
  youtubeVideoId?: string;
  // Where this track starts inside the video (for a suite that is one long video)
  startSeconds?: number;
  description?: string;
  commentary?: string;
}

export interface Album extends BaseAlbum {
  id: string;
  concept?: string;
  story?: string;
  image?: string;
  collaborators?: string[];
  themes?: string[];
  highlights?: string[];
  youtubeEmbedUrl?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  spotifyEmbedUrl?: string;
  tracklist?: Track[];
  detailedCredits?: Credit[];
  recordingInfo?: string[];
  btsImage?: string;
  btsImages?: string[];
  instrumentsPerformed?: string[];
  artistBio?: string;
  pressDescription?: string;
}

export interface Single extends BaseSingle {
  id: string;
  image?: string;
  concept?: string;
  story?: string;
  tracklist?: Track[];
}
