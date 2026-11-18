export class DestinationDetail {
  constructor(container, destination, options = {}) {
    this.container = container;
    this.destination = destination;
    this.options = {
      onBackClick: options.onBackClick || null,
      onOrderClick: options.onOrderClick || null,
      ...options
    };

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
      : `$${this.destination.price}`;

    const tagsHtml = (this.destination.tags || [])
      .map(tag => `<span class="detail-tag">#${tag}</span>`)
      .join('');

    const additionalImagesHtml = (this.destination.additionalImages || [])
      .map((imgUrl, index) => `
        <div class="gallery-thumb" data-action="switch-image" data-img-url="${imgUrl}">
          <img src="${imgUrl}" alt="Gallery photo ${index + 1}" loading="lazy" />
        </div>
      `).join('');

    this.container.innerHTML = `
      <article class="destination-detail">
        <div class="detail-nav-bar">
          <button type="button" class="btn-back" data-action="back" aria-label="Back to destination list">
            <span aria-hidden="true">←</span> Back to List
          </button>
        </div>

        <div class="detail-layout">
          <div class="detail-media">
            <div class="detail-image-main">
              <img 
                id="mainDetailImg"
                src="${this.destination.imageUrl}" 
                alt="${this.destination.name}" 
                onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'"
              />
            </div>
            ${additionalImagesHtml ? `
              <div class="detail-gallery" aria-label="Photo Gallery">
                <div class="gallery-thumb" data-action="switch-image" data-img-url="${this.destination.imageUrl}">
                  <img src="${this.destination.imageUrl}" alt="Main photo" />
                </div>
                ${additionalImagesHtml}
              </div>
            ` : ''}
          </div>

          <div class="detail-info-card">
            <div class="detail-badge-group">
              ${tagsHtml}
            </div>

            <div>
              <h1 class="detail-title">${this.destination.name}</h1>
              <p class="detail-location">
                <span aria-hidden="true">📍</span> ${this.destination.location}
              </p>
            </div>

            <div class="detail-description-section">
              <h3>About This Destination</h3>
              <p class="detail-description-text">${this.destination.fullDescription || this.destination.description}</p>
            </div>

            <div class="detail-order-box">
              <div class="detail-price-display">
                <span class="detail-price-label">Ticket Price</span>
                <span class="detail-price-value">${formattedPrice} <span class="detail-price-unit">per person</span></span>
              </div>
              <button type="button" class="btn btn-primary btn-lg" data-action="order" aria-label="Order Ticket Now for ${this.destination.name}">
                Order Ticket Now
              </button>
            </div>
          </div>
        </div>
      </article>

      <div id="orderModal" class="modal-overlay" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal-content">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
          <h2 id="modalTitle" style="color: var(--color-primary); font-size: 1.75rem; margin-bottom: 0.5rem;">Ticket Order Reserved!</h2>
          <p style="color: var(--color-text-secondary); margin-bottom: 1.5rem;">
            Thank you for ordering tickets to <strong>${this.destination.name}</strong>.<br/>
            Your reservation is confirmed at <strong>${formattedPrice} / person</strong>.
          </p>
          <button type="button" class="btn btn-primary" data-action="close-modal">Got it!</button>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const backBtn = this.container.querySelector('[data-action="back"]');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.handleBackClick();
      });
    }

    const orderBtn = this.container.querySelector('[data-action="order"]');
    const modal = this.container.querySelector('#orderModal');
    const closeModalBtn = this.container.querySelector('[data-action="close-modal"]');

    if (orderBtn) {
      orderBtn.addEventListener('click', () => {
        this.handleOrderClick();
        if (modal) {
          modal.style.display = 'flex';
        }
      });
    }

    if (closeModalBtn && modal) {
      closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }

    // Switch main gallery image on thumb click
    const thumbs = this.container.querySelectorAll('[data-action="switch-image"]');
    const mainImg = this.container.querySelector('#mainDetailImg');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const newSrc = thumb.dataset.imgUrl;
        if (newSrc && mainImg) {
          mainImg.src = newSrc;
        }
      });
    });
  }

  handleBackClick() {
    if (this.options.onBackClick) {
      this.options.onBackClick();
    } else {
      window.location.href = 'index.html';
    }
  }

  handleOrderClick() {
    console.log(`Order initiated for destination: ${this.destination.name} (${this.destination.id})`);
    if (this.options.onOrderClick) {
      this.options.onOrderClick(this.destination);
    }
  }

  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

