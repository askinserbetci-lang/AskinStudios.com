// Once a day (see "crons" in vercel.json) this wakes AiQ Creator so a fan email that is going out in
// daily batches carries on, even on days nobody opens the app. It never sends more than a day's allowance.
export default async function handler(req, res) {
  try {
    const r = await fetch('https://aiqcreator.com/api/public/mail-tick', { method: 'POST', signal: AbortSignal.timeout(55000) });
    res.status(200).json({ ok: r.ok, ...(await r.json().catch(() => ({}))) });
  } catch (e) {
    res.status(200).json({ ok: false, error: String(e?.message || e) });
  }
}
