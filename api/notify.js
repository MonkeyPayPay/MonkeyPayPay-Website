// Vercel Serverless Function — "notify me at launch" email capture, backed by
// the same Vercel KV / Upstash store as the visitor counter.
//
//   POST /api/notify              { email }         → { ok: true }   (store the email)
//   GET  /api/notify?key=…                          → { count, signups }  (JSON list)
//   GET  /api/notify?key=…&format=csv               → downloadable signups.csv
//   (?key must match the NOTIFY_ADMIN_KEY env var)
//
// Emails are kept in a Redis hash `notify:signups` (email → ISO signup time), so
// they're de-duplicated and timestamped. Nothing is stored until a KV store is
// connected (env KV_REST_API_URL/TOKEN or UPSTASH_REDIS_REST_URL/TOKEN).
//
// To read the list: set a secret env var NOTIFY_ADMIN_KEY in Vercel, then visit
//   https://monkeypaypay.com/api/notify?key=YOUR_SECRET

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Escape a single CSV cell (RFC 4180): wrap in quotes and double any quotes if
// the value contains a comma, quote, or newline.
function csvCell(value) {
  const s = String(value == null ? '' : value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

async function redis(BASE, TOKEN, command) {
  const r = await fetch(BASE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!r.ok) throw new Error(`redis ${r.status}`);
  return (await r.json()).result;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const BASE = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // --- Owner: retrieve the list (guarded by a secret) ---
  if (req.method === 'GET') {
    const adminKey = process.env.NOTIFY_ADMIN_KEY;
    const provided = (req.query && (req.query.key || req.query.k)) || '';
    if (!adminKey || provided !== adminKey) return res.status(401).json({ error: 'unauthorized' });
    if (!BASE || !TOKEN) return res.status(200).json({ configured: false, count: 0, signups: [] });
    try {
      const flat = (await redis(BASE, TOKEN, ['HGETALL', 'notify:signups'])) || [];
      const signups = [];
      for (let i = 0; i < flat.length; i += 2) signups.push({ email: flat[i], at: flat[i + 1] });
      signups.sort((a, b) => String(b.at).localeCompare(String(a.at)));

      const fmt = String((req.query && (req.query.format || req.query.f)) || 'json').toLowerCase();
      if (fmt === 'csv') {
        const rows = [['email', 'signed_up_at']];
        for (const s of signups) rows.push([s.email, s.at]);
        const csv = rows.map((r) => r.map(csvCell).join(',')).join('\r\n');
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="monkeypaypay-signups.csv"');
        return res.status(200).send(csv);
      }
      return res.status(200).json({ configured: true, count: signups.length, signups });
    } catch {
      return res.status(500).json({ error: 'read-failed' });
    }
  }

  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method-not-allowed' });

  // --- Visitor: store a new signup ---
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const email = String((body && body.email) || '').trim().toLowerCase();
  const honeypot = String((body && body.company) || '');

  if (honeypot) return res.status(200).json({ ok: true }); // silently drop bots
  if (!EMAIL_RE.test(email) || email.length > 254) return res.status(400).json({ ok: false, error: 'invalid-email' });
  if (!BASE || !TOKEN) return res.status(200).json({ ok: false, error: 'not-configured' });

  try {
    await redis(BASE, TOKEN, ['HSET', 'notify:signups', email, new Date().toISOString()]);
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, error: 'store-failed' });
  }
}
