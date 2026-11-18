/**
 * Southeast Asia Destinations API Server
 * Node.js backend for destination management
 */

import http from 'http';
import { URL } from 'url';
import cors from 'cors';
import { destinations } from './data/destinations.js';

const PORT = 3000;
const HOST = 'localhost';

// CORS middleware wrapper for http server
function handleCORS(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return true;
  }
  return false;
}

// JSON response helper
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Error response helper
function sendError(res, statusCode, message, errorType = 'Error') {
  sendJSON(res, statusCode, {
    success: false,
    error: {
      type: errorType,
      message: message,
      statusCode: statusCode
    }
  });
}

// Validate UUID/ID format
function isValidDestinationId(id) {
  // Accept format: dest-XXX where XXX is digits
  return /^dest-\d{3}$/.test(id);
}

// GET /destination-list
function handleDestinationList(req, res) {
  try {
    sendJSON(res, 200, {
      success: true,
      data: destinations,
      count: destinations.length
    });
  } catch (error) {
    console.error('Error in destination-list:', error);
    sendError(res, 500, 'Internal server error while fetching destinations', 'ServerError');
  }
}

// GET /destination-detail/:id
function handleDestinationDetail(req, res, destinationId) {
  try {
    // Validate ID format
    if (!isValidDestinationId(destinationId)) {
      return sendError(res, 400, `Invalid destination ID format: "${destinationId}". Expected format: dest-XXX`, 'ValidationError');
    }

    // Find destination
    const destination = destinations.find(d => d.id === destinationId);

    if (!destination) {
      return sendError(res, 404, `Destination with ID "${destinationId}" not found`, 'NotFoundError');
    }

    sendJSON(res, 200, {
      success: true,
      data: destination
    });
  } catch (error) {
    console.error('Error in destination-detail:', error);
    sendError(res, 500, 'Internal server error while fetching destination details', 'ServerError');
  }
}

// Main request handler
const server = http.createServer((req, res) => {
  // Handle CORS preflight
  if (handleCORS(req, res)) return;

  // Parse URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  console.log(`${method} ${pathname}`);

  // Route: GET /destination-list
  if (pathname === '/destination-list' && method === 'GET') {
    return handleDestinationList(req, res);
  }

  // Route: GET /destination-detail/:id
  const detailMatch = pathname.match(/^\/destination-detail\/([^\/]+)$/);
  if (detailMatch && method === 'GET') {
    const destinationId = detailMatch[1];
    return handleDestinationDetail(req, res, destinationId);
  }

  // Route: Health check
  if (pathname === '/health' && method === 'GET') {
    return sendJSON(res, 200, { status: 'ok', timestamp: new Date().toISOString() });
  }

  // 404 Not Found
  sendError(res, 404, `Endpoint "${pathname}" not found`, 'NotFoundError');
});

// Error handling
server.on('error', (error) => {
  console.error('Server error:', error);
});

// Start server
server.listen(PORT, HOST, () => {
  console.log('='.repeat(50));
  console.log('🚀 Southeast Asia Destinations API Server');
  console.log('='.repeat(50));
  console.log(`🌐 Server running at: http://${HOST}:${PORT}`);
  console.log(`📍 Endpoints:`);
  console.log(`   - GET  http://${HOST}:${PORT}/destination-list`);
  console.log(`   - GET  http://${HOST}:${PORT}/destination-detail/:id`);
  console.log(`   - GET  http://${HOST}:${PORT}/health`);
  console.log('='.repeat(50));
  console.log('Press Ctrl+C to stop\n');
});
