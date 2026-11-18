/**
 * Header Component
 * 
 * Navigation, branding, user profile display component
 * Supports variant support for list vs detail pages
 * Integrates with Router for navigation and EventBus for communication
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4, 11.1, 11.2
 */

import { eventBus } from '../event-bus.js';
import { router } from '../router.js';
import { ThemeToggle } from './theme-toggle.js';

export class Header {
  /**
   * Create a Header component
   * @param {HTMLElement} container - Container element to render into
   * @param {Object} options - Configuration options
   * @param {string} options.variant - Page variant ('list' or 'detail')
   * @param {boolean} options.showSearch - Whether to show search bar
   * @param {Object|null} options.user - User data with name and profilePicture
   */
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      variant: 'list',
      showSearch: false,
      user: null,
      ...options
    };
    
    // Component state
    this.activeLink = 'home';
    
    // Sub-components
    this.themeToggle = null;
    
    // Event handler references for cleanup
    this.handlers = {
      handleNavClick: this.handleNavClick.bind(this),
      handleLogoClick: this.handleLogoClick.bind(this)
    };
    
    this.init();
  }

  /**
   * Initialize the component
   */
  init() {
    this.render();
    this.attachEventListeners();
    this.initializeThemeToggle();
  }

  /**
   * Render the header component
   */
  render() {
    if (!this.container) {
      console.error('Header: Container element not found');
      return;
    }
    
    this.container.innerHTML = this.template();
    this.updateActiveLink();
  }

  /**
   * Generate the header HTML template
   * @returns {string} HTML template string
   */
  template() {
    const { variant, showSearch, user } = this.options;
    
    // Navigation links based on variant
    const navLinks = variant === 'detail' 
      ? this.getDetailNavLinks()
      : this.getListNavLinks();
    
    return `
      <header class="site-header">
        <div class="header-container">
          <a href="/" class="logo" data-route="home">
            <span class="logo-icon">🏝️</span>
            <span class="logo-text">Southeast Asia</span>
          </a>
          
          <nav class="header-nav" aria-label="Main navigation">
            ${navLinks}
          </nav>
          
          ${showSearch ? `
            <div class="header-search" data-component="search">
              <!-- Search component will be mounted here -->
            </div>
          ` : ''}
          
          <div class="header-actions">
            <div class="header-theme-toggle" data-component="theme-toggle">
              <!-- Theme toggle component will be mounted here -->
            </div>
            
            ${user ? `
              <div class="header-user">
                <img 
                  src="${this.escapeHtml(user.profilePicture || '/assets/images/icons/default-avatar.png')}" 
                  alt="${this.escapeHtml(user.name || 'User')} profile" 
                  class="user-avatar"
                  onerror="this.src='/assets/images/icons/default-avatar.png'"
                >
                <span class="user-name">${this.escapeHtml(user.name || 'Guest')}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </header>
    `;
  }

  /**
   * Generate navigation links for list page variant
   * @returns {string} HTML for navigation links
   */
  getListNavLinks() {
    return `
      <a href="/" class="nav-link" data-route="home" data-link="home">
        Home
      </a>
      <a href="#about" class="nav-link" data-route="about" data-link="about">
        About
      </a>
      <a href="#contact" class="nav-link" data-route="contact" data-link="contact">
        Contact
      </a>
    `;
  }

  /**
   * Generate navigation links for detail page variant
   * @returns {string} HTML for navigation links
   */
  getDetailNavLinks() {
    return `
      <a href="/" class="nav-link" data-route="home" data-link="home">
        Home
      </a>
      <a href="/" class="nav-link" data-route="destinations" data-link="destinations">
        Destinations
      </a>
      <a href="#about" class="nav-link" data-route="about" data-link="about">
        About
      </a>
    `;
  }

  /**
   * Attach event listeners to header elements
   */
  attachEventListeners() {
    if (!this.container) return;
    
    // Handle navigation link clicks
    const navLinks = this.container.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', this.handlers.handleNavClick);
    });
    
    // Handle logo clicks
    const logo = this.container.querySelector('.logo');
    if (logo) {
      logo.addEventListener('click', this.handlers.handleLogoClick);
    }
  }

  /**
   * Handle navigation link click
   * @param {Event} e - Click event
   */
  handleNavClick(e) {
    const link = e.currentTarget;
    const route = link.getAttribute('data-route');
    const linkName = link.getAttribute('data-link');
    
    // For home and destinations routes, use router navigation
    if (route === 'home' || route === 'destinations') {
      e.preventDefault();
      
      // Emit navigation event
      eventBus.emit('header:navigate', {
        route,
        linkName
      });
      
      // Navigate using router
      router.navigateToList();
      
      // Update active link
      this.setActiveLink(linkName);
    } else {
      // For about and contact, allow default anchor behavior
      // Emit event but don't prevent default
      eventBus.emit('header:navigate', {
        route,
        linkName
      });
    }
  }

  /**
   * Handle logo click
   * @param {Event} e - Click event
   */
  handleLogoClick(e) {
    e.preventDefault();
    
    // Emit home click event
    eventBus.emit('header:home-click');
    
    // Navigate to home
    router.navigateToList();
    
    // Update active link
    this.setActiveLink('home');
  }

  /**
   * Update user information
   * @param {Object|null} user - User data with name and profilePicture
   */
  updateUser(user) {
    this.options.user = user;
    this.render();
    this.attachEventListeners();
    this.initializeThemeToggle();
  }

  /**
   * Set the active navigation link
   * @param {string} linkName - Name of the link to set as active
   */
  setActiveLink(linkName) {
    this.activeLink = linkName;
    this.updateActiveLink();
  }

  /**
   * Update the visual active state of navigation links
   */
  updateActiveLink() {
    if (!this.container) return;
    
    const navLinks = this.container.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const linkName = link.getAttribute('data-link');
      if (linkName === this.activeLink) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Initialize the Theme Toggle component
   */
  initializeThemeToggle() {
    if (!this.container) return;
    
    // Find the theme toggle container
    const themeToggleContainer = this.container.querySelector('.header-theme-toggle');
    
    if (themeToggleContainer) {
      // Clean up existing theme toggle if present
      if (this.themeToggle) {
        this.themeToggle.destroy();
      }
      
      // Create new ThemeToggle component
      this.themeToggle = new ThemeToggle(themeToggleContainer, {
        showLabels: false
      });
    }
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} str - String to escape
   * @returns {string} Escaped string
   */
  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Clean up component resources
   */
  destroy() {
    if (!this.container) return;
    
    // Remove event listeners
    const navLinks = this.container.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.removeEventListener('click', this.handlers.handleNavClick);
    });
    
    const logo = this.container.querySelector('.logo');
    if (logo) {
      logo.removeEventListener('click', this.handlers.handleLogoClick);
    }
    
    // Destroy sub-components
    if (this.themeToggle) {
      this.themeToggle.destroy();
      this.themeToggle = null;
    }
    
    // Clear container
    this.container.innerHTML = '';
    
    // Clear references
    this.container = null;
    this.handlers = null;
  }
}
