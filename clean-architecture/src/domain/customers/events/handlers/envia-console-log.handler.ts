import { EventHandler } from "../../../@shared/events/event-handler";
import { CustomerAddressChangedEvent } from "../customer-address-changed.event";

export class EnviaConsoleLogHandler
  implements EventHandler<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const { data } = event;

    console.log(`Endereço do cliente: ${data.id}, ${data.name} alterado para: ${data.address?.toString()}`)
  }
}