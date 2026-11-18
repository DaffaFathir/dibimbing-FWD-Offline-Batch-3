import { eventBus } from '../event-bus.js';
import { formatPrice, truncateText, escapeHtml } from '../utils/formatters.js';

export class DestinationCard {
  constructor(container, destination) {
    this.container = container;
    this.destination = destination;
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    if (!this.container || !this.destination) return;

    const formattedPrice = typeof this.destination.getFormattedPrice === 'function'
      ? this.destination.getFormattedPrice()
      : formatPrice(this.destination.price);

    const shortDesc = typeof this.destination.getShortDescription === 'function'
      ? this.destination.getShortDescription(120)
      : truncateText(this.destination.description, 120);

    const safeName = escapeHtml(this.destination.name);
    const safeLocation = escapeHtml(this.destination.location);
    const safeDesc = escapeHtml(shortDesc);

    this.element = document.createElement('article');
    this.element.className = 'destination-card';
    this.element.setAttribute('data-destination-id', this.destination.id);

    this.element.innerHTML = `
      <div class="card-image">
        <img 
          src="${this.destination.imageUrl}" 
          alt="${safeName}" 
          loading="lazy"
          onerror="this.onerror=null; this.src='assets/images/destinations/placeholder.svg';"
        >
      </div>
      <div class="card-content">
        <h3 class="card-title">${safeName}</h3>
        <p class="card-location">
          <span class="location-icon" aria-hidden="true">📍</span>
          <span>${safeLocation}</span>
        </p>
        <p class="card-description">${safeDesc}</p>
        <div class="card-footer">
          <div class="card-price">
            <span class="price-label">Starting from</span>
            <span class="price-amount">${formattedPrice} <span class="price-unit">/ person</span></span>
          </div>
          <button 
            type="button" 
            class="btn btn-primary" 
            data-action="detail"
            aria-label="View details for ${safeName}"
          >
            View Details
          </button>
        </div>
      </div>
    `;

    this.container.appendChild(this.element);
  }

  attachEventListeners() {
    if (!this.element) return;

    const detailBtn = this.element.querySelector('[data-action="detail"]');
    if (detailBtn) {
      detailBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleDetailClick();
      });
    }

    // Allow clicking the whole card as well
    this.element.addEventListener('click', (e) => {
      this.handleDetailClick();
    });
  }

  handleDetailClick() {
    eventBus.emit('card:detail-click', { id: this.destination.id, destination: this.destination });
    window.location.href = `detail.html?id=${encodeURIComponent(this.destination.id)}`;
  }

  update(destination) {
    this.destination = destination;
    if (this.element && this.element.parentNode) {
      const parent = this.element.parentNode;
      this.element.remove();
      this.render();
      this.attachEventListeners();
    }
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }
}

