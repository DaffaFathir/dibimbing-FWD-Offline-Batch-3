/**
 * Unit tests for Validator utilities
 */

import {
  isValidURL,
  isValidEmail,
  isNonEmptyString,
  isValidLength,
  isPositiveNumber,
  isInRange,
  validateRequiredFields,
  isValidPrice,
  isValidID,
  sanitizeString,
  isValidSearchQuery,
  isValidImageURL,
  isFutureDate,
  validateSchema
} from './validators.js';

// Test isValidURL
function testIsValidURL() {
  console.log('Testing isValidURL...');
  
  console.assert(isValidURL('https://example.com') === true, 'Should validate HTTPS URL');
  console.assert(isValidURL('http://example.com') === true, 'Should validate HTTP URL');
  console.assert(isValidURL('ftp://example.com') === false, 'Should reject FTP URL');
  console.assert(isValidURL('not a url') === false, 'Should reject invalid URL');
  console.assert(isValidURL('') === false, 'Should reject empty string');
  console.assert(isValidURL(null) === false, 'Should reject null');
  
  console.log('✓ isValidURL tests passed');
}

// Test isValidEmail
function testIsValidEmail() {
  console.log('Testing isValidEmail...');
  
  console.assert(isValidEmail('test@example.com') === true, 'Should validate valid email');
  console.assert(isValidEmail('user.name+tag@example.co.uk') === true, 'Should validate complex email');
  console.assert(isValidEmail('invalid@') === false, 'Should reject incomplete email');
  console.assert(isValidEmail('@example.com') === false, 'Should reject missing username');
  console.assert(isValidEmail('invalid') === false, 'Should reject invalid format');
  console.assert(isValidEmail('') === false, 'Should reject empty string');
  
  console.log('✓ isValidEmail tests passed');
}

// Test isNonEmptyString
function testIsNonEmptyString() {
  console.log('Testing isNonEmptyString...');
  
  console.assert(isNonEmptyString('hello') === true, 'Should accept non-empty string');
  console.assert(isNonEmptyString('  text  ') === true, 'Should accept string with spaces');
  console.assert(isNonEmptyString('') === false, 'Should reject empty string');
  console.assert(isNonEmptyString('   ') === false, 'Should reject whitespace-only string');
  console.assert(isNonEmptyString(null) === false, 'Should reject null');
  console.assert(isNonEmptyString(123) === false, 'Should reject non-string');
  
  console.log('✓ isNonEmptyString tests passed');
}

// Test isValidLength
function testIsValidLength() {
  console.log('Testing isValidLength...');
  
  console.assert(isValidLength('hello', 3, 10) === true, 'Should accept string within range');
  console.assert(isValidLength('hi', 3, 10) === false, 'Should reject too short string');
  console.assert(isValidLength('this is too long', 3, 10) === false, 'Should reject too long string');
  console.assert(isValidLength('  test  ', 3, 10) === true, 'Should trim before checking');
  
  console.log('✓ isValidLength tests passed');
}

// Test isPositiveNumber
function testIsPositiveNumber() {
  console.log('Testing isPositiveNumber...');
  
  console.assert(isPositiveNumber(5) === true, 'Should accept positive number');
  console.assert(isPositiveNumber(0.1) === true, 'Should accept positive decimal');
  console.assert(isPositiveNumber('10') === true, 'Should accept numeric string');
  console.assert(isPositiveNumber(0) === false, 'Should reject zero');
  console.assert(isPositiveNumber(-5) === false, 'Should reject negative number');
  console.assert(isPositiveNumber('not a number') === false, 'Should reject non-numeric string');
  console.assert(isPositiveNumber(Infinity) === false, 'Should reject Infinity');
  
  console.log('✓ isPositiveNumber tests passed');
}

// Test isInRange
function testIsInRange() {
  console.log('Testing isInRange...');
  
  console.assert(isInRange(5, 0, 10) === true, 'Should accept number in range');
  console.assert(isInRange(0, 0, 10) === true, 'Should accept minimum value');
  console.assert(isInRange(10, 0, 10) === true, 'Should accept maximum value');
  console.assert(isInRange(-1, 0, 10) === false, 'Should reject below minimum');
  console.assert(isInRange(11, 0, 10) === false, 'Should reject above maximum');
  
  console.log('✓ isInRange tests passed');
}

// Test validateRequiredFields
function testValidateRequiredFields() {
  console.log('Testing validateRequiredFields...');
  
  const obj = {
    name: 'Test',
    email: 'test@example.com',
    age: 25
  };
  
  const result1 = validateRequiredFields(obj, ['name', 'email']);
  console.assert(result1.isValid === true, 'Should validate object with all fields');
  console.assert(result1.missing.length === 0, 'Should have no missing fields');
  
  const result2 = validateRequiredFields(obj, ['name', 'email', 'phone']);
  console.assert(result2.isValid === false, 'Should invalidate object with missing fields');
  console.assert(result2.missing.includes('phone'), 'Should list missing field');
  
  const result3 = validateRequiredFields(null, ['name']);
  console.assert(result3.isValid === false, 'Should invalidate null object');
  
  console.log('✓ validateRequiredFields tests passed');
}

// Test isValidPrice
function testIsValidPrice() {
  console.log('Testing isValidPrice...');
  
  console.assert(isValidPrice(100) === true, 'Should accept integer price');
  console.assert(isValidPrice(99.99) === true, 'Should accept decimal price');
  console.assert(isValidPrice('50.00') === true, 'Should accept price string');
  console.assert(isValidPrice(0) === true, 'Should accept zero');
  console.assert(isValidPrice(-10) === false, 'Should reject negative price');
  console.assert(isValidPrice(99.999) === false, 'Should reject more than 2 decimal places');
  console.assert(isValidPrice('not a price') === false, 'Should reject non-numeric');
  
  console.log('✓ isValidPrice tests passed');
}

// Test isValidID
function testIsValidID() {
  console.log('Testing isValidID...');
  
  console.assert(isValidID('dest-001') === true, 'Should accept valid ID with hyphen');
  console.assert(isValidID('user_123') === true, 'Should accept valid ID with underscore');
  console.assert(isValidID('abc123XYZ') === true, 'Should accept alphanumeric ID');
  console.assert(isValidID('') === false, 'Should reject empty string');
  console.assert(isValidID('invalid id') === false, 'Should reject ID with spaces');
  console.assert(isValidID('invalid@id') === false, 'Should reject ID with special chars');
  
  console.log('✓ isValidID tests passed');
}

// Test sanitizeString
function testSanitizeString() {
  console.log('Testing sanitizeString...');
  
  const sanitized1 = sanitizeString('<script>alert("xss")</script>');
  console.assert(!sanitized1.includes('<script>'), 'Should escape script tags');
  
  const sanitized2 = sanitizeString('Hello <b>World</b>');
  console.assert(sanitized2.includes('&lt;b&gt;'), 'Should escape HTML tags');
  
  const sanitized3 = sanitizeString('Normal text');
  console.assert(sanitized3 === 'Normal text', 'Should preserve normal text');
  
  console.log('✓ sanitizeString tests passed');
}

// Test isValidSearchQuery
function testIsValidSearchQuery() {
  console.log('Testing isValidSearchQuery...');
  
  console.assert(isValidSearchQuery('bali') === true, 'Should accept valid query');
  console.assert(isValidSearchQuery('tropical beach destination') === true, 'Should accept multi-word query');
  console.assert(isValidSearchQuery('') === false, 'Should reject empty query');
  console.assert(isValidSearchQuery('  ') === false, 'Should reject whitespace-only query');
  
  const longQuery = 'a'.repeat(101);
  console.assert(isValidSearchQuery(longQuery, 1, 100) === false, 'Should reject query exceeding max length');
  
  console.log('✓ isValidSearchQuery tests passed');
}

// Test isValidImageURL
function testIsValidImageURL() {
  console.log('Testing isValidImageURL...');
  
  console.assert(isValidImageURL('https://example.com/image.jpg') === true, 'Should accept JPG URL');
  console.assert(isValidImageURL('https://example.com/photo.png') === true, 'Should accept PNG URL');
  console.assert(isValidImageURL('https://example.com/graphic.svg') === true, 'Should accept SVG URL');
  console.assert(isValidImageURL('https://example.com/picture.webp') === true, 'Should accept WebP URL');
  console.assert(isValidImageURL('https://example.com/file.pdf') === false, 'Should reject non-image URL');
  console.assert(isValidImageURL('not a url') === false, 'Should reject invalid URL');
  
  console.log('✓ isValidImageURL tests passed');
}

// Test isFutureDate
function testIsFutureDate() {
  console.log('Testing isFutureDate...');
  
  const futureDate = new Date(Date.now() + 86400000); // Tomorrow
  const pastDate = new Date(Date.now() - 86400000); // Yesterday
  
  console.assert(isFutureDate(futureDate) === true, 'Should accept future date');
  console.assert(isFutureDate(pastDate) === false, 'Should reject past date');
  console.assert(isFutureDate('invalid') === false, 'Should reject invalid date');
  
  console.log('✓ isFutureDate tests passed');
}

// Test validateSchema
function testValidateSchema() {
  console.log('Testing validateSchema...');
  
  const obj = {
    name: 'Test',
    age: 25,
    active: true
  };
  
  const schema = {
    name: 'string',
    age: 'number',
    active: 'boolean'
  };
  
  const result1 = validateSchema(obj, schema);
  console.assert(result1.isValid === true, 'Should validate matching schema');
  console.assert(result1.errors.length === 0, 'Should have no errors');
  
  const badObj = {
    name: 'Test',
    age: '25', // Wrong type
    active: true
  };
  
  const result2 = validateSchema(badObj, schema);
  console.assert(result2.isValid === false, 'Should invalidate mismatched schema');
  console.assert(result2.errors.length > 0, 'Should have errors');
  
  console.log('✓ validateSchema tests passed');
}

// Run all tests
export function runValidatorTests() {
  console.log('=== Running Validator Tests ===');
  
  testIsValidURL();
  testIsValidEmail();
  testIsNonEmptyString();
  testIsValidLength();
  testIsPositiveNumber();
  testIsInRange();
  testValidateRequiredFields();
  testIsValidPrice();
  testIsValidID();
  testSanitizeString();
  testIsValidSearchQuery();
  testIsValidImageURL();
  testIsFutureDate();
  testValidateSchema();
  
  console.log('=== All Validator Tests Completed ===');
}

// Auto-run if loaded directly
if (typeof window !== 'undefined' && document.readyState !== 'loading') {
  runValidatorTests();
} else if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', runValidatorTests);
}
