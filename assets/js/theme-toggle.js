(function () {
  var storageKey = 'theme';
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  function safeGet() {
    try {
      return localStorage.getItem(storageKey);
    } catch (err) {
      return null;
    }
  }

  function safeSet(value) {
    try {
      localStorage.setItem(storageKey, value);
    } catch (err) {
      /* ignore */
    }
  }

  function updateButton(theme) {
    var isDark = theme === 'dark';
    var label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    button.textContent = isDark ? '☀️' : '🌙';
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
  }

  function applyTheme(theme, persist) {
    var mode = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', mode);
    updateButton(mode);
    if (persist) {
      safeSet(mode);
    }
  }

  var stored = safeGet();
  if (stored === 'dark' || stored === 'light') {
    applyTheme(stored, false);
  } else {
    var initial = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(initial, false);
  }

  button.addEventListener('click', function () {
    var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark', true);
  });
})();
