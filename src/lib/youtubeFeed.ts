// The channel's newest videos and Shorts from /api/youtube (see api/youtube.js), kept for the visit
export type YtVideo = { id: string; title: string; published: string; views: number; description?: string };
export type YtFeed = { videos: YtVideo[]; shorts: YtVideo[] };

// YouTube titles and descriptions carry hashtags, links and emoji meant for YouTube; the website shows them clean
export const cleanTitle = (t: string) =>
  t.replace(/#[\p{L}\p{N}_]+/gu, '')
    .replace(/\p{Extended_Pictographic}|\p{Regional_Indicator}|\uFE0F/gu, '')
    .replace(/\s*[|•–-]\s*$/, '')
    .replace(/^\s*[|•–-]\s*/, '')
    .replace(/\s{2,}/g, ' ')
    .trim() || t;

export const cleanDescription = (d = '') => {
  const lines = d.split('\n')
    .map(l => l.replace(/https?:\/\/\S+/g, '').replace(/#[\p{L}\p{N}_]+/gu, '').replace(/\p{Extended_Pictographic}|\p{Regional_Indicator}|\uFE0F/gu, '').trim())
    .filter(l => l.length > 30 && !/subscribe|abone ol|watch the full|full video|tam versiyon/i.test(l));
  return lines.slice(0, 2).join(' ');
};

let pending: Promise<YtFeed | null> | null = null;

export function loadYouTube(): Promise<YtFeed | null> {
  if (pending) return pending;
  pending = (async () => {
    try {
      const saved = sessionStorage.getItem('yt-feed-2');
      if (saved) return JSON.parse(saved) as YtFeed;
    } catch {}
    try {
      // One more try if YouTube hiccuped
      let r = await fetch('/api/youtube', { signal: AbortSignal.timeout(10000) });
      if (!r.ok) r = await fetch('/api/youtube?retry=1', { signal: AbortSignal.timeout(10000) });
      if (!r.ok) return null;
      const raw = (await r.json()) as YtFeed;
      if (!raw.videos?.length) return null;
      const tidy = (v: YtVideo) => ({ ...v, title: cleanTitle(v.title), description: cleanDescription(v.description) });
      const d: YtFeed = { videos: raw.videos.map(tidy), shorts: [] };
      try { sessionStorage.setItem('yt-feed-2', JSON.stringify(d)); } catch {}
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
