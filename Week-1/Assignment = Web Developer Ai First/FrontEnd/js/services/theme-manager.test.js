/**
 * Unit Tests for Theme Manager Service
 * Tests theme state management, localStorage persistence, and system preference detection
 */

import { ThemeManager } from './theme-manager.js';

console.log('=== Theme Manager Service Tests ===\n');

let testCount = 0;
let passCount = 0;
let failCount = 0;

function runTest(name, testFn) {
  testCount++;
  try {
    testFn();
    passCount++;
    console.log(`✓ Test ${testCount} PASSED: ${name}`);
  } catch (error) {
    failCount++;
    console.log(`✗ Test ${testCount} FAILED: ${name}`);
    console.log(`  Error: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

// Test 1: Constructor with default options
runTest('Constructor creates instance with default options', () => {
  const tm = new ThemeManager();
  assertEqual(tm.options.defaultTheme, 'light', 'Default theme should be light');
  assertEqual(tm.options.storageKey, 'user-theme-preference', 'Storage key should be default');
  assertEqual(tm.options.respectSystemPreference, true, 'Should respect system preference by default');
});

// Test 2: Constructor with custom options
runTest('Constructor accepts custom options', () => {
  const tm = new ThemeManager({
    defaultTheme: 'dark',
    storageKey: 'custom-key',
    respectSystemPreference: false
  });
  assertEqual(tm.options.defaultTheme, 'dark', 'Custom default theme applied');
  assertEqual(tm.options.storageKey, 'custom-key', 'Custom storage key applied');
  assertEqual(tm.options.respectSystemPreference, false, 'Custom system preference setting applied');
});

// Test 3: localStorage availability check
runTest('Checks localStorage availability', () => {
  const tm = new ThemeManager();
  assertEqual(typeof tm.storageAvailable, 'boolean', 'Should check storage availability');
});

// Test 4: getTheme returns current theme
runTest('getTheme returns current theme', () => {
  const tm = new ThemeManager();
  tm.currentTheme = 'dark';
  assertEqual(tm.getTheme(), 'dark', 'Should return current theme');
});

// Test 5: getTheme returns default when no current theme
runTest('getTheme returns default theme if no current theme', () => {
  const tm = new ThemeManager({ defaultTheme: 'light' });
  assertEqual(tm.getTheme(), 'light', 'Should return default theme');
});

// Test 6: setTheme to light
runTest('setTheme sets light theme correctly', () => {
  const tm = new ThemeManager();
  tm.setTheme('light');
  assertEqual(tm.currentTheme, 'light', 'Current theme should be light');
  assertEqual(document.documentElement.getAttribute('data-theme'), 'light', 'DOM should reflect light theme');
});

// Test 7: setTheme to dark
runTest('setTheme sets dark theme correctly', () => {
  const tm = new ThemeManager();
  tm.setTheme('dark');
  assertEqual(tm.currentTheme, 'dark', 'Current theme should be dark');
  assertEqual(document.documentElement.getAttribute('data-theme'), 'dark', 'DOM should reflect dark theme');
});

// Test 8: setTheme persists to localStorage
runTest('setTheme persists theme to localStorage', () => {
  const tm = new ThemeManager();
  tm.setTheme('dark');
  if (tm.storageAvailable) {
    assertEqual(localStorage.getItem('user-theme-preference'), 'dark', 'Theme should be saved in localStorage');
  }
});

// Test 9: setTheme handles invalid theme
runTest('setTheme handles invalid theme value', () => {
  const tm = new ThemeManager();
  tm.setTheme('invalid-theme');
  assertEqual(tm.currentTheme, 'light', 'Should fall back to default theme');
});

// Test 10: setTheme creates meta theme-color tag
runTest('setTheme creates meta theme-color tag', () => {
  // Clean up any existing meta tag
  let metaTag = document.querySelector('meta[name="theme-color"]');
  if (metaTag) metaTag.remove();
  
  const tm = new ThemeManager();
  tm.setTheme('dark');
  
  metaTag = document.querySelector('meta[name="theme-color"]');
  assert(metaTag !== null, 'Meta tag should be created');
  assertEqual(metaTag.getAttribute('content'), '#1A1A1A', 'Dark theme color should be set');
});

// Test 11: setTheme updates existing meta theme-color tag
runTest('setTheme updates existing meta theme-color tag', () => {
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'theme-color');
  meta.setAttribute('content', '#000000');
  document.head.appendChild(meta);
  
  const tm = new ThemeManager();
  tm.setTheme('light');
  
  assertEqual(meta.getAttribute('content'), '#FFFFFF', 'Light theme color should be updated');
  
  meta.remove();
});

// Test 12: toggleTheme from light to dark
runTest('toggleTheme toggles from light to dark', () => {
  const tm = new ThemeManager();
  tm.currentTheme = 'light';
  const newTheme = tm.toggleTheme();
  assertEqual(newTheme, 'dark', 'Should return dark theme');
  assertEqual(tm.currentTheme, 'dark', 'Current theme should be dark');
});

// Test 13: toggleTheme from dark to light
runTest('toggleTheme toggles from dark to light', () => {
  const tm = new ThemeManager();
  tm.currentTheme = 'dark';
  const newTheme = tm.toggleTheme();
  assertEqual(newTheme, 'light', 'Should return light theme');
  assertEqual(tm.currentTheme, 'light', 'Current theme should be light');
});

// Test 14: getSystemPreference detects dark mode
runTest('getSystemPreference detects system theme', () => {
  const tm = new ThemeManager();
  const systemTheme = tm.getSystemPreference();
  assert(systemTheme === 'light' || systemTheme === 'dark', 'Should return valid theme');
});

// Test 15: initialize applies default theme
runTest('initialize applies default theme', () => {
  localStorage.removeItem('user-theme-preference');
  const tm = new ThemeManager({ defaultTheme: 'light', respectSystemPreference: false });
  tm.initialize();
  assertEqual(tm.currentTheme, 'light', 'Should apply default theme');
  assertEqual(document.documentElement.getAttribute('data-theme'), 'light', 'DOM should reflect theme');
});

// Test 16: initialize applies saved preference
runTest('initialize applies saved preference from localStorage', () => {
  localStorage.setItem('user-theme-preference', 'dark');
  const tm = new ThemeManager();
  tm.initialize();
  assertEqual(tm.currentTheme, 'dark', 'Should apply saved theme');
  localStorage.removeItem('user-theme-preference');
});

// Test 17: onChange registers callback
runTest('onChange registers callback and calls on theme change', () => {
  const tm = new ThemeManager();
  let callbackCalled = false;
  let callbackTheme = null;
  
  tm.onChange((theme) => {
    callbackCalled = true;
    callbackTheme = theme;
  });
  
  tm.setTheme('dark');
  
  assert(callbackCalled, 'Callback should be called');
  assertEqual(callbackTheme, 'dark', 'Callback should receive correct theme');
});

// Test 18: onChange supports multiple subscribers
runTest('onChange supports multiple subscribers', () => {
  const tm = new ThemeManager();
  let callback1Called = false;
  let callback2Called = false;
  
  tm.onChange(() => { callback1Called = true; });
  tm.onChange(() => { callback2Called = true; });
  
  tm.setTheme('dark');
  
  assert(callback1Called, 'First callback should be called');
  assert(callback2Called, 'Second callback should be called');
});

// Test 19: onChange returns unsubscribe function
runTest('onChange returns unsubscribe function', () => {
  const tm = new ThemeManager();
  let callbackCalled = false;
  
  const unsubscribe = tm.onChange(() => { callbackCalled = true; });
  unsubscribe();
  
  tm.setTheme('dark');
  
  assert(!callbackCalled, 'Callback should not be called after unsubscribe');
});

// Test 20: hasUserPreference detects saved preference
runTest('hasUserPreference returns true when preference exists', () => {
  const tm = new ThemeManager();
  localStorage.setItem('user-theme-preference', 'dark');
  
  if (tm.storageAvailable) {
    assert(tm.hasUserPreference(), 'Should detect saved preference');
  }
  
  localStorage.removeItem('user-theme-preference');
});

// Test 21: hasUserPreference returns false when no preference
runTest('hasUserPreference returns false when no preference exists', () => {
  const tm = new ThemeManager();
  localStorage.removeItem('user-theme-preference');
  
  if (tm.storageAvailable) {
    assert(!tm.hasUserPreference(), 'Should not detect preference');
  }
});

// Test 22: destroy clears subscribers
runTest('destroy clears all subscribers', () => {
  const tm = new ThemeManager();
  let callbackCalled = false;
  
  tm.onChange(() => { callbackCalled = true; });
  tm.destroy();
  tm.setTheme('dark');
  
  assert(!callbackCalled, 'Callback should not be called after destroy');
});

// Test 23: updateToggleButtons updates aria-checked
runTest('updateToggleButtons updates aria-checked attribute', () => {
  const button = document.createElement('button');
  button.setAttribute('data-action', 'toggle-theme');
  document.body.appendChild(button);
  
  const tm = new ThemeManager();
  tm.setTheme('dark');
  
  assertEqual(button.getAttribute('aria-checked'), 'true', 'Dark theme should set aria-checked to true');
  
  tm.setTheme('light');
  assertEqual(button.getAttribute('aria-checked'), 'false', 'Light theme should set aria-checked to false');
  
  button.remove();
});

// Test 24: Rapid theme toggles
runTest('handles rapid theme toggles correctly', () => {
  const tm = new ThemeManager();
  tm.initialize();
  
  tm.toggleTheme(); // light -> dark
  tm.toggleTheme(); // dark -> light
  tm.toggleTheme(); // light -> dark
  
  assertEqual(tm.currentTheme, 'dark', 'Should end on dark after 3 toggles');
});

// Test 25: Theme persistence across instances
runTest('theme persists across ThemeManager instances', () => {
  const tm1 = new ThemeManager();
  tm1.setTheme('dark');
  
  const tm2 = new ThemeManager();
  tm2.initialize();
  
  if (tm2.storageAvailable) {
    assertEqual(tm2.currentTheme, 'dark', 'Second instance should load saved theme');
  }
  
  localStorage.removeItem('user-theme-preference');
});

console.log(`\n=== Test Results ===`);
console.log(`Total: ${testCount}`);
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);
console.log(`Success Rate: ${((passCount/testCount) * 100).toFixed(1)}%`);
console.log('=== Tests Completed ===\n');
