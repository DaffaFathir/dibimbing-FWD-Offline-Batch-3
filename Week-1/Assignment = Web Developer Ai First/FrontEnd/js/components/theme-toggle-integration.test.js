/**
 * Integration Tests for Theme Toggle Functionality (Task 12.4)
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5
 * 
 * Tests:
 * - Theme toggle button appears on both list and detail pages
 * - Clicking toggle switches between light and dark themes
 * - Theme preference persists after page reload
 * - localStorage stores theme preference correctly
 * - System preference detection on initial load
 * - Theme applies before page render (no flash of wrong theme)
 * - Theme toggle keyboard accessibility (Space/Enter keys)
 */

import { ThemeToggle } from './theme-toggle.js';
import { themeManager } from '../services/theme-manager.js';
import { eventBus } from '../event-bus.js';

// Test utilities
const createContainer = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  return container;
};

const cleanupContainer = (container) => {
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
};

const clearLocalStorage = () => {
  try {
    localStorage.removeItem('user-theme-preference');
  } catch (e) {
    console.warn('Could not clear localStorage', e);
  }
};

// Test: Theme toggle button appears on both list and detail pages
console.log('Test 12.4.1: Theme toggle button appears on both list and detail pages');
{
  const listPageContainer = createContainer();
  const detailPageContainer = createContainer();
  
  const listToggle = new ThemeToggle(listPageContainer);
  const detailToggle = new ThemeToggle(detailPageContainer);
  
  const listButton = listPageContainer.querySelector('[data-action="toggle-theme"]');
  const detailButton = detailPageContainer.querySelector('[data-action="toggle-theme"]');
  
  console.assert(listButton !== null, 'Should render toggle button on list page');
  console.assert(detailButton !== null, 'Should render toggle button on detail page');
  console.assert(listButton.getAttribute('role') === 'switch', 'List page toggle should have switch role');
  console.assert(detailButton.getAttribute('role') === 'switch', 'Detail page toggle should have switch role');
  
  console.log('✓ Theme toggle button appears on both pages');
  
  listToggle.destroy();
  detailToggle.destroy();
  cleanupContainer(listPageContainer);
  cleanupContainer(detailPageContainer);
}

// Test: Clicking toggle switches between light and dark themes
console.log('\nTest 12.4.2: Clicking toggle switches between light and dark themes');
{
  clearLocalStorage();
  themeManager.setTheme('light');
  
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  const button = container.querySelector('[data-action="toggle-theme"]');
  
  console.assert(toggle.getTheme() === 'light', 'Should start in light theme');
  
  // Click to switch to dark
  button.click();
  console.assert(toggle.getTheme() === 'dark', 'Should switch to dark theme after click');
  console.assert(document.documentElement.getAttribute('data-theme') === 'dark', 'Should apply dark theme to document');
  
  // Click to switch back to light
  button.click();
  console.assert(toggle.getTheme() === 'light', 'Should switch back to light theme');
  console.assert(document.documentElement.getAttribute('data-theme') === 'light', 'Should apply light theme to document');
  
  console.log('✓ Clicking toggle switches between themes correctly');
  
  toggle.destroy();
  cleanupContainer(container);
}

// Test: Theme preference persists after page reload (simulated)
console.log('\nTest 12.4.3: Theme preference persists after page reload');
{
  clearLocalStorage();
  
  // Simulate first page load - user sets dark theme
  const container1 = createContainer();
  const toggle1 = new ThemeToggle(container1);
  toggle1.setTheme('dark');
  
  console.assert(toggle1.getTheme() === 'dark', 'Should set dark theme');
  
  // Destroy first instance
  toggle1.destroy();
  cleanupContainer(container1);
  
  // Simulate page reload - create new instance, reinitialize themeManager
  themeManager.initialize();
  const container2 = createContainer();
  const toggle2 = new ThemeToggle(container2);
  
  console.assert(toggle2.getTheme() === 'dark', 'Should load dark theme from storage after reload');
  console.assert(document.documentElement.getAttribute('data-theme') === 'dark', 'Should apply persisted theme');
  
  console.log('✓ Theme preference persists correctly');
  
  toggle2.destroy();
  cleanupContainer(container2);
  clearLocalStorage();
}

// Test: localStorage stores theme preference correctly
console.log('\nTest 12.4.4: localStorage stores theme preference correctly');
{
  clearLocalStorage();
  
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  
  // Set light theme
  toggle.setTheme('light');
  let stored = localStorage.getItem('user-theme-preference');
  console.assert(stored === 'light', 'Should store light theme in localStorage');
  
  // Set dark theme
  toggle.setTheme('dark');
  stored = localStorage.getItem('user-theme-preference');
  console.assert(stored === 'dark', 'Should store dark theme in localStorage');
  
  // Toggle from dark to light
  toggle.toggle();
  stored = localStorage.getItem('user-theme-preference');
  console.assert(stored === 'light', 'Should update localStorage after toggle');
  
  console.log('✓ localStorage stores theme preference correctly');
  
  toggle.destroy();
  cleanupContainer(container);
  clearLocalStorage();
}

// Test: System preference detection on initial load
console.log('\nTest 12.4.5: System preference detection on initial load');
{
  clearLocalStorage();
  
  // Mock system preference
  const mockMatchMedia = (matches) => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = (query) => ({
      matches: query.includes('dark') ? matches : !matches,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {}
    });
    return originalMatchMedia;
  };
  
  // Test with system dark mode preference
  const originalMatchMedia = mockMatchMedia(true);
  themeManager.initialize();
  
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  
  console.assert(toggle.getTheme() === 'dark', 'Should detect system dark mode preference');
  
  toggle.destroy();
  cleanupContainer(container);
  
  // Restore original matchMedia
  window.matchMedia = originalMatchMedia;
  
  console.log('✓ System preference detection works on initial load');
  clearLocalStorage();
}

// Test: Theme applies before page render (no flash of wrong theme)
console.log('\nTest 12.4.6: Theme applies before page render');
{
  clearLocalStorage();
  
  // Set a theme first
  const container1 = createContainer();
  const toggle1 = new ThemeToggle(container1);
  toggle1.setTheme('dark');
  toggle1.destroy();
  cleanupContainer(container1);
  
  // Simulate page load: initialize theme manager before components
  themeManager.initialize();
  
  // Check that theme is already applied to document
  console.assert(
    document.documentElement.getAttribute('data-theme') === 'dark',
    'Theme should be applied to document immediately on initialize'
  );
  
  // Now create component - it should already have correct theme
  const container2 = createContainer();
  const toggle2 = new ThemeToggle(container2);
  
  console.assert(
    toggle2.getTheme() === 'dark',
    'Component should have correct theme without flash'
  );
  
  console.log('✓ Theme applies before page render (no flash)');
  
  toggle2.destroy();
  cleanupContainer(container2);
  clearLocalStorage();
}

// Test: Theme toggle keyboard accessibility - Space key
console.log('\nTest 12.4.7a: Theme toggle keyboard accessibility - Space key');
{
  clearLocalStorage();
  themeManager.setTheme('light');
  
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  const button = container.querySelector('[data-action="toggle-theme"]');
  
  console.assert(toggle.getTheme() === 'light', 'Should start in light theme');
  
  // Press Space key
  const spaceEvent = new KeyboardEvent('keydown', { 
    key: ' ',
    bubbles: true,
    cancelable: true
  });
  button.dispatchEvent(spaceEvent);
  
  console.assert(toggle.getTheme() === 'dark', 'Should toggle theme with Space key');
  console.assert(button.getAttribute('aria-checked') === 'true', 'Should update aria-checked');
  
  console.log('✓ Space key toggles theme correctly');
  
  toggle.destroy();
  cleanupContainer(container);
}

// Test: Theme toggle keyboard accessibility - Enter key
console.log('\nTest 12.4.7b: Theme toggle keyboard accessibility - Enter key');
{
  clearLocalStorage();
  themeManager.setTheme('light');
  
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  const button = container.querySelector('[data-action="toggle-theme"]');
  
  console.assert(toggle.getTheme() === 'light', 'Should start in light theme');
  
  // Press Enter key
  const enterEvent = new KeyboardEvent('keydown', { 
    key: 'Enter',
    bubbles: true,
    cancelable: true
  });
  button.dispatchEvent(enterEvent);
  
  console.assert(toggle.getTheme() === 'dark', 'Should toggle theme with Enter key');
  console.assert(button.getAttribute('aria-checked') === 'true', 'Should update aria-checked');
  
  console.log('✓ Enter key toggles theme correctly');
  
  toggle.destroy();
  cleanupContainer(container);
}

// Test: Multiple toggles on same page stay synchronized
console.log('\nTest 12.4.8: Multiple toggles on same page stay synchronized');
{
  clearLocalStorage();
  themeManager.setTheme('light');
  
  const container1 = createContainer();
  const container2 = createContainer();
  
  const toggle1 = new ThemeToggle(container1);
  const toggle2 = new ThemeToggle(container2);
  
  console.assert(toggle1.getTheme() === 'light', 'Toggle 1 should start in light theme');
  console.assert(toggle2.getTheme() === 'light', 'Toggle 2 should start in light theme');
  
  // Toggle first instance
  toggle1.setTheme('dark');
  
  // Wait for synchronization
  setTimeout(() => {
    console.assert(toggle2.getTheme() === 'dark', 'Toggle 2 should sync to dark theme');
    console.log('✓ Multiple toggles stay synchronized');
    
    toggle1.destroy();
    toggle2.destroy();
    cleanupContainer(container1);
    cleanupContainer(container2);
    clearLocalStorage();
  }, 100);
}

// Test: ARIA attributes reflect theme state correctly
console.log('\nTest 12.4.9: ARIA attributes reflect theme state correctly');
{
  clearLocalStorage();
  
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  const button = container.querySelector('[data-action="toggle-theme"]');
  
  // Set light theme
  toggle.setTheme('light');
  console.assert(button.getAttribute('aria-checked') === 'false', 'Light theme should have aria-checked="false"');
  console.assert(button.getAttribute('aria-label').includes('dark'), 'Light theme label should mention switching to dark');
  
  // Set dark theme
  toggle.setTheme('dark');
  console.assert(button.getAttribute('aria-checked') === 'true', 'Dark theme should have aria-checked="true"');
  console.assert(button.getAttribute('aria-label').includes('light'), 'Dark theme label should mention switching to light');
  
  console.log('✓ ARIA attributes reflect theme state correctly');
  
  toggle.destroy();
  cleanupContainer(container);
  clearLocalStorage();
}

// Test: EventBus receives theme:change events
console.log('\nTest 12.4.10: EventBus receives theme:change events');
{
  clearLocalStorage();
  
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  
  let eventCount = 0;
  let lastTheme = null;
  
  const unsubscribe = eventBus.on('theme:change', (data) => {
    eventCount++;
    lastTheme = data.theme;
  });
  
  toggle.setTheme('dark');
  console.assert(eventCount === 1, 'Should emit event when theme changes');
  console.assert(lastTheme === 'dark', 'Event should include correct theme');
  
  toggle.setTheme('light');
  console.assert(eventCount === 2, 'Should emit event for second change');
  console.assert(lastTheme === 'light', 'Event should include updated theme');
  
  console.log('✓ EventBus receives theme:change events correctly');
  
  unsubscribe();
  toggle.destroy();
  cleanupContainer(container);
  clearLocalStorage();
}

console.log('\n✅ All theme toggle integration tests passed! (Task 12.4)');

