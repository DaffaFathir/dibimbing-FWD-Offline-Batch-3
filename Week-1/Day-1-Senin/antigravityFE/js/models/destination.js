import { formatPrice, truncateText } from '../utils/formatters.js';
import { isNotEmpty, isPositiveNumber, isValidUrl } from '../utils/validators.js';

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
    tags = []
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

    this.validate();
  }

  validate() {
    if (!isNotEmpty(this.id)) throw new Error('Destination id is required');
    if (!isNotEmpty(this.name)) throw new Error('Destination name is required');
    if (!isNotEmpty(this.location)) throw new Error('Destination location is required');
    if (!isNotEmpty(this.description)) throw new Error('Destination description is required');
    if (!isPositiveNumber(this.price)) throw new Error('Destination price must be a positive number');
    if (!isValidUrl(this.imageUrl)) throw new Error('Destination imageUrl must be a valid URL');
  }

  getFormattedPrice() {
    return formatPrice(this.price);
  }

  getShortDescription(maxLength = 110) {
    return truncateText(this.description, maxLength);
  }

  matchesSearch(query) {
    if (!query || typeof query !== 'string') return true;
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return true;

    const inName = this.name.toLowerCase().includes(cleanQuery);
    const inLocation = this.location.toLowerCase().includes(cleanQuery);
    const inDescription = (this.description + ' ' + this.fullDescription).toLowerCase().includes(cleanQuery);
    const inTags = this.tags.some(tag => tag.toLowerCase().includes(cleanQuery));

    return inName || inLocation || inDescription || inTags;
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
      tags: this.tags
    };
  }
}

