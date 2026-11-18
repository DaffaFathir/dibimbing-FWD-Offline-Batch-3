import { isNonEmptyString, isPositiveNumber, isValidUrl } from '../utils/validators.js';
import { formatPrice, truncateText } from '../utils/formatters.js';

export class Destination {
  constructor({
    id,
    name,
    location,
    description,
    fullDescription,
    price,
    imageUrl,
    additionalImages = [],
    tags = [],
    createdAt,
    updatedAt
  }) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.description = description;
    this.fullDescription = fullDescription || description;
    this.price = Number(price);
    this.imageUrl = imageUrl;
    this.additionalImages = Array.isArray(additionalImages) ? additionalImages : [];
    this.tags = Array.isArray(tags) ? tags : [];
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.updatedAt = updatedAt ? new Date(updatedAt) : new Date();

    this.validate();
  }

  validate() {
    if (!isNonEmptyString(this.id)) {
      throw new Error('Destination id is required and must be a non-empty string');
    }
    if (!isNonEmptyString(this.name) || this.name.trim().length < 3) {
      throw new Error('Destination name is required and must be at least 3 characters');
    }
    if (!isNonEmptyString(this.location) || this.location.trim().length < 3) {
      throw new Error('Destination location is required and must be at least 3 characters');
    }
    if (!isNonEmptyString(this.description) || this.description.trim().length < 10) {
      throw new Error('Destination description is required and must be at least 10 characters');
    }
    if (!isNonEmptyString(this.fullDescription) || this.fullDescription.trim().length < 20) {
      throw new Error('Destination full description is required and must be at least 20 characters');
    }
    if (!isPositiveNumber(this.price)) {
      throw new Error('Destination price must be a positive number');
    }
    if (!isValidUrl(this.imageUrl)) {
      throw new Error('Destination imageUrl must be a valid URL string');
    }
  }

  getFormattedPrice() {
    return formatPrice(this.price);
  }

  getShortDescription(maxLength = 150) {
    return truncateText(this.description, maxLength);
  }

  matchesSearch(query) {
    if (!query || typeof query !== 'string') return true;
    const q = query.trim().toLowerCase();
    if (!q) return true;

    const matchesName = this.name.toLowerCase().includes(q);
    const matchesLocation = this.location.toLowerCase().includes(q);
    const matchesDescription = this.description.toLowerCase().includes(q);
    const matchesFullDesc = this.fullDescription.toLowerCase().includes(q);
    const matchesTags = this.tags.some(tag => tag.toLowerCase().includes(q));

    return matchesName || matchesLocation || matchesDescription || matchesFullDesc || matchesTags;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      description: this.description,
      fullDescription: this.fullDescription,
      price: this.price,
      imageUrl: this.imageUrl,
      additionalImages: this.additionalImages,
      tags: this.tags,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
}

