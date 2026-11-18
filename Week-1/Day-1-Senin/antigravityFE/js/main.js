import { Router } from './router.js';
import { StateManager } from './state-manager.js';
import { EventBus } from './event-bus.js';
import { MockAPIService } from './services/mock-api.js';
import { ThemeManager } from './services/theme-manager.js';
import { Header } from './components/header.js';
import { Footer } from './components/footer.js';
import { Hero } from './components/hero.js';
import { DestinationCard } from './components/destination-card.js';
import { DestinationDetail } from './components/destination-detail.js';

class App {
  constructor() {
    this.state = new StateManager();
    this.eventBus = new EventBus();
    this.api = new MockAPIService();
    this.router = new Router();
    this.themeManager = new ThemeManager();

    this.init();
  }

  async init() {
    try {
      // 1. Initialize theme
      this.themeManager.initialize();

      // 2. Initialize global components (Header, Footer)
      this.initHeader();
      this.initFooter();

      // 3. Initialize page-specific view
      const page = document.body.dataset.page;
      if (page === 'list') {
        await this.initListPage();
      } else if (page === 'detail') {
        await this.initDetailPage();
      }
    } catch (err) {
      console.error('Fatal application error:', err);
      this.showGlobalError(err.message || 'An unexpected error occurred.');
    }
  }

  initHeader() {
    const headerContainer = document.querySelector('[data-component="header"]');
    if (!headerContainer) return;

    const page = document.body.dataset.page;
    const isList = page === 'list';

    this.header = new Header(headerContainer, {
      variant: isList ? 'list' : 'detail',
      showSearch: isList,
      user: this.state.getUser(),
      themeManager: this.themeManager,
      onSearch: (query) => {
        this.state.setSearchQuery(query);
      }
    });
  }

  initFooter() {
    const footerContainer = document.querySelector('[data-component="footer"]');
    if (footerContainer) {
      this.footer = new Footer(footerContainer);
    }
  }

  /* ================= LIST PAGE ================= */
  async initListPage() {
    // Mount Hero
    const heroContainer = document.querySelector('[data-component="hero"]');
    if (heroContainer) {
      this.hero = new Hero(heroContainer);
    }

    const gridContainer = document.querySelector('[data-component="destination-grid"]');
    const loadingContainer = document.querySelector('#loadingIndicator');
    const emptyStateContainer = document.querySelector('#emptyState');
    const errorContainer = document.querySelector('#errorAlert');

    // Subscribe to state changes for reactive card rendering
    this.state.subscribe((currentState, prevState) => {
      if (currentState.filteredDestinations !== prevState.filteredDestinations) {
        this.renderDestinationGrid(currentState.filteredDestinations, gridContainer, emptyStateContainer);
      }
    });

    // Fetch initial destinations
    try {
      if (loadingContainer) loadingContainer.style.display = 'flex';
      if (gridContainer) gridContainer.style.display = 'none';
      if (emptyStateContainer) emptyStateContainer.style.display = 'none';
      if (errorContainer) errorContainer.style.display = 'none';

      const destinations = await this.api.getAllDestinations();
      this.state.setDestinations(destinations);

      if (loadingContainer) loadingContainer.style.display = 'none';
      if (gridContainer) gridContainer.style.display = 'grid';
    } catch (err) {
      if (loadingContainer) loadingContainer.style.display = 'none';
      if (errorContainer) {
        errorContainer.style.display = 'flex';
        errorContainer.innerHTML = `
          <span>⚠️ ${err.message || 'Failed to load destinations.'}</span>
          <button type="button" class="btn btn-outline" id="retryFetchBtn">Retry</button>
        `;
        const retryBtn = errorContainer.querySelector('#retryFetchBtn');
        if (retryBtn) {
          retryBtn.addEventListener('click', () => this.initListPage());
        }
      }
    }
  }

  renderDestinationGrid(destinations, container, emptyContainer) {
    if (!container) return;

    container.innerHTML = '';

    if (!destinations || destinations.length === 0) {
      if (emptyContainer) emptyContainer.style.display = 'block';
      return;
    }

    if (emptyContainer) emptyContainer.style.display = 'none';

    destinations.forEach(dest => {
      const card = new DestinationCard(dest, {
        onDetailClick: (id) => {
          this.router.navigate('detail.html', { id });
        }
      });
      container.appendChild(card.render());
    });
  }

  /* ================= DETAIL PAGE ================= */
  async initDetailPage() {
    const detailContainer = document.querySelector('[data-component="destination-detail"]');
    const loadingContainer = document.querySelector('#loadingIndicator');
    const errorContainer = document.querySelector('#errorAlert');

    const destinationId = this.router.getQueryParam('id');

    if (!destinationId) {
      if (loadingContainer) loadingContainer.style.display = 'none';
      if (errorContainer) {
        errorContainer.style.display = 'flex';
        errorContainer.innerHTML = `
          <span>⚠️ No destination ID was provided in the URL.</span>
          <a href="index.html" class="btn btn-primary">Go to Destination List</a>
        `;
      }
      return;
    }

    try {
      if (loadingContainer) loadingContainer.style.display = 'flex';
      if (errorContainer) errorContainer.style.display = 'none';

      const destination = await this.api.getDestinationById(destinationId);
      this.state.setCurrentDestination(destination);

      if (loadingContainer) loadingContainer.style.display = 'none';

      new DestinationDetail(detailContainer, destination, {
        onBackClick: () => {
          this.router.navigate('index.html');
        },
        onOrderClick: async (dest) => {
          try {
            await this.api.submitOrder({
              destinationId: dest.id,
              destinationName: dest.name,
              price: dest.price
            });
          } catch (e) {
            console.error('Order error:', e);
          }
        }
      });
    } catch (err) {
      if (loadingContainer) loadingContainer.style.display = 'none';
      if (errorContainer) {
        errorContainer.style.display = 'flex';
        errorContainer.innerHTML = `
          <span>⚠️ ${err.message || 'Could not find the requested destination.'}</span>
          <a href="index.html" class="btn btn-primary" style="margin-left: 1rem;">Back to List</a>
        `;
      }
    }
  }

  showGlobalError(message) {
    const main = document.querySelector('main');
    if (main) {
      const errBanner = document.createElement('div');
      errBanner.className = 'alert alert-error';
      errBanner.style.margin = '2rem auto';
      errBanner.style.maxWidth = '600px';
      errBanner.innerHTML = `<span><strong>Error:</strong> ${message}</span>`;
      main.prepend(errBanner);
    }
  }
}

// Instantiate on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}

