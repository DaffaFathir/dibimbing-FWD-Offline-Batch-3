/**
 * Real API Service
 * Connects to the Node.js backend server
 */

import { Destination } from '../models/destination.js';

export class APIError extends Error {
  constructor(message, statusCode = 500, type = 'Error') {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.type = type;
  }
}

export class APIService {
  constructor(options = {}) {
    this.baseURL = options.baseURL || 'http://localhost:3000';
    this.timeout = options.timeout || 10000; // 10 seconds
  }

  /**
   * Fetch with timeout
   */
  async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new APIError('Request timeout', 408, 'TimeoutError');
      }
      throw error;
    }
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      throw new APIError('Invalid response format from server', 500, 'ServerError');
    }

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error?.message || 'An error occurred';
      const errorType = data.error?.type || 'Error';
      throw new APIError(errorMessage, response.status, errorType);
    }

    return data;
  }

  /**
   * Get all destinations
   */
  async getAllDestinations() {
    try {
      const response = await this.fetchWithTimeout(`${this.baseURL}/destination-list`);
      const result = await this.handleResponse(response);

      if (!result.success || !Array.isArray(result.data)) {
        throw new APIError('Invalid data format from server', 500, 'ServerError');
      }

      return result.data.map(d => new Destination(d));
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      
      // Network or other errors
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new APIError('Cannot connect to server. Please check if the backend is running.', 503, 'NetworkError');
      }
      
      throw new APIError('Failed to fetch destinations from server', 500, 'ServerError');
    }
  }

  /**
   * Get destination by ID
   */
  async getDestinationById(id) {
    try {
      const response = await this.fetchWithTimeout(`${this.baseURL}/destination-detail/${id}`);
      const result = await this.handleResponse(response);

      if (!result.success || !result.data) {
        throw new APIError('Invalid data format from server', 500, 'ServerError');
      }

      return new Destination(result.data);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      
      // Network or other errors
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new APIError('Cannot connect to server. Please check if the backend is running.', 503, 'NetworkError');
      }
      
      throw new APIError('Failed to fetch destination details from server', 500, 'ServerError');
    }
  }

  /**
   * Search destinations (client-side filtering)
   * Backend doesn't have search endpoint, so we fetch all and filter
   */
  async searchDestinations(query) {
    try {
      const all = await this.getAllDestinations();
      
      if (!query || typeof query !== 'string') {
        return all;
      }

      return all.filter(dest => dest.matchesSearch(query));
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Search service temporarily unavailable', 500, 'ServerError');
    }
  }

  /**
   * Submit order (mock implementation - backend doesn't have this yet)
   */
  async submitOrder(orderData) {
    // Since backend doesn't have order endpoint, simulate it
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          status: 'confirmed',
          timestamp: new Date().toISOString(),
          orderData
        });
      }, 500);
    });
  }
}

// Create singleton instance
export const api = new APIService({
  baseURL: 'http://localhost:3000',
  timeout: 10000
});

// Export mockAPI alias for backward compatibility
export const mockAPI = api;
