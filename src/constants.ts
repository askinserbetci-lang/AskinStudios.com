import { Album } from './types/music';
import { Single } from './types/single';
import { albums } from './data/albums';
import { singles } from './data/singles';
import { ServiceTier } from './types/services';
import { Collaborator } from './types/collaborators';
import { Award } from './types/awards';
import { TimelineEvent } from './types/timeline';
import { YouTubePlaylist } from './types/playlists';

import { SERVICE_TIERS as serviceTiers } from './data/services';
import { COLLABORATORS as collaborators } from './data/collaborators';
import { AWARDS as awards } from './data/awards';
import { TIMELINE as timeline } from './data/timeline';
import { YOUTUBE_PLAYLISTS as playlists } from './data/playlists';

export type { ServiceTier, Collaborator, Award, TimelineEvent, YouTubePlaylist };

export const ALBUMS: (Album | Single)[] = [...albums, ...singles];
export const SERVICE_TIERS: ServiceTier[] = serviceTiers;
export const COLLABORATORS: Collaborator[] = collaborators;
export const AWARDS: Award[] = awards;
export const TIMELINE: TimelineEvent[] = timeline;
export const YOUTUBE_PLAYLISTS: YouTubePlaylist[] = playlists;

