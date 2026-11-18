# Router Module Implementation

## Overview

The Router module has been successfully implemented for client-side navigation and query parameter parsing. This module provides the foundation for navigating between the list page (index.html) and detail page (detail.html), as well as handling URL query parameters.

**Requirements Satisfied:** 1.5, 2.5, 3.4

## Implementation Details

### File: `js/router.js`

The Router module includes the following features:

#### Core Navigation Methods

1. **`navigate(path, options)`**
   - Navigates to a new page
   - Supports `replace` option to replace current history entry
   - Validates and normalizes paths
   - Handles full page navigation (multi-page architecture)

2. **`getQueryParam(name)`**
   - Retrieves a single query parameter value from the current URL
   - Returns `null` if parameter doesn't exist
   - Handles URL-encoded values automatically
   - Validates parameter names

3. **`getAllQueryParams()`**
   - Returns all query parameters as an object
   - Useful for accessing multiple parameters at once
   - Returns empty object if no parameters exist

#### Helper Methods

4. **`getCurrentPath()`**
   - Returns the current pathname without query string
   - Example: `/detail.html`

5. **`getCurrentUrl()`**
   - Returns the full current URL including query parameters
   - Example: `http://localhost/detail.html?id=123`

6. **`buildUrl(path, params)`**
   - Builds a URL with query parameters
   - Automatically filters out `null` and `undefined` values
   - URL-encodes parameter values
   - Returns path + query string

7. **`navigateToDetail(destinationId)`**
   - Convenience method to navigate to detail page with a destination ID
   - Validates destination ID is provided
   - Builds proper URL with `id` query parameter

8. **`navigateToList(options)`**
   - Convenience method to navigate back to the list page
   - Supports navigation options (replace, etc.)

9. **`isOnPage(pageName)`**
   - Checks if currently on a specific page ('list' or 'detail')
   - Returns boolean
   - Useful for conditional rendering

#### Browser Integration

10. **Popstate Event Listener**
    - Handles browser back/forward navigation
    - Logs navigation state changes
    - Prepared for future SPA enhancements

11. **Link Click Interception**
    - Automatically intercepts clicks on links with `data-route` attribute
    - Prevents default browser navigation
    - Routes through the `navigate()` method
    - Regular links without `data-route` work normally

## Usage Examples

### Basic Navigation

```javascript
import { router } from './js/router.js';

// Navigate to a detail page
router.navigateToDetail('dest-001');
// Results in: /detail.html?id=dest-001

// Navigate back to list page
router.navigateToList();
// Results in: /index.html
```

### Query Parameter Reading

```javascript
import { router } from './js/router.js';

// On page: /detail.html?id=dest-001&category=beach

// Get single parameter
const destinationId = router.getQueryParam('id');
// Returns: 'dest-001'

// Get all parameters
const params = router.getAllQueryParams();
// Returns: { id: 'dest-001', category: 'beach' }
```

### URL Building

```javascript
import { router } from './js/router.js';

// Build a detail page URL
const url = router.buildUrl('/detail.html', {
  id: 'dest-001',
  category: 'beach',
  sort: 'price'
});
// Returns: '/detail.html?id=dest-001&category=beach&sort=price'

// null/undefined values are automatically filtered
const url2 = router.buildUrl('/index.html', {
  category: 'beach',
  filter: null,  // Skipped
  page: undefined  // Skipped
});
// Returns: '/index.html?category=beach'
```

### Page Detection

```javascript
import { router } from './js/router.js';

// Check current page
if (router.isOnPage('detail')) {
  console.log('Currently on detail page');
  const destinationId = router.getQueryParam('id');
  // Load destination details
}

if (router.isOnPage('list')) {
  console.log('Currently on list page');
  // Load destination list
}
```

### Link Interception

```html
<!-- Links with data-route attribute are intercepted -->
<a href="/detail.html?id=dest-001" data-route="detail">
  View Details
</a>

<!-- Regular links work normally (no data-route) -->
<a href="https://external-site.com">
  External Link
</a>
```

## Architecture

### Multi-Page Application (MPA) Design

The router is designed for a multi-page architecture where:
- Each page is a separate HTML file (index.html, detail.html)
- Navigation causes full page reloads
- The router intercepts certain links to control navigation
- Future enhancement: Can be upgraded to SPA with more routing logic

### Browser API Usage

- **URLSearchParams**: For query parameter parsing (modern, clean API)
- **History API**: For future state management enhancements
- **Event Delegation**: For efficient link click interception
- **URL Constructor**: For safe URL building with parameters

## Testing

### Test File: `js/router.test.js`

Comprehensive test suite covering:
- Constructor and initialization
- Query parameter methods (getQueryParam, getAllQueryParams)
- Navigation methods (navigate, navigateToDetail, navigateToList)
- Helper methods (buildUrl, getCurrentPath, isOnPage)
- Link interception with data-route attributes
- Browser back/forward navigation handling
- Edge cases and error handling

### Test Runner: `test-router.html`

HTML test runner for browser-based testing.

### Verification Page: `verify-router.html`

Interactive demo page showing all Router features with live examples:
- Query parameter reading
- URL building
- Page detection
- Navigation methods
- Link interception demonstration
- Current router state display

## Integration Points

### With Main Application (main.js)

```javascript
import { router } from './router.js';

class App {
  constructor() {
    this.router = router;
    this.init();
  }

  init() {
    // Check if on detail page
    if (this.router.isOnPage('detail')) {
      const destinationId = this.router.getQueryParam('id');
      if (destinationId) {
        this.loadDestinationDetail(destinationId);
      }
    }
  }
}
```

### With Components

```javascript
// In DestinationCard component
handleDetailClick(destinationId) {
  router.navigateToDetail(destinationId);
}

// In DestinationDetail component
handleBackClick() {
  router.navigateToList();
}
```

## File Structure

```
FrontEnd/
├── js/
│   ├── router.js              # Main router implementation
│   └── router.test.js         # Comprehensive test suite
├── test-router.html           # Test runner (browser)
├── verify-router.html         # Interactive demo/verification
└── ROUTER-IMPLEMENTATION.md   # This documentation
```

## Design Decisions

### 1. Multi-Page vs. Single-Page

**Decision**: Implement for multi-page architecture with full page navigation.

**Rationale**: 
- Matches project requirements (two separate HTML files)
- Simpler initial implementation
- Better SEO and browser compatibility
- Can be enhanced to SPA later without breaking changes

### 2. Query Parameter API

**Decision**: Use native URLSearchParams API.

**Rationale**:
- Modern, well-supported browser API
- Clean, intuitive interface
- Automatic URL encoding/decoding
- No need for custom parsing logic

### 3. Link Interception

**Decision**: Use event delegation with data-route attribute.

**Rationale**:
- Single event listener for all links (performance)
- Opt-in behavior (doesn't break regular links)
- Easy to identify routed links in HTML
- Flexible for future enhancements

### 4. Singleton Pattern

**Decision**: Export both class and singleton instance.

**Rationale**:
- Singleton for convenience (most common use case)
- Class export allows multiple instances if needed
- Consistent with other project modules (StateManager, EventBus)

## Future Enhancements

Possible improvements for future iterations:

1. **Route Guards**: Add authentication/authorization checks before navigation
2. **Route Transitions**: Smooth page transitions (fade in/out)
3. **History State Management**: Store and restore scroll position, form data
4. **SPA Mode**: Add option to prevent page reloads and update content dynamically
5. **Route Patterns**: Support dynamic routes like `/detail/:id`
6. **Middleware**: Add before/after navigation hooks
7. **Loading States**: Show loading indicators during navigation

## Testing Instructions

### Run in Browser

1. Open `verify-router.html` in a web browser
2. Test each feature interactively
3. Check browser console for logs

### Run Unit Tests

1. Open `test-router.html` in a web browser
2. View test results in the page
3. Check browser console for detailed output

### Manual Testing Checklist

- [ ] Navigate from list to detail page with destination ID
- [ ] Use browser back button (should go back to list)
- [ ] Use browser forward button (should go forward to detail)
- [ ] Verify query parameters are parsed correctly
- [ ] Click links with data-route attribute
- [ ] Click regular links (should work normally)
- [ ] Test with URL-encoded values in query params
- [ ] Test with missing/invalid query parameters
- [ ] Test navigation with replace option

## Conclusion

The Router module is complete and ready for integration with the main application. It provides all necessary navigation and query parameter functionality required for the Southeast Asia Tourist Destination Website.

**Status**: ✅ Implementation Complete
**Requirements**: ✅ 1.5, 2.5, 3.4 Satisfied
**Testing**: ✅ Comprehensive test suite included
**Documentation**: ✅ Complete with examples