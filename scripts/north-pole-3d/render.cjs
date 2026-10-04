// Renders each family member's moves (moves.json) into bottom-aligned atlas
// webps + one manifest, src/data/family3d.json. Optional args: names to render
// (default: everyone), e.g. `node render.cjs dad mom`.
// Usage: see README.md in this folder. Run from the repo root.
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); }
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const CHARS = require('./moves.json');
const ROOT = path.resolve(__dirname, '../..');
const PAGE = 'http://localhost:8765/scripts/north-pole-3d/index.html';
const MANIFEST = path.join(ROOT, 'src/data/family3d.json');
const BASE_S = 260, SS = 2, FPS = 12, COLS = 8, PAD = 0.03; // px per metre (output), supersample
// Zero out near-invisible alpha (antialias fringe + encoder noise) so CSS
// drop-shadows don't paint a faint box around the character.
function cleanAlpha(data, info) {
  for (let i = 3; i < data.length; i += 4) if (data[i] < 12) data[i] = 0;
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
}
module.exports = { cleanAlpha };
if (require.main === module) (async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const only = process.argv.slice(2);
  const family = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : { scale: BASE_S, chars: {} };
  for (const [who, cfg] of Object.entries(CHARS)) {
  if (only.length && !only.includes(who)) continue;
  // out: a folder under public/north-pole, or an absolute public path ("/brand/…")
  const PUB = cfg.out.startsWith('/') ? cfg.out : `/north-pole/${cfg.out}`;
  const OUT = path.join(ROOT, 'public', PUB);
  fs.mkdirSync(OUT, { recursive: true });
  const p = await b.newPage();
  await p.goto(PAGE); await p.waitForFunction(() => window.ready);
  await p.evaluate(([g, l]) => api.load('./' + g, l ? './' + l : null), [cfg.glb, cfg.lend]);
  const travel = await p.evaluate(() => window.travel);
  const manifest = {};
  console.log('==', who);
  const S = cfg.scale || BASE_S; // px per model unit (the hero monkey renders bigger)
  for (const m of cfg.moves) {
    const yaw = m.side ? -Math.PI / 2 : 0;
    const bd = await p.evaluate((m) => {
      api.setClip(m.clip); let mxY = 0, mxH = 0;
      for (let t = m.from; t <= m.to; t += 1 / 12) { const bb = api.bounds(t); mxY = Math.max(mxY, bb[4]); mxH = Math.max(mxH, m.side ? Math.max(-bb[2], bb[5]) : Math.max(-bb[0], bb[3])); }
      return [mxY, mxH];
    }, m);
    const y0 = -PAD, y1 = bd[0] + PAD, half = bd[1] + PAD;
    const fw = Math.round(2 * half * S), fh = Math.round((y1 - y0) * S);
    const n = Math.round((m.to - m.from) * FPS);
    await p.evaluate(([h, y0, y1, w, hh, yaw]) => api.setView(-h, h, y0, y1, w, hh, yaw), [half, y0, y1, fw * SS, fh * SS, yaw]);
    const frames = [];
    for (let i = 0; i < n; i++) {
      const url = await p.evaluate((t) => api.render(t), m.from + i / FPS);
      frames.push(await sharp(Buffer.from(url.split(',')[1], 'base64')).resize(fw, fh, { kernel: 'lanczos3' }).png().toBuffer());
    }
    const cols = Math.min(COLS, n), rows = Math.ceil(n / cols);
    await sharp({ create: { width: cols * fw, height: rows * fh, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite(frames.map((input, i) => ({ input, left: (i % cols) * fw, top: Math.floor(i / cols) * fh })))
      .raw().toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => cleanAlpha(data, info))
      .then((img) => img.webp({ quality: 82, alphaQuality: 100, effort: 6 }).toFile(`${OUT}/${m.name}.webp`));
    const kb = (fs.statSync(`${OUT}/${m.name}.webp`).size / 1024).toFixed(0);
    manifest[m.name] = { src: `${PUB}/${m.name}.webp`, frames: n, cols, fw, fh, fps: FPS, loop: m.loop };
    if (m.side) { const tr = travel[m.clip]; manifest[m.name].speed = +(Math.hypot(tr.dz, tr.dx) / tr.dur * S).toFixed(1); }
    console.log(m.name.padEnd(8), `${n} frames ${fw}x${fh}`, kb + 'KB', manifest[m.name].speed ? 'speed ' + manifest[m.name].speed + 'px/s' : '');
  }
  // Paisley's walking pace, measured from her planted foot (see README)
  if (manifest.walk) { manifest.walk.speedMps = 0.507; delete manifest.walk.speed; }
  family.chars[who] = manifest;
  await p.close();
  }
  fs.writeFileSync(MANIFEST, JSON.stringify(family, null, 2) + '\n');
  await b.close();
})();
