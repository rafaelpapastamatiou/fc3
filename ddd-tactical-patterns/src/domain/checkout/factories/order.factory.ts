import { v4 as uuidv4 } from "uuid";
import { Order, OrderConstructorProps } from "../entities/order";
import { OrderItem, OrderItemConstructorProps } from "../entities/order-item";

type OrderFactoryProps = Omit<OrderConstructorProps, "id" | "items"> & {
  items: Omit<OrderItemConstructorProps, "id">[];
};

export class OrderFactory {
  static create({ customerId, items }: OrderFactoryProps): Order {
    return new Order({
      id: uuidv4(),
      customerId,
      items: items.map(item => new OrderItem({ id: uuidv4(), ...item })),
    })
  }
}