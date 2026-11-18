import { debounce } from '../utils/dom-helpers.js';

export class Search {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      placeholder: 'Search destinations, locations...',
      debounceDelay: 250,
      onSearch: options.onSearch || null,
      onClear: options.onClear || null,
      ...options
    };

    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="search-container">
        <div class="search-input-wrapper">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input 
            type="search" 
            class="search-input" 
            placeholder="${this.options.placeholder}"
            aria-label="Search destinations"
            autocomplete="off"
            spellcheck="false"
          />
          <button type="button" class="search-clear" data-action="clear" aria-label="Clear search">×</button>
        </div>
      </div>
    `;

    this.input = this.container.querySelector('.search-input');
    this.clearBtn = this.container.querySelector('.search-clear');
  }

  attachEventListeners() {
    if (!this.input || !this.clearBtn) return;

    const debouncedSearch = debounce((value) => {
      if (this.options.onSearch) {
        this.options.onSearch(value);
      }
    }, this.options.debounceDelay);

    this.input.addEventListener('input', (e) => {
      const val = e.target.value;
      this.updateClearButton(val);
      debouncedSearch(val);
    });

    this.clearBtn.addEventListener('click', () => {
      this.clear();
      if (this.options.onClear) {
        this.options.onClear();
      }
      if (this.options.onSearch) {
        this.options.onSearch('');
      }
      this.input.focus();
    });
  }

  updateClearButton(value) {
    if (this.clearBtn) {
      if (value && value.trim().length > 0) {
        this.clearBtn.classList.add('visible');
      } else {
        this.clearBtn.classList.remove('visible');
      }
    }
  }

  getValue() {
    return this.input ? this.input.value : '';
  }

  setValue(value) {
    if (this.input) {
      this.input.value = value;
      this.updateClearButton(value);
    }
  }

  clear() {
    this.setValue('');
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

