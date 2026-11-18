/**
 * Header Component Unit Tests
 * 
 * Tests for Header component functionality including:
 * - Rendering with different variants
 * - Navigation link handling
 * - User profile display
 * - Event emission
 * - Active link management
 */

import { Header } from './header.js';
import { eventBus } from '../event-bus.js';

// Test utility functions
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

console.log('=== Header Component Tests ===\n');

// Test: Initialization with default options
console.log('Test: Initialization with default options');
{
  const container = createContainer();
  const header = new Header(container);
  
  console.assert(header.container === container, 'Should set container');
  console.assert(header.options.variant === 'list', 'Should default to list variant');
  console.assert(header.options.showSearch === false, 'Should default showSearch to false');
  console.assert(header.options.user === null, 'Should default user to null');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ Header initializes with default options\n');
}

// Test: Render header element
console.log('Test: Render header element');
{
  const container = createContainer();
  const header = new Header(container);
  
  const headerElement = container.querySelector('.site-header');
  const headerContainer = container.querySelector('.header-container');
  
  console.assert(headerElement !== null, 'Should render site-header');
  console.assert(headerContainer !== null, 'Should render header-container');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ Header renders correctly\n');
}

// Test: Render logo
console.log('Test: Render logo');
{
  const container = createContainer();
  const header = new Header(container);
  
  const logo = container.querySelector('.logo');
  const logoText = container.querySelector('.logo-text');
  const logoIcon = container.querySelector('.logo-icon');
  
  console.assert(logo !== null, 'Should render logo');
  console.assert(logoText !== null, 'Should render logo text');
  console.assert(logoIcon !== null, 'Should render logo icon');
  console.assert(logoText.textContent.includes('Southeast Asia'), 'Logo text should contain "Southeast Asia"');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ Logo renders correctly\n');
}

// Test: List variant navigation links
console.log('Test: List variant navigation links');
{
  const container = createContainer();
  const header = new Header(container, { variant: 'list' });
  
  const navLinks = container.querySelectorAll('.nav-link');
  const linkTexts = Array.from(navLinks).map(link => link.textContent.trim());
  
  console.assert(navLinks.length === 3, 'Should render 3 nav links for list variant');
  console.assert(linkTexts.includes('Home'), 'Should include Home link');
  console.assert(linkTexts.includes('About'), 'Should include About link');
  console.assert(linkTexts.includes('Contact'), 'Should include Contact link');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ List variant renders correct navigation links\n');
}

// Test: Detail variant navigation links
console.log('Test: Detail variant navigation links');
{
  const container = createContainer();
  const header = new Header(container, { variant: 'detail' });
  
  const navLinks = container.querySelectorAll('.nav-link');
  const linkTexts = Array.from(navLinks).map(link => link.textContent.trim());
  
  console.assert(navLinks.length === 3, 'Should render 3 nav links for detail variant');
  console.assert(linkTexts.includes('Home'), 'Should include Home link');
  console.assert(linkTexts.includes('Destinations'), 'Should include Destinations link');
  console.assert(linkTexts.includes('About'), 'Should include About link');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ Detail variant renders correct navigation links\n');
}

// Test: Show search area
console.log('Test: Show search area');
{
  const container = createContainer();
  const header = new Header(container, { showSearch: true });
  
  const searchArea = container.querySelector('.header-search');
  console.assert(searchArea !== null, 'Should render search area when showSearch is true');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ Search area renders when showSearch is true\n');
}

// Test: Hide search area
console.log('Test: Hide search area');
{
  const container = createContainer();
  const header = new Header(container, { showSearch: false });
  
  const searchArea = container.querySelector('.header-search');
  console.assert(searchArea === null, 'Should not render search area when showSearch is false');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ Search area hidden when showSearch is false\n');
}

// Test: Display user profile
console.log('Test: Display user profile');
{
  const container = createContainer();
  const user = {
    name: 'John Doe',
    profilePicture: '/path/to/avatar.jpg'
  };
  const header = new Header(container, { user });
  
  const userArea = container.querySelector('.header-user');
  const userAvatar = container.querySelector('.user-avatar');
  const userName = container.querySelector('.user-name');
  
  console.assert(userArea !== null, 'Should render user area');
  console.assert(userAvatar !== null, 'Should render user avatar');
  console.assert(userAvatar.src.includes('avatar.jpg'), 'Avatar should have correct src');
  console.assert(userName !== null, 'Should render user name');
  console.assert(userName.textContent === 'John Doe', 'User name should be correct');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ User profile displays correctly\n');
}

// Test: Hide user profile when null
console.log('Test: Hide user profile when null');
{
  const container = createContainer();
  const header = new Header(container, { user: null });
  
  const userArea = container.querySelector('.header-user');
  console.assert(userArea === null, 'Should not render user area when user is null');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ User profile hidden when user is null\n');
}

// Test: Update user profile
console.log('Test: Update user profile');
{
  const container = createContainer();
  const header = new Header(container);
  
  let userArea = container.querySelector('.header-user');
  console.assert(userArea === null, 'Initially should have no user area');
  
  const user = {
    name: 'Jane Smith',
    profilePicture: '/path/to/jane.jpg'
  };
  header.updateUser(user);
  
  userArea = container.querySelector('.header-user');
  const userName = container.querySelector('.user-name');
  
  console.assert(userArea !== null, 'Should render user area after update');
  console.assert(userName.textContent === 'Jane Smith', 'User name should be updated');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ User profile updates correctly\n');
}

// Test: Set active link
console.log('Test: Set active link');
{
  const container = createContainer();
  const header = new Header(container);
  
  const homeLink = container.querySelector('[data-link="home"]');
  console.assert(homeLink.classList.contains('active'), 'Home link should be active initially');
  
  header.setActiveLink('about');
  
  const aboutLink = container.querySelector('[data-link="about"]');
  console.assert(aboutLink.classList.contains('active'), 'About link should be active after setActiveLink');
  console.assert(!homeLink.classList.contains('active'), 'Home link should not be active');
  console.assert(aboutLink.getAttribute('aria-current') === 'page', 'Active link should have aria-current');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ Active link management works correctly\n');
}

// Test: Theme toggle area
console.log('Test: Theme toggle area');
{
  const container = createContainer();
  const header = new Header(container);
  
  const themeToggleArea = container.querySelector('.header-theme-toggle');
  const themeToggleComponent = container.querySelector('[data-component="theme-toggle"]');
  
  console.assert(themeToggleArea !== null, 'Should render theme toggle area');
  console.assert(themeToggleComponent !== null, 'Should have data-component attribute for theme toggle');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ Theme toggle area renders correctly\n');
}

// Test: Theme Toggle component integration
console.log('Test: Theme Toggle component integration');
{
  const container = createContainer();
  const header = new Header(container);
  
  // Theme toggle should be initialized
  console.assert(header.themeToggle !== null, 'Should initialize ThemeToggle component');
  
  // Theme toggle button should be rendered in the header
  const themeToggleButton = container.querySelector('.theme-toggle');
  console.assert(themeToggleButton !== null, 'Should render theme toggle button inside header');
  
  // Verify ARIA attributes
  console.assert(themeToggleButton.getAttribute('role') === 'switch', 'Theme toggle should have role="switch"');
  console.assert(themeToggleButton.hasAttribute('aria-checked'), 'Theme toggle should have aria-checked attribute');
  console.assert(themeToggleButton.hasAttribute('aria-label'), 'Theme toggle should have aria-label');
  
  // Verify theme toggle is positioned in header-actions
  const headerActions = container.querySelector('.header-actions');
  const themeToggleInActions = headerActions.querySelector('.header-theme-toggle');
  console.assert(themeToggleInActions !== null, 'Theme toggle should be in header-actions section');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ Theme Toggle component integrates correctly with Header\n');
}

// Test: Theme Toggle cleanup on header destroy
console.log('Test: Theme Toggle cleanup on header destroy');
{
  const container = createContainer();
  const header = new Header(container);
  
  console.assert(header.themeToggle !== null, 'Theme toggle should exist before destroy');
  
  header.destroy();
  
  console.assert(header.themeToggle === null, 'Theme toggle should be null after header destroy');
  
  cleanupContainer(container);
  console.log('✓ Theme Toggle is properly cleaned up on header destroy\n');
}

// Test: Accessibility - ARIA labels
console.log('Test: Accessibility - ARIA labels');
{
  const container = createContainer();
  const header = new Header(container);
  
  const nav = container.querySelector('.header-nav');
  console.assert(nav.getAttribute('aria-label') === 'Main navigation', 'Navigation should have proper ARIA label');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ ARIA labels are correct\n');
}

// Test: Accessibility - User avatar alt text
console.log('Test: Accessibility - User avatar alt text');
{
  const container = createContainer();
  const user = {
    name: 'Test User',
    profilePicture: '/avatar.jpg'
  };
  const header = new Header(container, { user });
  
  const avatar = container.querySelector('.user-avatar');
  console.assert(avatar.alt.includes('Test User'), 'Avatar should have proper alt text');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ User avatar alt text is correct\n');
}

// Test: HTML escaping for XSS prevention
console.log('Test: HTML escaping for XSS prevention');
{
  const container = createContainer();
  const user = {
    name: '<script>alert("XSS")</script>',
    profilePicture: '/avatar.jpg'
  };
  const header = new Header(container, { user });
  
  const userName = container.querySelector('.user-name');
  const html = container.innerHTML;
  
  console.assert(!html.includes('<script>'), 'Should escape script tags');
  console.assert(userName.textContent.includes('script'), 'Text content should contain escaped text');
  
  header.destroy();
  cleanupContainer(container);
  console.log('✓ HTML is properly escaped to prevent XSS\n');
}

// Test: Cleanup on destroy
console.log('Test: Cleanup on destroy');
{
  const container = createContainer();
  const header = new Header(container);
  
  console.assert(container.innerHTML.length > 0, 'Container should have content before destroy');
  
  header.destroy();
  
  console.assert(container.innerHTML === '', 'Container should be empty after destroy');
  console.assert(header.container === null, 'Container reference should be null after destroy');
  
  cleanupContainer(container);
  console.log('✓ Component cleans up correctly on destroy\n');
}

// Test: Event emission on navigation
console.log('Test: Event emission on navigation');
{
  const container = createContainer();
  const header = new Header(container);
  
  let eventEmitted = false;
  let eventData = null;
  
  const unsubscribe = eventBus.on('header:navigate', (data) => {
    eventEmitted = true;
    eventData = data;
  });
  
  const homeLink = container.querySelector('[data-route="home"]');
  homeLink.click();
  
  // Give a moment for event to propagate
  setTimeout(() => {
    console.assert(eventEmitted, 'Should emit header:navigate event');
    console.assert(eventData !== null, 'Event should include data');
    
    unsubscribe();
    header.destroy();
    cleanupContainer(container);
    console.log('✓ Navigation events are emitted correctly\n');
  }, 50);
}

// Test: Event emission on logo click
console.log('Test: Event emission on logo click');
{
  const container = createContainer();
  const header = new Header(container);
  
  let homeClickEmitted = false;
  
  const unsubscribe = eventBus.on('header:home-click', () => {
    homeClickEmitted = true;
  });
  
  const logo = container.querySelector('.logo');
  logo.click();
  
  setTimeout(() => {
    console.assert(homeClickEmitted, 'Should emit header:home-click event');
    
    unsubscribe();
    header.destroy();
    cleanupContainer(container);
    console.log('✓ Logo click event is emitted correctly\n');
  }, 50);
}

console.log('=== All Header Component Tests Complete ===');
