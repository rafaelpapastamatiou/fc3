import { Product } from "../entities/product";
import { ProductService } from "./product.service";

describe("ProductService unit tests", () => {

  it("should change the price of all products", () => {
    const product1 = new Product({ id: "1", name: "Product 1", price: 10 });
    const product2 = new Product({ id: "2", name: "Product 2", price: 20 });
    const product3 = new Product({ id: "3", name: "Product 3", price: 30 });

    ProductService.increasePricesByPercentage(
      [product1, product2, product3],
      50
    );

    expect(product1.price).toBe(15);
    expect(product2.price).toBe(30);
    expect(product3.price).toBe(45);
  });

});