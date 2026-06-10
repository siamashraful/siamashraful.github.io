// Dark/light toggle. With the View Transitions API available the swap
// plays as a circular reveal expanding from the click point; otherwise
// (or under reduced motion) it's an instant swap. Persisted to
// localStorage under the same key the no-flash <head> script reads.

import { prefersReducedMotion } from './lib/motion.js';

const KEY = 'theme';
const root = document.documentElement;

const ICONS = {
  // Shown while dark is active (clicking goes to light).
  sun: '<svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4" fill="currentColor"></circle><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.4"><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></g></svg>',
  moon: '<svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M21 12.79A9 9 0 0111.21 3a7 7 0 109.79 9.79z"></path></svg>',
};

function safeSet(value) {
  try {
    localStorage.setItem(KEY, value);
  } catch (err) { /* unavailable */ }
}

function currentTheme() {
  const attr = root.getAttribute('data-theme');
  return attr === 'light' ? 'light' : 'dark';
}

export function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  const icon = toggle.querySelector('[data-theme-icon]');

  function render(theme) {
    const next = theme === 'dark' ? 'light' : 'dark';
    if (icon) icon.innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;
    toggle.setAttribute('aria-label', `Switch to ${next} mode`);
    toggle.setAttribute('title', `Switch to ${next} mode`);
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    render(theme);
    safeSet(theme);
  }

  async function swap(event) {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition || prefersReducedMotion()) {
      apply(next);
      return;
    }

    const rect = toggle.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    root.classList.add('theme-transition');
    const transition = document.startViewTransition(() => apply(next));
    try {
      await transition.ready;
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 520,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
      await transition.finished;
    } catch (err) {
      /* transition skipped — theme already applied */
    } finally {
      root.classList.remove('theme-transition');
    }
  }

  render(currentTheme());
  toggle.addEventListener('click', swap);
}
