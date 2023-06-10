import { EventHandler } from "../../../@shared/events/event-handler";
import { CustomerCreatedEvent } from "../customer-created.event";

export class EnviaConsoleLog2Handler implements EventHandler<CustomerCreatedEvent> {
  handle(_event: CustomerCreatedEvent): void {
    console.log("Esse é o segundo console.log do event: CustomerCreated")
  }
}