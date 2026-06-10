// Entry point. Every module is cheap to import and no-ops when its
// root element is absent, so one bundle serves every page. The heavy
// hero chart is dynamically imported only where it exists.

import { initThemeToggle } from './theme-toggle.js';

initThemeToggle();

if (document.getElementById('hero-chart')) {
  import('./hero-chart.js').then((m) => m.initHeroChart()).catch(() => {});
}
