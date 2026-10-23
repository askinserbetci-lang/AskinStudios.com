// The channel's newest videos and Shorts from /api/youtube (see api/youtube.js), kept for the visit
export type YtVideo = { id: string; title: string; published: string; views: number; description?: string };
export type YtFeed = { videos: YtVideo[]; shorts: YtVideo[] };

let pending: Promise<YtFeed | null> | null = null;

export function loadYouTube(): Promise<YtFeed | null> {
  if (pending) return pending;
  pending = (async () => {
    try {
      const saved = sessionStorage.getItem('yt-feed');
      if (saved) return JSON.parse(saved) as YtFeed;
    } catch {}
    try {
      const r = await fetch('/api/youtube', { signal: AbortSignal.timeout(10000) });
      if (!r.ok) return null;
      const d = (await r.json()) as YtFeed;
      if (!d.videos?.length && !d.shorts?.length) return null;
      try { sessionStorage.setItem('yt-feed', JSON.stringify(d)); } catch {}
      return d;
    } catch {
      return null;
    }
  })();
  pending.then(d => { if (!d) pending = null; });
  return pending;
}

export const thumb = (id: string, size: 'max' | 'hq' = 'hq') =>
  `https://i.ytimg.com/vi/${id}/${size === 'max' ? 'maxresdefault' : 'hqdefault'}.jpg`;

export const shortDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

export const viewsText = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M views`
  : n >= 1_000 ? `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K views`
  : n > 0 ? `${n} views` : '';
