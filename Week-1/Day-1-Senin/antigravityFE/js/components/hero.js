export class Hero {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      title: options.title || 'Discover Southeast Asia’s Tropical Wonders',
      subtitle: options.subtitle || 'Immerse yourself in sun-drenched islands, emerald waters, ancient temples, and vibrant coastal culture across Southeast Asia.',
      badge: options.badge || 'Tropical Escapes & Island Getaways',
      backgroundImage: options.backgroundImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
      ...options
    };

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <section class="hero-section" style="background-image: url('${this.options.backgroundImage}');">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <span class="hero-badge">${this.options.badge}</span>
          <h1 class="hero-title">${this.options.title}</h1>
          <p class="hero-subtitle">${this.options.subtitle}</p>
        </div>
      </section>
    `;
  }

  updateContent({ title, subtitle, backgroundImage }) {
    if (title) this.options.title = title;
    if (subtitle) this.options.subtitle = subtitle;
    if (backgroundImage) this.options.backgroundImage = backgroundImage;
    this.render();
  }

  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

