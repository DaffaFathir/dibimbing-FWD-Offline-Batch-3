# Quick Start Guide - Running the Integrated Application

This guide will help you quickly start both the backend and frontend servers.

## Prerequisites

Make sure you have Node.js installed (v14 or later recommended).

## Step-by-Step Instructions

### 1. Start the Backend Server

Open a terminal/command prompt and run:

```bash
cd Belakang
npm install
npm start
```

You should see:
```
Server running on port 3000
```

**Keep this terminal running!** The backend must stay running for the frontend to fetch data.

### 2. Start the Frontend Development Server

Open a **NEW** terminal/command prompt (don't close the first one) and run:

```bash
cd Depan
npm install
npm run dev
```

You should see something like:
```
  VITE v8.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 3. Open the Application

Open your web browser and navigate to:

**http://localhost:5173**

You should see the homepage with products loaded from the backend API!

## Verifying the Integration

### Check Backend is Running
Open http://localhost:3000/product-list in your browser. You should see JSON data with all products.

### Check Frontend is Working
1. Homepage should display 4 products
2. Click on any product to see its details
3. Open browser DevTools (F12) → Network tab
4. You should see API requests to `/api/product-list` and `/api/product-detail/:id`

## Running Tests

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

## Troubleshooting

### "Failed to fetch products" error
- Make sure the backend server is running on port 3000
- Check terminal for any backend errors

### Port 3000 already in use
Stop any other application using port 3000, or edit `Belakang/server.js` to use a different port (remember to update `Depan/vite.config.js` proxy target too).

### Port 5173 already in use
Vite will automatically try the next available port (5174, 5175, etc.)

## Stopping the Servers

To stop either server:
- Press `Ctrl + C` in the terminal where the server is running
- Type `Y` if prompted

## What's Different from Before?

**Before:** The frontend used dummy data hardcoded in `productService.js`

**Now:** The frontend fetches real data from the backend API
- Product data comes from `Belakang/productData.js`
- Backend exposes REST API endpoints
- Frontend uses `fetch()` to get data from the API
- Vite proxy handles routing during development

## Next Steps

- Read [INTEGRATION.md](./INTEGRATION.md) for detailed technical information
- Explore the API endpoints at http://localhost:3000/product-list
- Make changes to products in `Belakang/productData.js` and see them reflected in the frontend
