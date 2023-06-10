import { ProductsRepositoryStub } from "../../../tests/stubs/products-repository.stub";
import { CreateProductInputDTO, CreateProductOutputDTO } from "./create-product.dto";
import { CreateProductUseCase } from "./create-product.usecase";

describe("CreateProduct usecase unit tests", () => {

  it("should create a product", async () => {
    const productsRepository = new ProductsRepositoryStub();

    const input: CreateProductInputDTO = {
      name: "Product 1",
      price: 10
    };

    const usecase = new CreateProductUseCase(productsRepository);
    const output = await usecase.execute(input);

    const expectedOutput: CreateProductOutputDTO = {
      id: expect.any(String),
      name: input.name,
      price: input.price
    };

    expect(output).toEqual(expectedOutput);
  });

});