// Boots every <Monkey3D> on the page (see src/components/Monkey3D.astro).
import { Family3D } from './family3d';

let players: Family3D[] = [];

export function initMonkeys(): void {
  players.forEach((p) => p.destroy());
  players = [];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll<HTMLElement>('[data-m3d]').forEach((box) => {
    const pl = new Family3D(box, reduce);
    players.push(pl);
    const idle = JSON.parse(box.dataset.idle || '[]') as [string, number][];
    const taps = JSON.parse(box.dataset.taps || '[]') as string[];
    pl.idle(idle, box.dataset.start || undefined);
    if (taps.length) {
      box.style.cursor = 'pointer';
      box.addEventListener('click', () => pl.react(taps[(Math.random() * taps.length) | 0]));
    }
    (box as HTMLElement & { m3d?: Family3D }).m3d = pl;
  });
}

export function destroyMonkeys(): void {
  players.forEach((p) => p.destroy());
  players = [];
}
