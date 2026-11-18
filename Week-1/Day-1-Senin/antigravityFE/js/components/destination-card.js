export class DestinationCard {
  constructor(destination, options = {}) {
    this.destination = destination;
    this.options = {
      onDetailClick: options.onDetailClick || null,
      ...options
    };
  }

  render() {
    const card = document.createElement('article');
    card.className = 'destination-card';
    card.setAttribute('data-destination-id', this.destination.id);

    const formattedPrice = typeof this.destination.getFormattedPrice === 'function'
      ? this.destination.getFormattedPrice()
      : `$${this.destination.price}`;

    const shortDesc = typeof this.destination.getShortDescription === 'function'
      ? this.destination.getShortDescription(120)
      : this.destination.description;

    const primaryTag = (this.destination.tags && this.destination.tags[0]) || 'Featured';

    card.innerHTML = `
      <div class="card-image-wrap">
        <img 
          src="${this.destination.imageUrl}" 
          alt="${this.destination.name}" 
          class="card-img" 
          loading="lazy" 
          onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'"
        />
        <span class="card-tag">${primaryTag.toUpperCase()}</span>
      </div>
      <div class="card-body">
        <div class="card-header-info">
          <h3 class="card-title">${this.destination.name}</h3>
          <span class="card-location">
            <span aria-hidden="true">📍</span> ${this.destination.location}
          </span>
        </div>
        <p class="card-description">${shortDesc}</p>
        <div class="card-footer">
          <div class="card-price">
            <span class="price-label">Starting From</span>
            <span class="price-value">${formattedPrice} <span class="price-unit">/ person</span></span>
          </div>
          <button type="button" class="btn btn-primary" data-action="detail" aria-label="View details for ${this.destination.name}">
            View Detail
          </button>
        </div>
      </div>
    `;

    const detailBtn = card.querySelector('[data-action="detail"]');
    detailBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.handleDetailClick();
    });

    // Optional click on card body also triggers detail
    card.addEventListener('click', () => {
      this.handleDetailClick();
    });

    return card;
  }

  handleDetailClick() {
    if (this.options.onDetailClick) {
      this.options.onDetailClick(this.destination.id);
    } else {
      window.location.href = `detail.html?id=${encodeURIComponent(this.destination.id)}`;
    }
  }
}

