// Scroll progress "index bar" along the header's bottom edge.

import { prefersReducedMotion, rafThrottle, clamp } from './lib/motion.js';

export function initProgress() {
  const bar = document.querySelector('[data-scroll-progress]');
  if (!bar) return;

  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
    bar.style.transform = `scaleX(${p.toFixed(4)})`;
  };

  if (prefersReducedMotion()) {
    // Still useful as a position indicator — just unanimated.
    update();
    window.addEventListener('scroll', update, { passive: true });
    return;
  }

  const throttled = rafThrottle(update);
  update();
  window.addEventListener('scroll', throttled, { passive: true });
  window.addEventListener('resize', throttled);
}
