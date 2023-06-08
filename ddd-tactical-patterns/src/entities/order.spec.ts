import { Order } from "./order";
import { OrderItem } from "./order-item";

describe("Order unit tests", () => {

  it("should throw an error when id is empty", () => {
    expect(() => {
      new Order({
        id: "",
        customerId: "1",
        items: [],
      });
    }).toThrowError("Id cannot be empty");
  });

  it("should throw an error when customerId is empty", () => {
    expect(() => {
      new Order({
        id: "1",
        customerId: "",
        items: [],
      });
    }).toThrowError("CustomerId cannot be empty");
  });

  it("should throw an error when items is empty", () => {
    expect(() => {
      new Order({
        id: "1",
        customerId: "1",
        items: [],
      });
    }).toThrowError("Order must have at least 1 item");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem({
      id: "1",
      productId: "1",
      name: "Item 1",
      price: 10,
      quantity: 1,
    });

    const order = new Order({
      id: "1",
      customerId: "1",
      items: [item1],
    });

    expect(order.total()).toBe(10);

    const item2 = new OrderItem({
      id: "2",
      productId: "2",
      name: "Item 2",
      price: 25,
      quantity: 2,
    });

    const order2 = new Order({
      id: "2",
      customerId: "1",
      items: [item1, item2],
    });

    expect(order2.total()).toBe(60);
  });

});