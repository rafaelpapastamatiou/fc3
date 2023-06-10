import { CustomersRepository } from "../../../domain/customers/repositories/customers-repository";
import { FindCustomerInputDTO, FindCustomerOutputDTO } from "./find-customer.dto";

export class FindCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({ id }: FindCustomerInputDTO): Promise<FindCustomerOutputDTO> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) throw new Error("Customer not found");

    return {
      id: customer.id,
      name: customer.name,
      address: customer?.address && {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zip: customer.address.zip
      }
    }
  }
}