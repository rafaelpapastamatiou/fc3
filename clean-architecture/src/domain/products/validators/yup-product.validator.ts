import * as yup from "yup";

import { Validator } from "../../@shared/validators/validator";
import { Product } from "../entities/product";

export class YupProductValidator implements Validator<Product> {
  validate(entity: Product): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required("Id cannot be empty"),
        name: yup.string().required("Name cannot be empty"),
        price: yup.number().required().moreThan(0, "Price must be greater than zero"),
      });

      schema.validateSync({
        id: entity.id,
        name: entity.name,
        price: entity.price,
      }, { abortEarly: false });
    } catch (errors) {
      const e = errors as yup.ValidationError;

      for (const err of e.errors) {
        entity.notification.addError({
          context: "Product",
          message: err,
        });
      }
    }
  }
}