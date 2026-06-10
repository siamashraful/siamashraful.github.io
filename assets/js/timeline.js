// Experience timeline: the progress line scales with scroll position
// and nodes ignite as their entries cross the viewport.

import { prefersReducedMotion, rafThrottle, clamp } from './lib/motion.js';

export function initTimeline() {
  const timelines = document.querySelectorAll('[data-timeline]');
  if (!timelines.length) return;

  if (prefersReducedMotion()) {
    timelines.forEach((tl) => {
      const line = tl.querySelector('.timeline__progress');
      if (line) line.style.setProperty('--progress', '1');
      tl.querySelectorAll('.timeline__entry').forEach((e) => e.classList.add('is-lit'));
    });
    return;
  }

  timelines.forEach((tl) => {
    const line = tl.querySelector('.timeline__progress');

    const entryObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-lit');
          entryObserver.unobserve(entry.target);
        }
      }
    }, { threshold: 0.5 });
    tl.querySelectorAll('.timeline__entry').forEach((e) => entryObserver.observe(e));

    if (!line) return;
    const update = rafThrottle(() => {
      const rect = tl.getBoundingClientRect();
      const viewLine = window.innerHeight * 0.72;
      const progress = clamp((viewLine - rect.top) / rect.height, 0, 1);
      line.style.setProperty('--progress', progress.toFixed(4));
    });

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  });
}
