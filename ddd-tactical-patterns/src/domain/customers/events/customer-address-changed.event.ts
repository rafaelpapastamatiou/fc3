import { Customer } from "../entities/customer";
import { Event } from "../../@shared/events/event";

export class CustomerAddressChangedEvent implements Event {
  timestamp: number;
  data: Customer;

  constructor(data: Customer) {
    this.timestamp = Date.now();
    this.data = data;
  }
}