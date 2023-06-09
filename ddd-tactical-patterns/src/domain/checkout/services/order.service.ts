import { v4 as uuidv4 } from "uuid";

import { Customer } from "../../customers/entities/customer";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/order-item";

export class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) throw new Error("Order must have at least one item");

    const order = new Order({
      id: uuidv4(),
      customerId: customer.id,
      items,
    });

    customer.addRewardPoints(order.total() * 0.5);

    return order;
  }

  static calculateTotal(orders: Order[]) {
    return orders.reduce((total, order) => total += order.total(), 0);
  }
}