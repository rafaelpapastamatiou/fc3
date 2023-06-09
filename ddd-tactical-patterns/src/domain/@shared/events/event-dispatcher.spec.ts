import { Product } from "../../products/entities/product";
import { SendEmailOnProductCreatedHandler } from "../../products/events/handlers/send-email-on-product-created.handler";
import { ProductCreatedEvent } from "../../products/events/product-created.event";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain Events Tests", () => {

  it("should register a new event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailOnProductCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")
    ).toBeDefined();

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent").length
    ).toBe(1);

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]
    ).toBeInstanceOf(SendEmailOnProductCreatedHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailOnProductCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")
    ).toBeDefined();

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent").length
    ).toBe(1);

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]
    ).toBeInstanceOf(SendEmailOnProductCreatedHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent").length
    ).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailOnProductCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")
    ).toBeDefined();

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent").length
    ).toBe(1);

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]
    ).toBeInstanceOf(SendEmailOnProductCreatedHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent").length
    ).toBe(0);
  });

  it("should dispatch an event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailOnProductCreatedHandler();
    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent").length
    ).toBe(1);

    expect(
      eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]
    ).toBeInstanceOf(SendEmailOnProductCreatedHandler);

    const productCreatedEvent = new ProductCreatedEvent(
      new Product({
        id: "1",
        name: "Product 1",
        price: 10,
      })
    );

    eventDispatcher.notify(productCreatedEvent);

    expect(eventHandlerSpy).toHaveBeenCalledWith(productCreatedEvent);
  });
})