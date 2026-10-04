// The family's 3D animations for the wish-list page (/north-pole only).
//
// Each move is pre-rendered from that person's rigged Tripo model (see
// scripts/north-pole-3d) into a transparent atlas webp — frames in a grid, all
// at the same scale with their feet on the bottom edge. This player draws one frame at a time onto a
// <canvas> inside a fixed-size box, so a tall move (the jump) rises out of the
// top instead of shrinking her. Atlases load on first use and are shared.

import data from '../data/family3d.json';

export interface Move {
  src: string;
  frames: number;
  cols: number;
  fw: number;
  fh: number;
  fps: number;
  loop: boolean;
  speedMps?: number;
}
export type Who = keyof typeof data.chars;

const CHARS = data.chars as Record<string, Record<string, Move>>;
/** Output pixels per model unit in every atlas. */
export const SCALE = data.scale;

const images = new Map<string, Promise<HTMLImageElement>>();
export function loadMove(who: string, name: string): Promise<HTMLImageElement> {
  const m = CHARS[who][name];
  let p = images.get(m.src);
  if (!p) {
    p = new Promise((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = m.src;
    });
    images.set(m.src, p);
  }
  return p;
}

interface PlayOpts {
  /** How many times to play a looping move before `onDone` (default 1). */
  loops?: number;
  onDone?: () => void;
}

export class Family3D {
  readonly box: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private move: Move | null = null;
  private img: HTMLImageElement | null = null;
  private opts: PlayOpts = {};
  private t0 = 0;
  private lastFrame = -1;
  private raf = 0;
  private visible = true;
  private pausedAt = 0;
  private token = 0;
  private io: IntersectionObserver;
  private seq: [string, number][] = [];
  private seqIndex = 0;
  readonly reduce: boolean;

  readonly who: string;
  private moves: Record<string, Move>;

  /** `who` defaults to the box's data-who ("paisley", "dad", "mom"). */
  constructor(box: HTMLElement, reduce = false, who = box.dataset.who || 'paisley') {
    this.box = box;
    this.who = who;
    this.moves = CHARS[who];
    this.reduce = reduce;
    this.canvas = box.querySelector('canvas') ?? box.appendChild(document.createElement('canvas'));
    this.ctx = this.canvas.getContext('2d')!;
    // Pause while off-screen; pick up where she left off when back in view.
    this.io = new IntersectionObserver(([e]) => {
      const was = this.visible;
      this.visible = e.isIntersecting;
      if (this.visible && !was) {
        this.t0 += performance.now() - this.pausedAt;
        this.tick();
      } else if (!this.visible && was) {
        this.pausedAt = performance.now();
        cancelAnimationFrame(this.raf);
      }
    });
    this.io.observe(box);
  }

  /** Display pixels per atlas pixel, from the box's CSS height. */
  get k(): number {
    // the standing (wave) frame fills the box's height
    return this.box.clientHeight / this.moves.wave.fh;
  }
  /** Display pixels per metre (for moving her across the page at walking pace). */
  get pxPerMetre(): number {
    return this.k * SCALE;
  }

  async play(name: string, opts: PlayOpts = {}): Promise<void> {
    const token = ++this.token;
    if (!this.moves[name]) name = 'cheer'; // a move this person doesn't have
    const img = await loadMove(this.who, name);
    if (token !== this.token) return; // superseded while loading
    const m = this.moves[name];
    this.move = m;
    this.img = img;
    this.opts = opts;
    this.canvas.width = m.fw;
    this.canvas.height = m.fh;
    this.canvas.style.width = `${m.fw * this.k}px`;
    this.canvas.style.height = `${m.fh * this.k}px`;
    this.lastFrame = -1;
    this.t0 = performance.now();
    this.pausedAt = this.t0;
    if (this.reduce) {
      this.draw(0); // still pose only
      return;
    }
    cancelAnimationFrame(this.raf);
    this.tick();
  }

  /** Loop through a sequence of [move, loops] forever, starting at a random spot. */
  idle(seq: [string, number][], start?: string) {
    this.seq = seq;
    this.seqIndex = Math.floor(Math.random() * seq.length);
    const next = () => {
      const [name, loops] = this.seq[this.seqIndex++ % this.seq.length];
      this.play(name, { loops, onDone: next });
    };
    if (start) this.play(start, { onDone: next });
    else next();
    // warm the rest of the sequence after the first move is up
    const warm = () => seq.forEach(([n]) => this.moves[n] && loadMove(this.who, n).catch(() => {}));
    if ('requestIdleCallback' in window) window.requestIdleCallback(warm);
    else setTimeout(warm, 1500);
  }

  /** Interrupt with a one-off move, then go back to the idle sequence. */
  react(name: string, then?: () => void) {
    const resume = () => {
      if (then) then();
      else if (this.seq.length) this.idle(this.seq);
    };
    this.play(name, { loops: 1, onDone: resume });
  }

  private tick = () => {
    if (!this.visible || !this.move || this.reduce) return;
    const m = this.move;
    const elapsed = (performance.now() - this.t0) / 1000;
    const total = Math.floor(elapsed * m.fps);
    const loops = this.opts.loops ?? 1;
    const done = m.loop ? total >= m.frames * loops : total >= m.frames;
    if (done && this.opts.onDone) {
      const cb = this.opts.onDone;
      this.opts = {};
      cb();
      return;
    }
    const f = m.loop ? total % m.frames : Math.min(total, m.frames - 1);
    if (f !== this.lastFrame) this.draw(f);
    this.raf = requestAnimationFrame(this.tick);
  };

  private draw(f: number) {
    const m = this.move!;
    this.lastFrame = f;
    this.ctx.clearRect(0, 0, m.fw, m.fh);
    this.ctx.drawImage(this.img!, (f % m.cols) * m.fw, Math.floor(f / m.cols) * m.fh, m.fw, m.fh, 0, 0, m.fw, m.fh);
  }

  destroy() {
    this.token++;
    cancelAnimationFrame(this.raf);
    this.io.disconnect();
  }
}

/** Real walking pace of the walk cycle (from her planted-foot speed), m/s. */
export const WALK_SPEED = CHARS.paisley.walk.speedMps ?? 0.5;

/** Her everyday routine: a wave, then dances with the odd cheer and giggle. */
export const IDLE: [string, number][] = [
  ['dance1', 2],
  ['dance2', 1],
  ['cheer', 1],
  ['dance3', 1],
  ['laugh', 1],
  ['dance1', 1],
];
/** Mom and Dad's routine (they have two dances each). */
export const PARENT_IDLE: [string, number][] = [
  ['dance1', 2],
  ['dance2', 1],
  ['cheer', 1],
  ['dance1', 1],
  ['laugh', 1],
];
/** Big moves for taps and celebrations. */
export const REACTIONS = ['flip', 'jump', 'cheer', 'laugh'];
