import { Order } from "../../../domain/entities/order";
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

  update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<Order | null> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }

}