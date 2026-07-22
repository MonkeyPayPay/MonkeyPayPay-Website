// Vercel Serverless Function — site visitor counter backed by Vercel KV (Upstash).
//
//   GET  /api/visits  → { count }   (current total; no increment)
//   POST /api/visits  → { count }   (increment, then return — called once per browser)
//
// Uses the Upstash REST API directly (no extra dependency). Reads the env vars
// Vercel injects when a KV / Upstash Redis store is connected to the project:
//   KV_REST_API_URL, KV_REST_API_TOKEN
// Until a store is connected it returns { count: null } and the footer stays
// hidden — nothing fake is ever shown.

const BASE = process.env.KV_REST_API_URL;
const TOKEN = process.env.KV_REST_API_TOKEN;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!BASE || !TOKEN) return res.status(200).json({ count: null });
  try {
    const cmd = req.method === 'POST' ? 'incr' : 'get';
    const r = await fetch(`${BASE}/${cmd}/site:visits`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const data = await r.json();
    const count = data.result == null ? 0 : Number(data.result);
    return res.status(200).json({ count: Number.isFinite(count) ? count : null });
  } catch {
    return res.status(200).json({ count: null });
  }
}
