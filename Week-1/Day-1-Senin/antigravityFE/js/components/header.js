import { ThemeToggle } from './theme-toggle.js';
import { Search } from './search.js';

export class Header {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      variant: options.variant || 'list', // 'list' | 'detail'
      showSearch: options.showSearch !== false,
      user: options.user || null,
      themeManager: options.themeManager || null,
      onSearch: options.onSearch || null,
      onHomeClick: options.onHomeClick || null,
      ...options
    };

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    const isList = this.options.variant === 'list';
    const user = this.options.user;

    const navLinksHtml = isList
      ? `
        <a href="index.html" class="nav-link active" data-route="home">Home</a>
        <a href="#about" class="nav-link" data-route="about">About</a>
        <a href="#contact" class="nav-link" data-route="contact">Contact</a>
      `
      : `
        <a href="index.html" class="nav-link" data-route="home">Home</a>
        <a href="index.html" class="nav-link active" data-route="destinations">Destinations</a>
        <a href="#about" class="nav-link" data-route="about">About</a>
      `;

    this.container.innerHTML = `
      <div class="header-container">
        <a href="index.html" class="logo" data-route="home">
          <span class="logo-icon">🌴</span>
          <span>Tropical SEA</span>
        </a>

        <nav class="header-nav" aria-label="Main Navigation">
          ${navLinksHtml}
        </nav>

        ${isList ? `<div class="header-search" data-header-search></div>` : ''}

        <div class="header-actions">
          <div class="header-theme-toggle" data-header-theme-toggle></div>
          ${user ? `
            <div class="header-user" title="Logged in as ${user.name}">
              <img src="${user.profilePicture}" alt="${user.name}" class="user-avatar" />
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Mount ThemeToggle
    const toggleContainer = this.container.querySelector('[data-header-theme-toggle]');
    if (toggleContainer) {
      this.themeToggle = new ThemeToggle(toggleContainer, {
        themeManager: this.options.themeManager
      });
    }

    // Mount Search if on list page
    if (isList) {
      const searchContainer = this.container.querySelector('[data-header-search]');
      if (searchContainer) {
        this.search = new Search(searchContainer, {
          onSearch: (val) => {
            if (this.options.onSearch) {
              this.options.onSearch(val);
            }
          }
        });
      }
    }
  }

  updateUser(user) {
    this.options.user = user;
    this.render();
  }

  destroy() {
    if (this.themeToggle) this.themeToggle.destroy();
    if (this.search) this.search.destroy();
    if (this.container) this.container.innerHTML = '';
  }
}

