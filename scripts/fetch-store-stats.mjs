// Populate src/data/store-stats.json with REAL ratings + download ranges from
// the app stores, for apps that are actually published (i.e. have a Play/App
// Store URL in apps.ts). Apps without a store URL are skipped entirely, so the
// site never shows an invented rating or count.
//
// Run locally:
//   npm i --no-save google-play-scraper app-store-scraper
//   npm run fetch-stats
//
// In CI it runs daily via .github/workflows/store-stats.yml (which installs the
// scraper libs with --no-save so they never enter this project's dependencies).

import fs from 'node:fs';
import path from 'node:path';

let gplay, appstore;
try { gplay = (await import('google-play-scraper')).default; } catch {}
try { appstore = (await import('app-store-scraper')).default; } catch {}
if (!gplay && !appstore) {
  console.error('Store scraper libs not installed. Run: npm i --no-save google-play-scraper app-store-scraper');
  process.exit(0);
}

const DATA_FILES = ['src/data/apps.ts', 'src/data/programs.ts'];
const OUT = 'src/data/store-stats.json';

/** Pull { slug, play, appstore } for every entry in a data file. */
function extractEntries(src) {
  const marks = [];
  const re = /slug:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(src))) marks.push({ slug: m[1], start: m.index });
  return marks.map((mk, i) => {
    const chunk = src.slice(mk.start, i + 1 < marks.length ? marks[i + 1].start : undefined);
    const play = (chunk.match(/playUrl:\s*'([^']*)'/) || [])[1] || '';
    const appstore = (chunk.match(/appStoreUrl:\s*'([^']*)'/) || [])[1] || '';
    return { slug: mk.slug, play, appstore };
  });
}

const playId = (u) => (u.match(/[?&]id=([^&]+)/) || [])[1] || null;
const appstoreId = (u) => (u.match(/id(\d+)/) || [])[1] || null;
const round1 = (n) => Math.round(n * 10) / 10;

async function statFor(e) {
  const out = {};
  const pid = e.play && playId(e.play);
  if (pid && gplay) {
    try {
      const a = await gplay.app({ appId: pid });
      if (a.score) { out.rating = round1(a.score); if (a.ratings) out.ratingCount = a.ratings; }
      out.downloads = a.installs || (a.minInstalls ? a.minInstalls.toLocaleString('en-US') + '+' : undefined);
    } catch (err) { console.warn(`  play ${e.slug}: ${err.message}`); }
  }
  const aid = e.appstore && appstoreId(e.appstore);
  if (aid && appstore && out.rating == null) {
    try {
      const a = await appstore.app({ id: aid });
      if (a.score) { out.rating = round1(a.score); if (a.reviews) out.ratingCount = a.reviews; }
    } catch (err) { console.warn(`  appstore ${e.slug}: ${err.message}`); }
  }
  if (!out.downloads) delete out.downloads;
  return out.rating != null || out.downloads ? out : null;
}

const entries = DATA_FILES.flatMap((f) => extractEntries(fs.readFileSync(f, 'utf8')));
const result = {};
for (const e of entries) {
  if (!e.play && !e.appstore) continue;
  const s = await statFor(e);
  if (s) { result[e.slug] = s; console.log(`  ✓ ${e.slug}`, JSON.stringify(s)); }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(result, null, 2) + '\n');
console.log(`Wrote ${Object.keys(result).length} entry(ies) → ${OUT}`);
