import { ProductsRepository } from "../../../domain/products/repositories/products-repository";
import { FindProductInputDTO, FindProductOutputDTO } from "./find-product.dto";

export class FindProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ id }: FindProductInputDTO): Promise<FindProductOutputDTO> {
    const product = await this.productsRepository.findById(id);

    if (!product) throw new Error("Product not found");

    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }
}