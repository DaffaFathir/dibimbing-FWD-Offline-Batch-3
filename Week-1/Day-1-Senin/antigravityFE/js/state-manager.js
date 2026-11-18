export class StateManager {
  constructor(initialState = {}) {
    this.state = {
      destinations: [],
      currentDestination: null,
      searchQuery: '',
      filteredDestinations: [],
      user: {
        name: 'Alex Rivera',
        profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      loading: false,
      error: null,
      ...initialState
    };
    this.listeners = [];
  }

  getState() {
    return { ...this.state };
  }

  setState(updates) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...updates };

    // Recompute filteredDestinations if destinations or searchQuery changed
    if ('destinations' in updates || 'searchQuery' in updates) {
      this._updateFilteredDestinations();
    }

    this.notify(prevState);
  }

  _updateFilteredDestinations() {
    const query = (this.state.searchQuery || '').trim().toLowerCase();
    if (!query) {
      this.state.filteredDestinations = [...this.state.destinations];
    } else {
      this.state.filteredDestinations = this.state.destinations.filter(d => d.matchesSearch(query));
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(prevState) {
    this.listeners.forEach(fn => {
      try {
        fn(this.state, prevState);
      } catch (err) {
        console.error('Error in StateManager listener:', err);
      }
    });
  }

  setDestinations(destinations) {
    this.setState({ destinations });
  }

  getDestinations() {
    return this.state.destinations;
  }

  setCurrentDestination(currentDestination) {
    this.setState({ currentDestination });
  }

  getCurrentDestination() {
    return this.state.currentDestination;
  }

  setSearchQuery(searchQuery) {
    this.setState({ searchQuery });
  }

  getSearchQuery() {
    return this.state.searchQuery;
  }

  getFilteredDestinations() {
    return this.state.filteredDestinations;
  }

  setUser(user) {
    this.setState({ user });
  }

  getUser() {
    return this.state.user;
  }
}

