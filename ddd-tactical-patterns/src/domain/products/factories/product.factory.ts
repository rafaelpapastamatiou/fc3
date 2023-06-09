import { v4 as uuidv4 } from "uuid";
import { Product, ProductInterface, ProductConstructorProps } from "../entities/product";
import { ProductB } from "../entities/product-b";

type ProductFactoryProps = Omit<ProductConstructorProps, "id"> & {
  type: "a" | "b";
};

export class ProductFactory {
  static create({ type, name, price }: ProductFactoryProps): ProductInterface {
    switch (type) {
      case "a":
        return new Product({
          id: uuidv4(),
          name,
          price,
        });

      case "b":
        return new ProductB({
          id: uuidv4(),
          name,
          price,
        });

      default:
        throw new Error("Invalid product type");
    }
  }
}