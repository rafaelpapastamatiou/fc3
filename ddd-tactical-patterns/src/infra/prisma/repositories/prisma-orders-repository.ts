import { Order } from "../../../domain/entities/order";
import { OrderItem } from "../../../domain/entities/order-item";
import { OrdersRepository } from "../../../domain/repositories/orders-repository";
import { prisma } from "../client";

export class PrismaOrdersRepository implements OrdersRepository {
  async create(entity: Order): Promise<void> {
    const orderItemPromises = [];

    for (const item of entity.items) {
      orderItemPromises.push(
        prisma.orderItem.create({
          data: {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            productId: item.productId,
            orderId: entity.id,
          },
        })
      );
    }

    await prisma.$transaction([
      prisma.order.create({
        data: {
          id: entity.id,
          customerId: entity.customerId,
        },
      }),
      ...orderItemPromises
    ]);
  }

  async update(entity: Order): Promise<void> {
    const orderFound = await prisma.order.findFirst({
      where: {
        id: entity.id,
      },
      include: { items: true }
    });

    if (!orderFound) throw new Error("Order not found");

    const newItemIds = new Set(entity.items.map(item => item.id));

    const removedItemIds = orderFound.items
      .filter(item => !newItemIds.has(item.id))
      .map(item => item.id);

    const orderItemDeletePromises = [];
    for (const itemId of removedItemIds) {
      orderItemDeletePromises.push(
        prisma.orderItem.delete({
          where: {
            id: itemId,
          },
        })
      );
    }

    const orderItemUpsertPromises = [];
    for (const item of entity.items) {
      orderItemUpsertPromises.push(
        prisma.orderItem.upsert({
          where: {
            id: item.id,
          },
          update: {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            productId: item.productId,
          },
          create: {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            productId: item.productId,
            orderId: entity.id,
          },
        })
      );
    }

    await prisma.$transaction([
      ...orderItemUpsertPromises,
      ...orderItemDeletePromises,
    ]);
  }

  async findById(id: string): Promise<Order | null> {
    const orderModel = await prisma.order.findFirst({
      where: {
        id,
      },
      include: { items: true }
    });

    if (!orderModel) return null

    const order = new Order({
      id: orderModel.id,
      customerId: orderModel.customerId,
      items: orderModel.items.map(item => new OrderItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
      }))
    });

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await prisma.order.findMany({
      include: { items: true }
    });

    const orders = orderModels.map(orderModel => new Order({
      id: orderModel.id,
      customerId: orderModel.customerId,
      items: orderModel.items.map(item => new OrderItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
      }))
    }));

    return orders;
  }

}