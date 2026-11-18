/**
 * Unit Tests for Theme Toggle Component
 * 
 * Tests the ThemeToggle component functionality including:
 * - Initialization and rendering
 * - Theme toggling
 * - Integration with ThemeManager
 * - Event emission
 * - Keyboard accessibility
 * - ARIA attributes
 */

import { ThemeToggle } from './theme-toggle.js';
import { themeManager } from '../services/theme-manager.js';
import { eventBus } from '../event-bus.js';

// Test utility to create container element
const createContainer = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  return container;
};

// Test utility to cleanup container
const cleanupContainer = (container) => {
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
};

// Test: Constructor initializes correctly
console.log('Test: ThemeToggle constructor');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  
  console.assert(toggle.container === container, 'Should store container reference');
  console.assert(typeof toggle.options === 'object', 'Should have options object');
  console.assert(toggle.toggleButton !== null, 'Should have toggle button reference');
  console.log('✓ Constructor initializes correctly');
  
  toggle.destroy();
  cleanupContainer(container);
}

// Test: Render creates correct HTML structure
console.log('\nTest: render() creates correct HTML structure');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  
  const button = container.querySelector('[data-action="toggle-theme"]');
  console.assert(button !== null, 'Should render toggle button');
  console.assert(button.getAttribute('role') === 'switch', 'Should have role="switch"');
  console.assert(button.hasAttribute('aria-checked'), 'Should have aria-checked attribute');
  console.assert(button.hasAttribute('aria-label'), 'Should have aria-label');
  
  const track = container.querySelector('.theme-toggle-track');
  console.assert(track !== null, 'Should render track element');
  
  const thumb = container.querySelector('.theme-toggle-thumb');
  console.assert(thumb !== null, 'Should render thumb element');
  
  const sunIcon = container.querySelector('.theme-icon-sun');
  const moonIcon = container.querySelector('.theme-icon-moon');
  console.assert(sunIcon !== null, 'Should render sun icon');
  console.assert(moonIcon !== null, 'Should render moon icon');
  console.log('✓ render() creates correct HTML structure');
  
  toggle.destroy();
  cleanupContainer(container);
}

// Test: getTheme returns current theme
console.log('\nTest: getTheme() returns current theme');
{
  const container = createContainer();
  themeManager.setTheme('light');
  const toggle = new ThemeToggle(container);
  
  const theme = toggle.getTheme();
  console.assert(theme === 'light' || theme === 'dark', 'Should return light or dark');
  console.log('✓ getTheme() returns current theme');
  
  toggle.destroy();
  cleanupContainer(container);
}

// Test: setTheme updates theme correctly
console.log('\nTest: setTheme() updates theme correctly');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  
  toggle.setTheme('dark');
  console.assert(toggle.getTheme() === 'dark', 'Should update to dark theme');
  
  toggle.setTheme('light');
  console.assert(toggle.getTheme() === 'light', 'Should update to light theme');
  console.log('✓ setTheme() updates theme correctly');
  
  toggle.destroy();
  cleanupContainer(container);
}

// Test: toggle switches between themes
console.log('\nTest: toggle() switches between themes');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  
  const initialTheme = toggle.getTheme();
  const newTheme = toggle.toggle();
  
  console.assert(newTheme !== initialTheme, 'Should switch to different theme');
  console.assert(toggle.getTheme() === newTheme, 'Should update current theme');
  
  const backTheme = toggle.toggle();
  console.assert(backTheme === initialTheme, 'Should toggle back to initial theme');
  console.log('✓ toggle() switches between themes');
  
  toggle.destroy();
  cleanupContainer(container);
}

// Test: ARIA attributes update with theme changes
console.log('\nTest: ARIA attributes update with theme changes');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  const button = container.querySelector('[data-action="toggle-theme"]');
  
  toggle.setTheme('light');
  console.assert(button.getAttribute('aria-checked') === 'false', 'Should set aria-checked to false for light theme');
  
  toggle.setTheme('dark');
  console.assert(button.getAttribute('aria-checked') === 'true', 'Should set aria-checked to true for dark theme');
  console.log('✓ ARIA attributes update with theme changes');
  
  toggle.destroy();
  cleanupContainer(container);
}

// Test: Clicking button toggles theme
console.log('\nTest: Clicking button toggles theme');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  const button = container.querySelector('[data-action="toggle-theme"]');
  
  const initialTheme = toggle.getTheme();
  button.click();
  
  console.assert(toggle.getTheme() !== initialTheme, 'Should toggle theme on click');
  console.log('✓ Clicking button toggles theme');
  
  toggle.destroy();
  cleanupContainer(container);
}

// Test: Space key toggles theme
console.log('\nTest: Space key toggles theme');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  const button = container.querySelector('[data-action="toggle-theme"]');
  
  const initialTheme = toggle.getTheme();
  const event = new KeyboardEvent('keydown', { key: ' ' });
  button.dispatchEvent(event);
  
  console.assert(toggle.getTheme() !== initialTheme, 'Should toggle theme on Space key');
  console.log('✓ Space key toggles theme');
  
  toggle.destroy();
  cleanupContainer(container);
}

// Test: Enter key toggles theme
console.log('\nTest: Enter key toggles theme');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  const button = container.querySelector('[data-action="toggle-theme"]');
  
  const initialTheme = toggle.getTheme();
  const event = new KeyboardEvent('keydown', { key: 'Enter' });
  button.dispatchEvent(event);
  
  console.assert(toggle.getTheme() !== initialTheme, 'Should toggle theme on Enter key');
  console.log('✓ Enter key toggles theme');
  
  toggle.destroy();
  cleanupContainer(container);
}

// Test: Other keys don't toggle theme
console.log('\nTest: Other keys don\'t toggle theme');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  const button = container.querySelector('[data-action="toggle-theme"]');
  
  const initialTheme = toggle.getTheme();
  const event = new KeyboardEvent('keydown', { key: 'a' });
  button.dispatchEvent(event);
  
  console.assert(toggle.getTheme() === initialTheme, 'Should not toggle theme on other keys');
  console.log('✓ Other keys don\'t toggle theme');
  
  toggle.destroy();
  cleanupContainer(container);
}

// Test: Emits theme:change event via EventBus
console.log('\nTest: Emits theme:change event via EventBus');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  
  let eventEmitted = false;
  let emittedData = null;
  
  const unsubscribe = eventBus.on('theme:change', (data) => {
    eventEmitted = true;
    emittedData = data;
  });
  
  toggle.setTheme('dark');
  
  console.assert(eventEmitted, 'Should emit theme:change event');
  console.assert(emittedData !== null, 'Should include event data');
  console.assert(emittedData.theme === 'dark', 'Should include theme in event data');
  console.log('✓ Emits theme:change event via EventBus');
  
  unsubscribe();
  toggle.destroy();
  cleanupContainer(container);
}

// Test: Options - showLabels
console.log('\nTest: Options - showLabels');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container, { showLabels: true });
  
  const label = container.querySelector('.theme-toggle-label');
  console.assert(label !== null, 'Should render label when showLabels is true');
  
  toggle.destroy();
  cleanupContainer(container);
  
  const container2 = createContainer();
  const toggle2 = new ThemeToggle(container2, { showLabels: false });
  
  const label2 = container2.querySelector('.theme-toggle-label');
  console.assert(label2 === null, 'Should not render label when showLabels is false');
  
  toggle2.destroy();
  cleanupContainer(container2);
  
  console.log('✓ showLabels option works correctly');
}

// Test: Syncs with ThemeManager
console.log('\nTest: Syncs with ThemeManager');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  
  // Change theme through ThemeManager
  themeManager.setTheme('dark');
  
  // Wait for subscription to process
  setTimeout(() => {
    console.assert(toggle.getTheme() === 'dark', 'Should sync with ThemeManager changes');
    console.log('✓ Syncs with ThemeManager');
    
    toggle.destroy();
    cleanupContainer(container);
  }, 50);
}

// Test: destroy() cleans up properly
console.log('\nTest: destroy() cleans up properly');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  
  toggle.destroy();
  
  console.assert(container.innerHTML === '', 'Should clear container HTML');
  console.assert(toggle.toggleButton === null, 'Should clear button reference');
  console.log('✓ destroy() cleans up properly');
  
  cleanupContainer(container);
}

// Test: Invalid theme values handled gracefully
console.log('\nTest: Invalid theme values handled gracefully');
{
  const container = createContainer();
  const toggle = new ThemeToggle(container);
  
  const originalConsoleError = console.error;
  let errorLogged = false;
  console.error = () => { errorLogged = true; };
  
  const initialTheme = toggle.getTheme();
  toggle.setTheme('invalid');
  
  console.error = originalConsoleError;
  
  console.assert(errorLogged, 'Should log error for invalid theme');
  console.assert(toggle.getTheme() === initialTheme, 'Should not change theme for invalid value');
  console.log('✓ Invalid theme values handled gracefully');
  
  toggle.destroy();
  cleanupContainer(container);
}

console.log('\n✅ All ThemeToggle tests passed!');
