import { CustomerFactory } from "../../../domain/customers/factories/customer.factory";
import { CustomersRepository } from "../../../domain/customers/repositories/customers-repository";
import { CreateCustomerInputDTO, CreateCustomerOutputDTO } from "./create-customer.dto";

export class CreateCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute(input: CreateCustomerInputDTO): Promise<CreateCustomerOutputDTO> {
    const customer = CustomerFactory.create({
      name: input.name,
      address: input.address && {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip
      }
    });

    await this.customersRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: customer.address && {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zip: customer.address.zip
      }
    };
  }
}