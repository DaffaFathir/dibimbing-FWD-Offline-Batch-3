export class EventBus {
  constructor() {
    this.events = new Map();
  }

  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (!this.events.has(event)) return;
    const callbacks = this.events.get(event).filter(cb => cb !== callback);
    if (callbacks.length === 0) {
      this.events.delete(event);
    } else {
      this.events.set(event, callbacks);
    }
  }

  emit(event, data) {
    if (!this.events.has(event)) return;
    this.events.get(event).forEach(cb => {
      try {
        cb(data);
      } catch (err) {
        console.error(`Error in event handler for "${event}":`, err);
      }
    });
  }

  once(event, callback) {
    const wrapper = (data) => {
      this.off(event, wrapper);
      callback(data);
    };
    this.on(event, wrapper);
  }
}

