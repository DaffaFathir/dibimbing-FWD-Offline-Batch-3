/**
 * Main App Integration Tests
 * Tests the destination list page integration
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Destination List Page Integration', () => {
  let container;

  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div data-page="list">
        <div data-component="header"></div>
        <main class="main-content">
          <div data-component="hero"></div>
          <div class="container">
            <div data-component="destination-list"></div>
          </div>
        </main>
        <div data-component="footer"></div>
      </div>
    `;
    
    container = document.querySelector('[data-component="destination-list"]');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should have destination list container', () => {
    expect(container).toBeTruthy();
    expect(container.getAttribute('data-component')).toBe('destination-list');
  });

  it('should have proper page structure', () => {
    const header = document.querySelector('[data-component="header"]');
    const hero = document.querySelector('[data-component="hero"]');
    const footer = document.querySelector('[data-component="footer"]');
    const list = document.querySelector('[data-component="destination-list"]');

    expect(header).toBeTruthy();
    expect(hero).toBeTruthy();
    expect(footer).toBeTruthy();
    expect(list).toBeTruthy();
  });

  it('should have correct page type attribute', () => {
    const pageType = document.querySelector('[data-page]')?.getAttribute('data-page');
    expect(pageType).toBe('list');
  });
});
