import { OrderFactory } from "./order.factory";

describe('OrderFactory unit tests', () => {
  it('should create an order', () => {
    const order = OrderFactory.create({
      customerId: "1",
      items: [
        {
          name: "Item 1",
          productId: "1",
          quantity: 1,
          price: 10,
        },
        {
          name: "Item 2",
          productId: "2",
          quantity: 1,
          price: 20,
        }
      ]
    });

    expect(order.id).toBeDefined();
    expect(order.customerId).toBe("1");
    expect(order.items.length).toBe(2);
    expect(order.total()).toBe(30);

    expect(order.items[0].name).toBe("Item 1");
    expect(order.items[0].productId).toBe("1");
    expect(order.items[0].quantity).toBe(1);
    expect(order.items[0].price).toBe(10);
    expect(order.items[0].orderItemTotal()).toBe(10);

    expect(order.items[1].name).toBe("Item 2");
    expect(order.items[1].productId).toBe("2");
    expect(order.items[1].quantity).toBe(1);
    expect(order.items[1].price).toBe(20);
    expect(order.items[1].orderItemTotal()).toBe(20);
  });
});