import { useEffect, useState } from 'react';

// Sign-ups and messages from the website go to the artist's AiQ Creator app, where he sees and answers them
const AIQ = 'https://aiqcreator.com/api/public';

export async function sendToAiq(path: 'fan' | 'message', body: Record<string, unknown>) {
  const r = await fetch(`${AIQ}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, site: 'askinstudios.com', page: location.pathname }),
    signal: AbortSignal.timeout(15000),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || !d.ok) throw new Error(d.error || 'Could not send right now.');
  return d;
}

// Fallback links; the live ones come from the profile kept in AiQ (Platforms → Your profile everywhere)
export const FOLLOW = [
  { name: 'YouTube', url: 'https://www.youtube.com/@askinstudios?sub_confirmation=1' },
  { name: 'Spotify', url: 'https://open.spotify.com/artist/2AhElJSYFBKYBkE7R70hEa' },
  { name: 'Instagram', url: 'https://www.instagram.com/askinserbetci/' },
  { name: 'Facebook', url: 'https://www.facebook.com/studioaskin' },
];

// The artist's links as set in AiQ, fetched once per visit; the fallbacks above until it answers
type Links = Record<string, string>;
let cached: Promise<Links> | null = null;
const fetchLinks = () => (cached ||= fetch(`${AIQ}/profile`, { signal: AbortSignal.timeout(8000) })
  .then(r => (r.ok ? r.json() : {}))
  .then((d: any) => (d && typeof d.links === 'object' ? d.links : {}))
  .catch(() => ({})));
const KEY: Record<string, string> = { YouTube: 'youtube', Spotify: 'spotify', Instagram: 'instagram', Facebook: 'facebook' };
const safe = (u: unknown) => (typeof u === 'string' && /^https:\/\//.test(u) ? u : '');
export function useFollow() {
  const [list, setList] = useState(FOLLOW);
  useEffect(() => {
    fetchLinks().then(l => setList(FOLLOW.map(f => {
      const live = safe(l[KEY[f.name]]);
      if (!live) return f;
      // Subscribing straight from the button
      return { ...f, url: f.name === 'YouTube' && !live.includes('sub_confirmation') ? `${live.replace(/\/$/, '')}?sub_confirmation=1` : live };
    })));
  }, []);
  return list;
}
