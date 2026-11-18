/**
 * Client-side Router
 * Handles navigation between pages and query parameter parsing
 * 
 * Requirements: 1.5, 2.5, 3.4
 */

export class Router {
  constructor() {
    this.routes = {
      '/': 'index.html',
      '/index.html': 'index.html',
      '/detail.html': 'detail.html'
    };
    
    this.init();
  }

  /**
   * Initialize router
   * Sets up event listeners for navigation
   */
  init() {
    // Handle browser back/forward navigation
    window.addEventListener('popstate', (e) => {
      // Page will reload naturally with back/forward
      // This listener is here for future SPA enhancement
      console.log('Navigation state changed:', e.state);
    });
    
    // Intercept link clicks with data-route attribute
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-route]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        this.navigate(href);
      }
    });
  }

  /**
   * Navigate to a new page
   * @param {string} path - The path to navigate to (e.g., '/detail.html?id=1')
   * @param {object} options - Navigation options
   * @param {boolean} options.replace - Replace current history entry instead of pushing new one
   */
  navigate(path, options = {}) {
    const { replace = false } = options;
    
    // Validate path
    if (!path || typeof path !== 'string') {
      console.error('Invalid path provided to navigate()');
      return;
    }
    
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    
    // For multi-page architecture, use full page navigation
    if (replace) {
      window.location.replace(normalizedPath);
    } else {
      window.location.href = normalizedPath;
    }
  }

  /**
   * Get a query parameter value from the current URL
   * @param {string} name - The name of the query parameter
   * @returns {string|null} The parameter value or null if not found
   */
  getQueryParam(name) {
    if (!name || typeof name !== 'string') {
      console.error('Invalid parameter name provided to getQueryParam()');
      return null;
    }
    
    // Use URLSearchParams API for clean query parameter parsing
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  /**
   * Get all query parameters as an object
   * @returns {Object} Object containing all query parameters
   */
  getAllQueryParams() {
    const params = {};
    const urlParams = new URLSearchParams(window.location.search);
    
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
    
    return params;
  }

  /**
   * Get the current path (without query string)
   * @returns {string} The current pathname
   */
  getCurrentPath() {
    return window.location.pathname;
  }

  /**
   * Get the full current URL
   * @returns {string} The full URL including query string
   */
  getCurrentUrl() {
    return window.location.href;
  }

  /**
   * Build a URL with query parameters
   * @param {string} path - Base path
   * @param {Object} params - Query parameters as key-value pairs
   * @returns {string} Complete URL with query string
   */
  buildUrl(path, params = {}) {
    const url = new URL(path, window.location.origin);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, value);
      }
    });
    
    return url.pathname + url.search;
  }

  /**
   * Navigate to detail page with destination ID
   * @param {string} destinationId - The ID of the destination to view
   */
  navigateToDetail(destinationId) {
    if (!destinationId) {
      console.error('Destination ID is required');
      return;
    }
    
    const url = this.buildUrl('/detail.html', { id: destinationId });
    this.navigate(url);
  }

  /**
   * Navigate back to the list page
   * @param {Object} options - Navigation options
   */
  navigateToList(options = {}) {
    this.navigate('/index.html', options);
  }

  /**
   * Check if we're on a specific page
   * @param {string} pageName - Name of the page ('list' or 'detail')
   * @returns {boolean} True if on the specified page
   */
  isOnPage(pageName) {
    const currentPath = this.getCurrentPath();
    
    if (pageName === 'list') {
      return currentPath === '/' || currentPath === '/index.html';
    } else if (pageName === 'detail') {
      return currentPath === '/detail.html';
    }
    
    return false;
  }
}

// Create and export a singleton instance
export const router = new Router();
