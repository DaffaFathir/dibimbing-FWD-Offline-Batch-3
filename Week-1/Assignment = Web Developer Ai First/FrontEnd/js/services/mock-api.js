/**
 * Mock API Service
 * Simulates HTTP requests to a back-end API with realistic delays and error handling
 * 
 * Purpose:
 * - Provides Promise-based interface for async operations
 * - Simulates network latency (300-800ms)
 * - Returns deep copies of data to prevent mutation
 * - Supports error simulation for testing
 * 
 * Usage:
 * import { mockAPI } from './services/mock-api.js';
 * const destinations = await mockAPI.getAllDestinations();
 */

import { mockDestinations } from './mock-data.js';

/**
 * Mock API Service Class
 * Simulates back-end API with realistic behavior
 */
class MockAPIService {
  /**
   * Initialize Mock API Service
   * @param {Object} options - Configuration options
   * @param {number} options.minDelay - Minimum network delay in ms (default: 300)
   * @param {number} options.maxDelay - Maximum network delay in ms (default: 800)
   * @param {number} options.errorRate - Percentage of requests that fail (default: 0, range: 0-100)
   * @param {number} options.maxRetries - Maximum number of retry attempts (default: 3)
   * @param {number} options.retryDelay - Delay between retries in ms (default: 1000)
   */
  constructor(options = {}) {
    this.minDelay = options.minDelay || 300;
    this.maxDelay = options.maxDelay || 800;
    this.errorRate = options.errorRate || 0; // 0-100 percentage
    this.maxRetries = options.maxRetries !== undefined ? options.maxRetries : 3;
    this.retryDelay = options.retryDelay || 1000;
    
    // Validate options
    if (this.minDelay < 0 || this.maxDelay < this.minDelay) {
      throw new Error('Invalid delay configuration: maxDelay must be >= minDelay >= 0');
    }
    if (this.errorRate < 0 || this.errorRate > 100) {
      throw new Error('Invalid errorRate: must be between 0 and 100');
    }
    if (this.maxRetries < 0) {
      throw new Error('Invalid maxRetries: must be >= 0');
    }
  }

  /**
   * Simulate network delay with random duration
   * @returns {Promise<void>}
   * @private
   */
  _simulateDelay() {
    const delay = Math.floor(
      Math.random() * (this.maxDelay - this.minDelay + 1) + this.minDelay
    );
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Simulate random API errors for testing
   * @param {string} operation - The operation being performed
   * @throws {Error} Random error based on errorRate
   * @private
   */
  _simulateError(operation) {
    if (this.errorRate > 0) {
      const random = Math.random() * 100;
      if (random < this.errorRate) {
        throw new Error(`API Error: ${operation} failed (simulated error)`);
      }
    }
  }

  /**
   * Deep clone an object to prevent mutation of original data
   * @param {any} obj - Object to clone
   * @returns {any} Deep cloned copy
   * @private
   */
  _deepClone(obj) {
    // Handle null, undefined, primitives
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }

    // Handle Array
    if (Array.isArray(obj)) {
      return obj.map(item => this._deepClone(item));
    }

    // Handle Object
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = this._deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  /**
   * Execute a request with retry logic
   * @param {Function} requestFn - Async function to execute
   * @param {string} operation - Operation name for logging
   * @param {number} attempt - Current attempt number
   * @returns {Promise<any>} Request result
   * @private
   */
  async _executeWithRetry(requestFn, operation, attempt = 0) {
    try {
      return await requestFn();
    } catch (error) {
      // Check if we should retry
      if (attempt < this.maxRetries && this._shouldRetry(error)) {
        console.warn(`MockAPI: ${operation} failed (attempt ${attempt + 1}/${this.maxRetries + 1}). Retrying in ${this.retryDelay}ms...`);
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        
        // Retry the request
        return this._executeWithRetry(requestFn, operation, attempt + 1);
      }
      
      // Max retries reached or non-retryable error
      throw error;
    }
  }

  /**
   * Determine if an error should trigger a retry
   * @param {Error} error - The error to check
   * @returns {boolean} Whether to retry
   * @private
   */
  _shouldRetry(error) {
    // Don't retry validation errors or "not found" errors
    if (error.message.includes('Invalid') || error.message.includes('not found') || error.message.includes('Missing required')) {
      return false;
    }
    
    // Retry network-related errors
    return true;
  }

  /**
   * Get all destinations from the API
   * @returns {Promise<Array<Object>>} Array of destination objects
   * @throws {Error} If API request fails
   */
  async getAllDestinations() {
    return this._executeWithRetry(async () => {
      // Simulate network delay
      await this._simulateDelay();
      
      // Simulate potential errors
      this._simulateError('getAllDestinations');
      
      // Return deep copy of all destinations
      return this._deepClone(mockDestinations);
    }, 'getAllDestinations');
  }

  /**
   * Get a single destination by ID
   * @param {string} id - Destination ID
   * @returns {Promise<Object>} Destination object
   * @throws {Error} If destination not found or API request fails
   */
  async getDestinationById(id) {
    try {
      // Validate input
      if (!id || typeof id !== 'string') {
        throw new Error('Invalid destination ID: must be a non-empty string');
      }

      // Simulate network delay
      await this._simulateDelay();
      
      // Simulate potential errors
      this._simulateError('getDestinationById');
      
      // Find destination
      const destination = mockDestinations.find(dest => dest.id === id);
      
      if (!destination) {
        throw new Error(`Destination not found: ${id}`);
      }
      
      // Return deep copy of destination
      return this._deepClone(destination);
    } catch (error) {
      console.error(`MockAPI: Failed to fetch destination ${id}:`, error);
      throw error;
    }
  }

  /**
   * Search destinations by query string
   * Searches across name, location, description, and tags
   * @param {string} query - Search query
   * @returns {Promise<Array<Object>>} Array of matching destinations
   * @throws {Error} If API request fails
   */
  async searchDestinations(query) {
    try {
      // Validate input
      if (typeof query !== 'string') {
        throw new Error('Invalid query: must be a string');
      }

      // Simulate network delay
      await this._simulateDelay();
      
      // Simulate potential errors
      this._simulateError('searchDestinations');
      
      // Empty query returns all destinations
      if (!query || query.trim() === '') {
        return this._deepClone(mockDestinations);
      }
      
      // Normalize query for case-insensitive search
      const normalizedQuery = query.toLowerCase().trim();
      
      // Filter destinations by query
      const results = mockDestinations.filter(destination => {
        // Search in name
        if (destination.name.toLowerCase().includes(normalizedQuery)) {
          return true;
        }
        
        // Search in location
        if (destination.location.toLowerCase().includes(normalizedQuery)) {
          return true;
        }
        
        // Search in description
        if (destination.description.toLowerCase().includes(normalizedQuery)) {
          return true;
        }
        
        // Search in full description
        if (destination.fullDescription.toLowerCase().includes(normalizedQuery)) {
          return true;
        }
        
        // Search in tags
        if (destination.tags && destination.tags.some(tag => 
          tag.toLowerCase().includes(normalizedQuery)
        )) {
          return true;
        }
        
        return false;
      });
      
      // Return deep copy of results
      return this._deepClone(results);
    } catch (error) {
      console.error(`MockAPI: Failed to search destinations with query "${query}":`, error);
      throw error;
    }
  }

  /**
   * Submit order for a destination (future back-end integration)
   * @param {Object} orderData - Order information
   * @param {string} orderData.destinationId - Destination ID
   * @param {string} orderData.userEmail - User email
   * @param {number} orderData.numberOfPeople - Number of people
   * @param {string} orderData.travelDate - Travel date
   * @returns {Promise<Object>} Order confirmation
   * @throws {Error} If order submission fails
   */
  async submitOrder(orderData) {
    try {
      // Validate input
      if (!orderData || typeof orderData !== 'object') {
        throw new Error('Invalid order data: must be an object');
      }
      
      if (!orderData.destinationId) {
        throw new Error('Missing required field: destinationId');
      }

      // Simulate network delay
      await this._simulateDelay();
      
      // Simulate potential errors
      this._simulateError('submitOrder');
      
      // Verify destination exists
      const destination = mockDestinations.find(
        dest => dest.id === orderData.destinationId
      );
      
      if (!destination) {
        throw new Error(`Destination not found: ${orderData.destinationId}`);
      }
      
      // Generate mock order ID
      const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Return order confirmation
      return {
        orderId,
        status: 'confirmed',
        destination: destination.name,
        message: 'Order submitted successfully. You will receive a confirmation email shortly.',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('MockAPI: Failed to submit order:', error);
      throw error;
    }
  }
}

// Create singleton instance with default configuration
export const mockAPI = new MockAPIService({
  minDelay: 300,
  maxDelay: 800,
  errorRate: 0 // No errors by default
});

// Export class for custom instances (e.g., testing with errors)
export { MockAPIService };
