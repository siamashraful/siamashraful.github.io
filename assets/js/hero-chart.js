// Procedural market chart behind the hero. A seeded-feel random walk
// draws itself in over ~2s, leaves a glowing last-price marker, and a
// crosshair tracks the pointer. Colors come from the live theme tokens
// and the canvas repaints when the theme flips. DPR capped at 2; the
// render loop pauses offscreen and is skipped entirely under reduced
// motion (a finished static chart is drawn instead).

import { prefersReducedMotion, rafThrottle, clamp } from './lib/motion.js';
import { themeColors, onThemeChange } from './lib/theme.js';

const POINTS = 170;
const DRAW_MS = 2100;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function makeSeries() {
  const pts = [];
  let v = 0.42;
  let momentum = 0;
  for (let i = 0; i < POINTS; i++) {
    momentum = momentum * 0.92 + (Math.random() - 0.466) * 0.02;
    v = clamp(v + momentum, 0.08, 0.92);
    pts.push(v);
  }
  return pts;
}

export function initHeroChart() {
  const canvas = document.getElementById('hero-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduced = prefersReducedMotion();
  const series = makeSeries();
  let colors = themeColors();
  let width = 0;
  let height = 0;
  let dpr = 1;
  let startTime = null;
  let drawProgress = reduced ? 1 : 0;
  let pointer = null;
  let visible = true;
  let rafId = null;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function xAt(i) {
    return (i / (POINTS - 1)) * width;
  }

  function yAt(v) {
    // Keep the line inside a vertical band so text stays readable.
    return height * (0.92 - v * 0.74);
  }

  function render(now) {
    rafId = null;
    if (!visible) return;

    if (!reduced && drawProgress < 1) {
      if (startTime === null) startTime = now;
      drawProgress = clamp((now - startTime) / DRAW_MS, 0, 1);
    }

    const eased = easeOutCubic(drawProgress);
    const visiblePoints = Math.max(2, Math.floor(eased * POINTS));

    ctx.clearRect(0, 0, width, height);

    // Lattice baselines.
    ctx.strokeStyle = colors.hairline;
    ctx.lineWidth = 1;
    for (let g = 1; g < 4; g++) {
      const gy = (height / 4) * g;
      ctx.beginPath();
      ctx.setLineDash([2, 6]);
      ctx.moveTo(0, gy);
      ctx.lineTo(width, gy);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Area fill under the line.
    const lastI = visiblePoints - 1;
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, colors.upSoft);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.moveTo(xAt(0), yAt(series[0]));
    for (let i = 1; i <= lastI; i++) ctx.lineTo(xAt(i), yAt(series[i]));
    ctx.lineTo(xAt(lastI), height);
    ctx.lineTo(xAt(0), height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // The line itself.
    ctx.beginPath();
    ctx.moveTo(xAt(0), yAt(series[0]));
    for (let i = 1; i <= lastI; i++) ctx.lineTo(xAt(i), yAt(series[i]));
    ctx.strokeStyle = colors.up;
    ctx.lineWidth = 1.8;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Last-price marker: dashed level line + breathing dot.
    const lx = xAt(lastI);
    const ly = yAt(series[lastI]);
    ctx.setLineDash([3, 5]);
    ctx.strokeStyle = colors.faint;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, ly);
    ctx.lineTo(width, ly);
    ctx.stroke();
    ctx.setLineDash([]);

    const pulse = reduced ? 0.5 : (Math.sin(now / 480) + 1) / 2;
    ctx.beginPath();
    ctx.arc(lx, ly, 3 + pulse * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = colors.upBright;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lx, ly, 8 + pulse * 6, 0, Math.PI * 2);
    ctx.strokeStyle = colors.up;
    ctx.globalAlpha = 0.35 - pulse * 0.25;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Crosshair under the pointer.
    if (pointer && drawProgress >= 1) {
      const i = clamp(Math.round((pointer.x / width) * (POINTS - 1)), 0, lastI);
      const cy = yAt(series[i]);
      ctx.strokeStyle = colors.hairline;
      ctx.beginPath();
      ctx.moveTo(pointer.x, 0);
      ctx.lineTo(pointer.x, height);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(xAt(i), cy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = colors.fg;
      ctx.fill();
    }

    if (!reduced) schedule();
  }

  function schedule() {
    if (rafId === null && visible) {
      rafId = requestAnimationFrame(render);
    }
  }

  resize();
  render(performance.now());

  if (reduced) return;

  window.addEventListener('resize', rafThrottle(() => {
    resize();
    schedule();
  }));

  const hero = canvas.closest('.hero') || canvas;
  hero.addEventListener('pointermove', rafThrottle((event) => {
    const rect = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }), { passive: true });
  hero.addEventListener('pointerleave', () => {
    pointer = null;
  });

  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) schedule();
  }).observe(canvas);

  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
    if (visible) schedule();
  });

  onThemeChange(() => {
    colors = themeColors();
    schedule();
  });
}
