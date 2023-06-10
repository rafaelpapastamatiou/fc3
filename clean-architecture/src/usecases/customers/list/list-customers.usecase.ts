import { CustomersRepository } from "../../../domain/customers/repositories/customers-repository";
import { ListCustomersInputDTO, ListCustomersOutputDTO } from "./list-customers.dto";

export class ListCustomersUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({}: ListCustomersInputDTO): Promise<ListCustomersOutputDTO> {
    const customers = await this.customersRepository.findAll();

    return {
      customers: customers.map(customer => ({
        id: customer.id,
        name: customer.name,
        address: customer.address && {
          street: customer.address.street,
          number: customer.address.number,
          city: customer.address.city,
          zip: customer.address.zip
        }
      })),
    };
  }
}