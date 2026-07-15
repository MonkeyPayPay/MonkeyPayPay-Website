// ⌘K / Ctrl+K command palette: fuzzy-ish search over pages and apps,
// with keyboard navigation. Re-initialised on each page load.

function getRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-command]');
}

function openPalette(): void {
  const root = getRoot();
  const open = root && (root as unknown as { __open?: () => void }).__open;
  if (open) open();
}

function closePalette(): void {
  const root = getRoot();
  const close = root && (root as unknown as { __close?: () => void }).__close;
  if (close) close();
}

export function initCommandPalette(): void {
  const root = getRoot();
  if (!root) return;

  const input = root.querySelector<HTMLInputElement>('[data-command-input]');
  const items = Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-command-item]'));
  const empty = root.querySelector<HTMLElement>('[data-command-empty]');
  let active = -1;

  const visible = (): HTMLAnchorElement[] =>
    items.filter((el) => !(el.parentElement as HTMLElement).hidden);

  const setActive = (index: number): void => {
    const vis = visible();
    if (!vis.length) {
      active = -1;
      return;
    }
    active = Math.max(0, Math.min(index, vis.length - 1));
    vis.forEach((el, i) => el.classList.toggle('is-active', i === active));
    vis[active].scrollIntoView({ block: 'nearest' });
  };

  const filter = (query: string): void => {
    const q = query.trim().toLowerCase();
    let count = 0;
    items.forEach((el) => {
      const match = !q || (el.dataset.label ?? '').includes(q);
      (el.parentElement as HTMLElement).hidden = !match;
      if (match) count += 1;
    });
    if (empty) empty.hidden = count > 0;
    setActive(0);
  };

  const open = (): void => {
    root.hidden = false;
    document.body.style.overflow = 'hidden';
    if (input) input.value = '';
    filter('');
    requestAnimationFrame(() => {
      root.classList.add('is-open');
      input?.focus();
    });
  };

  const close = (): void => {
    root.classList.remove('is-open');
    document.body.style.overflow = '';
    window.setTimeout(() => {
      root.hidden = true;
    }, 200);
  };

  (root as unknown as { __open: () => void }).__open = open;
  (root as unknown as { __close: () => void }).__close = close;

  if (!root.dataset.bound) {
    root.dataset.bound = 'true';
    input?.addEventListener('input', () => filter(input.value));
    root.querySelectorAll('[data-command-close]').forEach((el) =>
      el.addEventListener('click', close),
    );
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive(active + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(active - 1);
      } else if (e.key === 'Enter') {
        const vis = visible();
        if (vis[active]) {
          e.preventDefault();
          vis[active].click();
        }
      }
    });
  }
}

// Global triggers — bound once for the whole session.
interface CmdWindow extends Window {
  __mppCmdGlobal?: boolean;
}
const w = window as CmdWindow;
if (!w.__mppCmdGlobal) {
  w.__mppCmdGlobal = true;
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const root = getRoot();
      if (root && root.hidden) openPalette();
      else closePalette();
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });
  document.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('[data-command-open]')) openPalette();
  });
}
