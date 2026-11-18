/**
 * Notification Component
 * Toast-style notification system for user feedback
 * Displays success, error, warning, and info messages
 */

import { eventBus } from '../event-bus.js';

/**
 * Notification types
 */
export const NotificationType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

/**
 * Notification Component Class
 */
export class Notification {
  constructor(container, options = {}) {
    this.container = container || document.body;
    this.options = {
      position: options.position || 'top-right', // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
      duration: options.duration || 5000, // Auto-dismiss duration in ms (0 = no auto-dismiss)
      maxNotifications: options.maxNotifications || 3, // Max simultaneous notifications
      ...options
    };
    
    this.notifications = [];
    this.notificationContainer = null;
    
    this.init();
  }

  /**
   * Initialize notification system
   */
  init() {
    // Create notification container
    this.createNotificationContainer();
    
    // Subscribe to global notification events
    eventBus.on('notification:show', (data) => {
      this.show(data.message, data.type, data.options);
    });
    
    console.log('Notification component initialized');
  }

  /**
   * Create the notification container element
   */
  createNotificationContainer() {
    this.notificationContainer = document.createElement('div');
    this.notificationContainer.className = `notification-container notification-${this.options.position}`;
    this.notificationContainer.setAttribute('role', 'region');
    this.notificationContainer.setAttribute('aria-label', 'Notifications');
    this.notificationContainer.setAttribute('aria-live', 'polite');
    
    this.container.appendChild(this.notificationContainer);
  }

  /**
   * Show a notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success, error, warning, info)
   * @param {Object} options - Additional options
   * @returns {string} Notification ID
   */
  show(message, type = NotificationType.INFO, options = {}) {
    // Generate unique ID
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Merge options
    const notificationOptions = {
      duration: options.duration !== undefined ? options.duration : this.options.duration,
      dismissible: options.dismissible !== undefined ? options.dismissible : true,
      action: options.action || null, // { text: string, callback: function }
      ...options
    };
    
    // Create notification element
    const notificationEl = this.createNotificationElement(id, message, type, notificationOptions);
    
    // Add to container
    this.notificationContainer.appendChild(notificationEl);
    
    // Track notification
    const notification = {
      id,
      element: notificationEl,
      type,
      message,
      options: notificationOptions,
      timer: null
    };
    
    this.notifications.push(notification);
    
    // Enforce max notifications limit
    this.enforceMaxNotifications();
    
    // Trigger enter animation
    setTimeout(() => {
      notificationEl.classList.add('notification-enter');
    }, 10);
    
    // Auto-dismiss if duration is set
    if (notificationOptions.duration > 0) {
      notification.timer = setTimeout(() => {
        this.dismiss(id);
      }, notificationOptions.duration);
    }
    
    console.log(`Notification shown: ${type} - ${message}`);
    
    return id;
  }

  /**
   * Create notification element
   * @param {string} id - Notification ID
   * @param {string} message - Message text
   * @param {string} type - Notification type
   * @param {Object} options - Notification options
   * @returns {HTMLElement} Notification element
   */
  createNotificationElement(id, message, type, options) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.id = id;
    notification.setAttribute('role', 'alert');
    
    // Icon mapping
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    
    const icon = icons[type] || icons.info;
    
    // Build notification HTML
    let html = `
      <div class="notification-icon">${icon}</div>
      <div class="notification-content">
        <p class="notification-message">${this.escapeHtml(message)}</p>
      </div>
    `;
    
    // Add action button if provided
    if (options.action) {
      html += `
        <button class="notification-action" data-action="custom">
          ${this.escapeHtml(options.action.text)}
        </button>
      `;
    }
    
    // Add dismiss button if dismissible
    if (options.dismissible) {
      html += `
        <button class="notification-dismiss" data-action="dismiss" aria-label="Dismiss notification">
          ×
        </button>
      `;
    }
    
    notification.innerHTML = html;
    
    // Attach event listeners
    this.attachEventListeners(notification, id, options);
    
    return notification;
  }

  /**
   * Attach event listeners to notification element
   * @param {HTMLElement} element - Notification element
   * @param {string} id - Notification ID
   * @param {Object} options - Notification options
   */
  attachEventListeners(element, id, options) {
    // Dismiss button
    const dismissBtn = element.querySelector('[data-action="dismiss"]');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dismiss(id);
      });
    }
    
    // Custom action button
    const actionBtn = element.querySelector('[data-action="custom"]');
    if (actionBtn && options.action && typeof options.action.callback === 'function') {
      actionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        options.action.callback();
        this.dismiss(id);
      });
    }
  }

  /**
   * Dismiss a notification
   * @param {string} id - Notification ID
   */
  dismiss(id) {
    const notification = this.notifications.find(n => n.id === id);
    if (!notification) return;
    
    // Clear auto-dismiss timer
    if (notification.timer) {
      clearTimeout(notification.timer);
    }
    
    // Trigger exit animation
    notification.element.classList.remove('notification-enter');
    notification.element.classList.add('notification-exit');
    
    // Remove after animation
    setTimeout(() => {
      if (notification.element.parentNode) {
        notification.element.parentNode.removeChild(notification.element);
      }
      
      // Remove from tracking
      const index = this.notifications.indexOf(notification);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    }, 300);
  }

  /**
   * Dismiss all notifications
   */
  dismissAll() {
    const ids = this.notifications.map(n => n.id);
    ids.forEach(id => this.dismiss(id));
  }

  /**
   * Enforce max notifications limit
   */
  enforceMaxNotifications() {
    if (this.notifications.length > this.options.maxNotifications) {
      // Dismiss oldest notification
      const oldest = this.notifications[0];
      this.dismiss(oldest.id);
    }
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} str - String to escape
   * @returns {string} Escaped string
   */
  escapeHtml(str) {
    if (typeof str !== 'string') {
      return String(str);
    }
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Convenience method: Show success notification
   * @param {string} message - Success message
   * @param {Object} options - Additional options
   * @returns {string} Notification ID
   */
  success(message, options = {}) {
    return this.show(message, NotificationType.SUCCESS, options);
  }

  /**
   * Convenience method: Show error notification
   * @param {string} message - Error message
   * @param {Object} options - Additional options
   * @returns {string} Notification ID
   */
  error(message, options = {}) {
    return this.show(message, NotificationType.ERROR, { duration: 0, ...options });
  }

  /**
   * Convenience method: Show warning notification
   * @param {string} message - Warning message
   * @param {Object} options - Additional options
   * @returns {string} Notification ID
   */
  warning(message, options = {}) {
    return this.show(message, NotificationType.WARNING, options);
  }

  /**
   * Convenience method: Show info notification
   * @param {string} message - Info message
   * @param {Object} options - Additional options
   * @returns {string} Notification ID
   */
  info(message, options = {}) {
    return this.show(message, NotificationType.INFO, options);
  }

  /**
   * Clean up
   */
  destroy() {
    // Dismiss all notifications
    this.dismissAll();
    
    // Remove container
    if (this.notificationContainer && this.notificationContainer.parentNode) {
      this.notificationContainer.parentNode.removeChild(this.notificationContainer);
    }
    
    this.notificationContainer = null;
    this.notifications = [];
    
    console.log('Notification component destroyed');
  }
}

// Create singleton instance
let notificationInstance = null;

/**
 * Get notification instance (singleton)
 * @returns {Notification} Notification instance
 */
export function getNotificationInstance() {
  if (!notificationInstance) {
    notificationInstance = new Notification(document.body, {
      position: 'top-right',
      duration: 5000,
      maxNotifications: 3
    });
  }
  return notificationInstance;
}

// Export convenience methods
export const notify = {
  show: (message, type, options) => getNotificationInstance().show(message, type, options),
  success: (message, options) => getNotificationInstance().success(message, options),
  error: (message, options) => getNotificationInstance().error(message, options),
  warning: (message, options) => getNotificationInstance().warning(message, options),
  info: (message, options) => getNotificationInstance().info(message, options)
};
