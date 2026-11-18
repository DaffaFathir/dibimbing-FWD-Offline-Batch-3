/**
 * Hero Component Tests
 */

import { Hero } from './hero.js';

// Test suite
const tests = {
  passed: 0,
  failed: 0,
  results: []
};

// Helper to run a test
function test(name, fn) {
  try {
    fn();
    tests.passed++;
    tests.results.push({ name, status: 'PASS' });
    console.log(`✓ ${name}`);
  } catch (error) {
    tests.failed++;
    tests.results.push({ name, status: 'FAIL', error: error.message });
    console.error(`✗ ${name}: ${error.message}`);
  }
}

// Helper to assert
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Test 1: Constructor requires container
test('Constructor throws error when container is missing', () => {
  let errorThrown = false;
  try {
    new Hero(null);
  } catch (error) {
    errorThrown = true;
    assert(error.message.includes('requires a container'), 'Should throw error about missing container');
  }
  assert(errorThrown, 'Should throw error when container is null');
});

// Test 2: Constructor accepts options
test('Constructor accepts and merges options with defaults', () => {
  const container = document.createElement('div');
  const hero = new Hero(container, {
    title: 'Custom Title',
    subtitle: 'Custom Subtitle'
  });
  
  assert(hero.options.title === 'Custom Title', 'Should set custom title');
  assert(hero.options.subtitle === 'Custom Subtitle', 'Should set custom subtitle');
  assert(hero.options.backgroundImage === '', 'Should have default backgroundImage');
});

// Test 3: Default options are set
test('Constructor uses default options when not provided', () => {
  const container = document.createElement('div');
  const hero = new Hero(container);
  
  assert(hero.options.title === 'Discover Tropical Paradise', 'Should have default title');
  assert(hero.options.subtitle === 'Explore breathtaking destinations across Southeast Asia', 'Should have default subtitle');
});

// Test 4: Render creates correct DOM structure
test('Render creates hero section with correct structure', () => {
  const container = document.createElement('div');
  const hero = new Hero(container);
  
  const heroSection = container.querySelector('.hero-section');
  assert(heroSection !== null, 'Should create hero-section element');
  
  const heroBackground = container.querySelector('.hero-background');
  assert(heroBackground !== null, 'Should create hero-background element');
  
  const heroOverlay = container.querySelector('.hero-overlay');
  assert(heroOverlay !== null, 'Should create hero-overlay element');
  
  const heroContent = container.querySelector('.hero-content');
  assert(heroContent !== null, 'Should create hero-content element');
  
  const heroTitle = container.querySelector('.hero-title');
  assert(heroTitle !== null, 'Should create hero-title element');
  
  const heroSubtitle = container.querySelector('.hero-subtitle');
  assert(heroSubtitle !== null, 'Should create hero-subtitle element');
});

// Test 5: Render displays correct text content
test('Render displays title and subtitle text correctly', () => {
  const container = document.createElement('div');
  const hero = new Hero(container, {
    title: 'Test Title',
    subtitle: 'Test Subtitle'
  });
  
  const heroTitle = container.querySelector('.hero-title');
  const heroSubtitle = container.querySelector('.hero-subtitle');
  
  assert(heroTitle.textContent === 'Test Title', 'Should display correct title');
  assert(heroSubtitle.textContent === 'Test Subtitle', 'Should display correct subtitle');
});

// Test 6: Background image is applied when provided
test('Render applies background image when provided', () => {
  const container = document.createElement('div');
  const hero = new Hero(container, {
    backgroundImage: '/path/to/image.jpg'
  });
  
  const heroBackground = container.querySelector('.hero-background');
  const bgImage = heroBackground.style.backgroundImage;
  
  assert(bgImage.includes('/path/to/image.jpg'), 'Should set background image URL');
});

// Test 7: updateContent updates title
test('updateContent updates title dynamically', () => {
  const container = document.createElement('div');
  const hero = new Hero(container, {
    title: 'Original Title'
  });
  
  hero.updateContent({ title: 'Updated Title' });
  
  const heroTitle = container.querySelector('.hero-title');
  assert(heroTitle.textContent === 'Updated Title', 'Should update title text');
  assert(hero.options.title === 'Updated Title', 'Should update options');
});

// Test 8: updateContent updates subtitle
test('updateContent updates subtitle dynamically', () => {
  const container = document.createElement('div');
  const hero = new Hero(container, {
    subtitle: 'Original Subtitle'
  });
  
  hero.updateContent({ subtitle: 'Updated Subtitle' });
  
  const heroSubtitle = container.querySelector('.hero-subtitle');
  assert(heroSubtitle.textContent === 'Updated Subtitle', 'Should update subtitle text');
  assert(hero.options.subtitle === 'Updated Subtitle', 'Should update options');
});

// Test 9: updateContent updates background image
test('updateContent updates background image dynamically', () => {
  const container = document.createElement('div');
  const hero = new Hero(container);
  
  hero.updateContent({ backgroundImage: '/new/image.jpg' });
  
  const heroBackground = container.querySelector('.hero-background');
  const bgImage = heroBackground.style.backgroundImage;
  
  assert(bgImage.includes('/new/image.jpg'), 'Should update background image URL');
  assert(hero.options.backgroundImage === '/new/image.jpg', 'Should update options');
});

// Test 10: updateContent can update multiple properties at once
test('updateContent updates multiple properties simultaneously', () => {
  const container = document.createElement('div');
  const hero = new Hero(container);
  
  hero.updateContent({
    title: 'New Title',
    subtitle: 'New Subtitle',
    backgroundImage: '/new/bg.jpg'
  });
  
  const heroTitle = container.querySelector('.hero-title');
  const heroSubtitle = container.querySelector('.hero-subtitle');
  const heroBackground = container.querySelector('.hero-background');
  
  assert(heroTitle.textContent === 'New Title', 'Should update title');
  assert(heroSubtitle.textContent === 'New Subtitle', 'Should update subtitle');
  assert(heroBackground.style.backgroundImage.includes('/new/bg.jpg'), 'Should update background');
});

// Test 11: updateContent clears background image when empty string provided
test('updateContent clears background image with empty string', () => {
  const container = document.createElement('div');
  const hero = new Hero(container, {
    backgroundImage: '/initial/image.jpg'
  });
  
  hero.updateContent({ backgroundImage: '' });
  
  const heroBackground = container.querySelector('.hero-background');
  const bgImage = heroBackground.style.backgroundImage;
  
  assert(bgImage === '' || bgImage === 'none', 'Should clear background image');
});

// Test 12: escapeHtml prevents XSS
test('escapeHtml escapes HTML characters to prevent XSS', () => {
  const container = document.createElement('div');
  const hero = new Hero(container, {
    title: '<script>alert("XSS")</script>'
  });
  
  const heroTitle = container.querySelector('.hero-title');
  const innerHTML = heroTitle.innerHTML;
  
  assert(!innerHTML.includes('<script>'), 'Should escape script tags');
  assert(innerHTML.includes('&lt;script&gt;') || heroTitle.textContent.includes('<script>'), 'Should show escaped content');
});

// Test 13: destroy clears container
test('destroy clears the container content', () => {
  const container = document.createElement('div');
  const hero = new Hero(container);
  
  assert(container.innerHTML !== '', 'Container should have content after initialization');
  
  hero.destroy();
  
  assert(container.innerHTML === '', 'Container should be empty after destroy');
});

// Test 14: Component initializes automatically
test('Component renders automatically on construction', () => {
  const container = document.createElement('div');
  const hero = new Hero(container);
  
  const heroSection = container.querySelector('.hero-section');
  assert(heroSection !== null, 'Should automatically render on construction');
});

// Print summary
console.log('\n=== Hero Component Test Summary ===');
console.log(`Total: ${tests.passed + tests.failed}`);
console.log(`Passed: ${tests.passed}`);
console.log(`Failed: ${tests.failed}`);

if (tests.failed > 0) {
  console.log('\nFailed tests:');
  tests.results
    .filter(r => r.status === 'FAIL')
    .forEach(r => console.log(`  - ${r.name}: ${r.error}`));
}

export { tests };
