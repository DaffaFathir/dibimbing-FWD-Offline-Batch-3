# Utility Modules Documentation

This directory contains reusable utility functions for the Southeast Asia Tourist Destination Website.

## Overview

The utility modules provide common functionality for:
- **DOM Helpers**: DOM manipulation and interaction utilities
- **Validators**: Input validation and data verification functions  
- **Formatters**: Data formatting and display utilities

## DOM Helpers (`dom-helpers.js`)

### Element Creation & Manipulation

#### `createElement(tag, className, content)`
Create HTML elements with classes and content.

```javascript
import { createElement } from './utils/dom-helpers.js';

// Basic usage
const div = createElement('div', 'card', 'Hello World');

// Multiple classes
const button = createElement('button', ['btn', 'btn-primary'], 'Click Me');

// With child node
const child = document.createElement('span');
const parent = createElement('div', 'container', child);
```

#### `clearElement(element)`
Remove all child nodes from an element efficiently.

```javascript
import { clearElement } from './utils/dom-helpers.js';

const container = document.querySelector('.destination-grid');
clearElement(container); // Removes all destinations
```

#### `setAttributes(element, attributes)`
Set multiple attributes at once.

```javascript
import { setAttributes } from './utils/dom-helpers.js';

const input = document.createElement('input');
setAttributes(input, {
  type: 'text',
  placeholder: 'Search destinations...',
  'aria-label': 'Search',
  required: 'true'
});
```

#### `appendChildren(parent, children)`
Efficiently append multiple children using DocumentFragment.

```javascript
import { appendChildren } from './utils/dom-helpers.js';

const container = document.querySelector('.grid');
const cards = destinations.map(dest => createDestinationCard(dest));
appendChildren(container, cards); // Single reflow
```

### DOM Querying

#### `querySelector(selector, context)`
Query with built-in error handling.

```javascript
import { querySelector } from './utils/dom-helpers.js';

const header = querySelector('[data-component="header"]');
const button = querySelector('.btn-primary', container);
```

#### `querySelectorAll(selector, context)`
Query all with error handling.

```javascript
import { querySelectorAll } from './utils/dom-helpers.js';

const cards = querySelectorAll('.destination-card');
cards.forEach(card => {
  // Process each card
});
```

### Event Handling

#### `addEventListener(element, event, handler, options)`
Add event listeners with automatic cleanup.

```javascript
import { addEventListener } from './utils/dom-helpers.js';

const button = document.querySelector('.btn');
const cleanup = addEventListener(button, 'click', (e) => {
  console.log('Clicked!');
});

// Later: cleanup when component is destroyed
cleanup();
```

### Utility Functions

#### `toggleClass(element, className, force)`
Toggle CSS classes.

```javascript
import { toggleClass } from './utils/dom-helpers.js';

toggleClass(menu, 'open'); // Toggle
toggleClass(menu, 'open', true); // Force add
toggleClass(menu, 'open', false); // Force remove
```

#### `createElementFromHTML(html)`
Create element from HTML string.

```javascript
import { createElementFromHTML } from './utils/dom-helpers.js';

const card = createElementFromHTML(`
  <div class="card">
    <h3>Title</h3>
    <p>Content</p>
  </div>
`);
```

#### `isInViewport(element)`
Check if element is visible in viewport.

```javascript
import { isInViewport } from './utils/dom-helpers.js';

if (isInViewport(image)) {
  loadImage(image);
}
```

#### `debounce(func, delay)`
Debounce function calls (useful for search inputs).

```javascript
import { debounce } from './utils/dom-helpers.js';

const debouncedSearch = debounce((query) => {
  searchDestinations(query);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

#### `throttle(func, limit)`
Throttle function calls (useful for scroll handlers).

```javascript
import { throttle } from './utils/dom-helpers.js';

const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);

window.addEventListener('scroll', throttledScroll);
```

---

## Validators (`validators.js`)

### String Validation

#### `isNonEmptyString(str)`
Check if string is non-empty after trimming.

```javascript
import { isNonEmptyString } from './utils/validators.js';

if (isNonEmptyString(destination.name)) {
  renderDestination(destination);
}
```

#### `isValidLength(str, min, max)`
Validate string length within range.

```javascript
import { isValidLength } from './utils/validators.js';

if (!isValidLength(description, 10, 200)) {
  throw new Error('Description must be 10-200 characters');
}
```

#### `isValidSearchQuery(query, minLength, maxLength)`
Validate search query.

```javascript
import { isValidSearchQuery } from './utils/validators.js';

if (isValidSearchQuery(searchInput.value, 1, 100)) {
  performSearch(searchInput.value);
}
```

### Format Validation

#### `isValidURL(url)`
Validate HTTP/HTTPS URLs.

```javascript
import { isValidURL } from './utils/validators.js';

if (isValidURL(imageUrl)) {
  img.src = imageUrl;
} else {
  img.src = '/placeholder.jpg';
}
```

#### `isValidEmail(email)`
Validate email addresses.

```javascript
import { isValidEmail } from './utils/validators.js';

if (!isValidEmail(userEmail)) {
  showError('Please enter a valid email address');
}
```

#### `isValidImageURL(url)`
Validate image URLs (checks extension).

```javascript
import { isValidImageURL } from './utils/validators.js';

if (isValidImageURL(destination.imageUrl)) {
  loadImage(destination.imageUrl);
}
```

#### `isValidID(id)`
Validate ID format (alphanumeric with hyphens/underscores).

```javascript
import { isValidID } from './utils/validators.js';

if (!isValidID(destinationId)) {
  throw new Error('Invalid destination ID format');
}
```

### Number Validation

#### `isPositiveNumber(value)`
Check if value is a positive number.

```javascript
import { isPositiveNumber } from './utils/validators.js';

if (!isPositiveNumber(price)) {
  throw new Error('Price must be a positive number');
}
```

#### `isInRange(value, min, max)`
Check if number is within range.

```javascript
import { isInRange } from './utils/validators.js';

if (isInRange(rating, 1, 5)) {
  setRating(rating);
}
```

#### `isValidPrice(price)`
Validate price format and value.

```javascript
import { isValidPrice } from './utils/validators.js';

if (!isValidPrice(destination.price)) {
  throw new Error('Invalid price format');
}
```

### Object Validation

#### `validateRequiredFields(obj, requiredFields)`
Validate object has all required fields.

```javascript
import { validateRequiredFields } from './utils/validators.js';

const result = validateRequiredFields(destination, [
  'id', 'name', 'location', 'price', 'imageUrl'
]);

if (!result.isValid) {
  console.error('Missing fields:', result.missing);
}
```

#### `validateSchema(obj, schema)`
Validate object matches type schema.

```javascript
import { validateSchema } from './utils/validators.js';

const schema = {
  name: 'string',
  price: 'number',
  active: 'boolean'
};

const result = validateSchema(destination, schema);
if (!result.isValid) {
  console.error('Schema errors:', result.errors);
}
```

### Security

#### `sanitizeString(str)`
Sanitize string for safe HTML display.

```javascript
import { sanitizeString } from './utils/validators.js';

const safeText = sanitizeString(userInput);
element.innerHTML = safeText; // Safe from XSS
```

---

## Formatters (`formatters.js`)

### Price & Number Formatting

#### `formatPrice(price, currency, locale)`
Format prices with currency symbol and separators.

```javascript
import { formatPrice } from './utils/formatters.js';

const price = formatPrice(1299); // "$1,299"
const eurPrice = formatPrice(999, 'EUR', 'de-DE'); // "999 €"
```

#### `formatNumber(num, decimals)`
Format numbers with thousands separators.

```javascript
import { formatNumber } from './utils/formatters.js';

const views = formatNumber(1500000); // "1,500,000"
const rating = formatNumber(4.567, 2); // "4.57"
```

#### `formatPercentage(value, decimals)`
Format percentage values.

```javascript
import { formatPercentage } from './utils/formatters.js';

const discount = formatPercentage(15); // "15%"
const progress = formatPercentage(66.66, 2); // "66.66%"
```

### Text Formatting

#### `truncateText(text, maxLength, ellipsis)`
Truncate text with ellipsis at word boundaries.

```javascript
import { truncateText } from './utils/formatters.js';

const shortDesc = truncateText(destination.description, 150);
// "Experience pristine beaches and ancient temples..."
```

#### `formatExcerpt(text, wordLimit, ellipsis)`
Create excerpt with word limit.

```javascript
import { formatExcerpt } from './utils/formatters.js';

const excerpt = formatExcerpt(article.content, 50);
```

#### `capitalize(str)`
Capitalize first letter.

```javascript
import { capitalize } from './utils/formatters.js';

const name = capitalize('bali'); // "Bali"
```

#### `toTitleCase(str)`
Convert to title case.

```javascript
import { toTitleCase } from './utils/formatters.js';

const title = toTitleCase('southeast asia destinations');
// "Southeast Asia Destinations"
```

#### `stripHTMLTags(html)`
Remove HTML tags from string.

```javascript
import { stripHTMLTags } from './utils/formatters.js';

const plainText = stripHTMLTags('<p>Hello <b>World</b></p>');
// "Hello World"
```

### Date & Time Formatting

#### `formatDate(date, options)`
Format dates in human-readable format.

```javascript
import { formatDate } from './utils/formatters.js';

const date = formatDate(new Date()); // "January 15, 2024"
const shortDate = formatDate(date, { 
  month: 'short', 
  day: 'numeric' 
}); // "Jan 15"
```

#### `formatRelativeTime(date)`
Format relative time (e.g., "2 hours ago").

```javascript
import { formatRelativeTime } from './utils/formatters.js';

const posted = formatRelativeTime(comment.createdAt);
// "2 hours ago" or "3 days ago"
```

#### `formatDuration(seconds)`
Format duration in human-readable format.

```javascript
import { formatDuration } from './utils/formatters.js';

const duration = formatDuration(3665); // "1h 1m 5s"
const short = formatDuration(45); // "45s"
```

### Other Formatters

#### `formatList(items, conjunction)`
Format array as comma-separated list with conjunction.

```javascript
import { formatList } from './utils/formatters.js';

const tags = formatList(['beach', 'culture', 'adventure']);
// "beach, culture, and adventure"

const options = formatList(['tea', 'coffee'], 'or');
// "tea or coffee"
```

#### `formatFileSize(bytes, decimals)`
Format file size in human-readable units.

```javascript
import { formatFileSize } from './utils/formatters.js';

const size = formatFileSize(1572864); // "1.5 MB"
```

#### `formatPhoneNumber(phone)`
Format US phone numbers.

```javascript
import { formatPhoneNumber } from './utils/formatters.js';

const phone = formatPhoneNumber('1234567890');
// "(123) 456-7890"
```

---

## Testing

Run the test suite by opening `test-utilities.html` in a browser:

```bash
# Windows
start test-utilities.html

# Mac/Linux
open test-utilities.html
```

The test page provides:
- Individual test suites for each module
- Combined "Run All Tests" option
- Console output with color-coded results
- Status indicators for each test suite

---

## Best Practices

### DOM Helpers
- Use `clearElement()` instead of `innerHTML = ''` for better performance
- Always call cleanup functions returned by `addEventListener()`
- Use debounce for input handlers, throttle for scroll handlers
- Batch DOM operations with `appendChildren()` to minimize reflows

### Validators
- Validate all user inputs before processing
- Use `sanitizeString()` before displaying user-generated content
- Combine multiple validators for comprehensive validation
- Return detailed validation results for user feedback

### Formatters
- Format data at display time, not storage time
- Use consistent formatting across the application
- Handle edge cases (null, undefined, invalid values)
- Provide locale-specific formatting when needed

---

## Dependencies

All utility modules are vanilla JavaScript with no external dependencies. They use:
- ES6+ features (modules, arrow functions, template literals)
- Modern browser APIs (Intl, URL, etc.)
- Standard DOM APIs

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Contributing

When adding new utilities:

1. Follow existing patterns and naming conventions
2. Include JSDoc comments with parameter types
3. Handle edge cases and invalid inputs gracefully
4. Add corresponding tests in the test file
5. Update this README with usage examples
6. Ensure functions are pure and don't cause side effects

---

## Related Files

- `dom-helpers.js` - DOM manipulation utilities
- `validators.js` - Input validation functions
- `formatters.js` - Data formatting functions
- `dom-helpers.test.js` - DOM helper tests
- `validators.test.js` - Validator tests
- `formatters.test.js` - Formatter tests
- `test-utilities.html` - Interactive test runner

---

## License

Part of the Southeast Asia Tourist Destination Website project.
