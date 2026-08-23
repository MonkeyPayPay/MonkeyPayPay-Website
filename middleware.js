// Vercel Edge Middleware — a soft "coming soon" password gate.
//
// Runs on Vercel BEFORE any static page or asset is served, so nothing ships to
// the browser until the visitor enters the password. This is intentionally
// lightweight (a shared passphrase, not real per-user auth) — its job is just to
// keep the public out until the owner is ready to launch.
//
// Password: defaults to "1234". To change it without touching code, set a
// SITE_PASSWORD environment variable in the Vercel project (Production).
// To REMOVE the gate entirely at launch: delete this file (and the @vercel/edge
// dependency) and redeploy, or set SITE_GATE_OFF=1 in Vercel.

import { next } from '@vercel/edge';

export const config = {
  // Gate everything except Vercel's own internal routes.
  matcher: ['/((?!_vercel/).*)'],
};

const COOKIE = 'mpp_gate';
const TOKEN = 'granted-monkeypaypay';

export default async function middleware(request) {
  // Kill switch: set SITE_GATE_OFF=1 in Vercel to disable the gate at launch.
  if (process.env.SITE_GATE_OFF === '1') return next();

  const password = process.env.SITE_PASSWORD || '1234';
  const url = new URL(request.url);

  // --- Legal pages stay public even while the gate is up ---
  // App stores require a privacy-policy URL reachable without a login, and legal
  // pages contain no secrets. Allow any /privacy or /terms page straight through.
  if (/\/(privacy|terms)\/?$/.test(url.pathname)) return next();

  // --- Handle the unlock form submission ---
  if (url.pathname === '/__enter' && request.method === 'POST') {
    let entered = '';
    try {
      const form = await request.formData();
      entered = String(form.get('password') || '').trim();
    } catch {
      /* ignore malformed body */
    }
    if (entered === password) {
      const res = new Response(null, { status: 303, headers: { Location: '/' } });
      res.headers.append(
        'Set-Cookie',
        `${COOKIE}=${TOKEN}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`,
      );
      return res;
    }
    return gate(true); // wrong password → re-show gate with an error
  }

  // --- Already unlocked? ---
  const cookie = request.headers.get('cookie') || '';
  const unlocked = cookie.split(';').some((c) => c.trim() === `${COOKIE}=${TOKEN}`);
  if (unlocked) return next();

  // --- Not unlocked → show the gate for any request ---
  return gate(false);
}

function gate(showError) {
  const err = showError
    ? '<p class="err" role="alert">That’s not it — try again.</p>'
    : '';
  const html = `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>MonkeyPayPay — coming soon</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: grid; place-items: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #f4f4fb; background: #0b0b12;
    background-image: radial-gradient(60% 60% at 20% 10%, rgba(124,92,255,.28), transparent 60%),
                      radial-gradient(60% 60% at 85% 20%, rgba(0,230,168,.20), transparent 60%);
    padding: 24px;
  }
  .card {
    width: 100%; max-width: 420px; text-align: center;
    background: rgba(20,20,31,.72); border: 1px solid rgba(255,255,255,.08);
    border-radius: 22px; padding: 40px 30px;
    backdrop-filter: blur(10px); box-shadow: 0 30px 70px -30px rgba(0,0,0,.7);
  }
  .mark {
    width: 46px; height: 46px; border-radius: 13px; margin: 0 auto 20px;
    background: linear-gradient(135deg, #7c5cff, #00e6a8);
  }
  h1 { font-size: 1.55rem; margin: 0 0 8px; letter-spacing: -0.02em; }
  p.lead { color: #a6a6c4; margin: 0 0 26px; font-size: 1rem; line-height: 1.5; }
  form { display: flex; flex-direction: column; gap: 12px; }
  input {
    width: 100%; padding: 14px 16px; font-size: 1rem; text-align: center; letter-spacing: .3em;
    color: #f4f4fb; background: #0f0f18; border: 1px solid rgba(255,255,255,.14);
    border-radius: 999px; outline: none;
  }
  input:focus { border-color: #7c5cff; box-shadow: 0 0 0 3px rgba(124,92,255,.25); }
  button {
    width: 100%; padding: 14px 16px; font-size: 1rem; font-weight: 700; cursor: pointer;
    color: #0b0b12; border: 0; border-radius: 999px;
    background: linear-gradient(135deg, #7c5cff, #00e6a8);
  }
  button:hover { filter: brightness(1.06); }
  .err { color: #ff8095; font-size: .9rem; margin: 4px 0 0; }
  .foot { color: #6f6f8c; font-size: .8rem; margin: 22px 0 0; }
</style>
</head>
<body>
  <main class="card">
    <div class="mark" aria-hidden="true"></div>
    <h1>MonkeyPayPay</h1>
    <p class="lead">We’re putting the finishing touches on things.<br />Enter the password to take a peek.</p>
    <form method="POST" action="/__enter" autocomplete="off">
      <input type="password" name="password" inputmode="numeric" placeholder="Password"
             aria-label="Password" autofocus required />
      <button type="submit">Enter</button>
      ${err}
    </form>
    <p class="foot">Apps made with love, for Paisley.</p>
  </main>
</body>
</html>`;
  return new Response(html, {
    status: showError ? 401 : 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow',
    },
  });
}
