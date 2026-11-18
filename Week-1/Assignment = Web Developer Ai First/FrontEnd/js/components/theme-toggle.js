/**
 * Theme Toggle Component
 * Slide toggle button for switching between light and dark themes
 * 
 * Requirements: 11.1, 11.2, 11.3, 11.4, 11.7, 11.10
 */

import { themeManager } from '../services/theme-manager.js';
import { eventBus } from '../event-bus.js';

export class ThemeToggle {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      initialTheme: 'light',
      showLabels: false,
      ...options
    };
    
    this.currentTheme = this.options.initialTheme;
    this.toggleButton = null;
    this.themeManagerUnsubscribe = null;
    
    this.init();
  }

  /**
   * Initialize component
   */
  init() {
    // Get current theme from ThemeManager
    this.currentTheme = themeManager.getTheme();
    
    // Render component
    this.render();
    
    // Attach event listeners
    this.attachEventListeners();
    
    // Subscribe to theme manager changes
    this.subscribeToThemeManager();
  }

  /**
   * Render component HTML
   */
  render() {
    const isDark = this.currentTheme === 'dark';
    
    this.container.innerHTML = `
      <div class="theme-toggle-container">
        ${this.options.showLabels ? '<span class="theme-toggle-label">Theme:</span>' : ''}
        <button 
          class="theme-toggle" 
          role="switch"
          aria-checked="${isDark}"
          aria-label="Toggle ${isDark ? 'light' : 'dark'} mode"
          data-action="toggle-theme"
          title="Switch to ${isDark ? 'light' : 'dark'} mode"
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
    
    // Store reference to button element
    this.toggleButton = this.container.querySelector('[data-action="toggle-theme"]');
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    if (!this.toggleButton) return;
    
    // Click handler
    this.toggleButton.addEventListener('click', this.handleToggleClick.bind(this));
    
    // Keyboard handler (Space and Enter keys)
    this.toggleButton.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  /**
   * Handle toggle button click
   * @param {Event} event - Click event
   */
  handleToggleClick(event) {
    event.preventDefault();
    this.toggle();
  }

  /**
   * Handle keyboard interaction
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeydown(event) {
    // Toggle on Space or Enter key
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  /**
   * Subscribe to ThemeManager changes
   * This keeps the toggle in sync if theme changes from elsewhere
   */
  subscribeToThemeManager() {
    this.themeManagerUnsubscribe = themeManager.onChange((theme) => {
      if (theme !== this.currentTheme) {
        this.currentTheme = theme;
        this.updateUI(theme);
      }
    });
  }

  /**
   * Get current theme
   * @returns {string} Current theme ('light' or 'dark')
   */
  getTheme() {
    return this.currentTheme;
  }

  /**
   * Set theme
   * @param {string} theme - Theme to set ('light' or 'dark')
   */
  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') {
      console.error(`Invalid theme: ${theme}`);
      return;
    }
    
    if (theme === this.currentTheme) return;
    
    this.currentTheme = theme;
    
    // Update ThemeManager (which will trigger our subscription and update UI)
    themeManager.setTheme(theme);
    
    // Emit event for other components
    this.emitThemeChange(theme);
  }

  /**
   * Toggle between light and dark themes
   * @returns {string} New theme after toggle
   */
  toggle() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    return newTheme;
  }

  /**
   * Update UI to reflect current theme
   * @param {string} theme - Current theme
   */
  updateUI(theme) {
    if (!this.toggleButton) return;
    
    const isDark = theme === 'dark';
    
    // Update ARIA attributes
    this.toggleButton.setAttribute('aria-checked', isDark.toString());
    this.toggleButton.setAttribute('aria-label', `Toggle ${isDark ? 'light' : 'dark'} mode`);
    this.toggleButton.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    
    // Update data attribute for CSS styling
    this.toggleButton.setAttribute('data-theme', theme);
  }

  /**
   * Emit theme:change event via EventBus
   * @param {string} theme - New theme
   */
  emitThemeChange(theme) {
    eventBus.emit('theme:change', { theme });
  }

  /**
   * Clean up component
   */
  destroy() {
    // Remove event listeners
    if (this.toggleButton) {
      this.toggleButton.removeEventListener('click', this.handleToggleClick);
      this.toggleButton.removeEventListener('keydown', this.handleKeydown);
    }
    
    // Unsubscribe from ThemeManager
    if (this.themeManagerUnsubscribe) {
      this.themeManagerUnsubscribe();
    }
    
    // Clear container
    this.container.innerHTML = '';
    
    // Clear references
    this.toggleButton = null;
  }
}
