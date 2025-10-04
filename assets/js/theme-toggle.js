(function () {
  var storageKey = 'theme';
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  function prefersDark() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  function safeGet() {
    try {
      var stored = localStorage.getItem(storageKey);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    } catch (err) {
      /* ignore */
    }
    return null;
  }

  function safeSet(value) {
    try {
      localStorage.setItem(storageKey, value);
    } catch (err) {
      /* ignore */
    }
  }

  function currentTheme() {
    var attribute = root.getAttribute('data-theme');
    if (attribute === 'dark' || attribute === 'light') {
      return attribute;
    }
    var stored = safeGet();
    if (stored) {
      return stored;
    }
    return prefersDark() ? 'dark' : 'light';
  }

  function updateButton(theme) {
    var isDark = theme === 'dark';
    var next = isDark ? 'light' : 'dark';
    button.textContent = isDark ? '🌞' : '🌙';
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', 'Switch to ' + next + ' mode');
    button.setAttribute('title', 'Switch to ' + next + ' mode');
  }

  function applyTheme(theme, persist) {
    var mode = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', mode);
    updateButton(mode);
    if (persist) {
      safeSet(mode);
    }
  }

  applyTheme(currentTheme(), false);

  button.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  });
})();
