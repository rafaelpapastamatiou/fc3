import { Customer } from "../../entities/customer";
import { Event } from "../@shared/event";

export class CustomerCreatedEvent implements Event {
  timestamp: number;
  data: Customer;

  constructor(data: Customer) {
    this.timestamp = Date.now();
    this.data = data;
  }
}