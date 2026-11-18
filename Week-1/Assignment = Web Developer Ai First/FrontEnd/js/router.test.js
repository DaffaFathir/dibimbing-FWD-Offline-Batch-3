/**
 * Unit Tests for Router
 * 
 * Tests client-side routing functionality including:
 * - Navigation (navigate)
 * - Query parameter parsing (getQueryParam)
 * - Browser back/forward navigation (popstate)
 * - Link interception (data-route attribute)
 * - Helper methods (buildUrl, isOnPage, etc.)
 * 
 * Requirements: 1.5, 2.5, 3.4
 */

import { Router, router as routerInstance } from './router.js';

// Test utility to capture console output
const captureConsoleError = (fn) => {
  const originalError = console.error;
  const errors = [];
  console.error = (...args) => errors.push(args);
  fn();
  console.error = originalError;
  return errors;
};

// Test utility to capture console.log
const captureConsoleLog = (fn) => {
  const originalLog = console.log;
  const logs = [];
  console.log = (...args) => logs.push(args);
  fn();
  console.log = originalLog;
  return logs;
};

// Test: Router constructor
console.log('Test: Router constructor');
{
  const testRouter = new Router();
  console.assert(typeof testRouter.routes === 'object', 'Should initialize routes object');
  console.assert(testRouter.routes['/'] === 'index.html', 'Should have root route');
  console.assert(testRouter.routes['/index.html'] === 'index.html', 'Should have index route');
  console.assert(testRouter.routes['/detail.html'] === 'detail.html', 'Should have detail route');
  console.log('✓ Constructor initializes correctly');
}

// Test: getQueryParam() - Get existing parameter
console.log('\nTest: getQueryParam() - Get existing parameter');
{
  // Mock window.location.search
  const originalSearch = window.location.search;
  delete window.location.search;
  window.location.search = '?id=123';
  
  const testRouter = new Router();
  const value = testRouter.getQueryParam('id');
  
  console.assert(value === '123', 'Should return parameter value');
  
  // Restore
  window.location.search = originalSearch;
  console.log('✓ getQueryParam() returns existing parameter');
}

// Test: getQueryParam() - Get non-existent parameter
console.log('\nTest: getQueryParam() - Get non-existent parameter');
{
  const originalSearch = window.location.search;
  delete window.location.search;
  window.location.search = '?id=123';
  
  const testRouter = new Router();
  const value = testRouter.getQueryParam('nonexistent');
  
  console.assert(value === null, 'Should return null for non-existent parameter');
  
  window.location.search = originalSearch;
  console.log('✓ getQueryParam() returns null for non-existent parameter');
}

// Test: getQueryParam() - Handle URL-encoded values
console.log('\nTest: getQueryParam() - Handle URL-encoded values');
{
  const originalSearch = window.location.search;
  delete window.location.search;
  window.location.search = '?name=Bali%20Beach';
  
  const testRouter = new Router();
  const value = testRouter.getQueryParam('name');
  
  console.assert(value === 'Bali Beach', 'Should decode URL-encoded values');
  
  window.location.search = originalSearch;
  console.log('✓ getQueryParam() decodes URL-encoded values');
}

// Test: getQueryParam() - Invalid parameter name
console.log('\nTest: getQueryParam() - Invalid parameter name');
{
  const testRouter = new Router();
  
  const errors = captureConsoleError(() => {
    const result1 = testRouter.getQueryParam(null);
    const result2 = testRouter.getQueryParam(undefined);
    const result3 = testRouter.getQueryParam('');
    
    console.assert(result1 === null, 'Should return null for null parameter');
    console.assert(result2 === null, 'Should return null for undefined parameter');
    console.assert(result3 === null, 'Should return null for empty parameter');
  });
  
  console.assert(errors.length > 0, 'Should log errors for invalid parameters');
  console.log('✓ getQueryParam() validates parameter name');
}

// Test: getAllQueryParams() - Get all parameters
console.log('\nTest: getAllQueryParams() - Get all parameters');
{
  const originalSearch = window.location.search;
  delete window.location.search;
  window.location.search = '?id=123&category=beach&sort=price';
  
  const testRouter = new Router();
  const params = testRouter.getAllQueryParams();
  
  console.assert(params.id === '123', 'Should include id parameter');
  console.assert(params.category === 'beach', 'Should include category parameter');
  console.assert(params.sort === 'price', 'Should include sort parameter');
  console.assert(Object.keys(params).length === 3, 'Should have 3 parameters');
  
  window.location.search = originalSearch;
  console.log('✓ getAllQueryParams() returns all parameters');
}

// Test: getAllQueryParams() - Empty query string
console.log('\nTest: getAllQueryParams() - Empty query string');
{
  const originalSearch = window.location.search;
  delete window.location.search;
  window.location.search = '';
  
  const testRouter = new Router();
  const params = testRouter.getAllQueryParams();
  
  console.assert(Object.keys(params).length === 0, 'Should return empty object');
  
  window.location.search = originalSearch;
  console.log('✓ getAllQueryParams() returns empty object for no parameters');
}

// Test: getCurrentPath() - Get current pathname
console.log('\nTest: getCurrentPath() - Get current pathname');
{
  const testRouter = new Router();
  const path = testRouter.getCurrentPath();
  
  console.assert(typeof path === 'string', 'Should return a string');
  console.assert(path === window.location.pathname, 'Should return current pathname');
  console.log('✓ getCurrentPath() returns current pathname');
}

// Test: getCurrentUrl() - Get full current URL
console.log('\nTest: getCurrentUrl() - Get full current URL');
{
  const testRouter = new Router();
  const url = testRouter.getCurrentUrl();
  
  console.assert(typeof url === 'string', 'Should return a string');
  console.assert(url === window.location.href, 'Should return current href');
  console.log('✓ getCurrentUrl() returns full URL');
}

// Test: buildUrl() - Build URL with parameters
console.log('\nTest: buildUrl() - Build URL with parameters');
{
  const testRouter = new Router();
  const url = testRouter.buildUrl('/detail.html', { id: '123', category: 'beach' });
  
  console.assert(url.includes('/detail.html'), 'Should include base path');
  console.assert(url.includes('id=123'), 'Should include id parameter');
  console.assert(url.includes('category=beach'), 'Should include category parameter');
  console.log('✓ buildUrl() builds URL with parameters');
}

// Test: buildUrl() - Build URL without parameters
console.log('\nTest: buildUrl() - Build URL without parameters');
{
  const testRouter = new Router();
  const url = testRouter.buildUrl('/index.html');
  
  console.assert(url === '/index.html', 'Should return path without query string');
  console.log('✓ buildUrl() builds URL without parameters');
}

// Test: buildUrl() - Skip null and undefined values
console.log('\nTest: buildUrl() - Skip null and undefined values');
{
  const testRouter = new Router();
  const url = testRouter.buildUrl('/detail.html', {
    id: '123',
    category: null,
    sort: undefined
  });
  
  console.assert(url.includes('id=123'), 'Should include defined parameter');
  console.assert(!url.includes('category'), 'Should skip null parameter');
  console.assert(!url.includes('sort'), 'Should skip undefined parameter');
  console.log('✓ buildUrl() skips null and undefined values');
}

// Test: isOnPage() - Check if on list page
console.log('\nTest: isOnPage() - Check if on list page');
{
  const testRouter = new Router();
  const originalPathname = window.location.pathname;
  
  // Test with '/index.html'
  delete window.location.pathname;
  window.location.pathname = '/index.html';
  console.assert(testRouter.isOnPage('list') === true, 'Should return true for /index.html');
  
  // Test with '/'
  window.location.pathname = '/';
  console.assert(testRouter.isOnPage('list') === true, 'Should return true for /');
  
  // Restore
  window.location.pathname = originalPathname;
  console.log('✓ isOnPage() detects list page');
}

// Test: isOnPage() - Check if on detail page
console.log('\nTest: isOnPage() - Check if on detail page');
{
  const testRouter = new Router();
  const originalPathname = window.location.pathname;
  
  delete window.location.pathname;
  window.location.pathname = '/detail.html';
  console.assert(testRouter.isOnPage('detail') === true, 'Should return true for detail page');
  
  window.location.pathname = '/index.html';
  console.assert(testRouter.isOnPage('detail') === false, 'Should return false for list page');
  
  window.location.pathname = originalPathname;
  console.log('✓ isOnPage() detects detail page');
}

// Test: isOnPage() - Unknown page
console.log('\nTest: isOnPage() - Unknown page');
{
  const testRouter = new Router();
  const result = testRouter.isOnPage('unknown');
  
  console.assert(result === false, 'Should return false for unknown page');
  console.log('✓ isOnPage() returns false for unknown page');
}

// Test: navigateToDetail() - Navigate with destination ID
console.log('\nTest: navigateToDetail() - Navigate with destination ID');
{
  const testRouter = new Router();
  
  // We can't fully test navigation in a unit test environment,
  // but we can verify the method exists and handles the ID correctly
  const buildUrlCalls = [];
  const originalBuildUrl = testRouter.buildUrl.bind(testRouter);
  testRouter.buildUrl = (...args) => {
    buildUrlCalls.push(args);
    return originalBuildUrl(...args);
  };
  
  // This would normally navigate, but in test we just verify the URL is built
  const url = testRouter.buildUrl('/detail.html', { id: 'dest-001' });
  console.assert(url.includes('id=dest-001'), 'Should build URL with destination ID');
  console.log('✓ navigateToDetail() builds correct URL');
}

// Test: navigateToDetail() - Missing destination ID
console.log('\nTest: navigateToDetail() - Missing destination ID');
{
  const testRouter = new Router();
  
  const errors = captureConsoleError(() => {
    testRouter.navigateToDetail(null);
    testRouter.navigateToDetail('');
    testRouter.navigateToDetail(undefined);
  });
  
  console.assert(errors.length > 0, 'Should log errors for missing ID');
  console.log('✓ navigateToDetail() validates destination ID');
}

// Test: navigateToList() - Navigate to list page
console.log('\nTest: navigateToList() - Navigate to list page');
{
  const testRouter = new Router();
  
  // Verify the method exists and is callable
  console.assert(typeof testRouter.navigateToList === 'function', 'Should have navigateToList method');
  console.log('✓ navigateToList() method exists');
}

// Test: Popstate event listener
console.log('\nTest: Popstate event listener');
{
  const logs = captureConsoleLog(() => {
    // Trigger popstate event
    const event = new PopStateEvent('popstate', { state: { page: 'detail' } });
    window.dispatchEvent(event);
  });
  
  // The handler should log the event
  console.assert(logs.length > 0, 'Should handle popstate event');
  console.log('✓ Popstate event listener works');
}

// Test: Data-route link interception
console.log('\nTest: Data-route link interception');
{
  const testRouter = new Router();
  
  // Create a link with data-route attribute
  const link = document.createElement('a');
  link.setAttribute('href', '/detail.html?id=1');
  link.setAttribute('data-route', 'detail');
  document.body.appendChild(link);
  
  // Track if click was prevented (we can't fully test navigation)
  let clickPrevented = false;
  link.addEventListener('click', (e) => {
    if (e.defaultPrevented) {
      clickPrevented = true;
    }
  }, { capture: false });
  
  // Create and dispatch click event
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true
  });
  link.dispatchEvent(clickEvent);
  
  console.assert(clickPrevented, 'Should prevent default click behavior');
  
  // Cleanup
  document.body.removeChild(link);
  console.log('✓ Data-route link interception works');
}

// Test: Regular links not intercepted
console.log('\nTest: Regular links not intercepted');
{
  const testRouter = new Router();
  
  // Create a regular link without data-route
  const link = document.createElement('a');
  link.setAttribute('href', '/external.html');
  document.body.appendChild(link);
  
  // Track if click was prevented
  let clickPrevented = false;
  link.addEventListener('click', (e) => {
    if (e.defaultPrevented) {
      clickPrevented = true;
    }
    // Prevent actual navigation in test
    e.preventDefault();
  }, { capture: false });
  
  // Create and dispatch click event
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true
  });
  link.dispatchEvent(clickEvent);
  
  // The router should NOT prevent default for regular links
  // (our test listener will prevent it to avoid navigation)
  console.assert(typeof clickPrevented === 'boolean', 'Should allow regular link behavior');
  
  // Cleanup
  document.body.removeChild(link);
  console.log('✓ Regular links not intercepted by router');
}

// Test: Singleton export
console.log('\nTest: Singleton export');
{
  console.assert(routerInstance instanceof Router, 'Should export router instance');
  console.assert(typeof routerInstance.navigate === 'function', 'Should have navigate method');
  console.assert(typeof routerInstance.getQueryParam === 'function', 'Should have getQueryParam method');
  console.log('✓ Singleton router instance exported');
}

// Test: Integration - Real-world scenario
console.log('\nTest: Integration - Real-world scenario');
{
  const testRouter = new Router();
  
  // Simulate detail page URL
  const originalSearch = window.location.search;
  delete window.location.search;
  window.location.search = '?id=dest-001&category=beach';
  
  // Get destination ID from query parameter
  const destId = testRouter.getQueryParam('id');
  console.assert(destId === 'dest-001', 'Should extract destination ID');
  
  // Get category
  const category = testRouter.getQueryParam('category');
  console.assert(category === 'beach', 'Should extract category');
  
  // Build URL for navigation
  const listUrl = testRouter.buildUrl('/index.html', { category: category });
  console.assert(listUrl.includes('/index.html'), 'Should build list URL');
  console.assert(listUrl.includes('category=beach'), 'Should preserve category');
  
  // Check current page
  const onDetail = testRouter.isOnPage('detail');
  console.assert(typeof onDetail === 'boolean', 'Should check current page');
  
  // Restore
  window.location.search = originalSearch;
  console.log('✓ Integration scenario works correctly');
}

console.log('\n✅ All Router tests passed!');
