import { mockDestinations } from './mock-data.js';
import { Destination } from '../models/destination.js';

export class MockAPIService {
  constructor(options = {}) {
    this.delayMin = options.delayMin ?? 250;
    this.delayMax = options.delayMax ?? 500;
    this.errorRate = options.errorRate ?? 0;
  }

  _simulateNetwork() {
    return new Promise((resolve, reject) => {
      const delay = Math.floor(Math.random() * (this.delayMax - this.delayMin + 1)) + this.delayMin;
      setTimeout(() => {
        if (Math.random() < this.errorRate) {
          reject(new Error('Network error: Unable to fetch data from tourist API. Please try again.'));
        } else {
          resolve();
        }
      }, delay);
    });
  }

  async getAllDestinations() {
    await this._simulateNetwork();
    return mockDestinations.map(item => new Destination(JSON.parse(JSON.stringify(item))));
  }

  async getDestinationById(id) {
    await this._simulateNetwork();
    const found = mockDestinations.find(item => item.id === id);
    if (!found) {
      throw new Error(`Destination not found for ID: "${id}"`);
    }
    return new Destination(JSON.parse(JSON.stringify(found)));
  }

  async searchDestinations(query) {
    await this._simulateNetwork();
    const destinations = mockDestinations.map(item => new Destination(JSON.parse(JSON.stringify(item))));
    if (!query || typeof query !== 'string') {
      return destinations;
    }
    return destinations.filter(dest => dest.matchesSearch(query));
  }

  async submitOrder(orderData) {
    await this._simulateNetwork();
    return {
      success: true,
      orderId: 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      destinationId: orderData.destinationId,
      destinationName: orderData.destinationName,
      price: orderData.price,
      message: 'Ticket reservation confirmed! A booking confirmation has been issued.'
    };
  }
}

