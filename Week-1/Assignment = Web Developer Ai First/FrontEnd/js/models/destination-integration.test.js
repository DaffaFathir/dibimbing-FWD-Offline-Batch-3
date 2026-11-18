/**
 * Integration Test for Destination Model with Mock API
 * Verifies that Destination model works correctly with mock data
 */

import { Destination } from './destination.js';
import { mockAPI } from '../services/mock-api.js';

console.log('=== Destination Model Integration Tests ===\n');

// Test 1: Load destinations from mock API and create Destination instances
(async () => {
  try {
    console.log('Test 1: Fetching all destinations from Mock API...');
    const rawDestinations = await mockAPI.getAllDestinations();
    
    console.log(`✓ Fetched ${rawDestinations.length} destinations from API`);
    
    // Convert raw data to Destination model instances
    const destinations = rawDestinations.map(data => new Destination(data));
    
    console.log(`✓ Successfully created ${destinations.length} Destination model instances`);
    console.log(`  First destination: ${destinations[0].name}`);
    console.log(`  Formatted price: ${destinations[0].getFormattedPrice()}`);
    
  } catch (error) {
    console.log('✗ Test 1 FAILED:', error.message);
  }

  // Test 2: Get single destination and use model methods
  try {
    console.log('\nTest 2: Fetching single destination...');
    const rawDestination = await mockAPI.getDestinationById('dest-001');
    const destination = new Destination(rawDestination);
    
    console.log('✓ Successfully loaded single destination');
    console.log(`  Name: ${destination.name}`);
    console.log(`  Formatted Price: ${destination.getFormattedPrice()}`);
    console.log(`  Short Description: ${destination.getShortDescription(60)}`);
    
  } catch (error) {
    console.log('✗ Test 2 FAILED:', error.message);
  }

  // Test 3: Search functionality with Destination model
  try {
    console.log('\nTest 3: Testing search with Destination model...');
    const rawDestinations = await mockAPI.getAllDestinations();
    const destinations = rawDestinations.map(data => new Destination(data));
    
    // Test search using Destination.matchesSearch()
    const searchQuery = 'beach';
    const results = destinations.filter(dest => dest.matchesSearch(searchQuery));
    
    console.log(`✓ Search for "${searchQuery}" found ${results.length} results`);
    results.forEach(dest => {
      console.log(`  - ${dest.name} (${dest.location})`);
    });
    
  } catch (error) {
    console.log('✗ Test 3 FAILED:', error.message);
  }

  // Test 4: toJSON() serialization
  try {
    console.log('\nTest 4: Testing JSON serialization...');
    const rawDestination = await mockAPI.getDestinationById('dest-001');
    const destination = new Destination(rawDestination);
    
    const json = destination.toJSON();
    const jsonString = JSON.stringify(json, null, 2);
    
    console.log('✓ Successfully serialized Destination to JSON');
    console.log(`  JSON keys: ${Object.keys(json).join(', ')}`);
    console.log(`  JSON size: ${jsonString.length} characters`);
    
  } catch (error) {
    console.log('✗ Test 4 FAILED:', error.message);
  }

  console.log('\n=== Integration Tests Completed ===');
})();
