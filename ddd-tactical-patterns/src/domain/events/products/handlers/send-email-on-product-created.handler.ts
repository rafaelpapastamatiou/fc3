import { EventHandler } from "../../@shared/event-handler";
import { ProductCreatedEvent } from "../product-created.event";

export class SendEmailOnProductCreatedHandler
  implements EventHandler<ProductCreatedEvent>
{
  handle(_event: ProductCreatedEvent): void {
    console.log("Sending email ...");
  }
}