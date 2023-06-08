import { Customer } from "../entities/customer";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/order-item";
import { OrderService } from "./order.service";

describe("OrderService unit tests", () => {

  it("should place an order", () => {
    const customer = new Customer({
      id: "1",
      name: "Customer 1",
    });

    const item1 = new OrderItem({
      id: "1",
      productId: "1",
      name: "Item 1",
      price: 10,
      quantity: 1
    });

    const item2 = new OrderItem({
      id: "2",
      productId: "2",
      name: "Item 2",
      price: 20,
      quantity: 1
    });

    const order = OrderService.placeOrder(customer, [item1, item2]);

    expect(customer.rewardPoints).toBe(15);
    expect(order.total()).toBe(30);
  });

  it("should calculate the total price of all orders", () => {
    const item1 = new OrderItem({
      id: "1",
      productId: "1",
      name: "Item 1",
      price: 10,
      quantity: 1
    });

    const item2 = new OrderItem({
      id: "2",
      productId: "2",
      name: "Item 2",
      price: 20,
      quantity: 2
    });

    const item3 = new OrderItem({
      id: "3",
      productId: "3",
      name: "Item 3",
      price: 30,
      quantity: 3
    });

    const item4 = new OrderItem({
      id: "4",
      productId: "4",
      name: "Item 4",
      price: 40,
      quantity: 4
    });

    const order1 = new Order({
      id: "1",
      customerId: "1",
      items: [item1, item2],
    });

    const order2 = new Order({
      id: "2",
      customerId: "1",
      items: [item3, item4],
    });

    const total = OrderService.calculateTotal([order1, order2]);

    expect(total).toBe(300);
  });

});