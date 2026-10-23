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

// Shorts have a tall thumbnail ("oar2.jpg"); full videos don't, and YouTube answers 404 for them
async function isShort(v) {
  if (/#shorts?\b/i.test(v.title)) return true;
  try {
    const r = await fetch(`https://i.ytimg.com/vi/${v.id}/oar2.jpg`, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
    return r.ok;
  } catch {
    return false;
  }
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
    // "UULF" lists only full-length videos and "UUSH" only Shorts; when YouTube doesn't offer those,
    // each upload is checked one by one
    const [long, short] = await Promise.all([
      feed(`playlist_id=UULF${tail}`).catch(() => null),
      feed(`playlist_id=UUSH${tail}`).catch(() => null),
    ]);
    let videos, shorts;
    if (long && short) {
      videos = long;
      shorts = short;
    } else {
      const flags = await Promise.all(all.map(isShort));
      videos = all.filter((_, i) => !flags[i]);
      shorts = all.filter((_, i) => flags[i]);
    }
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
    res.status(200).json({
      channel: `https://www.youtube.com/@${HANDLE}`,
      videos,
      shorts,
    });
  } catch (e) {
    res.setHeader('Cache-Control', 'public, s-maxage=60');
    res.status(502).json({ error: String(e?.message || e), videos: [], shorts: [] });
  }
}
