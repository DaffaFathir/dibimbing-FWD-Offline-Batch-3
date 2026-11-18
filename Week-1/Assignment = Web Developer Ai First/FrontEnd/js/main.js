/**
 * Main Application Entry Point
 * Southeast Asia Tourist Destination Website
 */

import { Header } from './components/header.js';
import { Footer } from './components/footer.js';
import { Hero } from './components/hero.js';
import { ThemeToggle } from './components/theme-toggle.js';
import { Search } from './components/search.js';
import { DestinationCard } from './components/destination-card.js';
import { DestinationDetail } from './components/destination-detail.js';
import { Notification, getNotificationInstance, notify } from './components/notification.js';
import { eventBus } from './event-bus.js';
import { router } from './router.js';
import { stateManager } from './state-manager.js';
import { mockAPI } from './services/mock-api.js';

/**
 * Global error handler for uncaught errors
 */
function setupGlobalErrorHandler() {
  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    
    // Show error notification
    notify.error('An unexpected error occurred. Please try again.', {
      duration: 0 // Don't auto-dismiss
    });
    
    // Prevent default browser error handling
    event.preventDefault();
  });
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    // Show error notification
    notify.error('An unexpected error occurred. Please try again.', {
      duration: 0
    });
    
    // Prevent default browser error handling
    event.preventDefault();
  });
  
  console.log('Global error handler initialized');
}

/**
 * Destination List App Controller
 * Main controller for the destination list page (index.html)
 * Handles:
 * - Fetching destinations from Mock API
 * - Rendering destination cards in a grid
 * - Search functionality
 * - Navigation to detail pages
 * - Loading and error states
 */
class DestinationListApp {
  constructor() {
    this.destinationListContainer = null;
    this.searchComponent = null;
    this.destinationCards = [];
    this.unsubscribe = null;
    
    // Bind methods
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleCardDetailClick = this.handleCardDetailClick.bind(this);
  }

  /**
   * Initialize the app
   */
  async initialize() {
    console.log('DestinationListApp: Initializing...');
    
    // Get destination list container
    this.destinationListContainer = document.querySelector('[data-component="destination-list"]');
    if (!this.destinationListContainer) {
      console.error('DestinationListApp: destination-list container not found');
      return;
    }

    // Initialize Search component (already rendered in Header)
    this.initializeSearch();

    // Subscribe to state changes
    this.unsubscribe = stateManager.subscribe(this.handleStateChange);

    // Subscribe to event bus events
    eventBus.on('search:input', this.handleSearchInput);
    eventBus.on('search:clear', this.handleSearchInput);
    eventBus.on('card:detail-click', this.handleCardDetailClick);

    // Load destinations from API
    await this.loadDestinations();
  }

  /**
   * Initialize the search component
   */
  initializeSearch() {
    // Search is integrated in the header, but we need to handle its events
    console.log('DestinationListApp: Search event listeners registered');
  }

  /**
   * Load destinations from Mock API
   */
  async loadDestinations() {
    try {
      // Set loading state
      stateManager.setLoading(true);
      stateManager.clearError();
      
      // Show loading spinner
      this.renderLoadingState();

      console.log('DestinationListApp: Fetching destinations from API...');

      // Fetch destinations from Mock API (with built-in retry logic)
      const destinations = await mockAPI.getAllDestinations();

      console.log(`DestinationListApp: Loaded ${destinations.length} destinations`);

      // Update state with destinations
      stateManager.setDestinations(destinations);
      
      // Clear loading state
      stateManager.setLoading(false);
      
      // Show success notification
      notify.success(`Loaded ${destinations.length} destinations successfully`);

    } catch (error) {
      console.error('DestinationListApp: Failed to load destinations:', error);
      
      // Set error state
      const errorMessage = error.message || 'Failed to load destinations';
      stateManager.setError(errorMessage);
      stateManager.setLoading(false);
      
      // Show error notification with retry action
      notify.error(errorMessage, {
        duration: 0,
        action: {
          text: 'Retry',
          callback: () => {
            console.log('Retrying destination load...');
            this.loadDestinations();
          }
        }
      });
      
      // Render error state
      this.renderErrorState(errorMessage);
    }
  }

  /**
   * Handle state changes from StateManager
   * @param {Object} state - New state
   */
  handleStateChange(state) {
    console.log('DestinationListApp: State changed', {
      destinationsCount: state.destinations.length,
      filteredCount: state.filteredDestinations.length,
      searchQuery: state.searchQuery,
      loading: state.loading,
      error: state.error
    });

    // Render based on state
    if (state.loading) {
      this.renderLoadingState();
    } else if (state.error) {
      this.renderErrorState(state.error);
    } else if (state.filteredDestinations.length === 0 && state.searchQuery) {
      this.renderEmptyState('No destinations found matching your search.');
    } else if (state.filteredDestinations.length === 0) {
      this.renderEmptyState('No destinations available at the moment.');
    } else {
      this.renderDestinations(state.filteredDestinations);
    }
  }

  /**
   * Handle search input from Search component
   * @param {Object} data - Event data with query
   */
  handleSearchInput(data) {
    const query = data?.query || '';
    console.log('DestinationListApp: Search query:', query);
    
    // Update search query in state (will trigger filtering)
    stateManager.setSearchQuery(query);
  }

  /**
   * Handle card detail click event
   * @param {Object} data - Event data with destinationId
   */
  handleCardDetailClick(data) {
    const { destinationId } = data;
    console.log('DestinationListApp: Navigate to destination:', destinationId);
    
    // Navigate to detail page with destination ID
    router.navigate(`detail.html?id=${destinationId}`);
  }

  /**
   * Render loading state
   */
  renderLoadingState() {
    if (!this.destinationListContainer) return;

    this.destinationListContainer.innerHTML = `
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading destinations...</p>
      </div>
    `;
  }

  /**
   * Render error state
   * @param {string} errorMessage - Error message to display
   */
  renderErrorState(errorMessage) {
    if (!this.destinationListContainer) return;

    this.destinationListContainer.innerHTML = `
      <div class="error-state">
        <div class="error-icon">⚠️</div>
        <h2>Oops! Something went wrong</h2>
        <p>${this.escapeHtml(errorMessage)}</p>
        <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
      </div>
    `;
  }

  /**
   * Render empty state
   * @param {string} message - Empty state message
   */
  renderEmptyState(message) {
    if (!this.destinationListContainer) return;

    this.destinationListContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h2>No Results Found</h2>
        <p>${this.escapeHtml(message)}</p>
      </div>
    `;
  }

  /**
   * Render destination cards with performance optimizations
   * - Batch DOM reads and writes to minimize reflows
   * - Use requestAnimationFrame for smooth rendering
   * @param {Array} destinations - Array of destination objects
   */
  renderDestinations(destinations) {
    if (!this.destinationListContainer) return;

    // Clear existing cards
    this.destroyDestinationCards();
    
    // Batch all data reads first (avoid interleaving reads and writes)
    const destinationData = destinations.map(dest => ({
      id: dest.id,
      destination: dest
    }));
    
    // Use requestAnimationFrame to batch DOM writes
    requestAnimationFrame(() => {
      try {
        // Single DOM write: Create grid container structure
        const gridHTML = `
          <div class="destinations-grid">
            ${destinationData.map(item => `<div data-card-id="${this.escapeHtml(item.id)}"></div>`).join('')}
          </div>
        `;
        
        this.destinationListContainer.innerHTML = gridHTML;
        
        // Batch render all cards in next animation frame
        requestAnimationFrame(() => {
          // Batch DOM reads: Get all containers first
          const containers = destinationData.map(item => ({
            ...item,
            container: this.destinationListContainer.querySelector(`[data-card-id="${item.id}"]`)
          }));
          
          // Batch DOM writes: Create all card components with error boundaries
          containers.forEach(({ container, destination }) => {
            if (container) {
              try {
                const card = new DestinationCard(container, destination);
                this.destinationCards.push(card);
              } catch (error) {
                console.error(`Failed to render card for destination ${destination.id}:`, error);
                // Show error in place of card
                container.innerHTML = `
                  <div class="card-error">
                    <p>Error loading destination</p>
                  </div>
                `;
              }
            }
          });

        console.log(`DestinationListApp: Rendered ${destinations.length} destination cards`);
        });
      } catch (error) {
        console.error('Failed to render destinations:', error);
        notify.error('Failed to display destinations. Please refresh the page.');
        this.renderErrorState('Failed to display destinations');
      }
    });
  }

  /**
   * Destroy all destination card components
   */
  destroyDestinationCards() {
    this.destinationCards.forEach(card => {
      if (card && typeof card.destroy === 'function') {
        card.destroy();
      }
    });
    this.destinationCards = [];
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} str - String to escape
   * @returns {string} Escaped string
   */
  escapeHtml(str) {
    if (typeof str !== 'string') {
      return String(str);
    }
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Clean up app
   */
  destroy() {
    // Unsubscribe from state manager
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }

    // Destroy all destination cards
    this.destroyDestinationCards();

    // Clear container
    if (this.destinationListContainer) {
      this.destinationListContainer.innerHTML = '';
    }

    console.log('DestinationListApp: Destroyed');
  }
}

// Application initialization
document.addEventListener('DOMContentLoaded', () => {
  console.log('Southeast Asia Destinations App - Initialized');
  
  // Initialize global error handler
  setupGlobalErrorHandler();
  
  // Initialize notification system
  getNotificationInstance();
  console.log('Notification system initialized');
  
  // Initialize common components (present on all pages)
  initializeCommonComponents();
  
  // Get page type from body data attribute
  const pageType = document.body.dataset.page;
  
  console.log(`Page type: ${pageType}`);
  
  // Initialize components based on page type
  if (pageType === 'list') {
    initializeListPage();
  } else if (pageType === 'detail') {
    initializeDetailPage();
  }
});

/**
 * Initialize common components that appear on all pages
 */
function initializeCommonComponents() {
  // Get page type for Header variant
  const pageType = document.body.dataset.page;
  
  // Initialize Header
  const headerContainer = document.querySelector('[data-component="header"]');
  if (headerContainer) {
    const header = new Header(headerContainer, {
      variant: pageType === 'detail' ? 'detail' : 'list',
      showSearch: pageType === 'list', // Show search only on list page
      user: null // No user data for now (future authentication)
    });
    
    console.log(`Header component initialized (variant: ${pageType})`);
    
    // Initialize Search component in header if on list page
    if (pageType === 'list') {
      const searchContainer = headerContainer.querySelector('[data-component="search"]');
      if (searchContainer) {
        const search = new Search(searchContainer, {
          placeholder: 'Search destinations...',
          minCharacters: 1
        });
        console.log('Search component initialized in header');
      }
    }
    
    // Initialize Theme Toggle inside header
    const themeToggleContainer = headerContainer.querySelector('[data-component="theme-toggle"]');
    if (themeToggleContainer) {
      // Get current theme from localStorage or default
      const savedTheme = localStorage.getItem('user-theme-preference');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
      
      const themeToggle = new ThemeToggle(themeToggleContainer, {
        initialTheme: initialTheme,
        showLabels: false
      });
      
      console.log('Theme Toggle component initialized');
    }
  }
  
  // Initialize Footer
  const footerContainer = document.querySelector('[data-component="footer"]');
  if (footerContainer) {
    const footer = new Footer(footerContainer, {
      socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/seasia' },
        { platform: 'instagram', url: 'https://instagram.com/seasia' },
        { platform: 'twitter', url: 'https://twitter.com/seasia' },
        { platform: 'youtube', url: 'https://youtube.com/seasia' }
      ],
      year: new Date().getFullYear()
    });
    
    console.log('Footer component initialized');
  }
  
  // Subscribe to header events
  eventBus.on('header:navigate', (data) => {
    console.log('Header navigation:', data);
  });
  
  eventBus.on('header:home-click', () => {
    console.log('Header home clicked');
  });
  
  // Subscribe to footer events
  eventBus.on('footer:link-click', (data) => {
    console.log('Footer link clicked:', data);
    
    // Handle footer link clicks
    if (data.type === 'help') {
      // Navigate to help page (future implementation)
      console.log('Navigating to Help page...');
    } else if (data.type === 'contact') {
      // Navigate to contact page (future implementation)
      console.log('Navigating to Contact page...');
    } else {
      // Social media link - already opens in new tab
      console.log(`Opening ${data.type} profile...`);
    }
  });
}

/**
 * Initialize the destination list page
 */
async function initializeListPage() {
  console.log('Initializing list page...');
  
  // Initialize Hero component
  const heroContainer = document.querySelector('[data-component="hero"]');
  if (heroContainer) {
    const hero = new Hero(heroContainer, {
      title: 'Discover Tropical Paradise',
      subtitle: 'Explore breathtaking destinations across Southeast Asia',
      backgroundImage: '' // Optional: add a default background image path here
    });
    
    console.log('Hero component initialized');
  }
  
  // Initialize the main app controller for the list page
  const app = new DestinationListApp();
  await app.initialize();
}

/**
 * Destination Detail App Controller
 * Main controller for the destination detail page (detail.html)
 * Handles:
 * - Parsing destination ID from URL query parameter
 * - Fetching specific destination from Mock API by ID
 * - Rendering DestinationDetail component
 * - Handling missing or invalid destination ID
 * - Wiring Back to List and Order Ticket buttons
 * - Loading and error states
 */
class DestinationDetailApp {
  constructor() {
    this.destinationDetailContainer = null;
    this.destinationDetail = null;
    this.destinationId = null;
    
    // Bind methods
    this.handleOrderClick = this.handleOrderClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  /**
   * Initialize the app
   */
  async initialize() {
    console.log('DestinationDetailApp: Initializing...');
    
    // Get destination detail container
    this.destinationDetailContainer = document.querySelector('[data-component="destination-detail"]');
    if (!this.destinationDetailContainer) {
      console.error('DestinationDetailApp: destination-detail container not found');
      return;
    }

    // Parse destination ID from URL query parameter
    this.destinationId = router.getQueryParam('id');
    
    console.log('DestinationDetailApp: Destination ID from URL:', this.destinationId);

    // Validate destination ID
    if (!this.destinationId) {
      console.error('DestinationDetailApp: Missing destination ID in URL');
      this.renderErrorState('Invalid destination: Missing ID parameter');
      return;
    }

    // Subscribe to event bus events
    eventBus.on('detail:order-click', this.handleOrderClick);
    eventBus.on('detail:back-click', this.handleBackClick);

    // Load destination from API
    await this.loadDestination();
  }

  /**
   * Load destination by ID from Mock API
   */
  async loadDestination() {
    try {
      // Set loading state
      this.renderLoadingState();

      console.log(`DestinationDetailApp: Fetching destination ${this.destinationId} from API...`);

      // Fetch destination from Mock API (with built-in retry logic)
      const destination = await mockAPI.getDestinationById(this.destinationId);

      console.log('DestinationDetailApp: Loaded destination:', destination.name);

      // Render destination detail
      this.renderDestinationDetail(destination);
      
      // Show success notification
      notify.success(`Loaded ${destination.name} successfully`);

    } catch (error) {
      console.error('DestinationDetailApp: Failed to load destination:', error);
      
      // Determine error message
      let errorMessage;
      if (error.message.includes('not found')) {
        errorMessage = 'Destination not found. The destination you are looking for does not exist.';
      } else {
        errorMessage = error.message || 'Failed to load destination details';
      }
      
      // Show error notification with retry action
      notify.error(errorMessage, {
        duration: 0,
        action: {
          text: 'Retry',
          callback: () => {
            console.log('Retrying destination load...');
            this.loadDestination();
          }
        }
      });
      
      // Render error state
      this.renderErrorState(errorMessage);
    }
  }

  /**
   * Render loading state
   */
  renderLoadingState() {
    if (!this.destinationDetailContainer) return;

    this.destinationDetailContainer.innerHTML = `
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading destination details...</p>
      </div>
    `;
  }

  /**
   * Render error state
   * @param {string} errorMessage - Error message to display
   */
  renderErrorState(errorMessage) {
    if (!this.destinationDetailContainer) return;

    this.destinationDetailContainer.innerHTML = `
      <div class="error-state">
        <div class="error-icon">⚠️</div>
        <h2>Oops! Something went wrong</h2>
        <p>${this.escapeHtml(errorMessage)}</p>
        <div class="error-actions">
          <button class="btn btn-primary" onclick="window.location.href='index.html'">
            Back to Destinations
          </button>
          <button class="btn btn-secondary" onclick="location.reload()">
            Try Again
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Render destination detail component
   * @param {Object} destination - Destination data
   */
  renderDestinationDetail(destination) {
    if (!this.destinationDetailContainer) return;

    try {
      // Destroy existing component if any
      if (this.destinationDetail) {
        this.destinationDetail.destroy();
      }

      // Add initial state for fade-in animation
      this.destinationDetailContainer.classList.add('will-animate');

      // Create DestinationDetail component
      this.destinationDetail = new DestinationDetail(this.destinationDetailContainer, destination);
      
      // Trigger fade-in animation after component renders
      requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.destinationDetailContainer.classList.add('animate-fade-in-up');
        this.destinationDetailContainer.classList.remove('will-animate');
      });
    });
    
    console.log('DestinationDetailApp: Rendered destination detail component');
    } catch (error) {
      console.error('Failed to render destination detail:', error);
      notify.error('Failed to display destination details. Please refresh the page.');
      this.renderErrorState('Failed to display destination details');
    }
  }

  /**
   * Handle order ticket button click
   * @param {Object} data - Event data with destinationId
   */
  handleOrderClick(data) {
    const { destinationId, destination } = data;
    console.log('DestinationDetailApp: Order ticket clicked for:', destinationId);
    
    // Placeholder action - console log for now (as per requirements)
    console.log('Order Ticket Now - Placeholder Action');
    console.log('Destination:', destination.name);
    console.log('Price:', destination.price);
    
    // Show a simple alert to the user
    alert(`Order Ticket Now\n\nDestination: ${destination.name}\nPrice: $${destination.price} per person\n\nThis feature will be implemented in a future update.`);
    
    // Future implementation:
    // - Navigate to order form page
    // - Open order modal
    // - Submit order through API
  }

  /**
   * Handle back to list button click
   */
  handleBackClick() {
    console.log('DestinationDetailApp: Back to list clicked');
    
    // Navigate back to index.html
    router.navigateToList();
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} str - String to escape
   * @returns {string} Escaped string
   */
  escapeHtml(str) {
    if (typeof str !== 'string') {
      return String(str);
    }
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Clean up app
   */
  destroy() {
    // Destroy destination detail component
    if (this.destinationDetail) {
      this.destinationDetail.destroy();
      this.destinationDetail = null;
    }

    // Clear container
    if (this.destinationDetailContainer) {
      this.destinationDetailContainer.innerHTML = '';
    }

    console.log('DestinationDetailApp: Destroyed');
  }
}

/**
 * Initialize the destination detail page
 */
async function initializeDetailPage() {
  console.log('Initializing detail page...');
  
  // Initialize the main app controller for the detail page
  const app = new DestinationDetailApp();
  await app.initialize();
}

export { initializeListPage, initializeDetailPage, initializeCommonComponents };
