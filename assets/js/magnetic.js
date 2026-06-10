// Magnetic CTAs: while hovered, the button leans toward the cursor;
// on leave it springs back (transition lives in the .btn CSS).

import { prefersReducedMotion, rafThrottle } from './lib/motion.js';

const PULL = 0.32;
const MAX_SHIFT = 10;

export function initMagnetic() {
  if (prefersReducedMotion()) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const move = rafThrottle((event) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const x = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, dx * PULL));
      const y = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, dy * PULL));
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    });

    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}
