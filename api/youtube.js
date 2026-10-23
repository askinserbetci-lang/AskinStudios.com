// The channel's newest videos and Shorts, read from YouTube's public feeds on Vercel's side
// (browsers can't read those feeds directly). No key needed; the answer is cached for 30 minutes.
const HANDLE = 'askinserbetci';
const CHANNEL = 'UCacRHyoQvLt3W7l8MDlpZzQ';

const decode = s =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const pick = (xml, re) => (xml.match(re) || [])[1] || '';

function parse(xml) {
  return xml
    .split('<entry>')
    .slice(1)
    .map(e => ({
      id: pick(e, /<yt:videoId>([^<]+)<\/yt:videoId>/),
      title: decode(pick(e, /<title>([^<]*)<\/title>/)),
      published: pick(e, /<published>([^<]+)<\/published>/),
      views: Number(pick(e, /<media:statistics views="(\d+)"/)) || 0,
      description: decode(pick(e, /<media:description>([\s\S]*?)<\/media:description>/)).slice(0, 280),
    }))
    .filter(v => v.id);
}

async function feed(param) {
  const r = await fetch(`https://www.youtube.com/feeds/videos.xml?${param}`, { signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error(`feed ${r.status}`);
  return parse(await r.text());
}

// Works out the channel ID from the handle, in case it ever changes
async function channelId() {
  try {
    const r = await fetch(`https://www.youtube.com/@${HANDLE}`, { signal: AbortSignal.timeout(8000), headers: { 'Accept-Language': 'en' } });
    const html = await r.text();
    return pick(html, /"externalId":"(UC[\w-]{22})"/) || pick(html, /"channelId":"(UC[\w-]{22})"/) || CHANNEL;
  } catch {
    return CHANNEL;
  }
}

export default async function handler(req, res) {
  try {
    let id = CHANNEL;
    let all;
    try {
      all = await feed(`channel_id=${id}`);
    } catch {
      id = await channelId();
      all = await feed(`channel_id=${id}`);
    }
    const tail = id.slice(2);
    // "UULF" lists only full-length videos and "UUSH" only Shorts; if either is unavailable, use the full list
    const [videos, shorts] = await Promise.all([
      feed(`playlist_id=UULF${tail}`).catch(() => all),
      feed(`playlist_id=UUSH${tail}`).catch(() => []),
    ]);
    const shortIds = new Set(shorts.map(s => s.id));
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
    res.status(200).json({
      channel: `https://www.youtube.com/@${HANDLE}`,
      videos: videos.filter(v => !shortIds.has(v.id)),
      shorts,
    });
  } catch (e) {
    res.setHeader('Cache-Control', 'public, s-maxage=60');
    res.status(502).json({ error: String(e?.message || e), videos: [], shorts: [] });
  }
}
