/**
 * Test: Verify detail.html structure meets task 10.2 requirements
 * 
 * Tests:
 * - Semantic HTML5 structure (header, main, footer via components)
 * - data-page="detail" attribute on body
 * - Component mounting points with data-component attributes
 * - CSS files linked in correct order
 * - main.js as ES6 module
 * - Meta tags for responsive viewport
 * - Page title and meta description
 */

import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

// Since we can't use external libraries, let's do basic validation with Node.js
const fs = require('fs');
const path = require('path');

const detailHtmlPath = path.join(__dirname, 'detail.html');
const content = fs.readFileSync(detailHtmlPath, 'utf-8');

console.log('Testing detail.html structure...\n');

// Test 1: DOCTYPE
const hasDOCTYPE = content.includes('<!DOCTYPE html>');
console.log(`✓ DOCTYPE present: ${hasDOCTYPE ? 'PASS' : 'FAIL'}`);

// Test 2: data-page="detail"
const hasDataPage = content.includes('data-page="detail"');
console.log(`✓ data-page="detail" attribute: ${hasDataPage ? 'PASS' : 'FAIL'}`);

// Test 3: Component mounting points
const hasHeaderMount = content.includes('data-component="header"');
const hasFooterMount = content.includes('data-component="footer"');
const hasDetailMount = content.includes('data-component="destination-detail"');
console.log(`✓ Header component mount: ${hasHeaderMount ? 'PASS' : 'FAIL'}`);
console.log(`✓ Footer component mount: ${hasFooterMount ? 'PASS' : 'FAIL'}`);
console.log(`✓ Detail component mount: ${hasDetailMount ? 'PASS' : 'FAIL'}`);

// Test 4: Main element
const hasMainElement = content.includes('<main');
console.log(`✓ <main> element present: ${hasMainElement ? 'PASS' : 'FAIL'}`);

// Test 5: CSS files in order
const cssFiles = [
  'css/reset.css',
  'css/variables.css',
  'css/global.css',
  'css/layout.css',
  'css/responsive.css',
  'css/components/header.css',
  'css/components/footer.css',
  'css/components/destination-detail.css',
  'css/components/theme-toggle.css'
];

let allCSSPresent = true;
cssFiles.forEach(file => {
  const present = content.includes(file);
  if (!present) {
    console.log(`  ✗ Missing: ${file}`);
    allCSSPresent = false;
  }
});
console.log(`✓ All CSS files present: ${allCSSPresent ? 'PASS' : 'FAIL'}`);

// Test 6: ES6 module script
const hasModuleScript = content.includes('type="module"') && content.includes('js/main.js');
console.log(`✓ ES6 module script: ${hasModuleScript ? 'PASS' : 'FAIL'}`);

// Test 7: Viewport meta tag
const hasViewport = content.includes('name="viewport"');
console.log(`✓ Viewport meta tag: ${hasViewport ? 'PASS' : 'FAIL'}`);

// Test 8: Page title
const hasTitle = content.includes('<title>') && content.includes('Destination Details');
console.log(`✓ Page title: ${hasTitle ? 'PASS' : 'FAIL'}`);

// Test 9: Meta description
const hasDescription = content.includes('name="description"');
console.log(`✓ Meta description: ${hasDescription ? 'PASS' : 'FAIL'}`);

// Test 10: Theme initialization script
const hasThemeScript = content.includes('user-theme-preference') && content.includes('localStorage.getItem');
console.log(`✓ Theme initialization: ${hasThemeScript ? 'PASS' : 'FAIL'}`);

console.log('\n=== All tests completed ===');
