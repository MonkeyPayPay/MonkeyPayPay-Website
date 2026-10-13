// Sound for the wish-list page (/north-pole only): little tap effects + a
// Christmas music loop (on by default). The effects are the ElevenLabs stems from
// scripts/north-pole-audio, trimmed into public/north-pole/sfx/.
//
// Effects only answer a tap. The music is on by default and starts with the
// visitor's first tap (browsers block sound before that); 🎵 turns it off, and
// both the 🔔 and 🎵 choices are remembered.

const BASE = '/north-pole/sfx/';
export type Sfx = 'rip' | 'jingle' | 'hohoho' | 'uhoh' | 'sleigh';
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
  (['rip', 'jingle', 'hohoho', 'uhoh', 'sleigh'] as Sfx[]).forEach(load);
}

/** True once audio is running (after the visitor's first tap): safe for ambient cues. */
export const ready = () => !!ctx && ctx.state === 'running';

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
    const at = ctx.currentTime + delayMs / 1000;
    src.start(at);
    // dip the music under the effect so it cuts through, then bring it back
    if (playing && musicGain) {
      musicGain.gain.cancelScheduledValues(at);
      musicGain.gain.setValueAtTime(musicGain.gain.value, at);
      musicGain.gain.linearRampToValueAtTime(MUSIC_VOL * 0.45, at + 0.06);
      musicGain.gain.linearRampToValueAtTime(MUSIC_VOL, at + Math.min(buf.duration, 1.6) + 0.5);
    }
  });
}

/* ---------- Background music (on by default; a "no" is remembered) ---------- */
// Played through Web Audio so it loops with no gap (music.mp3 is pre-built as a
// seamless loop; the decoder's silent padding is trimmed off both ends) and
// fades in/out instead of cutting. Browsers won't start sound until the visitor
// taps/clicks, so the page calls startMusic() on load and on the first tap.
const MUSIC_KEY = 'np.music';
const MUSIC_VOL = 0.42;
let wanted = (() => {
  try {
    return localStorage.getItem(MUSIC_KEY) !== '0';
  } catch {
    return true;
  }
})();
let held = false; // ducked out while the family video plays
let away = false; // the tab is in the background
let musicBuf: Promise<AudioBuffer | null> | null = null;
let musicSrc: AudioBufferSourceNode | null = null;
let musicGain: GainNode | null = null;
let playing = false;
const listeners = new Set<() => void>();
const changed = () => listeners.forEach((f) => f());
/** Called whenever the music starts/stops (to update the 🎵 button). */
export const onMusicChange = (f: () => void) => {
  listeners.add(f);
  return () => listeners.delete(f);
};

const loadMusic = () => {
  if (!musicBuf && ctx) {
    const c = ctx;
    musicBuf = fetch(`${BASE}music.mp3`)
      .then((r) => r.arrayBuffer())
      .then((b) => new Promise<AudioBuffer>((res, rej) => c.decodeAudioData(b, res, rej)))
      .catch(() => null);
  }
  return musicBuf ?? Promise.resolve(null);
};
// skip the near-silent samples MP3 encoders pad onto each end
const loopPoints = (buf: AudioBuffer) => {
  const d = buf.getChannelData(0);
  let a = 0;
  let b = d.length - 1;
  while (a < 4096 && Math.abs(d[a]) < 1e-4) a++;
  while (b > d.length - 4096 && Math.abs(d[b]) < 1e-4) b--;
  return [a / buf.sampleRate, (b + 1) / buf.sampleRate];
};
const fadeTo = (v: number, secs: number) => {
  if (!ctx || !musicGain) return;
  const t = ctx.currentTime;
  musicGain.gain.cancelScheduledValues(t);
  musicGain.gain.setValueAtTime(musicGain.gain.value, t);
  musicGain.gain.linearRampToValueAtTime(v, t + secs);
};
const sync = () => {
  const want = wanted && !held && !away;
  if (!want) {
    if (playing) {
      playing = false;
      fadeTo(0, 0.7);
      changed();
    }
    return;
  }
  unlock();
  if (!ctx || ctx.state !== 'running') return; // still waiting for a tap
  if (musicSrc) {
    if (!playing) {
      playing = true;
      fadeTo(MUSIC_VOL, 1.2);
      changed();
    }
    return;
  }
  playing = true;
  changed();
  loadMusic().then((buf) => {
    if (!buf || !ctx || musicSrc) return;
    const [ls, le] = loopPoints(buf);
    musicGain = ctx.createGain();
    musicGain.gain.value = 0;
    musicGain.connect(ctx.destination);
    musicSrc = ctx.createBufferSource();
    musicSrc.buffer = buf;
    musicSrc.loop = true;
    musicSrc.loopStart = ls;
    musicSrc.loopEnd = le;
    musicSrc.connect(musicGain);
    musicSrc.start(0, ls);
    if (playing) fadeTo(MUSIC_VOL, 1.6);
  });
};
export const musicOn = () => wanted;
/** True once the music is actually audible (not just switched on). */
export const musicPlaying = () => playing;
/** Start the music if it's wanted (call on load and on the first tap). */
export function startMusic() {
  unlock();
  // the context only runs after a gesture, and resume() settles a moment later
  if (ctx && ctx.state !== 'running') ctx.resume().then(sync, () => {});
  else sync();
}
export function toggleMusic(): boolean {
  // still waiting for the first tap? then this tap just starts it
  if (wanted && !held && !playing) {
    startMusic();
    return wanted;
  }
  wanted = !wanted;
  try {
    localStorage.setItem(MUSIC_KEY, wanted ? '1' : '0');
  } catch {
    /* private mode: fine */
  }
  startMusic();
  if (!wanted) sync();
  changed();
  return wanted;
}
/** Duck the music out while something else (the family video) has the floor. */
export function holdMusic(hold: boolean) {
  held = hold;
  sync();
}
/** Fade the music out while the tab is in the background, back in on return. */
export function pageHidden(hidden: boolean) {
  away = hidden;
  sync();
}
export function stopMusic() {
  held = false;
  playing = false;
  try {
    musicSrc?.stop();
  } catch {
    /* already stopped */
  }
  musicSrc = null;
  musicGain = null;
  listeners.clear();
}

/* ---------- Haptics: a little buzz on phones that support it (Android) ---------- */
export function buzz(pattern: number | number[]) {
  try {
    if (enabled && 'vibrate' in navigator) navigator.vibrate(pattern);
  } catch {
    /* not supported */
  }
}
