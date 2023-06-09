import { Product } from "../../entities/product";
import { Event } from "../@shared/event";

export class ProductCreatedEvent implements Event {
  timestamp: number;
  data: Product;

  constructor(data: Product) {
    this.timestamp = new Date().getTime();
    this.data = data;
  }
}