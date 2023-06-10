import { Product } from "../../domain/products/entities/product";
import { ProductsRepository } from "../../domain/products/repositories/products-repository";

export class ProductsRepositoryStub implements ProductsRepository {
  async create(entity: Product): Promise<void> {
    return;
  }

  async update(entity: Product): Promise<void> {
    return;
  }

  async findById(id: string): Promise<Product | null> {
    return null;
  }

  async findAll(): Promise<Product[]> {
    return [];
  }
}