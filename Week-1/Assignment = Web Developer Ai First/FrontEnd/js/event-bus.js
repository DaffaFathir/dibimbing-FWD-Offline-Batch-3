/**
 * Event Bus for decoupled communication between components
 */

export class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(event, handler) {
    if (typeof handler !== 'function') return () => {};
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(handler);

    return () => this.off(event, handler);
  }

  off(event, handler) {
    if (!this.events.has(event)) return;
    const handlers = this.events.get(event);
    handlers.delete(handler);
    if (handlers.size === 0) {
      this.events.delete(event);
    }
  }

  emit(event, data) {
    if (!this.events.has(event)) return;
    const handlers = Array.from(this.events.get(event));
    for (const handler of handlers) {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error handling event "${event}":`, error);
      }
    }
  }

  once(event, handler) {
    const wrapper = (data) => {
      this.off(event, wrapper);
      handler(data);
    };
    return this.on(event, wrapper);
  }
}

export const eventBus = new EventBus();

