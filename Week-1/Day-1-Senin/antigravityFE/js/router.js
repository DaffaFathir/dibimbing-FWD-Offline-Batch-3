export class Router {
  constructor() {
    this.init();
  }

  init() {
    // Intercept clicks on links with data-route
    document.addEventListener('click', (e) => {
      const routeTarget = e.target.closest('[data-route]');
      if (routeTarget) {
        const route = routeTarget.dataset.route;
        if (route === 'home' || route === 'destinations') {
          e.preventDefault();
          this.navigate('index.html');
        }
      }
    });
  }

  navigate(path, params = {}) {
    const url = new URL(path, window.location.href);
    for (const [key, val] of Object.entries(params)) {
      if (val !== undefined && val !== null) {
        url.searchParams.set(key, val);
      }
    }
    window.location.href = url.toString();
  }

  getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }
}

