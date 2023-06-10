import { ProductsRepository } from "../../../domain/products/repositories/products-repository";
import { ListProductsInputDTO, ListProductsOutputDTO } from "./list-products.dto";

export class ListProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({}: ListProductsInputDTO): Promise<ListProductsOutputDTO> {
    const products = await this.productsRepository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}