// Theme-aware color access for canvas/SVG drawing. Canvases never
// hardcode colors — they read the live CSS custom properties and
// re-render when data-theme flips.

export function themeColors() {
  const styles = getComputedStyle(document.documentElement);
  const read = (name) => styles.getPropertyValue(name).trim();
  return {
    bg: read('--bg'),
    bgElev: read('--bg-elev'),
    fg: read('--fg'),
    muted: read('--muted'),
    faint: read('--faint'),
    hairline: read('--hairline'),
    up: read('--up'),
    upBright: read('--up-bright'),
    upSoft: read('--up-soft'),
    down: read('--down'),
    gold: read('--gold'),
  };
}

export function onThemeChange(fn) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'data-theme') {
        fn();
        break;
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true });
  return () => observer.disconnect();
}
