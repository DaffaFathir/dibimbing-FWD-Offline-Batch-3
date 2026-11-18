export class ThemeToggle {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      themeManager: options.themeManager || null,
      showLabels: options.showLabels || false,
      onChange: options.onChange || null,
      ...options
    };
    this.themeManager = this.options.themeManager;
    this.currentTheme = this.themeManager ? this.themeManager.getTheme() : 'light';

    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();

    if (this.themeManager) {
      this.unsubscribe = this.themeManager.onChange((theme) => {
        this.updateThemeState(theme);
      });
    }
  }

  render() {
    if (!this.container) return;

    const isDark = this.currentTheme === 'dark';
    this.container.innerHTML = `
      <div class="theme-toggle-container">
        <button 
          type="button"
          class="theme-toggle" 
          role="switch"
          aria-checked="${isDark ? 'true' : 'false'}"
          aria-label="Toggle dark mode"
          data-action="toggle-theme"
          title="${isDark ? 'Switch to light mode' : 'Switch to dark mode'}"
        >
          <span class="theme-toggle-track">
            <span class="theme-toggle-thumb">
              <span class="theme-icon theme-icon-sun" aria-hidden="true">☀️</span>
              <span class="theme-icon theme-icon-moon" aria-hidden="true">🌙</span>
            </span>
          </span>
        </button>
      </div>
    `;

    this.button = this.container.querySelector('[data-action="toggle-theme"]');
  }

  attachEventListeners() {
    if (!this.button) return;

    this.button.addEventListener('click', () => {
      this.toggle();
    });

    this.button.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  toggle() {
    let nextTheme;
    if (this.themeManager) {
      nextTheme = this.themeManager.toggleTheme();
    } else {
      nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(nextTheme);
    }

    if (this.options.onChange) {
      this.options.onChange(nextTheme);
    }
  }

  setTheme(theme) {
    this.currentTheme = theme;
    this.updateThemeState(theme);
  }

  updateThemeState(theme) {
    this.currentTheme = theme;
    if (this.button) {
      const isDark = theme === 'dark';
      this.button.setAttribute('aria-checked', isDark ? 'true' : 'false');
      this.button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

