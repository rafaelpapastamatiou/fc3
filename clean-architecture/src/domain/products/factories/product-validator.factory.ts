import { Validator } from "../../@shared/validators/validator";
import { Product } from "../entities/product";
import { YupProductValidator } from "../validators/yup-product.validator";

export class ProductValidatorFactory {
  static create(): Validator<Product> {
    return new YupProductValidator();
  }
}