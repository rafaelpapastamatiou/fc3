import { Product } from "../entities/product";
import { ProductB } from "../entities/product-b";
import { ProductFactory } from "./product.factory";

describe('ProductFactory unit tests', () => {
  it('should create a product of type A', () => {
    const product = ProductFactory.create({
      type: "a",
      name: 'Product 1',
      price: 10,
    });

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBeDefined();
    expect(product.name).toEqual('Product 1');
    expect(product.price).toEqual(10);
  });

  it('should create a product of type B', () => {
    const product = ProductFactory.create({
      type: "b",
      name: 'Product 2',
      price: 20,
    });

    expect(product).toBeInstanceOf(ProductB);
    expect(product.id).toBeDefined();
    expect(product.name).toEqual('Product 2');
    expect(product.price).toEqual(20);
  });
});