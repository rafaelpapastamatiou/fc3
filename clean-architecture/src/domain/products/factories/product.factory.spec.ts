import { Product } from "../entities/product";
import { ProductFactory } from "./product.factory";

describe('ProductFactory unit tests', () => {
  it('should create a product', () => {
    const product = ProductFactory.create({
      name: 'Product 1',
      price: 10,
    });

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBeDefined();
    expect(product.name).toEqual('Product 1');
    expect(product.price).toEqual(10);
  });
});