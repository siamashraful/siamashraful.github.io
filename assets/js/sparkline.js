// Decorative seeded sparklines (clearly non-data; aria-hidden). Each
// [data-sparkline] gets a tiny canvas whose walk is deterministic per
// seed, drawn in on first intersection and theme-aware.

import { prefersReducedMotion, onceIntersect } from './lib/motion.js';
import { themeColors, onThemeChange } from './lib/theme.js';

const W = 84;
const H = 26;
const N = 28;
const DRAW_MS = 900;

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeWalk(seed) {
  const rand = mulberry32(seed * 7919 + 17);
  const pts = [];
  let v = 0.5;
  for (let i = 0; i < N; i++) {
    v = Math.min(0.95, Math.max(0.05, v + (rand() - 0.47) * 0.22));
    pts.push(v);
  }
  return pts;
}

export function initSparklines() {
  const targets = document.querySelectorAll('[data-sparkline]');
  if (!targets.length) return;

  targets.forEach((host, idx) => {
    const seed = parseInt(host.dataset.sparkSeed, 10) || idx + 1;
    const pts = makeWalk(seed);
    const canvas = document.createElement('canvas');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    function draw(progress) {
      const colors = themeColors();
      const count = Math.max(2, Math.floor(progress * N));
      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const x = (i / (N - 1)) * W;
        const y = H - pts[i] * H * 0.86 - H * 0.07;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = colors.up;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    if (prefersReducedMotion()) {
      draw(1);
    } else {
      onceIntersect(host, () => {
        const start = performance.now();
        function frame(now) {
          const t = Math.min((now - start) / DRAW_MS, 1);
          draw(t);
          if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      });
    }

    onThemeChange(() => draw(1));
  });
}
