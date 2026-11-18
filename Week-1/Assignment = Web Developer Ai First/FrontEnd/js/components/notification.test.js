/**
 * Notification Component Tests
 * Tests error handling and user feedback functionality
 */

import { Notification, NotificationType, notify, getNotificationInstance } from './notification.js';

describe('Notification Component', () => {
  let container;
  let notification;

  beforeEach(() => {
    // Create container
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up
    if (notification) {
      notification.destroy();
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  describe('Initialization', () => {
    test('should create notification container', () => {
      notification = new Notification(container);
      const notificationContainer = container.querySelector('.notification-container');
      expect(notificationContainer).toBeTruthy();
    });

    test('should apply correct position class', () => {
      notification = new Notification(container, { position: 'top-right' });
      const notificationContainer = container.querySelector('.notification-container');
      expect(notificationContainer.classList.contains('notification-top-right')).toBe(true);
    });
  });

  describe('Notification Display', () => {
    test('should show success notification', () => {
      notification = new Notification(container);
      const id = notification.success('Operation successful');
      
      const notificationEl = document.getElementById(id);
      expect(notificationEl).toBeTruthy();
      expect(notificationEl.classList.contains('notification-success')).toBe(true);
      expect(notificationEl.textContent).toContain('Operation successful');
    });

    test('should show error notification', () => {
      notification = new Notification(container);
      const id = notification.error('Operation failed');
      
      const notificationEl = document.getElementById(id);
      expect(notificationEl).toBeTruthy();
      expect(notificationEl.classList.contains('notification-error')).toBe(true);
      expect(notificationEl.textContent).toContain('Operation failed');
    });

    test('should show warning notification', () => {
      notification = new Notification(container);
      const id = notification.warning('Warning message');
      
      const notificationEl = document.getElementById(id);
      expect(notificationEl).toBeTruthy();
      expect(notificationEl.classList.contains('notification-warning')).toBe(true);
    });

    test('should show info notification', () => {
      notification = new Notification(container);
      const id = notification.info('Info message');
      
      const notificationEl = document.getElementById(id);
      expect(notificationEl).toBeTruthy();
      expect(notificationEl.classList.contains('notification-info')).toBe(true);
    });
  });

  describe('Notification Actions', () => {
    test('should render action button when provided', () => {
      notification = new Notification(container);
      const id = notification.show('Message', NotificationType.INFO, {
        action: {
          text: 'Retry',
          callback: jest.fn()
        }
      });
      
      const notificationEl = document.getElementById(id);
      const actionButton = notificationEl.querySelector('.notification-action');
      expect(actionButton).toBeTruthy();
      expect(actionButton.textContent.trim()).toBe('Retry');
    });

    test('should call action callback when clicked', (done) => {
      notification = new Notification(container);
      const callback = jest.fn();
      const id = notification.show('Message', NotificationType.INFO, {
        action: {
          text: 'Retry',
          callback: callback
        }
      });
      
      // Wait for notification to appear
      setTimeout(() => {
        const notificationEl = document.getElementById(id);
        const actionButton = notificationEl.querySelector('.notification-action');
        actionButton.click();
        
        expect(callback).toHaveBeenCalled();
        done();
      }, 100);
    });
  });

  describe('Notification Dismissal', () => {
    test('should dismiss notification when dismiss button clicked', (done) => {
      notification = new Notification(container);
      const id = notification.show('Message', NotificationType.INFO);
      
      setTimeout(() => {
        const notificationEl = document.getElementById(id);
        const dismissButton = notificationEl.querySelector('.notification-dismiss');
        dismissButton.click();
        
        // Wait for exit animation
        setTimeout(() => {
          expect(document.getElementById(id)).toBeFalsy();
          done();
        }, 400);
      }, 100);
    });

    test('should auto-dismiss after duration', (done) => {
      notification = new Notification(container);
      const id = notification.show('Message', NotificationType.INFO, { duration: 500 });
      
      // Check notification exists
      setTimeout(() => {
        expect(document.getElementById(id)).toBeTruthy();
      }, 100);
      
      // Check notification is dismissed after duration
      setTimeout(() => {
        expect(document.getElementById(id)).toBeFalsy();
        done();
      }, 900);
    });

    test('should not auto-dismiss when duration is 0', (done) => {
      notification = new Notification(container);
      const id = notification.show('Message', NotificationType.ERROR, { duration: 0 });
      
      // Check notification still exists after some time
      setTimeout(() => {
        expect(document.getElementById(id)).toBeTruthy();
        done();
      }, 500);
    });
  });

  describe('XSS Protection', () => {
    test('should escape HTML in message', () => {
      notification = new Notification(container);
      const id = notification.show('<script>alert("xss")</script>', NotificationType.INFO);
      
      const notificationEl = document.getElementById(id);
      const messageEl = notificationEl.querySelector('.notification-message');
      
      // Should display escaped text, not execute script
      expect(messageEl.textContent).toContain('<script>');
      expect(messageEl.innerHTML).not.toContain('<script>alert');
    });
  });

  describe('Singleton Instance', () => {
    test('should return same instance', () => {
      const instance1 = getNotificationInstance();
      const instance2 = getNotificationInstance();
      expect(instance1).toBe(instance2);
    });

    test('notify convenience methods should work', () => {
      const id = notify.success('Success message');
      expect(document.getElementById(id)).toBeTruthy();
    });
  });
});
