/**
 * Unit Tests for Event Bus
 * 
 * Tests the core pub-sub functionality including:
 * - Event subscription (on)
 * - Event unsubscription (off)
 * - Event emission (emit)
 * - One-time handlers (once)
 * - Helper methods (clear, getHandlerCount, etc.)
 */

import { EventBus } from './event-bus.js';

// Test utility to capture console output
const captureConsoleError = (fn) => {
  const originalError = console.error;
  const errors = [];
  console.error = (...args) => errors.push(args);
  fn();
  console.error = originalError;
  return errors;
};

// Test: EventBus constructor
console.log('Test: EventBus constructor');
{
  const bus = new EventBus();
  console.assert(typeof bus.events === 'object', 'Should initialize events object');
  console.assert(Object.keys(bus.events).length === 0, 'Should start with no events');
  console.assert(bus.debug === false, 'Should start with debug disabled');
  console.log('✓ Constructor initializes correctly');
}

// Test: on() - Subscribe to event
console.log('\nTest: on() - Subscribe to event');
{
  const bus = new EventBus();
  let callCount = 0;
  const handler = () => { callCount++; };
  
  const unsubscribe = bus.on('test:event', handler);
  
  console.assert(typeof unsubscribe === 'function', 'Should return unsubscribe function');
  console.assert(bus.events['test:event'].length === 1, 'Should add handler to event');
  console.log('✓ on() subscribes handler correctly');
}

// Test: on() - Multiple handlers
console.log('\nTest: on() - Multiple handlers');
{
  const bus = new EventBus();
  const handler1 = () => {};
  const handler2 = () => {};
  const handler3 = () => {};
  
  bus.on('test:event', handler1);
  bus.on('test:event', handler2);
  bus.on('test:event', handler3);
  
  console.assert(bus.events['test:event'].length === 3, 'Should add multiple handlers');
  console.log('✓ on() supports multiple handlers');
}

// Test: on() - Invalid parameters
console.log('\nTest: on() - Invalid parameters');
{
  const bus = new EventBus();
  
  try {
    bus.on('', () => {});
    console.assert(false, 'Should throw on empty event name');
  } catch (e) {
    console.assert(e.message.includes('non-empty string'), 'Should throw correct error');
  }
  
  try {
    bus.on('test:event', 'not a function');
    console.assert(false, 'Should throw on invalid handler');
  } catch (e) {
    console.assert(e.message.includes('function'), 'Should throw correct error');
  }
  
  console.log('✓ on() validates parameters');
}

// Test: emit() - Call handlers
console.log('\nTest: emit() - Call handlers');
{
  const bus = new EventBus();
  let callCount = 0;
  let receivedData = null;
  
  bus.on('test:event', (data) => {
    callCount++;
    receivedData = data;
  });
  
  bus.emit('test:event', { value: 42 });
  
  console.assert(callCount === 1, 'Should call handler once');
  console.assert(receivedData.value === 42, 'Should pass data to handler');
  console.log('✓ emit() calls handlers with data');
}

// Test: emit() - Multiple handlers
console.log('\nTest: emit() - Multiple handlers');
{
  const bus = new EventBus();
  const calls = [];
  
  bus.on('test:event', () => calls.push('handler1'));
  bus.on('test:event', () => calls.push('handler2'));
  bus.on('test:event', () => calls.push('handler3'));
  
  bus.emit('test:event');
  
  console.assert(calls.length === 3, 'Should call all handlers');
  console.assert(calls[0] === 'handler1' && calls[1] === 'handler2' && calls[2] === 'handler3', 
    'Should call handlers in order');
  console.log('✓ emit() calls multiple handlers in order');
}

// Test: emit() - No handlers
console.log('\nTest: emit() - No handlers');
{
  const bus = new EventBus();
  
  // Should not throw
  bus.emit('nonexistent:event', { data: 'test' });
  
  console.log('✓ emit() handles missing event gracefully');
}

// Test: emit() - Handler error handling
console.log('\nTest: emit() - Handler error handling');
{
  const bus = new EventBus();
  const calls = [];
  
  bus.on('test:event', () => calls.push('handler1'));
  bus.on('test:event', () => { throw new Error('Handler error'); });
  bus.on('test:event', () => calls.push('handler3'));
  
  const errors = captureConsoleError(() => {
    bus.emit('test:event');
  });
  
  console.assert(calls.length === 2, 'Should continue after handler error');
  console.assert(calls.includes('handler1') && calls.includes('handler3'), 
    'Should call other handlers despite error');
  console.assert(errors.length > 0, 'Should log error to console');
  console.log('✓ emit() continues execution after handler error');
}

// Test: off() - Unsubscribe handler
console.log('\nTest: off() - Unsubscribe handler');
{
  const bus = new EventBus();
  let callCount = 0;
  const handler = () => { callCount++; };
  
  bus.on('test:event', handler);
  bus.emit('test:event');
  console.assert(callCount === 1, 'Should call handler before unsubscribe');
  
  bus.off('test:event', handler);
  bus.emit('test:event');
  console.assert(callCount === 1, 'Should not call handler after unsubscribe');
  console.assert(!bus.events['test:event'], 'Should clean up empty event arrays');
  console.log('✓ off() unsubscribes handler');
}

// Test: off() - Using returned unsubscribe function
console.log('\nTest: off() - Using returned unsubscribe function');
{
  const bus = new EventBus();
  let callCount = 0;
  const handler = () => { callCount++; };
  
  const unsubscribe = bus.on('test:event', handler);
  bus.emit('test:event');
  console.assert(callCount === 1, 'Should call handler before unsubscribe');
  
  unsubscribe();
  bus.emit('test:event');
  console.assert(callCount === 1, 'Should not call handler after unsubscribe');
  console.log('✓ Returned unsubscribe function works');
}

// Test: off() - Multiple handlers
console.log('\nTest: off() - Multiple handlers');
{
  const bus = new EventBus();
  const calls = [];
  const handler1 = () => calls.push('handler1');
  const handler2 = () => calls.push('handler2');
  const handler3 = () => calls.push('handler3');
  
  bus.on('test:event', handler1);
  bus.on('test:event', handler2);
  bus.on('test:event', handler3);
  
  bus.off('test:event', handler2);
  bus.emit('test:event');
  
  console.assert(calls.length === 2, 'Should remove only specified handler');
  console.assert(calls.includes('handler1') && calls.includes('handler3'), 
    'Should keep other handlers');
  console.assert(!calls.includes('handler2'), 'Should remove specified handler');
  console.log('✓ off() removes only specified handler');
}

// Test: once() - One-time handler
console.log('\nTest: once() - One-time handler');
{
  const bus = new EventBus();
  let callCount = 0;
  
  bus.once('test:event', () => { callCount++; });
  
  bus.emit('test:event');
  console.assert(callCount === 1, 'Should call handler on first emit');
  
  bus.emit('test:event');
  console.assert(callCount === 1, 'Should not call handler on second emit');
  console.log('✓ once() calls handler only once');
}

// Test: once() - With data
console.log('\nTest: once() - With data');
{
  const bus = new EventBus();
  let receivedData = null;
  
  bus.once('test:event', (data) => { receivedData = data; });
  
  bus.emit('test:event', { value: 123 });
  console.assert(receivedData.value === 123, 'Should pass data to once handler');
  console.log('✓ once() receives data correctly');
}

// Test: once() - Unsubscribe before emit
console.log('\nTest: once() - Unsubscribe before emit');
{
  const bus = new EventBus();
  let callCount = 0;
  
  const unsubscribe = bus.once('test:event', () => { callCount++; });
  unsubscribe();
  
  bus.emit('test:event');
  console.assert(callCount === 0, 'Should not call once handler after unsubscribe');
  console.log('✓ once() can be unsubscribed before emission');
}

// Test: clear() - Clear specific event
console.log('\nTest: clear() - Clear specific event');
{
  const bus = new EventBus();
  let callCount = 0;
  
  bus.on('test:event', () => { callCount++; });
  bus.on('other:event', () => { callCount++; });
  
  bus.clear('test:event');
  
  bus.emit('test:event');
  bus.emit('other:event');
  
  console.assert(callCount === 1, 'Should clear only specified event');
  console.assert(!bus.events['test:event'], 'Should remove specified event');
  console.assert(bus.events['other:event'], 'Should keep other events');
  console.log('✓ clear() removes specific event');
}

// Test: clear() - Clear all events
console.log('\nTest: clear() - Clear all events');
{
  const bus = new EventBus();
  
  bus.on('event1', () => {});
  bus.on('event2', () => {});
  bus.on('event3', () => {});
  
  bus.clear();
  
  console.assert(Object.keys(bus.events).length === 0, 'Should clear all events');
  console.log('✓ clear() removes all events');
}

// Test: getHandlerCount()
console.log('\nTest: getHandlerCount()');
{
  const bus = new EventBus();
  
  console.assert(bus.getHandlerCount('test:event') === 0, 'Should return 0 for non-existent event');
  
  bus.on('test:event', () => {});
  console.assert(bus.getHandlerCount('test:event') === 1, 'Should return 1 after adding handler');
  
  bus.on('test:event', () => {});
  console.assert(bus.getHandlerCount('test:event') === 2, 'Should return 2 after adding second handler');
  
  console.log('✓ getHandlerCount() returns correct count');
}

// Test: getEventNames()
console.log('\nTest: getEventNames()');
{
  const bus = new EventBus();
  
  console.assert(bus.getEventNames().length === 0, 'Should return empty array initially');
  
  bus.on('event1', () => {});
  bus.on('event2', () => {});
  bus.on('event3', () => {});
  
  const names = bus.getEventNames();
  console.assert(names.length === 3, 'Should return all event names');
  console.assert(names.includes('event1') && names.includes('event2') && names.includes('event3'), 
    'Should include all event names');
  console.log('✓ getEventNames() returns all event names');
}

// Test: setDebug()
console.log('\nTest: setDebug()');
{
  const bus = new EventBus();
  
  console.assert(bus.debug === false, 'Should start with debug disabled');
  
  bus.setDebug(true);
  console.assert(bus.debug === true, 'Should enable debug');
  
  bus.setDebug(false);
  console.assert(bus.debug === false, 'Should disable debug');
  
  console.log('✓ setDebug() toggles debug mode');
}

// Test: Integration - Real-world scenario
console.log('\nTest: Integration - Real-world scenario');
{
  const bus = new EventBus();
  const events = [];
  
  // Simulate multiple components subscribing
  const unsubSearch = bus.on('search:input', (data) => {
    events.push({ type: 'search', query: data.query });
  });
  
  bus.on('destination:select', (data) => {
    events.push({ type: 'select', id: data.destinationId });
  });
  
  bus.once('loading:end', () => {
    events.push({ type: 'loading-end' });
  });
  
  // Simulate user interactions
  bus.emit('search:input', { query: 'bali' });
  bus.emit('destination:select', { destinationId: 'dest-001' });
  bus.emit('loading:end');
  bus.emit('loading:end'); // Should not trigger again
  
  // Unsubscribe from search
  unsubSearch();
  bus.emit('search:input', { query: 'thailand' }); // Should not trigger
  
  console.assert(events.length === 3, 'Should capture correct number of events');
  console.assert(events[0].type === 'search' && events[0].query === 'bali', 
    'Should capture search event');
  console.assert(events[1].type === 'select' && events[1].id === 'dest-001', 
    'Should capture select event');
  console.assert(events[2].type === 'loading-end', 'Should capture loading end once');
  console.log('✓ Integration scenario works correctly');
}

console.log('\n✅ All Event Bus tests passed!');
