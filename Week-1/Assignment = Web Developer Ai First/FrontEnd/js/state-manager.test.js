/**
 * State Manager Tests
 * Basic tests to verify State Manager functionality
 */

import { StateManager } from './state-manager.js';

// Test helper
function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✓ ${message}`);
}

function assertEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Assertion failed: ${message}\n  Expected: ${JSON.stringify(expected)}\n  Actual: ${JSON.stringify(actual)}`);
  }
  console.log(`✓ ${message}`);
}

// Run tests
console.log('Starting State Manager tests...\n');

try {
  // Test 1: Initial state
  console.log('Test 1: Initial state');
  const stateManager = new StateManager();
  const initialState = stateManager.getState();
  assert(Array.isArray(initialState.destinations), 'destinations should be an array');
  assert(initialState.currentDestination === null, 'currentDestination should be null');
  assert(initialState.searchQuery === '', 'searchQuery should be empty string');
  assert(initialState.loading === false, 'loading should be false');
  assert(initialState.error === null, 'error should be null');
  console.log('');

  // Test 2: setState and getState
  console.log('Test 2: setState and getState');
  stateManager.setState({ loading: true });
  assert(stateManager.getState().loading === true, 'loading should be updated to true');
  console.log('');

  // Test 3: Subscribe to state changes
  console.log('Test 3: Subscribe to state changes');
  let notificationCount = 0;
  let lastState = null;
  const unsubscribe = stateManager.subscribe((state) => {
    notificationCount++;
    lastState = state;
  });
  stateManager.setState({ loading: false });
  assert(notificationCount === 1, 'subscriber should be called once');
  assert(lastState.loading === false, 'subscriber should receive updated state');
  console.log('');

  // Test 4: Unsubscribe
  console.log('Test 4: Unsubscribe');
  unsubscribe();
  stateManager.setState({ loading: true });
  assert(notificationCount === 1, 'subscriber should not be called after unsubscribe');
  console.log('');

  // Test 5: setDestinations and getDestinations
  console.log('Test 5: Destination methods');
  const mockDestinations = [
    { id: '1', name: 'Bali', location: 'Indonesia', description: 'Beautiful beach', price: 1000, tags: ['beach'] },
    { id: '2', name: 'Bangkok', location: 'Thailand', description: 'Vibrant city', price: 800, tags: ['city'] }
  ];
  stateManager.setDestinations(mockDestinations);
  const destinations = stateManager.getDestinations();
  assertEqual(destinations.length, 2, 'should have 2 destinations');
  assertEqual(destinations[0].name, 'Bali', 'first destination should be Bali');
  console.log('');

  // Test 6: Filtered destinations (no search)
  console.log('Test 6: Filtered destinations without search');
  const allFiltered = stateManager.getFilteredDestinations();
  assertEqual(allFiltered.length, 2, 'should return all destinations when no search query');
  console.log('');

  // Test 7: Search filtering
  console.log('Test 7: Search filtering');
  stateManager.setSearchQuery('bali');
  const filteredBySearch = stateManager.getFilteredDestinations();
  assertEqual(filteredBySearch.length, 1, 'should filter to 1 destination');
  assertEqual(filteredBySearch[0].name, 'Bali', 'should return Bali');
  console.log('');

  // Test 8: Search by location
  console.log('Test 8: Search by location');
  stateManager.setSearchQuery('thailand');
  const filteredByLocation = stateManager.getFilteredDestinations();
  assertEqual(filteredByLocation.length, 1, 'should filter by location');
  assertEqual(filteredByLocation[0].name, 'Bangkok', 'should return Bangkok');
  console.log('');

  // Test 9: Case-insensitive search
  console.log('Test 9: Case-insensitive search');
  stateManager.setSearchQuery('BALI');
  const caseInsensitive = stateManager.getFilteredDestinations();
  assertEqual(caseInsensitive.length, 1, 'should be case-insensitive');
  console.log('');

  // Test 10: Clear search
  console.log('Test 10: Clear search');
  stateManager.setSearchQuery('');
  const clearedSearch = stateManager.getFilteredDestinations();
  assertEqual(clearedSearch.length, 2, 'should return all destinations when search cleared');
  console.log('');

  // Test 11: Current destination
  console.log('Test 11: Current destination methods');
  stateManager.setCurrentDestination(mockDestinations[0]);
  const currentDest = stateManager.getCurrentDestination();
  assertEqual(currentDest.name, 'Bali', 'should set and get current destination');
  console.log('');

  // Test 12: User methods
  console.log('Test 12: User methods');
  const mockUser = { name: 'John Doe', profilePicture: 'url' };
  stateManager.setUser(mockUser);
  const user = stateManager.getUser();
  assertEqual(user.name, 'John Doe', 'should set and get user');
  console.log('');

  // Test 13: Loading state methods
  console.log('Test 13: Loading state methods');
  stateManager.setLoading(true);
  assert(stateManager.isLoading() === true, 'should set loading to true');
  stateManager.setLoading(false);
  assert(stateManager.isLoading() === false, 'should set loading to false');
  console.log('');

  // Test 14: Error state methods
  console.log('Test 14: Error state methods');
  stateManager.setError('Test error');
  assertEqual(stateManager.getError(), 'Test error', 'should set error message');
  stateManager.clearError();
  assert(stateManager.getError() === null, 'should clear error');
  console.log('');

  // Test 15: Error object
  console.log('Test 15: Error object handling');
  const errorObj = new Error('API Error');
  stateManager.setError(errorObj);
  assertEqual(stateManager.getError(), 'API Error', 'should extract message from Error object');
  console.log('');

  // Test 16: Reset state
  console.log('Test 16: Reset state');
  stateManager.reset();
  const resetState = stateManager.getState();
  assertEqual(resetState.destinations, [], 'should reset destinations to empty array');
  assert(resetState.currentDestination === null, 'should reset currentDestination to null');
  assertEqual(resetState.searchQuery, '', 'should reset searchQuery to empty string');
  console.log('');

  // Test 17: Multiple subscribers
  console.log('Test 17: Multiple subscribers');
  const stateManager2 = new StateManager();
  let count1 = 0, count2 = 0;
  const unsub1 = stateManager2.subscribe(() => count1++);
  const unsub2 = stateManager2.subscribe(() => count2++);
  stateManager2.setState({ loading: true });
  assert(count1 === 1 && count2 === 1, 'both subscribers should be notified');
  unsub1();
  stateManager2.setState({ loading: false });
  assert(count1 === 1 && count2 === 2, 'only active subscriber should be notified');
  unsub2();
  console.log('');

  // Test 18: Search by tags
  console.log('Test 18: Search by tags');
  stateManager2.setDestinations([
    { id: '1', name: 'Beach Resort', location: 'Bali', description: 'Resort', price: 1000, tags: ['beach', 'luxury'] },
    { id: '2', name: 'Mountain Lodge', location: 'Nepal', description: 'Lodge', price: 800, tags: ['mountain', 'adventure'] }
  ]);
  stateManager2.setSearchQuery('luxury');
  const filteredByTag = stateManager2.getFilteredDestinations();
  assertEqual(filteredByTag.length, 1, 'should filter by tag');
  assertEqual(filteredByTag[0].name, 'Beach Resort', 'should find destination by tag');
  console.log('');

  console.log('✅ All tests passed!\n');

} catch (error) {
  console.error('\n❌ Test failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}
