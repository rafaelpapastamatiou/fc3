import { Validator } from "../../@shared/validators/validator";
import { Customer } from "../entities/customer";
import { YupCustomerValidator } from "../validators/yup-customer.validator";

export class CustomerValidatorFactory {
  static create(): Validator<Customer> {
    return new YupCustomerValidator();
  }
}