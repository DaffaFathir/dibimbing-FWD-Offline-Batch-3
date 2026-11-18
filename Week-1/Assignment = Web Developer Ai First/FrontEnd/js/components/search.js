/**
 * Search Component
 * 
 * Provides a search input with debounced filtering functionality.
 * Emits search:input and search:clear events through the event bus.
 * 
 * @example
 * import { Search } from './components/search.js';
 * 
 * const container = document.querySelector('[data-component="search"]');
 * const search = new Search(container, {
 *   placeholder: 'Search destinations...',
 *   debounceDelay: 300
 * });
 */

import { eventBus } from '../event-bus.js';

export class Search {
  constructor(container, options = {}) {
    if (!container) {
      throw new Error('Search component requires a container element');
    }

    this.container = container;
    
    // Default options
    this.options = {
      placeholder: 'Search destinations...',
      debounceDelay: 300,
      ...options
    };

    // State
    this.value = '';
    this.debounceTimer = null;
    
    // Element references
    this.input = null;
    this.clearButton = null;

    // Bind methods
    this.handleInput = this.handleInput.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);

    // Initialize
    this.init();
  }

  /**
   * Initialize the component
   */
  init() {
    this.render();
    this.attachEventListeners();
  }

  /**
   * Render the search component
   */
  render() {
    this.container.innerHTML = this.template();
    
    // Cache element references
    this.input = this.container.querySelector('.search-input');
    this.clearButton = this.container.querySelector('.search-clear');
    
    // Update clear button visibility
    this.updateClearButton();
  }

  /**
   * Generate the HTML template
   * @returns {string} HTML template string
   */
  template() {
    return `
      <div class="search-container">
        <div class="search-input-wrapper">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input 
            type="search" 
            class="search-input" 
            placeholder="${this.options.placeholder}"
            aria-label="Search destinations"
            value="${this.value}"
          >
          <button 
            class="search-clear" 
            data-action="clear" 
            aria-label="Clear search"
            type="button"
          >×</button>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    if (this.input) {
      this.input.addEventListener('input', this.handleInput);
      this.input.addEventListener('keydown', this.handleKeydown);
    }

    if (this.clearButton) {
      this.clearButton.addEventListener('click', this.handleClear);
    }
  }

  /**
   * Handle input changes with debouncing
   * @param {Event} event - Input event
   */
  handleInput(event) {
    this.value = event.target.value;
    this.updateClearButton();

    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Set new timer for debounced emission
    this.debounceTimer = setTimeout(() => {
      this.emitSearchEvent();
    }, this.options.debounceDelay);
  }

  /**
   * Handle clear button click
   * @param {Event} event - Click event
   */
  handleClear(event) {
    event.preventDefault();
    this.clear();
    
    // Emit clear event
    eventBus.emit('search:clear');
    
    // Also emit search:input with empty value for consistency
    eventBus.emit('search:input', { query: '' });
    
    // Focus back on input
    this.focus();
  }

  /**
   * Handle keyboard events
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeydown(event) {
    // Clear search on Escape key
    if (event.key === 'Escape') {
      event.preventDefault();
      this.clear();
      eventBus.emit('search:clear');
      eventBus.emit('search:input', { query: '' });
    }
  }

  /**
   * Emit search:input event with current value
   */
  emitSearchEvent() {
    eventBus.emit('search:input', { query: this.value.trim() });
  }

  /**
   * Update clear button visibility based on input value
   */
  updateClearButton() {
    if (this.clearButton) {
      if (this.value.length > 0) {
        this.clearButton.classList.add('visible');
      } else {
        this.clearButton.classList.remove('visible');
      }
    }
  }

  /**
   * Get current search value
   * @returns {string} Current search value
   */
  getValue() {
    return this.value;
  }

  /**
   * Set search value programmatically
   * @param {string} value - New search value
   */
  setValue(value) {
    this.value = value || '';
    
    if (this.input) {
      this.input.value = this.value;
      this.updateClearButton();
    }

    // Clear any pending debounce
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Emit immediately when set programmatically
    this.emitSearchEvent();
  }

  /**
   * Clear the search input
   */
  clear() {
    this.value = '';
    
    if (this.input) {
      this.input.value = '';
      this.updateClearButton();
    }

    // Clear any pending debounce
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  /**
   * Focus the search input
   */
  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  /**
   * Clean up and remove event listeners
   */
  destroy() {
    // Clear any pending debounce
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }

    // Remove event listeners
    if (this.input) {
      this.input.removeEventListener('input', this.handleInput);
      this.input.removeEventListener('keydown', this.handleKeydown);
    }

    if (this.clearButton) {
      this.clearButton.removeEventListener('click', this.handleClear);
    }

    // Clear element references
    this.input = null;
    this.clearButton = null;

    // Clear container
    this.container.innerHTML = '';
  }
}
