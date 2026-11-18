/**
 * Search Component Tests
 * 
 * Minimal tests for core Search functionality
 */

import { Search } from './search.js';
import { eventBus } from '../event-bus.js';

// Test helpers
function createContainer() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  return container;
}

function cleanupContainer(container) {
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Test suite
console.log('Running Search Component Tests...');

// Test 1: Component initialization
(function testInitialization() {
  console.log('Test 1: Component initialization');
  
  const container = createContainer();
  const search = new Search(container);
  
  const input = container.querySelector('.search-input');
  const clearButton = container.querySelector('.search-clear');
  
  if (!input) {
    throw new Error('Search input not rendered');
  }
  
  if (!clearButton) {
    throw new Error('Clear button not rendered');
  }
  
  search.destroy();
  cleanupContainer(container);
  
  console.log('✓ Test 1 passed: Component initializes correctly');
})();

// Test 2: getValue and setValue methods
(function testValueMethods() {
  console.log('Test 2: getValue and setValue methods');
  
  const container = createContainer();
  const search = new Search(container);
  
  // Initial value should be empty
  if (search.getValue() !== '') {
    throw new Error('Initial value should be empty');
  }
  
  // Set value
  search.setValue('bali');
  
  if (search.getValue() !== 'bali') {
    throw new Error('getValue should return the set value');
  }
  
  const input = container.querySelector('.search-input');
  if (input.value !== 'bali') {
    throw new Error('Input element value should match');
  }
  
  search.destroy();
  cleanupContainer(container);
  
  console.log('✓ Test 2 passed: getValue and setValue work correctly');
})();

// Test 3: clear method
(function testClearMethod() {
  console.log('Test 3: clear method');
  
  const container = createContainer();
  const search = new Search(container);
  
  search.setValue('test');
  search.clear();
  
  if (search.getValue() !== '') {
    throw new Error('Value should be empty after clear');
  }
  
  const input = container.querySelector('.search-input');
  if (input.value !== '') {
    throw new Error('Input element should be empty after clear');
  }
  
  search.destroy();
  cleanupContainer(container);
  
  console.log('✓ Test 3 passed: clear method works correctly');
})();

// Test 4: Debounced search:input event
(async function testDebouncedEvent() {
  console.log('Test 4: Debounced search:input event');
  
  const container = createContainer();
  const search = new Search(container, { debounceDelay: 100 });
  const input = container.querySelector('.search-input');
  
  let eventCount = 0;
  let lastQuery = null;
  
  const unsubscribe = eventBus.on('search:input', (data) => {
    eventCount++;
    lastQuery = data.query;
  });
  
  // Simulate rapid typing
  input.value = 't';
  input.dispatchEvent(new Event('input'));
  
  await wait(50); // Wait less than debounce delay
  
  input.value = 'th';
  input.dispatchEvent(new Event('input'));
  
  await wait(50);
  
  input.value = 'tha';
  input.dispatchEvent(new Event('input'));
  
  // Wait for debounce to complete
  await wait(150);
  
  // Should only emit once after debounce delay
  if (eventCount !== 1) {
    throw new Error(`Expected 1 event, got ${eventCount}`);
  }
  
  if (lastQuery !== 'tha') {
    throw new Error(`Expected query 'tha', got '${lastQuery}'`);
  }
  
  unsubscribe();
  search.destroy();
  cleanupContainer(container);
  
  console.log('✓ Test 4 passed: Debounced search:input event works correctly');
})();

// Test 5: search:clear event
(async function testClearEvent() {
  console.log('Test 5: search:clear event');
  
  const container = createContainer();
  const search = new Search(container);
  const clearButton = container.querySelector('.search-clear');
  
  search.setValue('test');
  
  let clearEventFired = false;
  let inputEventFired = false;
  
  const unsubscribeClear = eventBus.on('search:clear', () => {
    clearEventFired = true;
  });
  
  const unsubscribeInput = eventBus.on('search:input', (data) => {
    if (data.query === '') {
      inputEventFired = true;
    }
  });
  
  clearButton.click();
  
  await wait(50);
  
  if (!clearEventFired) {
    throw new Error('search:clear event not fired');
  }
  
  if (!inputEventFired) {
    throw new Error('search:input event with empty query not fired');
  }
  
  if (search.getValue() !== '') {
    throw new Error('Value should be empty after clear button click');
  }
  
  unsubscribeClear();
  unsubscribeInput();
  search.destroy();
  cleanupContainer(container);
  
  console.log('✓ Test 5 passed: search:clear event works correctly');
})();

// Test 6: Clear button visibility
(function testClearButtonVisibility() {
  console.log('Test 6: Clear button visibility');
  
  const container = createContainer();
  const search = new Search(container);
  const clearButton = container.querySelector('.search-clear');
  
  // Initially hidden
  if (clearButton.classList.contains('visible')) {
    throw new Error('Clear button should be hidden initially');
  }
  
  // Show when value set
  search.setValue('test');
  if (!clearButton.classList.contains('visible')) {
    throw new Error('Clear button should be visible when value is set');
  }
  
  // Hide when cleared
  search.clear();
  if (clearButton.classList.contains('visible')) {
    throw new Error('Clear button should be hidden after clear');
  }
  
  search.destroy();
  cleanupContainer(container);
  
  console.log('✓ Test 6 passed: Clear button visibility works correctly');
})();

// Test 7: focus method
(function testFocusMethod() {
  console.log('Test 7: focus method');
  
  const container = createContainer();
  const search = new Search(container);
  const input = container.querySelector('.search-input');
  
  search.focus();
  
  if (document.activeElement !== input) {
    throw new Error('Input should be focused after focus() call');
  }
  
  search.destroy();
  cleanupContainer(container);
  
  console.log('✓ Test 7 passed: focus method works correctly');
})();

// Test 8: Custom options
(function testCustomOptions() {
  console.log('Test 8: Custom options');
  
  const container = createContainer();
  const search = new Search(container, {
    placeholder: 'Search here...',
    debounceDelay: 500
  });
  
  const input = container.querySelector('.search-input');
  
  if (input.placeholder !== 'Search here...') {
    throw new Error('Custom placeholder not applied');
  }
  
  if (search.options.debounceDelay !== 500) {
    throw new Error('Custom debounce delay not applied');
  }
  
  search.destroy();
  cleanupContainer(container);
  
  console.log('✓ Test 8 passed: Custom options work correctly');
})();

console.log('\n✓ All Search Component tests passed!');
