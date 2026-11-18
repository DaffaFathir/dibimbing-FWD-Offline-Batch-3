/**
 * Theme Manager Service
 * Handles theme state management with localStorage persistence and system preference detection
 * 
 * Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6
 */

export class ThemeManager {
  constructor(options = {}) {
    this.options = {
      defaultTheme: 'light',
      storageKey: 'user-theme-preference',
      respectSystemPreference: true,
      ...options
    };
    
    this.currentTheme = null;
    this.subscribers = [];
    this.systemPreferenceQuery = null;
    this.storageAvailable = this.checkStorageAvailability();
  }

  /**
   * Check if localStorage is available (handles private browsing mode)
   * @returns {boolean} True if localStorage is accessible
   */
  checkStorageAvailability() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('localStorage unavailable, theme preference will not persist', e);
      return false;
    }
  }

  /**
   * Get the current theme
   * @returns {string} Current theme ('light' or 'dark')
   */
  getTheme() {
    return this.currentTheme || this.options.defaultTheme;
  }

  /**
   * Set and persist theme
   * @param {string} theme - Theme to set ('light' or 'dark')
   */
  setTheme(theme) {
    // Validate theme value
    if (theme !== 'light' && theme !== 'dark') {
      console.error(`Invalid theme: ${theme}. Using default.`);
      theme = this.options.defaultTheme;
    }

    this.currentTheme = theme;
    
    // Apply theme to DOM
    this.applyTheme(theme);
    
    // Persist to localStorage if available
    if (this.storageAvailable) {
      try {
        localStorage.setItem(this.options.storageKey, theme);
      } catch (e) {
        console.error('Failed to save theme preference', e);
      }
    }
    
    // Notify subscribers
    this.notifySubscribers(theme);
  }

  /**
   * Toggle between light and dark themes
   * @returns {string} New theme after toggle
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    return newTheme;
  }

  /**
   * Get system color scheme preference
   * @returns {string} System theme ('light' or 'dark')
   */
  getSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * Listen for OS-level theme changes
   */
  watchSystemPreference() {
    if (!window.matchMedia) {
      console.warn('matchMedia not supported, cannot watch system preference');
      return;
    }

    this.systemPreferenceQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Handle system preference changes
    const handleChange = (e) => {
      // Only apply system preference if user hasn't set manual preference
      if (!this.hasUserPreference()) {
        const systemTheme = e.matches ? 'dark' : 'light';
        this.setTheme(systemTheme);
      }
    };

    // Modern browsers
    if (this.systemPreferenceQuery.addEventListener) {
      this.systemPreferenceQuery.addEventListener('change', handleChange);
    } 
    // Older browsers
    else if (this.systemPreferenceQuery.addListener) {
      this.systemPreferenceQuery.addListener(handleChange);
    }
  }

  /**
   * Check if user has set a manual preference
   * @returns {boolean} True if user has saved preference
   */
  hasUserPreference() {
    if (!this.storageAvailable) return false;
    
    try {
      const saved = localStorage.getItem(this.options.storageKey);
      return saved !== null;
    } catch (e) {
      return false;
    }
  }

  /**
   * Initialize theme on page load
   * Applies theme detection priority: saved preference > system preference > default
   */
  initialize() {
    let theme = this.options.defaultTheme;
    
    // Priority 1: User's saved preference
    if (this.storageAvailable) {
      try {
        const savedTheme = localStorage.getItem(this.options.storageKey);
        if (savedTheme === 'light' || savedTheme === 'dark') {
          theme = savedTheme;
        }
      } catch (e) {
        console.error('Failed to load theme preference', e);
      }
    }
    
    // Priority 2: System preference (if no saved preference and respectSystemPreference is true)
    if (!this.hasUserPreference() && this.options.respectSystemPreference) {
      theme = this.getSystemPreference();
    }
    
    // Apply the determined theme
    this.currentTheme = theme;
    this.applyTheme(theme);
    
    // Start watching system preference changes
    if (this.options.respectSystemPreference) {
      this.watchSystemPreference();
    }
  }

  /**
   * Apply theme to DOM
   * @param {string} theme - Theme to apply
   */
  applyTheme(theme) {
    // Set data-theme attribute on document root
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color tag for mobile browsers
    this.updateMetaThemeColor(theme);
    
    // Update aria-checked on toggle buttons if they exist
    this.updateToggleButtons(theme);
  }

  /**
   * Update meta theme-color for mobile browsers
   * @param {string} theme - Current theme
   */
  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    // Create meta tag if it doesn't exist
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    
    // Set appropriate color based on theme
    const color = theme === 'dark' ? '#1A1A1A' : '#FFFFFF';
    metaThemeColor.setAttribute('content', color);
  }

  /**
   * Update aria-checked state on theme toggle buttons
   * @param {string} theme - Current theme
   */
  updateToggleButtons(theme) {
    const toggleButtons = document.querySelectorAll('[data-action="toggle-theme"]');
    toggleButtons.forEach(button => {
      const isDark = theme === 'dark';
      button.setAttribute('aria-checked', isDark.toString());
    });
  }

  /**
   * Subscribe to theme change events
   * @param {Function} callback - Function to call when theme changes
   * @returns {Function} Unsubscribe function
   */
  onChange(callback) {
    if (typeof callback !== 'function') {
      console.error('onChange callback must be a function');
      return () => {};
    }
    
    this.subscribers.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  /**
   * Notify all subscribers of theme change
   * @param {string} theme - New theme
   */
  notifySubscribers(theme) {
    this.subscribers.forEach(callback => {
      try {
        callback(theme);
      } catch (e) {
        console.error('Error in theme change subscriber', e);
      }
    });
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    if (this.systemPreferenceQuery) {
      if (this.systemPreferenceQuery.removeEventListener) {
        this.systemPreferenceQuery.removeEventListener('change', () => {});
      } else if (this.systemPreferenceQuery.removeListener) {
        this.systemPreferenceQuery.removeListener(() => {});
      }
    }
    
    this.subscribers = [];
  }
}

// Export singleton instance for convenience
export const themeManager = new ThemeManager();
