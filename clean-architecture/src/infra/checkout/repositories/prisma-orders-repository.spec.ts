import { Customer } from "../../../domain/customers/entities/customer";
import { Order } from "../../../domain/checkout/entities/order";
import { OrderItem } from "../../../domain/checkout/entities/order-item";
import { Product } from "../../../domain/products/entities/product";
import { Address } from "../../../domain/@shared/valueObjects/address";
import { prisma } from "../../@shared/prisma/client";
import { clearPrismaDb } from "../../@shared/prisma/prisma-test-utils";
import { PrismaCustomersRepository } from "../../customers/repositories/prisma-customers-repository";
import { PrismaOrdersRepository } from "./prisma-orders-repository";
import { PrismaProductsRepository } from "../../products/repositories/prisma-products-repository";

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


  it("should update an existing order", async () => {
    const customersRepository = new PrismaCustomersRepository();
    const productsRepository = new PrismaProductsRepository();
    const ordersRepository = new PrismaOrdersRepository();

    const customer = new Customer({
      id: "1",
      name: "John Doe",
    });

    await customersRepository.create(customer);

    const product1 = new Product({ id: "1", name: "Product 1", price: 10 });
    await productsRepository.create(product1);

    const item1 = new OrderItem({
      id: "1",
      name: "item 1",
      price: 10,
      quantity: 1,
      productId: product1.id,
    });

    const order = new Order({
      id: "1",
      customerId: customer.id,
      items: [item1],
    });

    await ordersRepository.create(order);

    const product2 = new Product({ id: "2", name: "Product 2", price: 20 });
    await productsRepository.create(product2);

    const item2 = new OrderItem({
      id: "2",
      name: "item 2",
      price: 20,
      quantity: 1,
      productId: product2.id,
    });

    let updatedOrder = new Order({
      id: order.id,
      customerId: order.customerId,
      items: [item1, item2],
    });

    await ordersRepository.update(updatedOrder);

    let updatedOrderModel = await ordersRepository.findById(order.id);

    expect(updatedOrderModel).not.toBeNull();
    expect(updatedOrderModel!.id).toEqual(order.id);
    expect(updatedOrderModel!.customerId).toEqual(order.customerId);
    expect(updatedOrderModel!.items.length).toEqual(2);
    expect(updatedOrderModel!.items).toEqual([item1, item2]);

    updatedOrder = new Order({
      id: order.id,
      customerId: order.customerId,
      items: [item2],
    });

    await ordersRepository.update(updatedOrder);

    updatedOrderModel = await ordersRepository.findById(order.id);

    expect(updatedOrderModel).not.toBeNull();
    expect(updatedOrderModel!.id).toEqual(order.id);
    expect(updatedOrderModel!.customerId).toEqual(order.customerId);
    expect(updatedOrderModel!.items.length).toEqual(1);
    expect(updatedOrderModel!.items).toEqual([item2]);
  });

  it("should find an existing order by id", async () => {
    const customersRepository = new PrismaCustomersRepository();
    const productsRepository = new PrismaProductsRepository();
    const ordersRepository = new PrismaOrdersRepository();

    const customer = new Customer({
      id: "1",
      name: "John Doe",
    });
    await customersRepository.create(customer);

    const product1 = new Product({ id: "1", name: "Product 1", price: 10 });
    await productsRepository.create(product1);

    const item1 = new OrderItem({
      id: "1",
      name: "item 1",
      price: 10,
      quantity: 1,
      productId: product1.id,
    });

    const order = new Order({
      id: "1",
      customerId: customer.id,
      items: [item1],
    });
    await ordersRepository.create(order);

    const foundOrder = await ordersRepository.findById(order.id);

    expect(foundOrder).not.toBeNull();
    expect(foundOrder!.id).toEqual(order.id);
    expect(foundOrder!.customerId).toEqual(order.customerId);
    expect(foundOrder!.items).toEqual(order.items);
  });

  it("should return null when order is not found", async () => {
    const ordersRepository = new PrismaOrdersRepository();

    const foundOrder = await ordersRepository.findById("1");

    expect(foundOrder).toBeNull();
  });

  it("should find all orders", async () => {
    const customersRepository = new PrismaCustomersRepository();
    const productsRepository = new PrismaProductsRepository();
    const ordersRepository = new PrismaOrdersRepository();

    const customer = new Customer({
      id: "1",
      name: "John Doe",
    });
    await customersRepository.create(customer);

    const product1 = new Product({ id: "1", name: "Product 1", price: 10 });
    await productsRepository.create(product1);

    const product2 = new Product({ id: "2", name: "Product 2", price: 20 });
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

    const order1 = new Order({ id: "1", customerId: customer.id, items: [item1], });
    await ordersRepository.create(order1);

    const order2 = new Order({ id: "2", customerId: customer.id, items: [item2], });
    await ordersRepository.create(order2);

    const foundOrders = await ordersRepository.findAll();

    expect(foundOrders).toHaveLength(2);
    expect(foundOrders).toEqual([order1, order2]);
  });

  it("should return an empty array when there are no orders", async () => {
    const ordersRepository = new PrismaOrdersRepository();

    const foundOrders = await ordersRepository.findAll();

    expect(foundOrders).toHaveLength(0);
  });

});