/**
 * Input Validation Functions
 * Provides validators for common input types and data formats
 */

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is valid
 */
export function isValidURL(url) {
  if (typeof url !== 'string' || !url.trim()) {
    return false;
  }
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (error) {
    return false;
  }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export function isValidEmail(email) {
  if (typeof email !== 'string' || !email.trim()) {
    return false;
  }
  
  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Check if string is non-empty
 * @param {string} str - String to check
 * @returns {boolean} Whether string is non-empty
 */
export function isNonEmptyString(str) {
  return typeof str === 'string' && str.trim().length > 0;
}

/**
 * Validate string length
 * @param {string} str - String to validate
 * @param {number} min - Minimum length
 * @param {number} max - Maximum length
 * @returns {boolean} Whether string length is within range
 */
export function isValidLength(str, min, max) {
  if (typeof str !== 'string') {
    return false;
  }
  
  const length = str.trim().length;
  return length >= min && length <= max;
}

/**
 * Validate positive number
 * @param {*} value - Value to validate
 * @returns {boolean} Whether value is a positive number
 */
export function isPositiveNumber(value) {
  const num = Number(value);
  return !isNaN(num) && isFinite(num) && num > 0;
}

/**
 * Validate number within range
 * @param {*} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} Whether value is within range
 */
export function isInRange(value, min, max) {
  const num = Number(value);
  return !isNaN(num) && isFinite(num) && num >= min && num <= max;
}

/**
 * Validate required fields in object
 * @param {Object} obj - Object to validate
 * @param {Array<string>} requiredFields - Array of required field names
 * @returns {Object} Validation result with isValid and missing fields
 */
export function validateRequiredFields(obj, requiredFields) {
  if (typeof obj !== 'object' || obj === null) {
    return {
      isValid: false,
      missing: requiredFields
    };
  }
  
  const missing = requiredFields.filter(field => {
    const value = obj[field];
    return value === undefined || value === null || value === '';
  });
  
  return {
    isValid: missing.length === 0,
    missing
  };
}

/**
 * Validate price format and value
 * @param {*} price - Price to validate
 * @returns {boolean} Whether price is valid
 */
export function isValidPrice(price) {
  const num = Number(price);
  
  if (isNaN(num) || !isFinite(num) || num < 0) {
    return false;
  }
  
  // Check for reasonable decimal places (max 2)
  const decimalPlaces = (price.toString().split('.')[1] || '').length;
  return decimalPlaces <= 2;
}

/**
 * Validate ID format (alphanumeric with hyphens)
 * @param {string} id - ID to validate
 * @returns {boolean} Whether ID is valid
 */
export function isValidID(id) {
  if (typeof id !== 'string' || !id.trim()) {
    return false;
  }
  
  // Allow alphanumeric characters, hyphens, and underscores
  const idRegex = /^[a-zA-Z0-9_-]+$/;
  return idRegex.test(id);
}

/**
 * Sanitize string for safe display
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') {
    return '';
  }
  
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Validate search query
 * @param {string} query - Search query to validate
 * @param {number} [minLength=1] - Minimum query length
 * @param {number} [maxLength=100] - Maximum query length
 * @returns {boolean} Whether query is valid
 */
export function isValidSearchQuery(query, minLength = 1, maxLength = 100) {
  if (typeof query !== 'string') {
    return false;
  }
  
  const trimmed = query.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}

/**
 * Validate image URL (checks for common image extensions)
 * @param {string} url - Image URL to validate
 * @returns {boolean} Whether URL appears to be an image
 */
export function isValidImageURL(url) {
  if (!isValidURL(url)) {
    return false;
  }
  
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
  return imageExtensions.test(url.toLowerCase());
}

/**
 * Validate date is not in the past
 * @param {Date|string|number} date - Date to validate
 * @returns {boolean} Whether date is valid and not in the past
 */
export function isFutureDate(date) {
  try {
    const dateObj = new Date(date);
    return dateObj.getTime() > Date.now();
  } catch (error) {
    return false;
  }
}

/**
 * Validate object has specific structure
 * @param {Object} obj - Object to validate
 * @param {Object} schema - Expected structure with types
 * @returns {Object} Validation result
 */
export function validateSchema(obj, schema) {
  if (typeof obj !== 'object' || obj === null) {
    return {
      isValid: false,
      errors: ['Object is null or not an object']
    };
  }
  
  const errors = [];
  
  Object.entries(schema).forEach(([key, expectedType]) => {
    const value = obj[key];
    const actualType = typeof value;
    
    if (actualType !== expectedType) {
      errors.push(`Field "${key}" expected ${expectedType}, got ${actualType}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
