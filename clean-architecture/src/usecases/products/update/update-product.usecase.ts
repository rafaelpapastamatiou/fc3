import { ProductsRepository } from "../../../domain/products/repositories/products-repository";
import { UpdateProductInputDTO, UpdateProductOutputDTO } from "./update-product.dto";

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(input: UpdateProductInputDTO): Promise<UpdateProductOutputDTO> {
    const product = await this.productsRepository.findById(input.id);

    if (!product) throw new Error("Product not found");

    product.changeName(input.name);
    product.changePrice(input.price);

    await this.productsRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }
}