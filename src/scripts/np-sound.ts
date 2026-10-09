// Sound for the wish-list page (/north-pole only): little tap effects + a
// Christmas music loop (on by default). The effects are the ElevenLabs stems from
// scripts/north-pole-audio, trimmed into public/north-pole/sfx/.
//
// Effects only answer a tap. The music is on by default and starts with the
// visitor's first tap (browsers block sound before that); 🎵 turns it off, and
// both the 🔔 and 🎵 choices are remembered.

const BASE = '/north-pole/sfx/';
export type Sfx = 'rip' | 'jingle' | 'hohoho' | 'uhoh';
const KEY = 'np.sfx';

let ctx: AudioContext | null = null;
const buffers = new Map<Sfx, Promise<AudioBuffer | null>>();

const read = () => {
  try {
    return localStorage.getItem(KEY) !== '0';
  } catch {
    return true;
  }
};
let enabled = read();

export const soundOn = () => enabled;
export function setSound(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(KEY, on ? '1' : '0');
  } catch {
    /* private mode: fine, it just won't be remembered */
  }
}

/** Create/resume the audio context. Call from inside a tap (iOS needs that). */
export function unlock() {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
}

function load(name: Sfx) {
  let p = buffers.get(name);
  if (!p && ctx) {
    const c = ctx;
    p = fetch(`${BASE}${name}.mp3`)
      .then((r) => r.arrayBuffer())
      .then((b) => new Promise<AudioBuffer>((res, rej) => c.decodeAudioData(b, res, rej)))
      .catch(() => null);
    buffers.set(name, p);
  }
  return p ?? Promise.resolve(null);
}

/** Warm every effect so the first tap isn't late. */
export function preload() {
  unlock();
  (['rip', 'jingle', 'hohoho', 'uhoh'] as Sfx[]).forEach(load);
}

export function play(name: Sfx, volume = 0.8, delayMs = 0) {
  if (!enabled) return;
  unlock();
  load(name).then((buf) => {
    if (!buf || !ctx) return;
    const src = ctx.createBufferSource();
    const gain = ctx.createGain();
    gain.gain.value = volume;
    src.buffer = buf;
    src.playbackRate.value = 0.94 + Math.random() * 0.12; // no two rips quite alike
    src.connect(gain).connect(ctx.destination);
    src.start(ctx.currentTime + delayMs / 1000);
  });
}

/* ---------- Background music (on by default; a "no" is remembered) ---------- */
// Browsers won't start sound until the visitor taps/clicks, so the page calls
// startMusic() on load (works where allowed) and again on the first tap.
const MUSIC_KEY = 'np.music';
let music: HTMLAudioElement | null = null;
let wanted = (() => {
  try {
    return localStorage.getItem(MUSIC_KEY) !== '0';
  } catch {
    return true;
  }
})();
let held = false; // paused while the family video plays

const audio = () => {
  if (!music) {
    music = new Audio(`${BASE}music.mp3`);
    music.loop = true;
    music.volume = 0.4;
  }
  return music;
};
const sync = () => {
  if (wanted && !held) audio().play().catch(() => {});
  else music?.pause();
};
export const musicOn = () => wanted;
/** Start the music if it's wanted (call on load and on the first tap). */
export function startMusic() {
  if (wanted && !held && (!music || music.paused)) sync();
}
export function toggleMusic(): boolean {
  // still waiting for the first tap? then this tap just starts it
  if (wanted && !held && (!music || music.paused)) {
    sync();
    return wanted;
  }
  wanted = !wanted;
  try {
    localStorage.setItem(MUSIC_KEY, wanted ? '1' : '0');
  } catch {
    /* private mode: fine */
  }
  sync();
  return wanted;
}
/** Hush the music while something else (the family video) has the floor. */
export function holdMusic(hold: boolean) {
  held = hold;
  sync();
}
export function stopMusic() {
  held = false;
  music?.pause();
}
