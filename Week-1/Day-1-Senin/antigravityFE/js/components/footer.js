export class Footer {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      year: new Date().getFullYear(),
      socialLinks: [
        { platform: 'Twitter / X', icon: '🐦', url: '#' },
        { platform: 'Instagram', icon: '📸', url: '#' },
        { platform: 'Facebook', icon: '📘', url: '#' },
        { platform: 'YouTube', icon: '▶️', url: '#' }
      ],
      ...options
    };

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    const socialHtml = this.options.socialLinks
      .map(item => `
        <a href="${item.url}" class="social-icon-link" aria-label="${item.platform}" title="${item.platform}">
          <span aria-hidden="true">${item.icon}</span>
        </a>
      `).join('');

    this.container.innerHTML = `
      <footer class="site-footer">
        <div class="footer-container">
          <div class="footer-section footer-about" id="about">
            <h3>About Tropical Southeast Asia</h3>
            <p>
              Your premier portal for exploring Southeast Asia’s most breathtaking tropical islands, rainforest sanctuaries, and ancient cultural wonders. Plan your dream journey across Indonesia, Thailand, Vietnam, the Philippines, Malaysia, and Cambodia.
            </p>
          </div>

          <div class="footer-section footer-links" id="contact">
            <h3>Help & Support</h3>
            <ul>
              <li><a href="#help" onclick="alert('Help center: Feel free to browse destinations and click Order Ticket Now to reserve tickets!'); return false;">Help Center & FAQ</a></li>
              <li><a href="#contact" onclick="alert('Contact: support@tropicalsea.destinations.com'); return false;">Contact Us</a></li>
              <li><a href="#" onclick="alert('Terms & Privacy: All bookings are simulated mock bookings.'); return false;">Terms of Service</a></li>
              <li><a href="#" onclick="alert('Privacy Policy: No personal data is stored outside your browser.'); return false;">Privacy Policy</a></li>
            </ul>
          </div>

          <div class="footer-section footer-social">
            <h3>Follow Us</h3>
            <div class="social-links">
              ${socialHtml}
            </div>
            <p style="margin-top: 1rem; font-size: 0.85rem; color: var(--color-text-tertiary);">
              Join our community of over 500,000 tropical travelers worldwide.
            </p>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright">&copy; ${this.options.year} Southeast Asia Tourist Destinations. All rights reserved.</p>
        </div>
      </footer>
    `;
  }

  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

