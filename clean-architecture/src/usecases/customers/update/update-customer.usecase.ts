import { Address } from "../../../domain/@shared/valueObjects/address";
import { CustomersRepository } from "../../../domain/customers/repositories/customers-repository";
import { UpdateCustomerInputDTO, UpdateCustomerOutputDTO } from "./update-customer.dto";

export class UpdateCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute(input: UpdateCustomerInputDTO): Promise<UpdateCustomerOutputDTO> {
    const customer = await this.customersRepository.findById(input.id);

    if (!customer) throw new Error("Customer not found")

    customer.changeName(input.name);

    if (input.address) {
      customer.changeAddress(new Address({
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip
      }));
    }

    await this.customersRepository.update(customer);


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