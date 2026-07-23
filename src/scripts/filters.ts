// Animated category filter bar. Shows one category (or all), and drives the
// little monkey that perches on the active filter and hops to whichever one
// you click.

function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Perch the monkey on a filter button. `hop` plays the jump arc + sprite walk;
// otherwise it just snaps into place (initial load, resize).
function perch(monkey: HTMLElement, btn: HTMLElement, hop: boolean): void {
  const left = btn.offsetLeft + btn.offsetWidth / 2 - monkey.offsetWidth / 2;
  const top = btn.offsetTop - monkey.offsetHeight + 6; // 6px overlap so it sits ON the button
  monkey.style.left = `${Math.round(left)}px`;
  monkey.style.top = `${Math.round(top)}px`;

  if (hop && !reducedMotion()) {
    monkey.classList.remove('is-hopping');
    void monkey.offsetWidth; // reflow so the animation restarts every hop
    monkey.classList.add('is-hopping');
    window.setTimeout(() => monkey.classList.remove('is-hopping'), 700);
  }
}

export function initFilters(): void {
  const filters = Array.from(document.querySelectorAll<HTMLButtonElement>('.filter'));
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-group]'));
  if (!filters.length) return;

  const monkey = document.querySelector<HTMLElement>('[data-filter-monkey]');
  const activeBtn = (): HTMLElement => filters.find((f) => f.classList.contains('is-active')) ?? filters[0];

  if (monkey) {
    // Place it on load once layout (and web fonts) have settled.
    requestAnimationFrame(() => perch(monkey, activeBtn(), false));

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => perch(monkey, activeBtn(), false), 120);
    });
  }

  filters.forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', () => {
      const target = btn.dataset.filter ?? 'all';
      filters.forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', String(on));
      });
      groups.forEach((g) => {
        g.hidden = !(target === 'all' || g.dataset.group === target);
      });
      if (monkey) perch(monkey, btn, true);
    });
  });
}
