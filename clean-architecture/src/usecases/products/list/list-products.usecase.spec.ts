import { ProductFactory } from "../../../domain/products/factories/product.factory";
import { ProductsRepositoryStub } from "../../../tests/stubs/products-repository.stub";
import { ListProductsUseCase } from "./list-products.usecase";

describe("ListProducts usecase unit tests", () => {

  it("should list all products", async () => {
    const productsRepository = new ProductsRepositoryStub();

    const product1 = ProductFactory.create({
      name: "Product 1",
      price: 10
    });

    const product2 = ProductFactory.create({
      name: "Product 2",
      price: 20
    });

    jest.spyOn(productsRepository, 'findAll').mockResolvedValueOnce(
      [product1, product2]
    );

    const usecase = new ListProductsUseCase(productsRepository);
    const output = await usecase.execute({});

    expect(output.products).toHaveLength(2);
    expect(output.products[0]).toEqual({
      id: product1.id,
      name: product1.name,
      price: product1.price
    });
    expect(output.products[1]).toEqual({
      id: product2.id,
      name: product2.name,
      price: product2.price
    });
  });

});