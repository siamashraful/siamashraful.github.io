// Shared motion utilities. Every animation module gates itself through
// prefersReducedMotion() and renders its final static state instead.

const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

export function prefersReducedMotion() {
  return mq.matches;
}

export function onMotionPreferenceChange(fn) {
  mq.addEventListener('change', fn);
}

export function rafThrottle(fn) {
  let scheduled = false;
  return function throttled(...args) {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      fn.apply(this, args);
    });
  };
}

export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function onceIntersect(el, fn, options = { threshold: 0.2 }) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        io.disconnect();
        fn(entry);
        break;
      }
    }
  }, options);
  io.observe(el);
  return io;
}
