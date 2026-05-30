export interface YouTubePlaylist {
  title: string;
  description: string;
  playlistId: string;
  category: 'Live Performances' | 'Studio Sessions' | 'Visualizers' | 'Trailers & Promos' | 'Collaborations';
}
