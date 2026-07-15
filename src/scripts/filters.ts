// Animated category filter bar. Shows one category (or all).

export function initFilters(): void {
  const filters = Array.from(document.querySelectorAll<HTMLButtonElement>('.filter'));
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-group]'));
  if (!filters.length) return;

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
    });
  });
}
