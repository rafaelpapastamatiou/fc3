import { ProductFactory } from "../../../domain/products/factories/product.factory";
import { ProductsRepositoryStub } from "../../../tests/stubs/products-repository.stub";
import { FindProductOutputDTO } from "./find-product.dto";
import { FindProductUseCase } from "./find-product.usecase";

describe("FindProduct usecase unit tests", () => {

  it("should find a product by id", async () => {
    const productsRepository = new ProductsRepositoryStub();

    const product = ProductFactory.create({
      name: "Product 1",
      price: 10
    });

    jest.spyOn(productsRepository, 'findById').mockResolvedValueOnce(product);

    const usecase = new FindProductUseCase(productsRepository);
    const output = await usecase.execute({ id: product.id });

    const expectedOutput: FindProductOutputDTO = {
      id: product.id,
      name: product.name,
      price: product.price
    };

    expect(output).toEqual(expectedOutput);
  });

  it("should throw an error if product is not found", async () => {
    const productsRepository = new ProductsRepositoryStub();

    const usecase = new FindProductUseCase(productsRepository);

    await expect(
      usecase.execute({ id: '123' })
    ).rejects.toThrowError('Product not found');
  });

});