/**
 * Mock API Service Tests
 * Simple manual test file to verify Mock API functionality
 */

import { mockAPI, MockAPIService } from './mock-api.js';

// Test utilities
const testResults = {
  passed: 0,
  failed: 0,
  tests: []
};

function test(name, fn) {
  return fn()
    .then(() => {
      testResults.passed++;
      testResults.tests.push({ name, status: 'PASSED' });
      console.log(`✓ ${name}`);
    })
    .catch(error => {
      testResults.failed++;
      testResults.tests.push({ name, status: 'FAILED', error: error.message });
      console.error(`✗ ${name}`, error);
    });
}

// Run all tests
async function runTests() {
  console.log('🧪 Running Mock API Tests...\n');

  // Test 1: Get all destinations
  await test('getAllDestinations returns array of destinations', async () => {
    const destinations = await mockAPI.getAllDestinations();
    
    if (!Array.isArray(destinations)) {
      throw new Error('getAllDestinations did not return an array');
    }
    
    if (destinations.length === 0) {
      throw new Error('getAllDestinations returned empty array');
    }
    
    // Verify structure of first destination
    const dest = destinations[0];
    if (!dest.id || !dest.name || !dest.location || !dest.price) {
      throw new Error('Destination missing required fields');
    }
  });

  // Test 2: Get destination by ID
  await test('getDestinationById returns correct destination', async () => {
    const destination = await mockAPI.getDestinationById('dest-001');
    
    if (!destination) {
      throw new Error('getDestinationById returned null/undefined');
    }
    
    if (destination.id !== 'dest-001') {
      throw new Error(`Expected id 'dest-001', got '${destination.id}'`);
    }
    
    if (!destination.name || !destination.location) {
      throw new Error('Destination missing required fields');
    }
  });

  // Test 3: Get non-existent destination throws error
  await test('getDestinationById throws error for invalid ID', async () => {
    try {
      await mockAPI.getDestinationById('invalid-id');
      throw new Error('Should have thrown error for invalid ID');
    } catch (error) {
      if (!error.message.includes('not found')) {
        throw new Error(`Unexpected error message: ${error.message}`);
      }
    }
  });

  // Test 4: Search destinations by name
  await test('searchDestinations finds destinations by name', async () => {
    const results = await mockAPI.searchDestinations('bali');
    
    if (!Array.isArray(results)) {
      throw new Error('searchDestinations did not return an array');
    }
    
    if (results.length === 0) {
      throw new Error('searchDestinations returned no results for "bali"');
    }
    
    const hasBali = results.some(dest => 
      dest.name.toLowerCase().includes('bali')
    );
    
    if (!hasBali) {
      throw new Error('Search results do not contain "bali" in name');
    }
  });

  // Test 5: Search destinations by location
  await test('searchDestinations finds destinations by location', async () => {
    const results = await mockAPI.searchDestinations('thailand');
    
    if (!Array.isArray(results)) {
      throw new Error('searchDestinations did not return an array');
    }
    
    if (results.length === 0) {
      throw new Error('searchDestinations returned no results for "thailand"');
    }
    
    const hasThailand = results.some(dest => 
      dest.location.toLowerCase().includes('thailand')
    );
    
    if (!hasThailand) {
      throw new Error('Search results do not contain "thailand" in location');
    }
  });

  // Test 6: Search destinations by tag
  await test('searchDestinations finds destinations by tag', async () => {
    const results = await mockAPI.searchDestinations('beach');
    
    if (!Array.isArray(results)) {
      throw new Error('searchDestinations did not return an array');
    }
    
    if (results.length === 0) {
      throw new Error('searchDestinations returned no results for "beach"');
    }
    
    const hasBeachTag = results.some(dest => 
      dest.tags && dest.tags.includes('beach')
    );
    
    if (!hasBeachTag) {
      throw new Error('Search results do not contain "beach" tag');
    }
  });

  // Test 7: Empty search returns all destinations
  await test('searchDestinations with empty query returns all destinations', async () => {
    const all = await mockAPI.getAllDestinations();
    const searchResults = await mockAPI.searchDestinations('');
    
    if (searchResults.length !== all.length) {
      throw new Error(`Expected ${all.length} results, got ${searchResults.length}`);
    }
  });

  // Test 8: Data immutability - modifying returned data doesn't affect original
  await test('returned data is deep cloned (immutable)', async () => {
    const destinations1 = await mockAPI.getAllDestinations();
    const destinations2 = await mockAPI.getAllDestinations();
    
    // Modify first result
    destinations1[0].name = 'MODIFIED';
    
    // Check second result is unchanged
    if (destinations2[0].name === 'MODIFIED') {
      throw new Error('Data mutation affected subsequent calls - not properly cloned');
    }
  });

  // Test 9: Realistic delay is applied
  await test('API calls have realistic delay', async () => {
    const start = Date.now();
    await mockAPI.getAllDestinations();
    const duration = Date.now() - start;
    
    if (duration < 300) {
      throw new Error(`Delay too short: ${duration}ms (expected >= 300ms)`);
    }
    
    if (duration > 900) {
      throw new Error(`Delay too long: ${duration}ms (expected <= 800ms + processing)`);
    }
  });

  // Test 10: Custom configuration works
  await test('Custom MockAPIService instance works', async () => {
    const customAPI = new MockAPIService({
      minDelay: 100,
      maxDelay: 200,
      errorRate: 0
    });
    
    const start = Date.now();
    const destinations = await customAPI.getAllDestinations();
    const duration = Date.now() - start;
    
    if (duration < 100) {
      throw new Error(`Delay too short: ${duration}ms (expected >= 100ms)`);
    }
    
    if (!Array.isArray(destinations) || destinations.length === 0) {
      throw new Error('Custom API instance did not return valid data');
    }
  });

  // Test 11: Error simulation works
  await test('Error simulation throws errors', async () => {
    const errorAPI = new MockAPIService({
      minDelay: 10,
      maxDelay: 20,
      errorRate: 100 // Always fail
    });
    
    let errorThrown = false;
    try {
      await errorAPI.getAllDestinations();
    } catch (error) {
      errorThrown = true;
      if (!error.message.includes('simulated error')) {
        throw new Error(`Unexpected error message: ${error.message}`);
      }
    }
    
    if (!errorThrown) {
      throw new Error('Error simulation did not throw error');
    }
  });

  // Test 12: Submit order works
  await test('submitOrder returns confirmation', async () => {
    const orderData = {
      destinationId: 'dest-001',
      userEmail: 'test@example.com',
      numberOfPeople: 2,
      travelDate: '2024-12-01'
    };
    
    const result = await mockAPI.submitOrder(orderData);
    
    if (!result.orderId) {
      throw new Error('Order confirmation missing orderId');
    }
    
    if (result.status !== 'confirmed') {
      throw new Error(`Expected status 'confirmed', got '${result.status}'`);
    }
  });

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('Test Summary:');
  console.log(`✓ Passed: ${testResults.passed}`);
  console.log(`✗ Failed: ${testResults.failed}`);
  console.log(`Total: ${testResults.tests.length}`);
  console.log('='.repeat(50));

  return testResults;
}

// Run tests if this file is executed directly
runTests().catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
