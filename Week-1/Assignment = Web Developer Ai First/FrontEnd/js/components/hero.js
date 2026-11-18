/**
 * Hero Component
 * Displays engaging banner with title, subtitle, and background image
 * Supports dynamic content updates and responsive design
 */

export class Hero {
  constructor(container, options = {}) {
    if (!container) {
      throw new Error('Hero component requires a container element');
    }

    this.container = container;
    this.options = {
      title: 'Discover Tropical Paradise',
      subtitle: 'Explore breathtaking destinations across Southeast Asia',
      backgroundImage: '',
      ...options
    };

    this.init();
  }

  /**
   * Initialize the component
   */
  init() {
    this.render();
  }

  /**
   * Render the hero section
   */
  render() {
    this.container.innerHTML = this.template();
    
    // Apply background image if provided
    if (this.options.backgroundImage) {
      const backgroundElement = this.container.querySelector('.hero-background');
      if (backgroundElement) {
        backgroundElement.style.backgroundImage = `url(${this.options.backgroundImage})`;
      }
    }
  }

  /**
   * Generate HTML template
   * @returns {string} HTML string
   */
  template() {
    return `
      <section class="hero-section" aria-label="Welcome banner">
        <div class="hero-background" role="img" aria-label="Tropical destination background">
          <div class="hero-overlay" aria-hidden="true"></div>
        </div>
        <div class="hero-content">
          <h1 class="hero-title">${this.escapeHtml(this.options.title)}</h1>
          <p class="hero-subtitle">${this.escapeHtml(this.options.subtitle)}</p>
        </div>
      </section>
    `;
  }

  /**
   * Update hero content dynamically
   * @param {Object} content - New content object with title, subtitle, and/or backgroundImage
   */
  updateContent(content = {}) {
    // Update options with new content
    this.options = {
      ...this.options,
      ...content
    };

    // Update text content
    const titleElement = this.container.querySelector('.hero-title');
    const subtitleElement = this.container.querySelector('.hero-subtitle');
    
    if (titleElement && content.title !== undefined) {
      titleElement.textContent = content.title;
    }
    
    if (subtitleElement && content.subtitle !== undefined) {
      subtitleElement.textContent = content.subtitle;
    }

    // Update background image
    if (content.backgroundImage !== undefined) {
      const backgroundElement = this.container.querySelector('.hero-background');
      if (backgroundElement) {
        backgroundElement.style.backgroundImage = content.backgroundImage 
          ? `url(${content.backgroundImage})` 
          : '';
      }
    }
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Clean up component
   */
  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
