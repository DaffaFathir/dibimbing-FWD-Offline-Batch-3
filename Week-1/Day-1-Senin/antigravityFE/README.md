# Southeast Asia Tourist Destination Website

A front-end web application built with vanilla HTML5, CSS3, and modern JavaScript (ES6 modules). The website allows users to explore tropical destinations across Southeast Asia, view comprehensive destination details, search and filter listings in real-time, toggle light/dark themes, and reserve tickets.

## Features

- **Destination Catalog**: Displays 12 tropical destinations spanning Indonesia, Thailand, Vietnam, the Philippines, Malaysia, Cambodia, Laos, and Singapore.
- **Real-Time Search & Filter**: Instantly search destinations by country, name, tag, or description with debounce handling.
- **Detailed Destination Views**: Full-page view with high-resolution imagery, photo gallery, comprehensive overview, ticket pricing, and a ticket order modal.
- **Tropical Visual Aesthetic**: Vibrant custom color palette (turquoise, coral, tropical green, mango orange) inspired by Southeast Asian landscapes.
- **Light & Dark Theme Toggle**: Accessible slide switch in the header with smooth transition, system preference detection (`prefers-color-scheme`), and persistent storage (`localStorage`).
- **Responsive Layout**: Mobile-first design optimized for mobile phones (320px+), tablets (768px+), and desktops (1024px+ / 1280px+).
- **Zero External Dependencies**: Pure vanilla HTML, CSS, and ES6 JavaScript.

## Getting Started

Because ES6 JavaScript modules are used, run a local HTTP server from the project directory:

### Option 1: Python
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

### Option 2: Node.js (npx)
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` and select **Open with Live Server**.

## Project Architecture

```
antigravityFE/
├── index.html                      # Destination listing page
├── detail.html                     # Destination detail page
├── README.md
├── css/
│   ├── reset.css                   # Browser reset
│   ├── variables.css               # Tropical design tokens & dark theme
│   ├── global.css                  # Typography, buttons, alerts, modals
│   ├── layout.css                  # Container, flexbox, and grid
│   ├── responsive.css              # Breakpoint media queries
│   └── components/
│       ├── header.css              # Header navigation & user profile
│       ├── footer.css              # Footer & social links
│       ├── hero.css                # Tropical hero banner
│       ├── destination-card.css    # Card component layout & hover
│       ├── destination-detail.css  # Detailed view & gallery
│       ├── search.css              # Search bar & clear button
│       └── theme-toggle.css        # Slide toggle switch
└── js/
    ├── main.js                     # Application entry point & controller
    ├── router.js                   # Client navigation handler
    ├── state-manager.js            # Reactive state management (pub-sub)
    ├── event-bus.js                # Event emitter
    ├── utils/
    │   ├── dom-helpers.js          # DOM & debounce utilities
    │   ├── formatters.js           # Currency & text truncation
    │   └── validators.js           # Data validation utilities
    ├── models/
    │   └── destination.js          # Destination model class
    ├── services/
    │   ├── mock-data.js            # Southeast Asia destination datasets
    │   ├── mock-api.js             # Mock API service (Promise-based)
    │   └── theme-manager.js        # Theme state & localStorage persistence
    └── components/
        ├── header.js               # Header component
        ├── footer.js               # Footer component
        ├── hero.js                 # Hero banner component
        ├── destination-card.js     # Destination card component
        ├── destination-detail.js   # Detailed destination component
        ├── search.js               # Search component
        └── theme-toggle.js         # Slide toggle component
```

