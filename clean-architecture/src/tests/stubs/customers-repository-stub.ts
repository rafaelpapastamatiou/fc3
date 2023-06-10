import { Customer } from "../../domain/customers/entities/customer";
import { CustomersRepository } from "../../domain/customers/repositories/customers-repository";

export class CustomersRepositoryStub implements CustomersRepository {
  async create(_entity: Customer): Promise<void> {
    return;
  }

  async update(_entity: Customer): Promise<void> {
    return;
  }

  async findById(_id: string): Promise<Customer | null> {
    return null;
  }

  async findAll(): Promise<Customer[]> {
    return [];
  }
}