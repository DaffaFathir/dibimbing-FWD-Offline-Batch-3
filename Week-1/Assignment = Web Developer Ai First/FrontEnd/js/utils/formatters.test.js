/**
 * Unit tests for Formatter utilities
 */

import {
  formatPrice,
  truncateText,
  formatDate,
  formatNumber,
  capitalize,
  toTitleCase,
  formatExcerpt,
  formatPhoneNumber,
  formatFileSize,
  formatDuration,
  formatRelativeTime,
  formatPercentage,
  stripHTMLTags,
  formatList
} from './formatters.js';

// Test formatPrice
function testFormatPrice() {
  console.log('Testing formatPrice...');
  
  console.assert(formatPrice(1000) === '$1,000', 'Should format price with thousands separator');
  console.assert(formatPrice(99.99) === '$99.99', 'Should format price with decimals');
  console.assert(formatPrice(50) === '$50', 'Should format simple price');
  console.assert(formatPrice(0) === '$0', 'Should format zero');
  console.assert(formatPrice('not a number') === '$0', 'Should handle invalid input');
  
  console.log('✓ formatPrice tests passed');
}

// Test truncateText
function testTruncateText() {
  console.log('Testing truncateText...');
  
  const longText = 'This is a very long text that needs to be truncated';
  
  const result1 = truncateText(longText, 20);
  console.assert(result1.length <= 23, 'Should truncate long text'); // 20 + '...'
  console.assert(result1.endsWith('...'), 'Should add ellipsis');
  
  const shortText = 'Short text';
  const result2 = truncateText(shortText, 20);
  console.assert(result2 === shortText, 'Should not truncate short text');
  
  const result3 = truncateText(longText, 20, '…');
  console.assert(result3.endsWith('…'), 'Should use custom ellipsis');
  
  console.log('✓ truncateText tests passed');
}

// Test formatDate
function testFormatDate() {
  console.log('Testing formatDate...');
  
  const date = new Date('2024-01-15');
  const formatted = formatDate(date);
  
  console.assert(formatted.includes('January'), 'Should format month as word');
  console.assert(formatted.includes('15'), 'Should include day');
  console.assert(formatted.includes('2024'), 'Should include year');
  
  const invalidDate = formatDate('invalid');
  console.assert(invalidDate === 'Invalid Date', 'Should handle invalid date');
  
  console.log('✓ formatDate tests passed');
}

// Test formatNumber
function testFormatNumber() {
  console.log('Testing formatNumber...');
  
  console.assert(formatNumber(1000) === '1,000', 'Should format with thousands separator');
  console.assert(formatNumber(1000000) === '1,000,000', 'Should format millions');
  console.assert(formatNumber(99.99, 2) === '99.99', 'Should format with decimals');
  console.assert(formatNumber(50.5, 0) === '51', 'Should round when decimals is 0');
  
  console.log('✓ formatNumber tests passed');
}

// Test capitalize
function testCapitalize() {
  console.log('Testing capitalize...');
  
  console.assert(capitalize('hello') === 'Hello', 'Should capitalize first letter');
  console.assert(capitalize('WORLD') === 'World', 'Should lowercase rest');
  console.assert(capitalize('') === '', 'Should handle empty string');
  console.assert(capitalize('a') === 'A', 'Should handle single character');
  
  console.log('✓ capitalize tests passed');
}

// Test toTitleCase
function testToTitleCase() {
  console.log('Testing toTitleCase...');
  
  console.assert(toTitleCase('hello world') === 'Hello World', 'Should title case words');
  console.assert(toTitleCase('THE QUICK BROWN FOX') === 'The Quick Brown Fox', 'Should handle all caps');
  console.assert(toTitleCase('') === '', 'Should handle empty string');
  
  console.log('✓ toTitleCase tests passed');
}

// Test formatExcerpt
function testFormatExcerpt() {
  console.log('Testing formatExcerpt...');
  
  const text = 'This is a long piece of text with many words in it';
  
  const result1 = formatExcerpt(text, 5);
  console.assert(result1.split(' ').length <= 6, 'Should limit to word count'); // 5 words + ellipsis
  console.assert(result1.endsWith('...'), 'Should add ellipsis');
  
  const result2 = formatExcerpt('Short text', 10);
  console.assert(result2 === 'Short text', 'Should not truncate if under limit');
  
  console.log('✓ formatExcerpt tests passed');
}

// Test formatPhoneNumber
function testFormatPhoneNumber() {
  console.log('Testing formatPhoneNumber...');
  
  console.assert(formatPhoneNumber('1234567890') === '(123) 456-7890', 'Should format 10-digit phone');
  console.assert(formatPhoneNumber('11234567890') === '+1 (123) 456-7890', 'Should format 11-digit phone');
  console.assert(formatPhoneNumber('123-456-7890') === '(123) 456-7890', 'Should handle formatted input');
  
  console.log('✓ formatPhoneNumber tests passed');
}

// Test formatFileSize
function testFormatFileSize() {
  console.log('Testing formatFileSize...');
  
  console.assert(formatFileSize(0) === '0 Bytes', 'Should format zero bytes');
  console.assert(formatFileSize(1024) === '1 KB', 'Should format kilobytes');
  console.assert(formatFileSize(1048576) === '1 MB', 'Should format megabytes');
  console.assert(formatFileSize(1073741824) === '1 GB', 'Should format gigabytes');
  
  console.log('✓ formatFileSize tests passed');
}

// Test formatDuration
function testFormatDuration() {
  console.log('Testing formatDuration...');
  
  console.assert(formatDuration(0) === '0s', 'Should format zero seconds');
  console.assert(formatDuration(30) === '30s', 'Should format seconds');
  console.assert(formatDuration(90) === '1m 30s', 'Should format minutes and seconds');
  console.assert(formatDuration(3665) === '1h 1m 5s', 'Should format hours, minutes, and seconds');
  
  console.log('✓ formatDuration tests passed');
}

// Test formatRelativeTime
function testFormatRelativeTime() {
  console.log('Testing formatRelativeTime...');
  
  const now = new Date();
  const justNow = new Date(now.getTime() - 30000); // 30 seconds ago
  const oneHourAgo = new Date(now.getTime() - 3600000); // 1 hour ago
  const oneDayAgo = new Date(now.getTime() - 86400000); // 1 day ago
  
  console.assert(formatRelativeTime(justNow) === 'just now', 'Should format recent time');
  console.assert(formatRelativeTime(oneHourAgo).includes('hour'), 'Should format hours ago');
  console.assert(formatRelativeTime(oneDayAgo).includes('day'), 'Should format days ago');
  
  console.log('✓ formatRelativeTime tests passed');
}

// Test formatPercentage
function testFormatPercentage() {
  console.log('Testing formatPercentage...');
  
  console.assert(formatPercentage(50) === '50%', 'Should format whole percentage');
  console.assert(formatPercentage(33.333, 2) === '33.33%', 'Should format with decimals');
  console.assert(formatPercentage(0) === '0%', 'Should format zero');
  console.assert(formatPercentage('not a number') === '0%', 'Should handle invalid input');
  
  console.log('✓ formatPercentage tests passed');
}

// Test stripHTMLTags
function testStripHTMLTags() {
  console.log('Testing stripHTMLTags...');
  
  const html1 = '<p>Hello <b>World</b></p>';
  console.assert(stripHTMLTags(html1) === 'Hello World', 'Should strip HTML tags');
  
  const html2 = '<script>alert("xss")</script>Safe text';
  const stripped = stripHTMLTags(html2);
  console.assert(!stripped.includes('<'), 'Should remove all tags');
  console.assert(stripped.includes('Safe text'), 'Should preserve text content');
  
  console.assert(stripHTMLTags('Plain text') === 'Plain text', 'Should preserve plain text');
  
  console.log('✓ stripHTMLTags tests passed');
}

// Test formatList
function testFormatList() {
  console.log('Testing formatList...');
  
  console.assert(formatList(['apple']) === 'apple', 'Should format single item');
  console.assert(formatList(['apple', 'banana']) === 'apple and banana', 'Should format two items');
  console.assert(formatList(['apple', 'banana', 'cherry']) === 'apple, banana, and cherry', 'Should format three items');
  console.assert(formatList(['a', 'b', 'c'], 'or') === 'a, b, or c', 'Should use custom conjunction');
  console.assert(formatList([]) === '', 'Should handle empty array');
  
  console.log('✓ formatList tests passed');
}

// Run all tests
export function runFormatterTests() {
  console.log('=== Running Formatter Tests ===');
  
  testFormatPrice();
  testTruncateText();
  testFormatDate();
  testFormatNumber();
  testCapitalize();
  testToTitleCase();
  testFormatExcerpt();
  testFormatPhoneNumber();
  testFormatFileSize();
  testFormatDuration();
  testFormatRelativeTime();
  testFormatPercentage();
  testStripHTMLTags();
  testFormatList();
  
  console.log('=== All Formatter Tests Completed ===');
}

// Auto-run if loaded directly
if (typeof window !== 'undefined' && document.readyState !== 'loading') {
  runFormatterTests();
} else if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', runFormatterTests);
}
