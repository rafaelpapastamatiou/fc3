import { Product } from "../../../domain/entities/product";
import { ProductsRepository } from "../../../domain/repositories/products-repository";
import { prisma } from "../client";

export class PrismaProductsRepository implements ProductsRepository {
  async create(entity: Product): Promise<void> {
    await prisma.product.create({
      data: {
        id: entity.id,
        name: entity.name,
        price: entity.price,
      }
    });
  }

  async update(entity: Product): Promise<void> {
    await prisma.product.update({
      data: {
        name: entity.name,
        price: entity.price,
      },
      where: {
        id: entity.id,
      }
    });
  }

  async findById(id: string): Promise<Product | null> {
    const productModel = await prisma.product.findFirst({
      where: { id }
    });

    if (!productModel) return null

    return new Product({
      id: productModel.id,
      name: productModel.name,
      price: productModel.price,
    })
  }

  async findAll(): Promise<Product[]> {
    const productModels = await prisma.product.findMany();

    return productModels.map(productModel => new Product({
      id: productModel.id,
      name: productModel.name,
      price: productModel.price,
    }));
  }

}