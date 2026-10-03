// Generates the 8-bit family sprite strips for /north-pole (temporary page).
// Run from the repo root: node scripts/north-pole-sprites.mjs
// 4 frames of 26x38 px each: [idle, bob, wave-up, wave-out]. Tweak colours below.
import { createRequire } from 'module';
const sharp = createRequire(import.meta.url)('sharp');
const FW = 26, FH = 38, FRAMES = 4;
const hex = (h) => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
const OUT = '#1a1424';
const SK = '#f2c29b', SKD = '#d99f78', EYE = '#2a1b14', BLUSH = '#f28b8b', WHITE = '#fbf8f2', RED = '#d42b3c', REDD = '#a51d2c';

function drawChar(c, frame) {
  const g = Array.from({ length: FH }, () => Array(FW).fill(null));
  const px = (x, y, col) => { x += 1; y += 1; if (x >= 0 && x < FW && y >= 0 && y < FH && col) g[y][x] = col; };
  const rect = (x, y, w, h, col) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) px(x + i, y + j, col); };
  const bob = frame === 1 ? 1 : 0;
  const wave = frame >= 2 ? frame - 1 : 0; // 1 = arm straight up, 2 = arm out
  const s = c.small ? 4 : 0; // Paisley: drawn shorter
  const U = s + bob; // offset for upper body
  const SKIN = c.skin ?? SK, SKIN_D = c.skinShade ?? SKD, ARM = c.arms ?? c.top;

  // legs + shoes (not bobbing)
  const legTop = c.small ? 27 : 27;
  rect(8, legTop, 3, 34 - legTop, c.legs ?? SKIN); rect(13, legTop, 3, 34 - legTop, c.legs ?? SKIN);
  rect(7, 34, 4, 2, c.shoes); rect(13, 34, 4, 2, c.shoes);

  // torso
  const tTop = 17 + U, tBot = c.small ? 25 : 27;
  if (c.dress) c.dress(rect, px, tTop, tBot, SKIN);
  else {
    rect(7, tTop, 10, tBot - tTop, c.top);
    rect(7, tTop + 4, 10, 2, c.band); // sweater stripe
    for (let i = 0; i < 10; i += 2) px(7 + i, tTop + 4, c.band2);
  }
  if (c.skirt) rect(5, tBot - 2, 14, 3, c.skirt), rect(6, tBot + 1, 12, 1, c.skirt);
  if (c.tutu) { rect(4, tBot - 1, 16, 2, c.tutu); rect(5, tBot + 1, 14, 1, c.tutu2); for (let i = 4; i < 20; i += 3) px(i, tBot - 1, c.tutu2); }

  // left arm (always down)
  // arms out to the sides (like Paisley's photo) or hanging down
  const armOut = (dir) => {
    const x0 = dir < 0 ? 5 : 17;
    for (let i = 0; i < 5; i++) rect(x0 + dir * i, tTop + 1 + i, 2, 2, ARM);
    rect(x0 + dir * 5, tTop + 6, 2, 2, c.skinShade ?? SKIN);
  };
  if (c.armsOut) armOut(-1);
  else { rect(5, tTop + 1, 2, 7, ARM); rect(5, tTop + 8, 2, 2, SKIN); }
  // right arm: down / up / out
  if (!wave && c.armsOut) armOut(1);
  else if (!wave) { rect(17, tTop + 1, 2, 7, ARM); rect(17, tTop + 8, 2, 2, SKIN); }
  if (c.shoulders) c.shoulders(rect, px, tTop);

  // head
  const hTop = 8 + U;
  rect(7, hTop, 10, 9, SKIN); rect(7, hTop + 8, 10, 1, SKIN_D);
  // hair (behind/around face)
  c.hair(rect, px, hTop);
  // face
  rect(9, hTop + 3, 1, 2, EYE); rect(14, hTop + 3, 1, 2, EYE);
  px(8, hTop + 5, BLUSH); px(15, hTop + 5, BLUSH);
  if (c.bigSmile) { px(9, hTop + 6, '#b5523f'); rect(10, hTop + 7, 4, 1, '#b5523f'); px(14, hTop + 6, '#b5523f'); rect(11, hTop + 6, 2, 1, '#fbf8f2'); }
  else { rect(11, hTop + 6, 2, 1, '#b5523f'); if (wave) rect(11, hTop + 7, 2, 1, '#e07a6a'); }
  if (wave === 1) { rect(18, tTop - 6, 2, 7, ARM); rect(18, tTop - 8, 2, 2, SKIN); }
  else if (wave === 2) { rect(17, tTop - 1, 2, 2, ARM); rect(19, tTop - 4, 2, 4, ARM); rect(20, tTop - 6, 2, 2, SKIN); }
  if (wave && c.shoulders) c.shoulders(rect, px, tTop);
  // santa hat
  const y0 = hTop - 7;
  if (c.hat !== false) {
  rect(8, y0 + 4, 8, 2, RED); rect(9, y0 + 2, 6, 2, RED); rect(11, y0 + 1, 4, 1, RED); rect(14, y0, 3, 1, REDD); rect(16, y0 + 1, 2, 1, REDD);
  rect(9, y0 + 3, 1, 1, REDD);
  rect(6, y0 + 6, 12, 2, WHITE);
  rect(17, y0 + 1, 3, 3, WHITE);
  }

  // outline pass
  const o = g.map((r) => r.slice());
  for (let y = 0; y < FH; y++) for (let x = 0; x < FW; x++) {
    if (g[y][x]) continue;
    if ([[1,0],[-1,0],[0,1],[0,-1]].some(([dx, dy]) => g[y + dy]?.[x + dx])) o[y][x] = OUT;
  }
  return o;
}

const chars = {
  dad: {
    top: '#c62839', band: WHITE, band2: '#2f8f5b', legs: '#2b3a67', shoes: '#3b2416',
    hair: (rect, px, t) => { rect(6, t - 1, 12, 2, '#4a2f1f'); rect(6, t + 1, 1, 4, '#4a2f1f'); rect(17, t + 1, 1, 4, '#4a2f1f'); },
  },
  mom: {
    top: '#d61f84', band: WHITE, band2: '#ffd76a', legs: '#1f1a2e', shoes: '#7a1d4a', skirt: '#a8125f',
    hair: (rect, px, t) => { rect(6, t - 1, 12, 2, '#6b3e26'); rect(5, t + 1, 2, 12, '#6b3e26'); rect(17, t + 1, 2, 12, '#6b3e26'); rect(7, t + 1, 3, 1, '#6b3e26'); },
  },
  // Paisley, drawn from her photo: dark wavy hair in two little top-knots with
  // pink flower clips, pink-and-white plaid flutter-sleeve dress, bare feet,
  // big smile. No Santa hat so her flower clips show.
  paisley: {
    small: true, hat: false, bigSmile: true, armsOut: true,
    skin: '#e9b48d', skinShade: '#cf946c', shoes: '#d99b72',
    get arms() { return this.skin; },
    hair: (rect, px, t) => {
      const H = '#3b2519', HL = '#5a3a28';
      rect(7, t - 1, 10, 2, H); px(9, t - 1, HL); px(14, t - 1, HL);
      px(7, t + 1, H); px(16, t + 1, H); // frames the face
      rect(6, t, 1, 7, H); rect(17, t, 1, 7, H); // shoulder-length curls
      px(5, t + 3, H); px(5, t + 5, H); px(18, t + 3, H); px(18, t + 5, H);
      px(6, t + 7, H); px(17, t + 7, H); px(5, t + 7, HL); px(18, t + 7, HL);
      rect(8, t - 3, 3, 2, H); rect(13, t - 3, 3, 2, H); // top-knots
      for (const cx of [9, 14]) { // pink flower clips
        px(cx, t - 5, '#ff7fae'); px(cx - 1, t - 4, '#ff7fae'); px(cx + 1, t - 4, '#ff7fae');
        px(cx, t - 3, '#ff7fae'); px(cx, t - 4, '#ffd1e3');
      }
    },
    dress: (rect, px, tTop, tBot, skin) => {
      const plaid = (x, y) =>
        x % 4 === 1 && y % 3 === 0 ? '#e86f93'
        : x % 4 === 1 || y % 3 === 0 ? '#f6a9bf'
        : x % 7 === 3 ? '#b9d3f2'
        : y % 5 === 2 ? '#f7e3a1'
        : '#fdf4f2';
      for (let y = tTop; y < tBot; y++) for (let x = 7; x < 17; x++) px(x, y, plaid(x, y)); // bodice
      rect(10, tTop, 4, 1, skin); // square neckline
      for (let k = 0; k < 6; k++) { // skirt flares out to the hem
        const w = Math.floor(k / 2), y = tBot + k;
        for (let x = 6 - w; x < 18 + w; x++) px(x, y, k === 5 && x % 2 ? '#f29bb6' : plaid(x, y));
      }
    },
    shoulders: (rect, px, tTop) => { // flutter-sleeve ruffles
      for (const x0 of [5, 16]) { rect(x0, tTop - 1, 3, 2, '#fbd3df'); px(x0 + 1, tTop - 1, '#f29bb6'); px(x0 + (x0 === 5 ? 0 : 2), tTop, '#f29bb6'); }
    },
  },
};

for (const [name, c] of Object.entries(chars)) {
  const W = FW * FRAMES, buf = Buffer.alloc(W * FH * 4);
  for (let f = 0; f < FRAMES; f++) {
    const g = drawChar(c, f);
    for (let y = 0; y < FH; y++) for (let x = 0; x < FW; x++) {
      const col = g[y][x]; if (!col) continue;
      const i = (y * W + f * FW + x) * 4; const [r, gg, b] = hex(col);
      buf[i] = r; buf[i + 1] = gg; buf[i + 2] = b; buf[i + 3] = 255;
    }
  }
  await sharp(buf, { raw: { width: W, height: FH, channels: 4 } }).png().toFile(`public/north-pole/sprites/${name}.png`);
}
console.log('ok');
