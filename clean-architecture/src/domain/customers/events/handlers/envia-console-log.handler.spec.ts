import { Customer } from "../../entities/customer";
import { Address } from "../../../@shared/valueObjects/address";
import { EventDispatcher } from "../../../@shared/events/event-dispatcher";
import { CustomerAddressChangedEvent } from "../customer-address-changed.event";
import { EnviaConsoleLogHandler } from "./envia-console-log.handler";

describe('EnviaConsoleLogHandler unit tests', () => {
  it("should log to console", () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new EnviaConsoleLogHandler();
    const handlerSpy = jest.spyOn(handler, "handle");

    const event = new CustomerAddressChangedEvent(
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

    eventDispatcher.register("CustomerAddressChangedEvent", handler);

    expect(
      eventDispatcher.getEventHandlers("CustomerAddressChangedEvent").length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers("CustomerAddressChangedEvent")[0]
    ).toBeInstanceOf(EnviaConsoleLogHandler);

    eventDispatcher.notify(event);

    expect(handlerSpy).toHaveBeenCalledTimes(1);
  });

});