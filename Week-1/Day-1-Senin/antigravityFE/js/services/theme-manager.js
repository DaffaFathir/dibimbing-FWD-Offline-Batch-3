export class ThemeManager {
  constructor(options = {}) {
    this.storageKey = 'user-theme-preference';
    this.defaultTheme = options.defaultTheme || 'light';
    this.subscribers = [];
    this.currentTheme = this.defaultTheme;
  }

  initialize() {
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem(this.storageKey);
    } catch (e) {
      console.warn('localStorage not accessible, fallback to system preference');
    }

    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.currentTheme = savedTheme;
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme = prefersDark ? 'dark' : 'light';
    }

    this.applyTheme(this.currentTheme);
    this.watchSystemPreference();
  }

  getTheme() {
    return this.currentTheme;
  }

  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') return;
    this.currentTheme = theme;
    
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch (e) {
      console.warn('Could not save theme to localStorage');
    }

    this.applyTheme(theme);
    this.notifySubscribers(theme);
  }

  toggleTheme() {
    const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
    return nextTheme;
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#12181B' : '#00A9B5');
  }

  watchSystemPreference() {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handler = (e) => {
      let savedTheme = null;
      try {
        savedTheme = localStorage.getItem(this.storageKey);
      } catch (err) {}

      if (!savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        this.currentTheme = newTheme;
        this.applyTheme(newTheme);
        this.notifySubscribers(newTheme);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handler);
    }
  }

  onChange(callback) {
    if (typeof callback === 'function') {
      this.subscribers.push(callback);
      return () => {
        this.subscribers = this.subscribers.filter(fn => fn !== callback);
      };
    }
    return () => {};
  }

  notifySubscribers(theme) {
    this.subscribers.forEach(cb => {
      try {
        cb(theme);
      } catch (e) {
        console.error('Error in theme subscriber:', e);
      }
    });
  }
}

