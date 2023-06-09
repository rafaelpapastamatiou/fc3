import { Customer } from "../../../domain/entities/customer";
import { Order } from "../../../domain/entities/order";
import { OrderItem } from "../../../domain/entities/order-item";
import { Product } from "../../../domain/entities/product";
import { Address } from "../../../domain/valueObjects/address";
import { prisma } from "../client";
import { clearPrismaDb } from "../prisma-test-utils";
import { PrismaCustomersRepository } from "./prisma-customers-repository";
import { PrismaOrdersRepository } from "./prisma-orders-repository";
import { PrismaProductsRepository } from "./prisma-products-repository";

describe("Prisma OrdersRepository", () => {

  beforeEach(() => {
    clearPrismaDb();
  });

  it("should create a new order", async () => {
    const customersRepository = new PrismaCustomersRepository();
    const productsRepository = new PrismaProductsRepository();
    const ordersRepository = new PrismaOrdersRepository();

    const customer = new Customer({
      id: "1",
      name: "John Doe",
      address: new Address({
        street: "Rua 1",
        number: 10,
        city: "São Paulo",
        zip: "00000-000",
      })
    });

    await customersRepository.create(customer);

    const product1 = new Product({ id: "1", name: "Product 1", price: 10 });
    const product2 = new Product({ id: "2", name: "Product 2", price: 20 });

    await productsRepository.create(product1);
    await productsRepository.create(product2);

    const item1 = new OrderItem({
      id: "1",
      name: "item 1",
      price: 10,
      quantity: 1,
      productId: product1.id,
    });

    const item2 = new OrderItem({
      id: "2",
      name: "item 2",
      price: 20,
      quantity: 1,
      productId: product2.id,
    });

    const order = new Order({
      id: "1",
      customerId: customer.id,
      items: [item1, item2],
    });

    await ordersRepository.create(order);

    const createdOrderModel = await prisma.order.findFirst({
      where: { id: order.id },
      include: { items: true },
    });

    expect(createdOrderModel).not.toBeNull();

    const createdOrder = new Order({
      id: createdOrderModel!.id,
      customerId: createdOrderModel!.customerId,
      items: createdOrderModel!.items.map((item) => new OrderItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
      })),
    });

    expect(createdOrder.id).toEqual(order.id);
    expect(createdOrder.customerId).toEqual(order.customerId);
    expect(createdOrder.items).toEqual(order.items);
  });


  // it("should update an existing order", async () => {
  //   const customersRepository = new PrismaCustomersRepository();
  //   const productsRepository = new PrismaProductsRepository();
  //   const ordersRepository = new PrismaOrdersRepository();

  //   const customer = new Customer({
  //     id: "1",
  //     name: "John Doe",
  //   });

  //   await customersRepository.create(customer);

  //   const product1 = new Product({ id: "1", name: "Product 1", price: 10 });
  //   await productsRepository.create(product1);

  //   const item1 = new OrderItem({
  //     id: "1",
  //     name: "item 1",
  //     price: 10,
  //     quantity: 1,
  //     productId: product1.id,
  //   });

  //   const order = new Order({
  //     id: "1",
  //     customerId: customer.id,
  //     items: [item1],
  //   });

  //   await ordersRepository.create(order);
  // });
});