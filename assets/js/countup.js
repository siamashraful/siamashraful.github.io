// Count-up stats. The real value already sits in the markup (so no-JS
// and reduced-motion users see it untouched); we rewind and play on
// first intersection.

import { prefersReducedMotion, onceIntersect } from './lib/motion.js';

const DURATION = 1300;
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function initCountup() {
  const targets = document.querySelectorAll('[data-countup]');
  if (!targets.length || prefersReducedMotion()) return;

  targets.forEach((el) => {
    const finalValue = parseInt(el.dataset.countup, 10);
    if (!Number.isFinite(finalValue)) return;

    onceIntersect(el, () => {
      const start = performance.now();
      function frame(now) {
        const t = Math.min((now - start) / DURATION, 1);
        el.textContent = String(Math.round(finalValue * easeOutExpo(t)));
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }, { threshold: 0.6 });
  });
}
