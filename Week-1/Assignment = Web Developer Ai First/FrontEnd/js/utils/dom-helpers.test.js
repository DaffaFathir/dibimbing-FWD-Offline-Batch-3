/**
 * Unit tests for DOM Helper utilities
 */

import {
  createElement,
  clearElement,
  addEventListener,
  setAttributes,
  querySelector,
  querySelectorAll,
  toggleClass,
  createElementFromHTML,
  appendChildren,
  isInViewport,
  debounce,
  throttle
} from './dom-helpers.js';

// Test createElement
function testCreateElement() {
  console.log('Testing createElement...');
  
  // Test basic element creation
  const div = createElement('div', 'test-class', 'Hello World');
  console.assert(div.tagName === 'DIV', 'Should create div element');
  console.assert(div.className === 'test-class', 'Should add class');
  console.assert(div.textContent === 'Hello World', 'Should add content');
  
  // Test with array of classes
  const multiClass = createElement('span', ['class-1', 'class-2']);
  console.assert(multiClass.classList.contains('class-1'), 'Should add first class');
  console.assert(multiClass.classList.contains('class-2'), 'Should add second class');
  
  // Test with node content
  const child = document.createElement('span');
  child.textContent = 'Child';
  const parent = createElement('div', '', child);
  console.assert(parent.firstChild === child, 'Should append child node');
  
  console.log('✓ createElement tests passed');
}

// Test clearElement
function testClearElement() {
  console.log('Testing clearElement...');
  
  const container = document.createElement('div');
  container.appendChild(document.createElement('span'));
  container.appendChild(document.createElement('p'));
  
  console.assert(container.children.length === 2, 'Should have 2 children');
  
  clearElement(container);
  console.assert(container.children.length === 0, 'Should clear all children');
  
  // Test with invalid element
  clearElement(null); // Should not throw
  
  console.log('✓ clearElement tests passed');
}

// Test addEventListener
function testAddEventListener() {
  console.log('Testing addEventListener...');
  
  const button = document.createElement('button');
  let clicked = false;
  
  const cleanup = addEventListener(button, 'click', () => {
    clicked = true;
  });
  
  button.click();
  console.assert(clicked === true, 'Should handle click event');
  
  // Test cleanup
  clicked = false;
  cleanup();
  button.click();
  console.assert(clicked === false, 'Should remove event listener');
  
  // Test with invalid inputs
  const invalidCleanup = addEventListener(null, 'click', () => {});
  console.assert(typeof invalidCleanup === 'function', 'Should return cleanup function even for invalid inputs');
  
  console.log('✓ addEventListener tests passed');
}

// Test setAttributes
function testSetAttributes() {
  console.log('Testing setAttributes...');
  
  const element = document.createElement('input');
  
  setAttributes(element, {
    type: 'text',
    placeholder: 'Enter text',
    'aria-label': 'Text input',
    disabled: 'true'
  });
  
  console.assert(element.getAttribute('type') === 'text', 'Should set type attribute');
  console.assert(element.getAttribute('placeholder') === 'Enter text', 'Should set placeholder');
  console.assert(element.getAttribute('aria-label') === 'Text input', 'Should set ARIA attribute');
  
  // Test with null values
  setAttributes(element, { 'data-value': null });
  console.assert(!element.hasAttribute('data-value'), 'Should not set null values');
  
  console.log('✓ setAttributes tests passed');
}

// Test toggleClass
function testToggleClass() {
  console.log('Testing toggleClass...');
  
  const element = document.createElement('div');
  
  toggleClass(element, 'active');
  console.assert(element.classList.contains('active'), 'Should add class');
  
  toggleClass(element, 'active');
  console.assert(!element.classList.contains('active'), 'Should remove class');
  
  toggleClass(element, 'visible', true);
  console.assert(element.classList.contains('visible'), 'Should force add class');
  
  toggleClass(element, 'visible', false);
  console.assert(!element.classList.contains('visible'), 'Should force remove class');
  
  console.log('✓ toggleClass tests passed');
}

// Test createElementFromHTML
function testCreateElementFromHTML() {
  console.log('Testing createElementFromHTML...');
  
  const html = '<div class="card"><h2>Title</h2><p>Content</p></div>';
  const element = createElementFromHTML(html);
  
  console.assert(element.tagName === 'DIV', 'Should create element from HTML');
  console.assert(element.className === 'card', 'Should preserve classes');
  console.assert(element.children.length === 2, 'Should preserve children');
  
  console.log('✓ createElementFromHTML tests passed');
}

// Test appendChildren
function testAppendChildren() {
  console.log('Testing appendChildren...');
  
  const container = document.createElement('div');
  const children = [
    document.createElement('span'),
    document.createElement('p'),
    document.createElement('div')
  ];
  
  appendChildren(container, children);
  console.assert(container.children.length === 3, 'Should append all children');
  
  // Test with invalid inputs
  appendChildren(container, 'not an array'); // Should not throw
  
  console.log('✓ appendChildren tests passed');
}

// Test debounce
function testDebounce() {
  console.log('Testing debounce...');
  
  let callCount = 0;
  const debouncedFn = debounce(() => {
    callCount++;
  }, 100);
  
  // Call multiple times rapidly
  debouncedFn();
  debouncedFn();
  debouncedFn();
  
  console.assert(callCount === 0, 'Should not call immediately');
  
  // Wait for debounce delay
  setTimeout(() => {
    console.assert(callCount === 1, 'Should call once after delay');
    console.log('✓ debounce tests passed');
  }, 150);
}

// Test throttle
function testThrottle() {
  console.log('Testing throttle...');
  
  let callCount = 0;
  const throttledFn = throttle(() => {
    callCount++;
  }, 100);
  
  // Call multiple times
  throttledFn();
  throttledFn();
  throttledFn();
  
  console.assert(callCount === 1, 'Should call only once immediately');
  
  // Wait and call again
  setTimeout(() => {
    throttledFn();
    console.assert(callCount === 2, 'Should allow call after throttle period');
    console.log('✓ throttle tests passed');
  }, 150);
}

// Run all tests
export function runDOMHelperTests() {
  console.log('=== Running DOM Helper Tests ===');
  
  testCreateElement();
  testClearElement();
  testAddEventListener();
  testSetAttributes();
  testToggleClass();
  testCreateElementFromHTML();
  testAppendChildren();
  testDebounce();
  testThrottle();
  
  console.log('=== All DOM Helper Tests Completed ===');
}

// Auto-run if loaded directly
if (typeof window !== 'undefined' && document.readyState !== 'loading') {
  runDOMHelperTests();
} else if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', runDOMHelperTests);
}
