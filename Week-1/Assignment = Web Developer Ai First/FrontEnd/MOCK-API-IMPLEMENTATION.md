# Mock API Service Implementation

## Summary

Task **3.2 - Implement Mock API Service** has been completed successfully.

## Implementation Details

### File Created: `js/services/mock-api.js`

A comprehensive Mock API Service that simulates back-end HTTP requests with realistic behavior.

### Features Implemented

#### 1. **Promise-Based Interface** ✅
- All methods return Promises for async/await patterns
- Consistent error handling across all methods
- Clean, modern JavaScript ES6+ syntax

#### 2. **Core Methods** ✅

##### `getAllDestinations()`
- Fetches all destination data from mock data store
- Returns deep cloned array of all destinations
- Simulates network delay (300-800ms)
- Requirements: 8.1, 8.3

##### `getDestinationById(id)`
- Fetches a single destination by ID
- Validates ID parameter (non-empty string)
- Throws error if destination not found
- Returns deep cloned destination object
- Simulates network delay (300-800ms)
- Requirements: 8.2, 8.3

##### `searchDestinations(query)`
- Searches destinations by query string
- Searches across: name, location, description, fullDescription, tags
- Case-insensitive matching
- Empty query returns all destinations
- Returns deep cloned array of matching results
- Simulates network delay (300-800ms)
- Requirements: 8.3

##### `submitOrder(orderData)` (Bonus)
- Future-proofing for back-end integration
- Accepts order data and validates required fields
- Generates mock order ID
- Returns order confirmation object
- Simulates network delay (300-800ms)

#### 3. **Realistic Network Delay** ✅
- Random delay between 300-800ms (configurable)
- Simulates real-world API latency
- Helps catch race conditions during development
- Requirements: 8.3

#### 4. **Error Simulation Capability** ✅
- Configurable error rate (0-100%)
- Simulates API failures for testing error handling
- Throws descriptive errors
- Requirements: 8.4

#### 5. **Deep Cloning / Data Immutability** ✅
- All returned data is deep cloned
- Prevents mutation of original mock data
- Ensures data consistency across multiple calls
- Handles nested objects and arrays
- Handles Date objects correctly

#### 6. **Configuration Options**
```javascript
new MockAPIService({
  minDelay: 300,    // Minimum network delay in ms
  maxDelay: 800,    // Maximum network delay in ms
  errorRate: 0      // Error percentage (0-100)
})
```

#### 7. **Singleton Export**
- Default `mockAPI` instance for normal use
- `MockAPIService` class export for custom instances (e.g., testing)

### Usage Examples

```javascript
import { mockAPI } from './services/mock-api.js';

// Get all destinations
const destinations = await mockAPI.getAllDestinations();

// Get specific destination
const bali = await mockAPI.getDestinationById('dest-001');

// Search destinations
const beaches = await mockAPI.searchDestinations('beach');
const thailand = await mockAPI.searchDestinations('thailand');

// Error handling
try {
  const dest = await mockAPI.getDestinationById('invalid-id');
} catch (error) {
  console.error('Failed to fetch destination:', error);
}
```

### Testing

Three test/verification files created:

1. **`test-mock-api.html`** - Comprehensive automated test suite
   - 12 automated tests covering all functionality
   - Tests all methods, error handling, delays, immutability
   - Visual test results in browser

2. **`verify-mock-api.html`** - Interactive manual verification
   - User-friendly interface for manual testing
   - Visual feedback for each test
   - Statistics dashboard
   - Run individual tests or all at once

3. **`js/services/mock-api.test.js`** - Test module (for Node.js if needed)
   - Same tests as HTML version
   - Can be adapted for Node.js environment

### Requirements Mapping

- **Requirement 8.1**: "WHEN the Destination_List_Page loads, THE Website SHALL send a request to the API for all destinations"
  - ✅ Implemented via `getAllDestinations()`

- **Requirement 8.2**: "WHEN the Destination_Detail_Page loads, THE Website SHALL send a request to the API for the specific destination by ID"
  - ✅ Implemented via `getDestinationById(id)`

- **Requirement 8.3**: "WHEN the API returns data, THE Website SHALL parse the response and render the information"
  - ✅ All methods return properly structured data ready for rendering
  - ✅ Realistic delays simulate actual API behavior

- **Requirement 8.4**: "IF the API request fails, THEN THE Website SHALL display an error message to the User"
  - ✅ Error simulation capability allows testing error scenarios
  - ✅ Descriptive error messages for all failure cases

### Design Compliance

The implementation follows the design document specifications:

- ✅ Promise-based interface
- ✅ Realistic network delays (300-800ms)
- ✅ Error simulation for testing
- ✅ Deep cloning prevents data mutation
- ✅ Comprehensive error handling
- ✅ Well-documented code with JSDoc comments
- ✅ Follows ES6 module pattern
- ✅ Works with existing mock-data.js

### Code Quality

- **Clean Code**: Well-structured, readable, maintainable
- **Documentation**: Comprehensive JSDoc comments
- **Error Handling**: Robust validation and error messages
- **Modularity**: Singleton pattern with class export for flexibility
- **Testing**: Comprehensive test coverage
- **Performance**: Efficient deep cloning algorithm

### Integration with Project

The Mock API Service:
- ✅ Imports data from `mock-data.js`
- ✅ Ready for use by State Manager (`state-manager.js`)
- ✅ Compatible with all components that need destination data
- ✅ Easy to replace with real API calls in production (same interface)

### Future-Proofing

The service is designed to be easily replaced with a real API:
1. Keep the same method signatures
2. Change from mock data to HTTP fetch calls
3. Remove simulation delays
4. Keep error handling structure

### How to Test

1. Start local server:
   ```bash
   cd FrontEnd
   python -m http.server 8080
   ```

2. Open in browser:
   - `http://localhost:8080/verify-mock-api.html` - Interactive manual tests
   - `http://localhost:8080/test-mock-api.html` - Automated test suite

3. Click "Run All Tests" or test individual features

### Files Created/Modified

- ✅ Created: `js/services/mock-api.js` (main implementation)
- ✅ Created: `test-mock-api.html` (automated tests)
- ✅ Created: `verify-mock-api.html` (interactive verification)
- ✅ Created: `js/services/mock-api.test.js` (test module)
- ✅ Uses: `js/services/mock-data.js` (existing, created in task 3.1)

## Task Completion

✅ **Task 3.2 Complete**: Mock API Service fully implemented with all required features:
- Promise-based interface
- getAllDestinations() with realistic delay
- getDestinationById(id) method
- searchDestinations(query) method
- Error simulation capability
- Deep cloning for data immutability
- Comprehensive testing
- Full requirements compliance (8.1, 8.2, 8.3, 8.4)

---

**Implementation Date**: Task execution session  
**Next Task**: 3.3 - Create Destination data model
