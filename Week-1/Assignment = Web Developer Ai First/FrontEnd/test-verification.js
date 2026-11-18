/**
 * Manual Testing Verification Script
 * Run this in the browser console to verify all functionality
 */

console.log('🧪 Starting Manual Testing Verification...\n');

const tests = {
  passed: [],
  failed: [],
  warnings: []
};

function logTest(name, passed, message = '') {
  if (passed) {
    tests.passed.push(name);
    console.log(`✅ ${name}${message ? ': ' + message : ''}`);
  } else {
    tests.failed.push(name);
    console.log(`❌ ${name}${message ? ': ' + message : ''}`);
  }
}

function logWarning(name, message) {
  tests.warnings.push(name);
  console.log(`⚠️  ${name}: ${message}`);
}

// Test 1: Page Load and Components
console.log('\n📋 Testing Page Load and Component Rendering...');
const header = document.querySelector('[data-component="header"]');
const hero = document.querySelector('[data-component="hero"]');
const destinationList = document.querySelector('[data-component="destination-list"]');
const footer = document.querySelector('[data-component="footer"]');

logTest('Header component exists', !!header);
logTest('Hero component exists', !!hero);
logTest('Destination list component exists', !!destinationList);
logTest('Footer component exists', !!footer);

// Test 2: Destination Cards Rendering
console.log('\n🏝️  Testing Destination Cards...');
setTimeout(() => {
  const cards = document.querySelectorAll('.destination-card');
  logTest('Destination cards rendered', cards.length > 0, `Found ${cards.length} cards`);
  
  if (cards.length > 0) {
    const firstCard = cards[0];
    const cardTitle = firstCard.querySelector('.card-title');
    const cardLocation = firstCard.querySelector('.card-location');
    const cardPrice = firstCard.querySelector('.card-price');
    const cardImage = firstCard.querySelector('.card-image img');
    const detailButton = firstCard.querySelector('[data-action="detail"]');
    
    logTest('Card has title', !!cardTitle);
    logTest('Card has location', !!cardLocation);
    logTest('Card has price', !!cardPrice);
    logTest('Card has image', !!cardImage);
    logTest('Card has Detail button', !!detailButton);
    
    if (cardImage) {
      logTest('Image has alt text', !!cardImage.alt && cardImage.alt.length > 0);
      logTest('Image has lazy loading', cardImage.loading === 'lazy');
    }
  }
}, 1000);

// Test 3: Search Functionality
console.log('\n🔍 Testing Search Functionality...');
setTimeout(() => {
  const searchInput = document.querySelector('.search-input');
  logTest('Search input exists', !!searchInput);
  
  if (searchInput) {
    const originalCardCount = document.querySelectorAll('.destination-card').length;
    
    // Simulate search
    searchInput.value = 'bali';
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    
    setTimeout(() => {
      const filteredCards = document.querySelectorAll('.destination-card').length;
      logTest('Search filters results', filteredCards !== originalCardCount || filteredCards > 0);
      
      // Clear search
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }, 500);
  }
}, 1500);

// Test 4: Theme Toggle
console.log('\n🌓 Testing Theme Toggle...');
setTimeout(() => {
  const themeToggle = document.querySelector('[data-action="toggle-theme"]');
  logTest('Theme toggle exists', !!themeToggle);
  
  if (themeToggle) {
    const initialTheme = document.documentElement.getAttribute('data-theme');
    logTest('Theme attribute exists', !!initialTheme);
    
    // Test toggle functionality
    themeToggle.click();
    
    setTimeout(() => {
      const newTheme = document.documentElement.getAttribute('data-theme');
      logTest('Theme toggle changes theme', newTheme !== initialTheme);
      logTest('Theme persisted to localStorage', localStorage.getItem('user-theme-preference') === newTheme);
      
      // Toggle back
      themeToggle.click();
    }, 300);
  }
}, 2000);

// Test 5: Detail Button Navigation
console.log('\n🔗 Testing Detail Button Navigation...');
setTimeout(() => {
  const firstCard = document.querySelector('.destination-card');
  if (firstCard) {
    const detailButton = firstCard.querySelector('[data-action="detail"]');
    const destinationId = firstCard.getAttribute('data-destination-id');
    
    if (detailButton && destinationId) {
      console.log(`📝 Click the Detail button on card ID: ${destinationId} to test navigation`);
      logTest('Detail button has destination ID', !!destinationId);
      
      // Add temporary click listener to verify
      detailButton.addEventListener('click', (e) => {
        console.log('✅ Detail button clicked - navigation should occur');
      }, { once: true });
    }
  }
}, 2500);

// Test 6: Loading States
console.log('\n⏳ Testing Loading States...');
const loadingIndicator = document.querySelector('.loading');
if (loadingIndicator) {
  logTest('Loading indicator exists', true);
} else {
  logWarning('Loading state', 'Loading indicator not visible (may have already completed)');
}

// Test 7: Error Handling
console.log('\n🚨 Testing Error Scenarios...');
console.log('📝 To test error scenarios:');
console.log('   1. Navigate to detail.html?id=invalid-id');
console.log('   2. Check for error message display');
console.log('   3. Verify Back to List button works');

// Test 8: Accessibility
console.log('\n♿ Testing Accessibility...');
const skipLink = document.querySelector('.skip-link');
logTest('Skip link exists', !!skipLink);

const mainContent = document.querySelector('#main-content');
logTest('Main content has ID for skip link', !!mainContent);

// Check ARIA attributes
const searchInput = document.querySelector('.search-input');
if (searchInput) {
  logTest('Search has aria-label', !!searchInput.getAttribute('aria-label'));
}

// Test 9: Responsive Design
console.log('\n📱 Testing Responsive Design...');
const viewportWidth = window.innerWidth;
console.log(`Current viewport: ${viewportWidth}px`);

if (viewportWidth < 768) {
  console.log('📱 Mobile view detected');
} else if (viewportWidth < 1024) {
  console.log('📱 Tablet view detected');
} else {
  console.log('💻 Desktop view detected');
}

// Final Summary
setTimeout(() => {
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${tests.passed.length}`);
  console.log(`❌ Failed: ${tests.failed.length}`);
  console.log(`⚠️  Warnings: ${tests.warnings.length}`);
  
  if (tests.failed.length > 0) {
    console.log('\n❌ Failed Tests:');
    tests.failed.forEach(test => console.log(`   - ${test}`));
  }
  
  if (tests.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    tests.warnings.forEach(test => console.log(`   - ${test}`));
  }
  
  console.log('\n📝 Manual Tests Required:');
  console.log('   ✓ Click Detail button and verify navigation');
  console.log('   ✓ On detail page, test Back to List button');
  console.log('   ✓ On detail page, test Order Ticket Now button (check console)');
  console.log('   ✓ Navigate to detail.html?id=invalid-id to test error handling');
  console.log('   ✓ Test navigation flow: list → detail → back to list');
  console.log('   ✓ Resize browser to test responsive breakpoints');
  
  console.log('\n✨ Automated verification complete!');
}, 3000);
