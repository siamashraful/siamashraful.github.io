(function () {
  const storageKey = 'sa-theme';
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  if (!button) return;

  const media = window.matchMedia('(prefers-color-scheme: dark)');

  function updateButton(mode) {
    const next = mode === 'dark' ? 'light' : mode === 'light' ? 'auto' : media.matches ? 'light' : 'dark';
    button.dataset.mode = mode;
    button.setAttribute('aria-pressed', mode === 'dark');
    const label = `Switch to ${next} mode`;
    button.setAttribute('title', label);
    button.setAttribute('aria-label', label);
  }

  function setTheme(mode, persist = true) {
    const theme = mode === 'dark' || mode === 'light' ? mode : 'auto';
    if (theme === 'auto') {
      if (media.matches) {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
    } else {
      root.setAttribute('data-theme', theme);
    }
    if (persist) {
      localStorage.setItem(storageKey, theme);
    }
    updateButton(theme);
  }

  const stored = localStorage.getItem(storageKey);
  if (stored) {
    setTheme(stored);
  } else {
    setTheme('auto', false);
  }

  media.addEventListener('change', () => {
    const current = localStorage.getItem(storageKey) || 'auto';
    if (current === 'auto') {
      setTheme('auto', false);
    }
  });

  button.addEventListener('click', () => {
    const current = localStorage.getItem(storageKey) || 'auto';
    if (current === 'dark') {
      setTheme('light');
    } else if (current === 'light') {
      setTheme('auto');
    } else {
      setTheme('dark');
    }
  });
})();
