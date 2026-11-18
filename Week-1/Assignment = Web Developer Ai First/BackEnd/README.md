# Southeast Asia Destinations API

Backend API for the Southeast Asia Tourist Destinations website.

## Tech Stack
- Node.js (v18+)
- Pure HTTP server (no Express)
- CORS enabled

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

Server runs on `http://localhost:3000`

## API Endpoints

### 1. Get All Destinations
```
GET /destination-list
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 15
}
```

### 2. Get Destination Detail
```
GET /destination-detail/:id
```

**Example:**
```
GET /destination-detail/dest-001
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "dest-001",
    "name": "Bali Paradise Beach",
    ...
  }
}
```

### 3. Health Check
```
GET /health
```

## Error Responses

### Invalid ID Format (400)
```json
{
  "success": false,
  "error": {
    "type": "ValidationError",
    "message": "Invalid destination ID format",
    "statusCode": 400
  }
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": {
    "type": "NotFoundError",
    "message": "Destination with ID \"dest-999\" not found",
    "statusCode": 404
  }
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": {
    "type": "ServerError",
    "message": "Internal server error",
    "statusCode": 500
  }
}
```

## Testing Examples

```bash
# Get all destinations
curl http://localhost:3000/destination-list

# Get specific destination
curl http://localhost:3000/destination-detail/dest-001

# Test invalid ID format
curl http://localhost:3000/destination-detail/invalid-id

# Test not found
curl http://localhost:3000/destination-detail/dest-999
```
