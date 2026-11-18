/**
 * Tests for Destination Model
 */

import { Destination } from './destination.js';

// Test data
const validDestinationData = {
  id: 'dest-001',
  name: 'Bali Paradise Beach',
  location: 'Bali, Indonesia',
  description: 'Experience pristine beaches, ancient temples, and vibrant culture in the Island of Gods.',
  fullDescription: 'Bali is a tropical paradise that offers a perfect blend of natural beauty and rich cultural heritage. With its stunning beaches, lush rice terraces, ancient Hindu temples, and warm hospitality, Bali provides an unforgettable experience for every traveler. Whether you seek relaxation, adventure, or spiritual enlightenment, Bali has something special to offer.',
  price: 1299,
  imageUrl: '/assets/images/destinations/bali-001.jpg',
  additionalImages: ['/assets/images/destinations/bali-002.jpg'],
  tags: ['beach', 'culture', 'temples', 'indonesia']
};

console.log('=== Destination Model Tests ===\n');

// Test 1: Valid destination creation
try {
  const dest1 = new Destination(validDestinationData);
  console.log('✓ Test 1 PASSED: Valid destination created successfully');
  console.log(`  ID: ${dest1.id}`);
  console.log(`  Name: ${dest1.name}`);
  console.log(`  Location: ${dest1.location}`);
} catch (error) {
  console.log('✗ Test 1 FAILED:', error.message);
}

// Test 2: getFormattedPrice() method
try {
  const dest2 = new Destination(validDestinationData);
  const formattedPrice = dest2.getFormattedPrice();
  if (formattedPrice === '$1,299') {
    console.log('✓ Test 2 PASSED: getFormattedPrice() returns correct format');
    console.log(`  Result: ${formattedPrice}`);
  } else {
    console.log(`✗ Test 2 FAILED: Expected "$1,299", got "${formattedPrice}"`);
  }
} catch (error) {
  console.log('✗ Test 2 FAILED:', error.message);
}

// Test 3: getShortDescription() method
try {
  const dest3 = new Destination(validDestinationData);
  const shortDesc = dest3.getShortDescription(50);
  if (shortDesc.length <= 53 && shortDesc.endsWith('...')) {
    console.log('✓ Test 3 PASSED: getShortDescription() truncates correctly');
    console.log(`  Result: ${shortDesc}`);
  } else {
    console.log(`✗ Test 3 FAILED: Expected truncated description with "...", got "${shortDesc}"`);
  }
} catch (error) {
  console.log('✗ Test 3 FAILED:', error.message);
}

// Test 4: getShortDescription() without truncation
try {
  const dest4 = new Destination(validDestinationData);
  const shortDesc = dest4.getShortDescription(200);
  if (shortDesc === validDestinationData.description) {
    console.log('✓ Test 4 PASSED: getShortDescription() returns full description when under limit');
  } else {
    console.log('✗ Test 4 FAILED: Description should not be truncated');
  }
} catch (error) {
  console.log('✗ Test 4 FAILED:', error.message);
}

// Test 5: matchesSearch() - name match
try {
  const dest5 = new Destination(validDestinationData);
  if (dest5.matchesSearch('bali')) {
    console.log('✓ Test 5 PASSED: matchesSearch() finds name match');
  } else {
    console.log('✗ Test 5 FAILED: Should match "bali" in name');
  }
} catch (error) {
  console.log('✗ Test 5 FAILED:', error.message);
}

// Test 6: matchesSearch() - location match
try {
  const dest6 = new Destination(validDestinationData);
  if (dest6.matchesSearch('indonesia')) {
    console.log('✓ Test 6 PASSED: matchesSearch() finds location match');
  } else {
    console.log('✗ Test 6 FAILED: Should match "indonesia" in location');
  }
} catch (error) {
  console.log('✗ Test 6 FAILED:', error.message);
}

// Test 7: matchesSearch() - tag match
try {
  const dest7 = new Destination(validDestinationData);
  if (dest7.matchesSearch('temples')) {
    console.log('✓ Test 7 PASSED: matchesSearch() finds tag match');
  } else {
    console.log('✗ Test 7 FAILED: Should match "temples" in tags');
  }
} catch (error) {
  console.log('✗ Test 7 FAILED:', error.message);
}

// Test 8: matchesSearch() - case insensitive
try {
  const dest8 = new Destination(validDestinationData);
  if (dest8.matchesSearch('BALI')) {
    console.log('✓ Test 8 PASSED: matchesSearch() is case insensitive');
  } else {
    console.log('✗ Test 8 FAILED: Should match "BALI" (case insensitive)');
  }
} catch (error) {
  console.log('✗ Test 8 FAILED:', error.message);
}

// Test 9: matchesSearch() - no match
try {
  const dest9 = new Destination(validDestinationData);
  if (!dest9.matchesSearch('tokyo')) {
    console.log('✓ Test 9 PASSED: matchesSearch() returns false for non-match');
  } else {
    console.log('✗ Test 9 FAILED: Should not match "tokyo"');
  }
} catch (error) {
  console.log('✗ Test 9 FAILED:', error.message);
}

// Test 10: toJSON() method
try {
  const dest10 = new Destination(validDestinationData);
  const json = dest10.toJSON();
  if (json.id === validDestinationData.id && 
      json.name === validDestinationData.name &&
      json.price === validDestinationData.price) {
    console.log('✓ Test 10 PASSED: toJSON() serializes correctly');
  } else {
    console.log('✗ Test 10 FAILED: JSON serialization incorrect');
  }
} catch (error) {
  console.log('✗ Test 10 FAILED:', error.message);
}

// Test 11: Validation - missing ID
try {
  const invalidData = { ...validDestinationData };
  delete invalidData.id;
  new Destination(invalidData);
  console.log('✗ Test 11 FAILED: Should throw error for missing ID');
} catch (error) {
  console.log('✓ Test 11 PASSED: Validation catches missing ID');
  console.log(`  Error: ${error.message}`);
}

// Test 12: Validation - short name
try {
  const invalidData = { ...validDestinationData, name: 'AB' };
  new Destination(invalidData);
  console.log('✗ Test 12 FAILED: Should throw error for short name');
} catch (error) {
  console.log('✓ Test 12 PASSED: Validation catches short name');
  console.log(`  Error: ${error.message}`);
}

// Test 13: Validation - negative price
try {
  const invalidData = { ...validDestinationData, price: -100 };
  new Destination(invalidData);
  console.log('✗ Test 13 FAILED: Should throw error for negative price');
} catch (error) {
  console.log('✓ Test 13 PASSED: Validation catches negative price');
  console.log(`  Error: ${error.message}`);
}

// Test 14: Validation - invalid image URL
try {
  const invalidData = { ...validDestinationData, imageUrl: 'not-a-url' };
  new Destination(invalidData);
  console.log('✗ Test 14 FAILED: Should throw error for invalid URL');
} catch (error) {
  console.log('✓ Test 14 PASSED: Validation catches invalid URL');
  console.log(`  Error: ${error.message}`);
}

// Test 15: Validation - short description
try {
  const invalidData = { ...validDestinationData, description: 'Short' };
  new Destination(invalidData);
  console.log('✗ Test 15 FAILED: Should throw error for short description');
} catch (error) {
  console.log('✓ Test 15 PASSED: Validation catches short description');
  console.log(`  Error: ${error.message}`);
}

// Test 16: Validation - short full description
try {
  const invalidData = { ...validDestinationData, fullDescription: 'Too short' };
  new Destination(invalidData);
  console.log('✗ Test 16 FAILED: Should throw error for short full description');
} catch (error) {
  console.log('✓ Test 16 PASSED: Validation catches short full description');
  console.log(`  Error: ${error.message}`);
}

console.log('\n=== All Tests Completed ===');
