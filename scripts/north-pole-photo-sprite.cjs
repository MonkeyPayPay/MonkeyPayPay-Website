// Turns a 3x2 photo sprite sheet (1536x1024, white gutters, beige studio
// backdrop, like Paisley's) into a transparent 6-frame strip for /north-pole.
// Keys out the backdrop + floor shadows, clears gaps between arms/body, and
// crops every frame to one shared box so jump height is preserved.
// Also handles a pure-black backdrop with thin grey gutters (Mom's sheet): pass
// "black" as the 3rd argument.
//   node scripts/north-pole-photo-sprite.cjs <sheet.png> <name> [beige|black]
//   -> public/north-pole/sprites/<name>-photo.webp (then set photoSprite in wishlist.ts)
const sharp = require('sharp');
const SRC = process.argv[2];
const NAME = process.argv[3] || 'paisley';
const BLACK = process.argv[4] === 'black';
if (!SRC) { console.error('usage: node scripts/north-pole-photo-sprite.cjs <sheet.png> <name>'); process.exit(1); }
const OUT = `public/north-pole/sprites/${NAME}-photo.webp`;
const CELLS = BLACK
  ? [[3, 3], [516, 3], [1028, 3], [3, 515], [516, 515], [1028, 515]] // 2px grey gutters
  : [[0, 0], [514, 0], [1029, 0], [0, 516], [514, 516], [1029, 516]].map(([x, y]) => [x + 3, y + 3]);
const CW = BLACK ? 504 : 500, CH = BLACK ? 503 : 502;
(async () => {
  const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const frames = [];
  for (const [x0, y0] of CELLS) {
    const px = new Uint8ClampedArray(CW * CH * 4);
    for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
      const s = ((y0 + y) * W + x0 + x) * 3, d = (y * CW + x) * 4;
      px[d] = data[s]; px[d + 1] = data[s + 1]; px[d + 2] = data[s + 2]; px[d + 3] = 255;
    }
    // per-row backdrop estimate from the cell's left/right edges
    const bgRow = [];
    for (let y = 0; y < CH; y++) {
      let r = 0, g = 0, b = 0, n = 0;
      for (const x of [2, 3, 4, 5, 6, CW - 7, CW - 6, CW - 5, CW - 4, CW - 3]) {
        const i = (y * CW + x) * 4; r += px[i]; g += px[i + 1]; b += px[i + 2]; n++;
      }
      bgRow.push([r / n, g / n, b / n]);
    }
    const isBg = (x, y, T) => {
      const i = (y * CW + x) * 4, r = px[i], g = px[i + 1], b = px[i + 2], [br, bg, bb] = bgRow[y];
      // black backdrop is pure 0,0,0; even black clothing sits at ~10+
      if (BLACK) return Math.max(r, g, b) <= (T >= 80 ? 6 : 4);
      const dist = Math.hypot(r - br, g - bg, b - bb);
      // the backdrop + its floor shadows: warm, low-chroma, light-to-mid tone.
      // (dress whites/pinks are cool, skin is high-chroma, hair is dark)
      const lum = 0.3 * r + 0.59 * g + 0.11 * b, chroma = Math.max(r, g, b) - Math.min(r, g, b);
      const warmNeutral = g - b >= 6 && r - g >= 3 && r - g < 26 && chroma < 50 && lum > 135 && lum < 232;
      return warmNeutral && dist < T;
    };
    const bgMask = new Uint8Array(CW * CH);
    const q = [];
    for (let x = 0; x < CW; x++) { q.push([x, 0], [x, CH - 1]); }
    for (let y = 0; y < CH; y++) { q.push([0, y], [CW - 1, y]); }
    while (q.length) {
      const [x, y] = q.pop();
      if (x < 0 || y < 0 || x >= CW || y >= CH) continue;
      const k = y * CW + x; if (bgMask[k]) continue;
      if (!isBg(x, y, 80)) continue;
      bgMask[k] = 1; q.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    // enclosed backdrop pockets (between arms/body, legs) with real area
    const seen = new Uint8Array(CW * CH);
    for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
      const k = y * CW + x; if (bgMask[k] || seen[k] || !isBg(x, y, 60)) continue;
      const comp = [], st = [[x, y]]; seen[k] = 1;
      while (st.length) {
        const [cx, cy] = st.pop(); comp.push(cy * CW + cx);
        for (const [nx, ny] of [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]]) {
          if (nx < 0 || ny < 0 || nx >= CW || ny >= CH) continue;
          const nk = ny * CW + nx; if (seen[nk] || bgMask[nk] || !isBg(nx, ny, 60)) continue;
          seen[nk] = 1; st.push([nx, ny]);
        }
      }
      if (comp.length >= (BLACK ? 150 : 600)) comp.forEach((c) => (bgMask[c] = 1));
    }
    // drop small opaque islands (shadow slivers) not attached to her
    {
      const lab = new Int32Array(CW * CH).fill(-1), sizes = [];
      for (let k0 = 0; k0 < CW * CH; k0++) {
        if (bgMask[k0] || lab[k0] >= 0) continue;
        const id = sizes.length, st = [k0]; lab[k0] = id; let n = 0;
        while (st.length) {
          const k = st.pop(); n++; const x = k % CW, y = (k / CW) | 0;
          for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
            if (nx < 0 || ny < 0 || nx >= CW || ny >= CH) continue;
            const nk = ny * CW + nx; if (bgMask[nk] || lab[nk] >= 0) continue;
            lab[nk] = id; st.push(nk);
          }
        }
        sizes.push(n);
      }
      for (let k = 0; k < CW * CH; k++) if (lab[k] >= 0 && sizes[lab[k]] < 1500) bgMask[k] = 1;
    }
    // alpha + 1px feather on the edge
    for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) {
      const k = y * CW + x;
      if (bgMask[k]) { px[k * 4 + 3] = 0; continue; }
      let nb = 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, ny = y + dy; if (nx >= 0 && ny >= 0 && nx < CW && ny < CH && bgMask[ny * CW + nx]) nb++; }
      if (BLACK && nb) px[k * 4 + 3] = Math.min(255, Math.max(px[k * 4], px[k * 4 + 1], px[k * 4 + 2]) * 14);
      else if (nb >= 2) px[k * 4 + 3] = 150; else if (nb === 1) px[k * 4 + 3] = 215;
    }
    frames.push(px);
  }
  // shared crop = union of opaque bounds across frames (keeps jump height)
  let minX = CW, minY = CH, maxX = 0, maxY = 0;
  for (const f of frames) for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) if (f[(y * CW + x) * 4 + 3] > 200) {
    if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
  minX = Math.max(0, minX - 4); minY = Math.max(0, minY - 4); maxX = Math.min(CW - 1, maxX + 4); maxY = Math.min(CH - 1, maxY + 4);
  const cw = maxX - minX + 1, ch = maxY - minY + 1;
  console.log('crop', { minX, minY, cw, ch });
  const FH = 300, FWW = Math.round((cw / ch) * FH);
  const outs = [];
  for (const f of frames) {
    outs.push(await sharp(Buffer.from(f.buffer), { raw: { width: CW, height: CH, channels: 4 } })
      .extract({ left: minX, top: minY, width: cw, height: ch }).resize(FWW, FH).png().toBuffer());
  }
  await sharp({ create: { width: FWW * 6, height: FH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(outs.map((input, i) => ({ input, left: i * FWW, top: 0 })))
    .webp({ quality: 88, alphaQuality: 100 }).toFile(OUT);
  console.log(`wrote ${OUT}: 6 frames of ${FWW}x${FH} (aspect ${FWW}/${FH})`);
})();
