import * as yup from "yup";

import { Validator } from "../../@shared/validators/validator";
import { Customer } from "../entities/customer";

export class YupCustomerValidator implements Validator<Customer> {
  validate(entity: Customer): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required("Id cannot be empty"),
        name: yup.string().required("Name cannot be empty"),
        rewardPoints: yup.number().optional().min(0, "Reward points cannot be negative"),
      });

      schema.validateSync({
        id: entity.id,
        name: entity.name,
        rewardPoints: entity.rewardPoints,
      }, { abortEarly: false });
    } catch (errors) {
      const e = errors as yup.ValidationError;

      for (const err of e.errors) {
        entity.notification.addError({
          context: "Customer",
          message: err,
        });
      }
    }
  }
}