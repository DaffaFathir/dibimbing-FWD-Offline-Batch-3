/**
 * Footer Component Tests
 * Basic tests to verify Footer component functionality
 */

import { Footer } from './footer.js';
import { eventBus } from '../event-bus.js';

/**
 * Test Suite Runner
 */
function runTests() {
  console.log('===== Footer Component Tests =====\n');

  let passCount = 0;
  let failCount = 0;

  function test(name, fn) {
    try {
      fn();
      console.log(`✓ ${name}`);
      passCount++;
    } catch (error) {
      console.error(`✗ ${name}`);
      console.error(`  ${error.message}`);
      failCount++;
    }
  }

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  // Test 1: Footer constructor requires container
  test('Footer constructor requires a container element', () => {
    let error;
    try {
      new Footer(null);
    } catch (e) {
      error = e;
    }
    assert(error, 'Should throw error when container is null');
    assert(error.message.includes('container'), 'Error should mention container');
  });

  // Test 2: Footer renders correctly
  test('Footer renders with default options', () => {
    const container = document.createElement('div');
    const footer = new Footer(container);
    
    assert(container.querySelector('.site-footer'), 'Should render site-footer element');
    assert(container.querySelector('.footer-about'), 'Should render about section');
    assert(container.querySelector('.footer-links'), 'Should render links section');
    assert(container.querySelector('.footer-social'), 'Should render social section');
    assert(container.querySelector('.footer-copyright'), 'Should render copyright section');
    
    footer.destroy();
  });

  // Test 3: Footer renders custom social links
  test('Footer renders custom social links', () => {
    const container = document.createElement('div');
    const socialLinks = [
      { platform: 'facebook', url: 'https://facebook.com/test' },
      { platform: 'twitter', url: 'https://twitter.com/test' }
    ];
    
    const footer = new Footer(container, { socialLinks });
    
    const links = container.querySelectorAll('.social-link');
    assert(links.length === 2, `Should render 2 social links, got ${links.length}`);
    
    const facebookLink = container.querySelector('[data-platform="facebook"]');
    assert(facebookLink, 'Should render Facebook link');
    assert(facebookLink.href === 'https://facebook.com/test', 'Facebook link should have correct URL');
    
    footer.destroy();
  });

  // Test 4: Footer renders custom year
  test('Footer renders custom copyright year', () => {
    const container = document.createElement('div');
    const footer = new Footer(container, { year: 2025 });
    
    const copyright = container.querySelector('.footer-copyright p');
    assert(copyright, 'Should render copyright text');
    assert(copyright.textContent.includes('2025'), 'Should include year 2025');
    
    footer.destroy();
  });

  // Test 5: Footer emits link click events
  test('Footer emits footer:link-click event', (done) => {
    const container = document.createElement('div');
    const footer = new Footer(container);
    
    // Subscribe to event
    const unsubscribe = eventBus.on('footer:link-click', (data) => {
      assert(data.type, 'Event should include type');
      assert(data.url, 'Event should include url');
      assert(data.timestamp, 'Event should include timestamp');
      unsubscribe();
      footer.destroy();
    });
    
    // Simulate click on help link
    const helpLink = container.querySelector('[data-link="help"]');
    assert(helpLink, 'Should have help link');
    helpLink.click();
    
    // Cleanup if event doesn't fire
    setTimeout(() => {
      unsubscribe();
      footer.destroy();
    }, 100);
  });

  // Test 6: updateSocialLinks method works
  test('updateSocialLinks updates social links dynamically', () => {
    const container = document.createElement('div');
    const footer = new Footer(container);
    
    const newLinks = [
      { platform: 'youtube', url: 'https://youtube.com/test' },
      { platform: 'linkedin', url: 'https://linkedin.com/test' }
    ];
    
    footer.updateSocialLinks(newLinks);
    
    const links = container.querySelectorAll('.social-link');
    assert(links.length === 2, `Should render 2 social links after update, got ${links.length}`);
    
    const youtubeLink = container.querySelector('[data-platform="youtube"]');
    assert(youtubeLink, 'Should render YouTube link');
    
    footer.destroy();
  });

  // Test 7: updateSocialLinks validates input
  test('updateSocialLinks throws error for invalid input', () => {
    const container = document.createElement('div');
    const footer = new Footer(container);
    
    let error;
    try {
      footer.updateSocialLinks('invalid');
    } catch (e) {
      error = e;
    }
    
    assert(error, 'Should throw error for non-array input');
    assert(error.message.includes('array'), 'Error should mention array');
    
    footer.destroy();
  });

  // Test 8: Footer includes Help and Contact links
  test('Footer includes Help and Contact links', () => {
    const container = document.createElement('div');
    const footer = new Footer(container);
    
    const helpLink = container.querySelector('[data-link="help"]');
    const contactLink = container.querySelector('[data-link="contact"]');
    
    assert(helpLink, 'Should have Help link');
    assert(contactLink, 'Should have Contact link');
    assert(helpLink.textContent.includes('Help'), 'Help link should contain "Help" text');
    assert(contactLink.textContent.includes('Contact'), 'Contact link should contain "Contact" text');
    
    footer.destroy();
  });

  // Test 9: Social links have proper attributes
  test('Social links have proper accessibility and security attributes', () => {
    const container = document.createElement('div');
    const footer = new Footer(container);
    
    const socialLink = container.querySelector('.social-link');
    assert(socialLink, 'Should have social link');
    assert(socialLink.getAttribute('target') === '_blank', 'Should open in new tab');
    assert(socialLink.getAttribute('rel') === 'noopener noreferrer', 'Should have security attributes');
    assert(socialLink.getAttribute('aria-label'), 'Should have aria-label');
    
    footer.destroy();
  });

  // Test 10: destroy method cleans up
  test('destroy method cleans up the component', () => {
    const container = document.createElement('div');
    const footer = new Footer(container);
    
    assert(container.innerHTML !== '', 'Container should have content before destroy');
    
    footer.destroy();
    
    assert(container.innerHTML === '', 'Container should be empty after destroy');
  });

  // Print results
  console.log('\n===== Test Results =====');
  console.log(`Passed: ${passCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Total: ${passCount + failCount}`);
  console.log(`Success Rate: ${((passCount / (passCount + failCount)) * 100).toFixed(1)}%`);

  return { passCount, failCount };
}

// Run tests if in Node.js environment or when imported
if (typeof window !== 'undefined') {
  // Browser environment
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runTests);
  } else {
    runTests();
  }
} else {
  // Node.js environment
  runTests();
}

export { runTests };
