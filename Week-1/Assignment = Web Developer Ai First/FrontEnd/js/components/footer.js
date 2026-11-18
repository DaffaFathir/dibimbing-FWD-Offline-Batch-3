import { eventBus } from '../event-bus.js';

export class Footer {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      year: new Date().getFullYear(),
      socialLinks: [
        { platform: 'Facebook', icon: '🌐', url: 'https://facebook.com' },
        { platform: 'Instagram', icon: '📸', url: 'https://instagram.com' },
        { platform: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
        { platform: 'YouTube', icon: '▶️', url: 'https://youtube.com' }
      ],
      ...options
    };
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    if (!this.container) return;

    const socialLinksHtml = this.options.socialLinks
      .map(
        (link) => `
        <a 
          href="${link.url}" 
          class="social-link" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="${link.platform}"
          data-platform="${link.platform}"
        >
          <span aria-hidden="true">${link.icon}</span>
        </a>
      `
      )
      .join('');

    this.container.innerHTML = `
      <footer class="site-footer" role="contentinfo">
        <div class="footer-container">
          <div class="footer-section footer-about" id="about">
            <h3>About Southeast Asia Destinations</h3>
            <p>
              Your gateway to paradise. We curate the most enchanting beaches, ancient cultural heritage, 
              and breathtaking tropical sanctuaries across Indonesia, Thailand, Vietnam, Philippines, Malaysia, and Cambodia.
            </p>
          </div>

          <div class="footer-section footer-links" id="contact">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#help" data-footer-action="help">Help & FAQs</a></li>
              <li><a href="#contact" data-footer-action="contact">Contact Support</a></li>
              <li><a href="index.html" data-footer-action="browse">Browse Destinations</a></li>
              <li><a href="#privacy" data-footer-action="privacy">Privacy Policy</a></li>
            </ul>
          </div>

          <div class="footer-section footer-social">
            <h3>Follow Us</h3>
            <p style="font-size: var(--font-size-sm); margin-bottom: var(--spacing-1);">Stay updated on tropical getaway deals:</p>
            <div class="social-links">
              ${socialLinksHtml}
            </div>
          </div>

          <div class="footer-copyright">
            <p>&copy; ${this.options.year} Southeast Asia Tourist Destinations. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }

  attachEventListeners() {
    const links = this.container.querySelectorAll('a');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const action = link.getAttribute('data-footer-action') || link.getAttribute('data-platform');
        eventBus.emit('footer:link-click', { action, href: link.getAttribute('href') });
      });
    });
  }

  updateSocialLinks(links) {
    this.options.socialLinks = links;
    this.render();
    this.attachEventListeners();
  }

  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

