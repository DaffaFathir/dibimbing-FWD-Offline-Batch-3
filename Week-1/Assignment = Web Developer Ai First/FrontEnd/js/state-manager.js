/**
 * State Manager
 * Centralized state management with pub-sub pattern for reactive updates
 * Implements observer pattern for component communication
 */

export class StateManager {
  constructor() {
    // Initialize state shape
    this.state = {
      destinations: [],           // All destinations from API
      currentDestination: null,   // Currently viewed destination
      searchQuery: '',            // Current search query
      filteredDestinations: [],   // Destinations matching search
      user: null,                 // User data (for future authentication)
      loading: false,             // Loading state
      error: null                 // Error state
    };
    
    // Array of subscriber functions
    this.subscribers = [];
  }

  /**
   * Get the current state
   * @returns {object} - Current state object
   */
  getState() {
    // Return a shallow copy to prevent direct mutation
    return { ...this.state };
  }

  /**
   * Update state and notify subscribers
   * @param {object} updates - Partial state updates
   */
  setState(updates) {
    // Store previous state for change detection
    const previousState = { ...this.state };
    
    // Merge updates into state (shallow merge)
    this.state = { ...this.state, ...updates };
    
    // Recompute filtered destinations if destinations or searchQuery changed
    if (updates.destinations !== undefined || updates.searchQuery !== undefined) {
      this.state.filteredDestinations = this.computeFilteredDestinations();
    }
    
    // Only notify subscribers if state actually changed
    if (this.hasStateChanged(previousState, this.state)) {
      this.notifySubscribers();
    }
  }

  /**
   * Subscribe to state changes
   * @param {function} listener - Callback function that receives new state
   * @returns {function} - Unsubscribe function
   */
  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Subscriber must be a function');
    }
    
    // Add listener to subscribers array
    this.subscribers.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(listener);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  /**
   * Notify all subscribers of state change
   * @private
   */
  notifySubscribers() {
    // Call each subscriber with current state
    this.subscribers.forEach(listener => {
      try {
        listener(this.getState());
      } catch (error) {
        console.error('Error in state subscriber:', error);
      }
    });
  }

  /**
   * Check if state has changed (shallow comparison)
   * @private
   * @param {object} prevState - Previous state
   * @param {object} newState - New state
   * @returns {boolean} - True if state changed
   */
  hasStateChanged(prevState, newState) {
    const keys = Object.keys(newState);
    return keys.some(key => prevState[key] !== newState[key]);
  }

  /**
   * Compute filtered destinations based on search query
   * @private
   * @returns {Array} - Filtered destinations
   */
  computeFilteredDestinations() {
    const { destinations, searchQuery } = this.state;
    
    // If no search query, return all destinations
    if (!searchQuery || searchQuery.trim() === '') {
      return [...destinations];
    }
    
    // Filter destinations by search query
    const query = searchQuery.toLowerCase().trim();
    return destinations.filter(destination => {
      // Search in name, location, description, and tags
      const searchableText = [
        destination.name,
        destination.location,
        destination.description,
        ...(destination.tags || [])
      ].join(' ').toLowerCase();
      
      return searchableText.includes(query);
    });
  }

  // ==========================================
  // Destination-specific methods
  // ==========================================

  /**
   * Set all destinations
   * @param {Array} destinations - Array of destination objects
   */
  setDestinations(destinations) {
    if (!Array.isArray(destinations)) {
      throw new Error('Destinations must be an array');
    }
    this.setState({ destinations });
  }

  /**
   * Get all destinations
   * @returns {Array} - All destinations
   */
  getDestinations() {
    return [...this.state.destinations];
  }

  /**
   * Set the current destination being viewed
   * @param {object} destination - Destination object
   */
  setCurrentDestination(destination) {
    this.setState({ currentDestination: destination });
  }

  /**
   * Get the current destination
   * @returns {object|null} - Current destination or null
   */
  getCurrentDestination() {
    return this.state.currentDestination;
  }

  /**
   * Set search query and trigger filtering
   * @param {string} query - Search query string
   */
  setSearchQuery(query) {
    if (typeof query !== 'string') {
      throw new Error('Search query must be a string');
    }
    this.setState({ searchQuery: query });
  }

  /**
   * Get current search query
   * @returns {string} - Search query
   */
  getSearchQuery() {
    return this.state.searchQuery;
  }

  /**
   * Get filtered destinations (computed property)
   * @returns {Array} - Filtered destinations
   */
  getFilteredDestinations() {
    return [...this.state.filteredDestinations];
  }

  /**
   * Set user data
   * @param {object|null} user - User object or null
   */
  setUser(user) {
    this.setState({ user });
  }

  /**
   * Get user data
   * @returns {object|null} - User object or null
   */
  getUser() {
    return this.state.user;
  }

  /**
   * Set loading state
   * @param {boolean} loading - Loading state
   */
  setLoading(loading) {
    if (typeof loading !== 'boolean') {
      throw new Error('Loading must be a boolean');
    }
    this.setState({ loading });
  }

  /**
   * Get loading state
   * @returns {boolean} - Loading state
   */
  isLoading() {
    return this.state.loading;
  }

  /**
   * Set error state
   * @param {Error|string|null} error - Error object, message, or null to clear
   */
  setError(error) {
    const errorValue = error instanceof Error ? error.message : error;
    this.setState({ error: errorValue });
  }

  /**
   * Get error state
   * @returns {string|null} - Error message or null
   */
  getError() {
    return this.state.error;
  }

  /**
   * Clear error state
   */
  clearError() {
    this.setState({ error: null });
  }

  /**
   * Reset state to initial values
   */
  reset() {
    this.state = {
      destinations: [],
      currentDestination: null,
      searchQuery: '',
      filteredDestinations: [],
      user: null,
      loading: false,
      error: null
    };
    this.notifySubscribers();
  }
}

// Export singleton instance
export const stateManager = new StateManager();
