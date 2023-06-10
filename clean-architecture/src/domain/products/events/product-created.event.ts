import { Product } from "../../products/entities/product";
import { Event } from "../../@shared/events/event";

export class ProductCreatedEvent implements Event {
  timestamp: number;
  data: Product;

  constructor(data: Product) {
    this.timestamp = new Date().getTime();
    this.data = data;
  }
}