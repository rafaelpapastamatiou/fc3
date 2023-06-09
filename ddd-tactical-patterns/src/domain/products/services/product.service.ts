import { Product } from "../entities/product";

export class ProductService {
  static increasePricesByPercentage(products: Product[], percentage: number) {
    for (const product of products) {
      const increase = product.price * (percentage / 100);

      product.changePrice(product.price + increase);
    }
  }
}