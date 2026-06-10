// Ticker-flicker decode for the hero headline: characters cycle
// through market glyphs and resolve left to right. The final text is
// pinned in aria-label so assistive tech never hears the noise.

import { prefersReducedMotion } from './lib/motion.js';

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789$%▲▼·+−';
const RESOLVE_MS = 1400;
const FLICKER_MS = 34;

export function initScramble() {
  const targets = document.querySelectorAll('[data-scramble]');
  if (!targets.length) return;

  targets.forEach((el) => {
    const finalText = el.textContent;
    el.setAttribute('aria-label', finalText.trim());

    if (prefersReducedMotion()) return;

    const chars = Array.from(finalText);
    const start = performance.now();
    let lastFlicker = 0;

    function frame(now) {
      const t = (now - start) / RESOLVE_MS;
      const resolved = Math.floor(t * chars.length);

      if (now - lastFlicker >= FLICKER_MS) {
        lastFlicker = now;
        el.textContent = chars
          .map((ch, i) => {
            if (i < resolved || ch === ' ') return ch;
            return GLYPHS[(Math.random() * GLYPHS.length) | 0];
          })
          .join('');
      }

      if (resolved < chars.length) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = finalText;
      }
    }

    requestAnimationFrame(frame);
  });
}
