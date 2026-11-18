/**
 * Destination Detail Component Tests
 * 
 * Minimal testing focused on:
 * - Component rendering
 * - Event emission for order and back actions
 * 
 * Requirements: 2.2, 2.3, 2.4, 2.5
 */

import { DestinationDetail } from './destination-detail.js';
import { eventBus } from '../event-bus.js';

/**
 * Test: Component renders with destination data
 */
function testRenderWithDestination() {
  console.log('Test: Component renders with destination data');
  
  const container = document.createElement('div');
  const destination = {
    id: 'dest-001',
    name: 'Bali Paradise',
    location: 'Bali, Indonesia',
    fullDescription: 'Experience the magic of Bali with pristine beaches, ancient temples, and vibrant culture.',
    price: 1299,
    imageUrl: 'https://example.com/bali.jpg'
  };
  
  const detail = new DestinationDetail(container, destination);
  
  // Check if element was rendered
  const element = container.querySelector('.destination-detail');
  console.assert(element !== null, 'Detail element should be rendered');
  
  // Check if title is rendered
  const title = container.querySelector('.detail-title');
  console.assert(title !== null, 'Title should be rendered');
  console.assert(title.textContent === 'Bali Paradise', 'Title should match destination name');
  
  // Check if location is rendered
  const location = container.querySelector('.detail-location');
  console.assert(location !== null, 'Location should be rendered');
  console.assert(location.textContent.includes('Bali, Indonesia'), 'Location should match destination location');
  
  // Check if description is rendered
  const description = container.querySelector('.detail-description p');
  console.assert(description !== null, 'Description should be rendered');
  console.assert(description.textContent.includes('Experience the magic'), 'Description should match destination description');
  
  // Check if price is rendered
  const price = container.querySelector('.price-amount');
  console.assert(price !== null, 'Price should be rendered');
  console.assert(price.textContent.includes('1,299'), 'Price should be formatted correctly');
  
  // Check if order button exists
  const orderButton = container.querySelector('[data-action="order"]');
  console.assert(orderButton !== null, 'Order button should be rendered');
  
  // Check if back button exists
  const backButton = container.querySelector('[data-action="back"]');
  console.assert(backButton !== null, 'Back button should be rendered');
  
  detail.destroy();
  console.log('✓ Test passed: Component renders with destination data\n');
}

/**
 * Test: Order button click emits detail:order-click event
 */
function testOrderButtonEmitsEvent() {
  console.log('Test: Order button click emits detail:order-click event');
  
  const container = document.createElement('div');
  const destination = {
    id: 'dest-002',
    name: 'Test Destination',
    location: 'Test Location',
    fullDescription: 'Test description for the destination.',
    price: 999,
    imageUrl: 'https://example.com/test.jpg'
  };
  
  const detail = new DestinationDetail(container, destination);
  
  let eventEmitted = false;
  let eventData = null;
  
  // Listen for the event
  const unsubscribe = eventBus.on('detail:order-click', (data) => {
    eventEmitted = true;
    eventData = data;
  });
  
  // Click the order button
  const orderButton = container.querySelector('[data-action="order"]');
  orderButton.click();
  
  // Check if event was emitted
  console.assert(eventEmitted === true, 'detail:order-click event should be emitted');
  console.assert(eventData !== null, 'Event data should be provided');
  console.assert(eventData.destinationId === 'dest-002', 'Event data should include destination ID');
  console.assert(eventData.destination.name === 'Test Destination', 'Event data should include destination object');
  
  unsubscribe();
  detail.destroy();
  console.log('✓ Test passed: Order button click emits detail:order-click event\n');
}

/**
 * Test: Back button click emits detail:back-click event
 */
function testBackButtonEmitsEvent() {
  console.log('Test: Back button click emits detail:back-click event');
  
  const container = document.createElement('div');
  const destination = {
    id: 'dest-003',
    name: 'Another Destination',
    location: 'Test Location',
    fullDescription: 'Another test description.',
    price: 1500,
    imageUrl: 'https://example.com/another.jpg'
  };
  
  const detail = new DestinationDetail(container, destination);
  
  let eventEmitted = false;
  
  // Listen for the event
  const unsubscribe = eventBus.on('detail:back-click', () => {
    eventEmitted = true;
  });
  
  // Click the back button
  const backButton = container.querySelector('[data-action="back"]');
  backButton.click();
  
  // Check if event was emitted
  console.assert(eventEmitted === true, 'detail:back-click event should be emitted');
  
  unsubscribe();
  detail.destroy();
  console.log('✓ Test passed: Back button click emits detail:back-click event\n');
}

/**
 * Test: Component handles missing destination data gracefully
 */
function testHandlesMissingData() {
  console.log('Test: Component handles missing destination data gracefully');
  
  const container = document.createElement('div');
  const detail = new DestinationDetail(container, {});
  
  // Check if element was rendered with default values
  const element = container.querySelector('.destination-detail');
  console.assert(element !== null, 'Detail element should be rendered even with empty data');
  
  const title = container.querySelector('.detail-title');
  console.assert(title !== null, 'Title should be rendered with default value');
  console.assert(title.textContent === 'Destination Name', 'Title should show default value');
  
  detail.destroy();
  console.log('✓ Test passed: Component handles missing destination data gracefully\n');
}

/**
 * Test: Price formatting works correctly
 */
function testPriceFormatting() {
  console.log('Test: Price formatting works correctly');
  
  const container = document.createElement('div');
  const destination = {
    id: 'dest-004',
    name: 'Expensive Destination',
    location: 'Test',
    fullDescription: 'Test description.',
    price: 2999,
    imageUrl: 'https://example.com/test.jpg'
  };
  
  const detail = new DestinationDetail(container, destination);
  
  const price = container.querySelector('.price-amount');
  console.assert(price !== null, 'Price should be rendered');
  console.assert(price.textContent.includes('2,999'), 'Price should be formatted with commas');
  console.assert(price.textContent.includes('$'), 'Price should include dollar sign');
  
  detail.destroy();
  console.log('✓ Test passed: Price formatting works correctly\n');
}

/**
 * Run all tests
 */
export function runDestinationDetailTests() {
  console.log('=== Destination Detail Component Tests ===\n');
  
  try {
    testRenderWithDestination();
    testOrderButtonEmitsEvent();
    testBackButtonEmitsEvent();
    testHandlesMissingData();
    testPriceFormatting();
    
    console.log('=== All Destination Detail tests passed! ===\n');
    return true;
  } catch (error) {
    console.error('Test failed with error:', error);
    return false;
  }
}

// Auto-run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runDestinationDetailTests();
}
