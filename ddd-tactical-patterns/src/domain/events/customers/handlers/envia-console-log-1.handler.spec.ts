import { Customer } from "../../../entities/customer";
import { Address } from "../../../valueObjects/address";
import { EventDispatcher } from "../../@shared/event-dispatcher";
import { CustomerCreatedEvent } from "../customer-created.event";
import { EnviaConsoleLog1Handler } from "./envia-console-log-1.handler";

describe('EnviaConsoleLog1Handler unit tests', () => {
  it("should log to console", () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new EnviaConsoleLog1Handler();
    const handlerSpy = jest.spyOn(handler, "handle");

    const event = new CustomerCreatedEvent(
      new Customer({
        id: "1",
        name: "John Doe",
        address: new Address({
          street: "Main Street",
          number: 123,
          city: "New York",
          zip: "12345678",
        })
      })
    );

    eventDispatcher.register("CustomerCreatedEvent", handler);

    expect(
      eventDispatcher.getEventHandlers("CustomerCreatedEvent").length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers("CustomerCreatedEvent")[0]
    ).toBeInstanceOf(EnviaConsoleLog1Handler);

    eventDispatcher.notify(event);

    expect(handlerSpy).toHaveBeenCalledTimes(1);
  });

});