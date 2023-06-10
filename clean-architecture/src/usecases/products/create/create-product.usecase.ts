import { ProductFactory } from "../../../domain/products/factories/product.factory";
import { ProductsRepository } from "../../../domain/products/repositories/products-repository";
import { CreateProductInputDTO, CreateProductOutputDTO } from "./create-product.dto";

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(input: CreateProductInputDTO): Promise<CreateProductOutputDTO> {
    const product = ProductFactory.create({
      name: input.name,
      price: input.price,
    });

    await this.productsRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}