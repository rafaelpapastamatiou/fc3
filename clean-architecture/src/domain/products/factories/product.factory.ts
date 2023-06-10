import { v4 as uuidv4 } from "uuid";
import { Product, ProductConstructorProps } from "../entities/product";

type ProductFactoryProps = Omit<ProductConstructorProps, "id">;

export class ProductFactory {
  static create({ name, price }: ProductFactoryProps): Product {
    return new Product({
      id: uuidv4(),
      name,
      price,
    });
  }
}