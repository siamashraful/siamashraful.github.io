// Entry point. Every module is cheap to import and no-ops when its
// root element is absent, so one bundle serves every page. The heavy
// hero chart is dynamically imported only where it exists.

import { initThemeToggle } from './theme-toggle.js';
import { initReveal } from './reveal.js';
import { initScramble } from './scramble.js';
import { initTimeline } from './timeline.js';
import { initTilt } from './tilt.js';
import { initMagnetic } from './magnetic.js';
import { initCountup } from './countup.js';
import { initSparklines } from './sparkline.js';
import { initProgress } from './progress.js';

initThemeToggle();
initReveal();
initScramble();
initTimeline();
initTilt();
initMagnetic();
initCountup();
initSparklines();
initProgress();

if (document.getElementById('hero-chart')) {
  import('./hero-chart.js').then((m) => m.initHeroChart()).catch(() => {});
}
