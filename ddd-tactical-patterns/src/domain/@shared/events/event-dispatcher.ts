import { Event } from "./event";
import { EventHandler } from "./event-handler";

export interface EventDispatcherInterface {
  notify(event: Event): void;
  register(eventName: string, handler: EventHandler): void;
  unregister(eventName: string, handler: EventHandler): void;
  unregisterAll(): void;
  getEventHandlers(eventName: string): EventHandler[];
}

export class EventDispatcher implements EventDispatcherInterface {
  private static eventDispatcher: EventDispatcher;

  private eventHandlers: Map<string, EventHandler[]> = new Map();

  notify(event: Event): void {
    const eventName = event.constructor.name;
    const handlers = this.getEventHandlers(eventName) || [];

    for (const handler of handlers) {
      handler.handle(event);
    }
  }

  register(eventName: string, handler: EventHandler): void {
    if (!this.eventHandlers.has(eventName)) {
      this.eventHandlers.set(eventName, []);
    }

    this.eventHandlers.get(eventName)!.push(handler);
  }

  unregister(eventName: string, handler: EventHandler): void {
    if (!this.eventHandlers.has(eventName)) return;

    const handlers = this.eventHandlers.get(eventName)!;
    handlers.splice(handlers.indexOf(handler), 1);
  }

  unregisterAll(): void {
    this.eventHandlers.clear();
  }

  getEventHandlers(eventName: string): EventHandler[] {
    return this.eventHandlers.get(eventName) || [];
  }

  static getInstance(): EventDispatcher {
    if (!this.eventDispatcher) {
      this.eventDispatcher = new EventDispatcher();
    }

    return this.eventDispatcher;
  }
}