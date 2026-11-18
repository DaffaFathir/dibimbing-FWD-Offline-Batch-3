import { eventBus } from '../event-bus.js';
import { formatPrice, escapeHtml } from '../utils/formatters.js';

export class DestinationDetail {
  constructor(container, destination) {
    this.container = container;
    this.destination = destination;
    this.allPhotos = [
      this.destination.imageUrl,
      ...(this.destination.additionalImages || [])
    ].filter(Boolean);
    this.activePhotoIndex = 0;
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

    const safeName = escapeHtml(this.destination.name);
    const safeLocation = escapeHtml(this.destination.location);
    const safeFullDesc = escapeHtml(this.destination.fullDescription || this.destination.description);

    const tagsHtml = (this.destination.tags || [])
      .map((tag) => `<span class="tag-badge">#${escapeHtml(tag)}</span>`)
      .join('');

    // Gallery thumbnails HTML
    const thumbnailsHtml = this.allPhotos
      .map((imgSrc, index) => `
        <button 
          type="button" 
          class="gallery-thumb-btn ${index === this.activePhotoIndex ? 'active' : ''}" 
          data-photo-index="${index}"
          aria-label="View photo ${index + 1} of ${this.allPhotos.length} for ${safeName}"
        >
          <img 
            src="${imgSrc}" 
            alt="${safeName} photo ${index + 1}" 
            class="gallery-thumb-img"
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/images/destinations/placeholder.svg';"
          >
        </button>
      `)
      .join('');

    this.container.innerHTML = `
      <article class="destination-detail" aria-labelledby="destination-title">
        <div class="detail-header">
          <button type="button" class="btn-back" data-action="back" aria-label="Back to destination listings">
            <span class="back-icon" aria-hidden="true">←</span>
            <span>Back to Destinations</span>
          </button>
        </div>

        <!-- Featured Photo Viewer & Gallery Section -->
        <section class="detail-gallery-section" aria-label="Photo Gallery for ${safeName}">
          <div class="detail-image-main">
            <img 
              src="${this.allPhotos[this.activePhotoIndex]}" 
              alt="${safeName}" 
              class="detail-image"
              id="detail-featured-image"
              onerror="this.onerror=null; this.src='assets/images/destinations/placeholder.svg';"
            >
            ${this.allPhotos.length > 1 ? `
              <div class="gallery-controls">
                <button type="button" class="gallery-nav-btn prev" data-action="prev-photo" aria-label="Previous photo">‹</button>
                <span class="gallery-counter" id="gallery-counter">
                  ${this.activePhotoIndex + 1} / ${this.allPhotos.length}
                </span>
                <button type="button" class="gallery-nav-btn next" data-action="next-photo" aria-label="Next photo">›</button>
              </div>
            ` : ''}
          </div>

          <!-- Thumbnail Strip / Gallery -->
          ${this.allPhotos.length > 1 ? `
            <div class="gallery-thumbnails-wrapper">
              <h3 class="gallery-section-heading">Photo Gallery</h3>
              <div class="gallery-thumbnails" role="group" aria-label="Photo thumbnails">
                ${thumbnailsHtml}
              </div>
            </div>
          ` : ''}
        </section>

        <div class="detail-content">
          <div class="detail-intro">
            <h1 class="detail-title" id="destination-title">${safeName}</h1>
            <p class="detail-location">
              <span class="location-icon" aria-hidden="true">📍</span>
              <span>${safeLocation}</span>
            </p>
            ${tagsHtml ? `<div class="detail-tags">${tagsHtml}</div>` : ''}
          </div>

          <div class="detail-description">
            <h2>About This Destination</h2>
            <p>${safeFullDesc}</p>
          </div>

          <div class="detail-pricing">
            <div class="pricing-info">
              <span class="price-label">Ticket Package Price</span>
              <span class="price-amount">${formattedPrice} <span class="price-unit">per person</span></span>
            </div>
            <button 
              type="button" 
              class="btn btn-primary btn-lg" 
              data-action="order"
              aria-label="Order Ticket Now for ${safeName}"
            >
              Order Ticket Now
            </button>
          </div>
        </div>
      </article>
    `;
  }

  attachEventListeners() {
    if (!this.container) return;

    // Back button
    const backBtn = this.container.querySelector('[data-action="back"]');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.handleBackClick();
      });
    }

    // Order button
    const orderBtn = this.container.querySelector('[data-action="order"]');
    if (orderBtn) {
      orderBtn.addEventListener('click', () => {
        this.handleOrderClick();
      });
    }

    // Prev / Next Gallery buttons
    const prevBtn = this.container.querySelector('[data-action="prev-photo"]');
    const nextBtn = this.container.querySelector('[data-action="next-photo"]');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.setActivePhoto(this.activePhotoIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.setActivePhoto(this.activePhotoIndex + 1);
      });
    }

    // Thumbnail clicks
    const thumbBtns = this.container.querySelectorAll('.gallery-thumb-btn');
    thumbBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(btn.getAttribute('data-photo-index'), 10);
        if (!isNaN(index)) {
          this.setActivePhoto(index);
        }
      });
    });

    // Keyboard navigation (Left / Right arrow keys when viewing gallery)
    this.keyHandler = (e) => {
      if (e.key === 'ArrowLeft') {
        this.setActivePhoto(this.activePhotoIndex - 1);
      } else if (e.key === 'ArrowRight') {
        this.setActivePhoto(this.activePhotoIndex + 1);
      }
    };
    window.addEventListener('keydown', this.keyHandler);
  }

  setActivePhoto(index) {
    if (!this.allPhotos || this.allPhotos.length === 0) return;

    // Wrap around
    if (index < 0) {
      index = this.allPhotos.length - 1;
    } else if (index >= this.allPhotos.length) {
      index = 0;
    }

    this.activePhotoIndex = index;
    const featuredImg = this.container.querySelector('#detail-featured-image');
    if (featuredImg) {
      featuredImg.style.opacity = '0.5';
      featuredImg.src = this.allPhotos[this.activePhotoIndex];
      featuredImg.onload = () => {
        featuredImg.style.opacity = '1';
      };
    }

    const counter = this.container.querySelector('#gallery-counter');
    if (counter) {
      counter.textContent = `${this.activePhotoIndex + 1} / ${this.allPhotos.length}`;
    }

    // Update active class on thumbnails
    const thumbBtns = this.container.querySelectorAll('.gallery-thumb-btn');
    thumbBtns.forEach((btn, idx) => {
      if (idx === this.activePhotoIndex) {
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'true');
      } else {
        btn.classList.remove('active');
        btn.removeAttribute('aria-current');
      }
    });
  }

  handleBackClick() {
    eventBus.emit('detail:back-click', { id: this.destination.id });
    window.location.href = 'index.html';
  }

  handleOrderClick() {
    eventBus.emit('detail:order-click', { destination: this.destination });
    console.log(`[Order Ticket Now Clicked] Order requested for: ${this.destination.name} (${this.destination.id}) at ${this.destination.price} USD`);
  }

  destroy() {
    if (this.keyHandler) {
      window.removeEventListener('keydown', this.keyHandler);
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
