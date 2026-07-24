// Scroll-reveal + magnetic hover. Safe to call on every page load.

function prefersReduced(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initInteractions(): void {
  // Reveal on scroll.
  const reveals = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)');
  if ('IntersectionObserver' in window && !prefersReduced()) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Pause looping mascot sprite animations while off-screen (saves CPU/battery,
  // and keeps only the in-view motion running for a calmer, more premium feel).
  const loops = document.querySelectorAll<HTMLElement>(
    '.mascot-sprite, .filter-monkey__art, .cc-mascot, .program__mascot, .teaser__swing',
  );
  if ('IntersectionObserver' in window && loops.length) {
    const pauseIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
        }
      },
      { rootMargin: '150px' },
    );
    loops.forEach((el) => {
      if (el.dataset.pauseBound) return;
      el.dataset.pauseBound = 'true';
      el.style.animationPlayState = 'paused';
      pauseIO.observe(el);
    });
  }

  // Magnetic hover (fine pointers only).
  if (!prefersReduced() && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
      if (el.dataset.magneticBound) return;
      el.dataset.magneticBound = 'true';
      const strength = 0.3;
      el.addEventListener('pointermove', (ev) => {
        const rect = el.getBoundingClientRect();
        const x = ev.clientX - (rect.left + rect.width / 2);
        const y = ev.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
      });
    });
  }
}
