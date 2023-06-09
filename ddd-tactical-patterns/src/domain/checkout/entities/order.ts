import { OrderItem } from "./order-item";

type OrderProps = {
  id: string;
  customerId: string;
  items: OrderItem[];
}

export type OrderConstructorProps = OrderProps;

export class Order {
  private props: OrderProps;

  constructor({ id, customerId, items }: OrderProps) {
    this.props = {
      id,
      customerId,
      items,
    };

    this.validate();
  }

  get id() { return this.props.id; }
  get customerId() { return this.props.customerId; }
  get items() { return this.props.items; }

  validate(): boolean {
    if (!this.id) { throw new Error("Id cannot be empty"); }
    if (!this.customerId) { throw new Error("CustomerId cannot be empty"); }
    if (!this.items || this.items.length === 0) {
      throw new Error("Order must have at least 1 item");
    }

    return true;
  }

  total(): number {
    return this.items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }
}