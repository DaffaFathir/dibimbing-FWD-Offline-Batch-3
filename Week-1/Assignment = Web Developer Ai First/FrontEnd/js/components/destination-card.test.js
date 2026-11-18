/**
 * Destination Card Component Tests
 * Minimal testing - functionality first
 */

import { DestinationCard } from './destination-card.js';
import { eventBus } from '../event-bus.js';

/**
 * Test: Component initialization and rendering
 */
function testComponentInitialization() {
  console.group('Test: Component Initialization');

  const container = document.createElement('div');
  const mockDestination = {
    id: 'test-001',
    name: 'Test Destination',
    location: 'Test Location',
    description: 'This is a test description for the destination card component.',
    price: 1299,
    imageUrl: '/test-image.jpg'
  };

  const card = new DestinationCard(container, mockDestination);

  // Check if card is rendered
  const cardElement = container.querySelector('.destination-card');
  console.assert(cardElement !== null, 'Card element should be rendered');
  console.assert(cardElement.getAttribute('data-destination-id') === 'test-001', 'Destination ID should be set');

  // Check if title is rendered
  const title = container.querySelector('.card-title');
  console.assert(title !== null, 'Title should be rendered');
  console.assert(title.textContent === 'Test Destination', 'Title should match destination name');

  // Check if location is rendered
  const location = container.querySelector('.card-location');
  console.assert(location !== null, 'Location should be rendered');
  console.assert(location.textContent.includes('Test Location'), 'Location should be displayed');

  // Check if price is rendered
  const price = container.querySelector('.price-amount');
  console.assert(price !== null, 'Price should be rendered');
  console.assert(price.textContent === '$1,299', 'Price should be formatted correctly');

  // Check if button is rendered
  const button = container.querySelector('[data-action="detail"]');
  console.assert(button !== null, 'Detail button should be rendered');

  card.destroy();
  console.log('✓ Component initialization test passed');
  console.groupEnd();
}

/**
 * Test: Detail button click emits event
 */
function testDetailButtonClick() {
  console.group('Test: Detail Button Click');

  const container = document.createElement('div');
  const mockDestination = {
    id: 'test-002',
    name: 'Click Test',
    location: 'Test Location',
    description: 'Test description',
    price: 999,
    imageUrl: '/test.jpg'
  };

  const card = new DestinationCard(container, mockDestination);

  let eventEmitted = false;
  let emittedData = null;

  // Subscribe to card:detail-click event
  const unsubscribe = eventBus.on('card:detail-click', (data) => {
    eventEmitted = true;
    emittedData = data;
  });

  // Click the button
  const button = container.querySelector('[data-action="detail"]');
  button.click();

  console.assert(eventEmitted === true, 'Event should be emitted when button is clicked');
  console.assert(emittedData !== null, 'Event data should be provided');
  console.assert(emittedData.destinationId === 'test-002', 'Destination ID should be in event data');

  // Cleanup
  unsubscribe();
  card.destroy();
  console.log('✓ Detail button click test passed');
  console.groupEnd();
}

/**
 * Test: Update method
 */
function testUpdateMethod() {
  console.group('Test: Update Method');

  const container = document.createElement('div');
  const initialDestination = {
    id: 'test-003',
    name: 'Initial Name',
    location: 'Initial Location',
    description: 'Initial description',
    price: 500,
    imageUrl: '/initial.jpg'
  };

  const card = new DestinationCard(container, initialDestination);

  // Update with new data
  const updatedDestination = {
    id: 'test-003',
    name: 'Updated Name',
    location: 'Updated Location',
    description: 'Updated description',
    price: 1500,
    imageUrl: '/updated.jpg'
  };

  card.update(updatedDestination);

  // Check if updates are reflected
  const title = container.querySelector('.card-title');
  console.assert(title.textContent === 'Updated Name', 'Title should be updated');

  const price = container.querySelector('.price-amount');
  console.assert(price.textContent === '$1,500', 'Price should be updated');

  card.destroy();
  console.log('✓ Update method test passed');
  console.groupEnd();
}

/**
 * Test: Price formatting
 */
function testPriceFormatting() {
  console.group('Test: Price Formatting');

  const container = document.createElement('div');

  // Test with various prices
  const testCases = [
    { price: 1299, expected: '$1,299' },
    { price: 999, expected: '$999' },
    { price: 10000, expected: '$10,000' },
    { price: 0, expected: '$0' }
  ];

  testCases.forEach(({ price, expected }) => {
    const destination = {
      id: 'test',
      name: 'Test',
      location: 'Test',
      description: 'Test',
      price: price,
      imageUrl: '/test.jpg'
    };

    const card = new DestinationCard(container, destination);
    const priceElement = container.querySelector('.price-amount');
    console.assert(priceElement.textContent === expected, `Price ${price} should format to ${expected}`);
    card.destroy();
  });

  console.log('✓ Price formatting test passed');
  console.groupEnd();
}

/**
 * Test: Description truncation
 */
function testDescriptionTruncation() {
  console.group('Test: Description Truncation');

  const container = document.createElement('div');
  const longDescription = 'This is a very long description that should be truncated when it exceeds the maximum length limit. It contains multiple sentences and should intelligently truncate at word boundaries to avoid cutting words in half.';

  const destination = {
    id: 'test-truncate',
    name: 'Truncate Test',
    location: 'Test',
    description: longDescription,
    price: 999,
    imageUrl: '/test.jpg'
  };

  const card = new DestinationCard(container, destination);
  const descElement = container.querySelector('.card-description');
  const displayedText = descElement.textContent;

  console.assert(displayedText.length < longDescription.length, 'Description should be truncated');
  console.assert(displayedText.endsWith('...'), 'Truncated description should end with ellipsis');
  console.assert(displayedText.length <= 153, 'Truncated description should be within limit'); // 150 + "..."

  card.destroy();
  console.log('✓ Description truncation test passed');
  console.groupEnd();
}

/**
 * Run all tests
 */
export function runDestinationCardTests() {
  console.log('%c=== Destination Card Component Tests ===', 'color: #00A9B5; font-weight: bold; font-size: 14px;');

  testComponentInitialization();
  testDetailButtonClick();
  testUpdateMethod();
  testPriceFormatting();
  testDescriptionTruncation();

  console.log('%c=== All Destination Card Tests Passed ===', 'color: #26A65B; font-weight: bold; font-size: 14px;');
}

// Auto-run tests if this file is loaded directly
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    runDestinationCardTests();
  });
}
