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

export const FOLLOW = [
  { name: 'YouTube', url: 'https://www.youtube.com/@askinstudios?sub_confirmation=1' },
  { name: 'Spotify', url: 'https://open.spotify.com/artist/2AhElJSYFBKYBkE7R70hEa' },
  { name: 'Instagram', url: 'https://www.instagram.com/askinserbetci/' },
  { name: 'Facebook', url: 'https://www.facebook.com/studioaskin' },
];
