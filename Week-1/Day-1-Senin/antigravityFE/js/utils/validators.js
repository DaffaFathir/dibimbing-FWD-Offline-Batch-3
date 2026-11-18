/**
 * Validation Utilities
 */

export function isNotEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isPositiveNumber(value) {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}

export function isValidUrl(value) {
  if (typeof value !== 'string') return false;
  return value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/') || value.startsWith('./') || value.startsWith('data:');
}

