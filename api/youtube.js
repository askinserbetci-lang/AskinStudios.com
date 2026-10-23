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

async function feedOnce(param) {
  const r = await fetch(`https://www.youtube.com/feeds/videos.xml?${param}`, { signal: AbortSignal.timeout(6000), headers: { 'User-Agent': 'Mozilla/5.0 (askinstudios.com)' } });
  if (!r.ok) throw new Error(`feed ${r.status}`);
  const list = parse(await r.text());
  if (!list.length) throw new Error('feed empty');
  return list;
}

// YouTube's feeds sometimes answer "not found" for a moment, so each one gets a few tries
async function feed(param, tries = 3) {
  for (let i = 0; ; i++) {
    try {
      return await feedOnce(param);
    } catch (e) {
      if (i >= tries - 1) throw e;
      await new Promise(r => setTimeout(r, 400 * (i + 1)));
    }
  }
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

// How long a video runs, read from its YouTube page (0 when it can't be told)
async function seconds(v) {
  try {
    const r = await fetch(`https://www.youtube.com/watch?v=${v.id}`, { signal: AbortSignal.timeout(6000), headers: { 'Accept-Language': 'en' } });
    const html = await r.text();
    return Number(pick(html, /"lengthSeconds":"(\d+)"/)) || Number(pick(html, /itemprop="duration" content="PT(\d+)M/)) * 60 || 0;
  } catch {
    return 0;
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
      // The same uploads, listed as a playlist
      try {
        all = await feed(`playlist_id=UU${id.slice(2)}`);
      } catch {
        id = await channelId();
        all = await feed(`channel_id=${id}`, 2);
      }
    }
    // The website shows full videos only, so Shorts and clips under 2 minutes are left out
    const flags = await Promise.all(all.map(isShort));
    const full = all.filter((_, i) => !flags[i]);
    const lengths = await Promise.all(full.map(seconds));
    const videos = full.map((v, i) => ({ ...v, seconds: lengths[i] })).filter(v => !v.seconds || v.seconds >= 120);
    const shorts = all.filter((_, i) => flags[i]);
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
    res.status(200).json({
      channel: `https://www.youtube.com/@${HANDLE}`,
      videos,
      shorts,
    });
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(502).json({ error: String(e?.message || e), videos: [], shorts: [] });
  }
}
