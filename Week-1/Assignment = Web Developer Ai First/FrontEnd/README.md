# Southeast Asia Tourist Destination Website

A responsive front-end web application for discovering tropical tourist destinations across Southeast Asia. Built with vanilla HTML, CSS, and JavaScript using a component-based architecture.

## Quick Start

1. Open `index.html` in a modern web browser
2. Navigate to destination details by clicking "View Details" on any card
3. Toggle between light/dark themes using the theme toggle in the header

No build process or server required — just open the HTML files directly.

## Features

- **Destination Browsing**: Grid view of Southeast Asian destinations with images, descriptions, and pricing
- **Search**: Real-time filtering of destinations by name, location, or description
- **Destination Details**: Full information page with booking option
- **Light/Dark Mode**: Theme toggle with localStorage persistence and system preference detection
- **Responsive Design**: Mobile-first layout adapting to phone, tablet, and desktop screens
- **Mock API**: Simulated back-end with realistic network delays for development

## File Structure

```
FrontEnd/
├── index.html                 # Destination list page
├── detail.html                # Destination detail page
├── css/                       # Stylesheets
│   ├── variables.css          # CSS custom properties (theme colors)
│   ├── global.css             # Base styles
│   └── components/            # Component-specific styles
├── js/                        # JavaScript modules
│   ├── main.js                # Application entry point
│   ├── components/            # UI components
│   ├── services/              # Mock API and theme manager
│   ├── models/                # Data models
│   └── utils/                 # Helper utilities
└── assets/
    └── images/                # Destination images and icons
```

## Architecture

- **Component-Based**: Reusable UI components (Header, Footer, Hero, DestinationCard, DestinationDetail, Search, ThemeToggle)
- **State Management**: Centralized state with pub-sub pattern for reactive updates
- **Event Bus**: Decoupled component communication
- **Router**: Client-side navigation between pages
- **Mock API**: Promise-based API service simulating back-end requests

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

Requires ES6 module support and CSS Grid/Flexbox.

## Development Notes

### Adding New Destinations

Edit `js/services/mock-data.js` and add destination objects with the following structure:

```javascript
{
  id: 'unique-id',
  name: 'Destination Name',
  location: 'City, Country',
  description: 'Short description (max 200 chars)',
  fullDescription: 'Detailed description',
  price: 1299,
  imageUrl: '/assets/images/destinations/image.jpg',
  tags: ['beach', 'culture']
}
```

### Customizing Theme Colors

Modify CSS custom properties in `css/variables.css`:
- Light mode: `:root` selector
- Dark mode: `[data-theme="dark"]` selector

### Future Back-End Integration

Replace `js/services/mock-api.js` with real API service. The `MockAPIService` interface is designed to match typical REST API patterns:

- `getAllDestinations()` → `GET /api/destinations`
- `getDestinationById(id)` → `GET /api/destinations/:id`
- `searchDestinations(query)` → `GET /api/destinations?q=query`
- `submitOrder(data)` → `POST /api/orders`

## Testing

Unit tests are included for all components and services using `.test.js` files. Open test files in a browser or use a test runner supporting ES6 modules.

## License

© 2024 Southeast Asia Destinations
