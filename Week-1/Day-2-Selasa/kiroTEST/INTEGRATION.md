# Front-End and Back-End Integration Guide

This document explains how the front-end (React) and back-end (Express) applications are integrated.

## Architecture Overview

```
┌─────────────────────┐         ┌─────────────────────┐
│   React Frontend    │         │  Express Backend    │
│   (Vite Dev Server) │         │   (Port 3000)       │
│   Port 5173         │         │                     │
│                     │         │                     │
│  /api/product-list ─┼────────►│ GET /product-list   │
│                     │         │                     │
│  /api/product-      │         │ GET /product-       │
│  detail/:id        ─┼────────►│ detail/:id          │
│                     │         │                     │
└─────────────────────┘         └─────────────────────┘
```

## Backend API Endpoints

The backend server runs on **http://localhost:3000** and provides:

### 1. Get All Products
- **Endpoint:** `GET /product-list`
- **Response:** Array of product objects
- **Example:**
  ```json
  [
    {
      "id": "wireless-headphones",
      "name": "Wireless Headphones",
      "price": 99.99,
      "image": "/products/headphones.jpg",
      "description": "Premium noise-cancelling wireless headphones..."
    }
  ]
  ```

### 2. Get Product by ID
- **Endpoint:** `GET /product-detail/:id`
- **Parameters:** 
  - `id` (path parameter) - Product ID (e.g., "wireless-headphones")
- **Response:** Single product object
- **Error Responses:**
  - `400` - Invalid product ID format
  - `404` - Product not found
  - `500` - Internal server error

## Frontend Integration

### Vite Proxy Configuration

The frontend uses Vite's proxy feature to route API requests to the backend:

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

**How it works:**
- Frontend requests to `/api/product-list` → Backend `http://localhost:3000/product-list`
- Frontend requests to `/api/product-detail/:id` → Backend `http://localhost:3000/product-detail/:id`

### Product Service

The `productService.js` handles all API communication:

```javascript
// src/services/productService.js
const API_BASE_URL = '/api'

export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/product-list`)
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`)
  }
  return await response.json()
}

export async function fetchProductById(id) {
  const response = await fetch(`${API_BASE_URL}/product-detail/${id}`)
  if (response.status === 404) {
    throw new Error('Product not found')
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.status}`)
  }
  return await response.json()
}
```

## Running the Application

### Step 1: Start the Backend Server

```bash
cd Belakang
npm install
npm start
```

The backend will start on **http://localhost:3000**

### Step 2: Start the Frontend Development Server

```bash
cd Depan
npm install
npm run dev
```

The frontend will start on **http://localhost:5173**

### Step 3: Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API (direct):** http://localhost:3000/product-list

## Testing

### Backend Tests
```bash
cd Belakang
npm test
```

### Frontend Tests
```bash
cd Depan
npm test
```

## Product ID Mapping

The backend uses kebab-case IDs (different from the old dummy data):

| Product Name                | Backend ID               | Old Dummy ID |
|-----------------------------|--------------------------|--------------|
| Wireless Headphones         | `wireless-headphones`    | `1`          |
| Smart Fitness Watch         | `smart-fitness-watch`    | `2`          |
| Portable Bluetooth Speaker  | `bluetooth-speaker`      | `3`          |
| Fast Wireless Charging Pad  | `wireless-charging-pad`  | `4`          |

## Error Handling

The frontend handles various error scenarios:

1. **Network Errors:** When the backend is unreachable
2. **404 Not Found:** When a product ID doesn't exist
3. **500 Server Error:** When the backend encounters an error
4. **400 Bad Request:** When invalid parameters are sent

Each error is caught and logged, with appropriate error messages displayed to the user.

## CORS Configuration

The backend uses the `cors` middleware to allow requests from any origin:

```javascript
app.use(cors());
```

In production, you should restrict this to specific origins for security.

## Changes Made

### Modified Files:

1. **`Depan/vite.config.js`**
   - Added proxy configuration to route `/api/*` requests to `http://localhost:3000`

2. **`Depan/src/services/productService.js`**
   - Removed dummy data (`PRODUCTS` array)
   - Updated `fetchProducts()` to fetch from `/api/product-list`
   - Updated `fetchProductById()` to fetch from `/api/product-detail/:id`
   - Added proper error handling for API responses

3. **`Depan/src/services/productService.test.js`**
   - Updated tests to mock the `fetch` API
   - Updated mock data to match backend product structure
   - Added tests for error scenarios

## Troubleshooting

### Issue: "Failed to fetch products"
- **Solution:** Ensure the backend server is running on port 3000

### Issue: "CORS error"
- **Solution:** The backend already has CORS enabled. If you still see this error, check if the backend is running.

### Issue: Product images not showing
- **Solution:** Ensure image files exist in `Depan/public/products/` directory

### Issue: "Product not found" errors
- **Solution:** Use the correct product IDs (e.g., `wireless-headphones`, not `1`)

## Next Steps

Consider these improvements:

1. **Environment Variables:** Use `.env` files to configure API URLs for different environments
2. **Loading States:** Add loading indicators while fetching data
3. **Error Boundaries:** Implement React error boundaries for better error handling
4. **Caching:** Add client-side caching to reduce API calls
5. **Authentication:** Add JWT authentication if needed
6. **Rate Limiting:** Implement rate limiting on the backend
7. **Production Build:** Configure proxy for production deployment (e.g., using nginx)
