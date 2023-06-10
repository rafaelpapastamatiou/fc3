import { ProductFactory } from "../../../domain/products/factories/product.factory";
import { ProductsRepositoryStub } from "../../../tests/stubs/products-repository.stub";
import { UpdateProductInputDTO, UpdateProductOutputDTO } from "./update-product.dto";
import { UpdateProductUseCase } from "./update-product.usecase";

describe("UpdateProduct usecase unit tests", () => {

  it("should update a product", async () => {
    const productsRepository = new ProductsRepositoryStub();

    const product = ProductFactory.create({
      name: "Product 1",
      price: 10
    });

    jest.spyOn(productsRepository, 'findById').mockResolvedValueOnce(product);

    const input: UpdateProductInputDTO = {
      id: product.id,
      name: "Product 1 Updated",
      price: 20
    };

    const usecase = new UpdateProductUseCase(productsRepository);
    const output = await usecase.execute(input);

    const expectedOutput: UpdateProductOutputDTO = {
      id: product.id,
      name: input.name,
      price: input.price
    };

    expect(output).toEqual(expectedOutput);
  });

});