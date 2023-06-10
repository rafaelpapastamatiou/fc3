import { Customer } from "../../../domain/customers/entities/customer";
import { CustomersRepository } from "../../../domain/customers/repositories/customers-repository";
import { Address } from "../../../domain/@shared/valueObjects/address";
import { prisma } from "../../@shared/prisma/client";

export class PrismaCustomersRepository implements CustomersRepository {
  async create(entity: Customer): Promise<void> {
    await prisma.customer.create({
      data: {
        id: entity.id,
        name: entity.name,
        city: entity.address?.city,
        number: entity.address?.number,
        street: entity.address?.street,
        zip: entity.address?.zip,
        active: entity.isActive,
        rewardPoints: entity.rewardPoints,
      },
    });
  }

  async update(entity: Customer): Promise<void> {
    await prisma.customer.update({
      where: {
        id: entity.id,
      },
      data: {
        name: entity.name,
        city: entity.address?.city,
        number: entity.address?.number,
        street: entity.address?.street,
        zip: entity.address?.zip,
        active: entity.isActive,
        rewardPoints: entity.rewardPoints,
      },
    });
  }

  async findById(id: string): Promise<Customer | null> {
    const customerModel = await prisma.customer.findFirst({
      where: {
        id,
      }
    });

    if (!customerModel) return null

    let address: Address | undefined;

    if (
      customerModel.street &&
      customerModel.city &&
      customerModel.number &&
      customerModel.zip
    ) {
      address = new Address({
        street: customerModel.street,
        city: customerModel.city,
        number: customerModel.number,
        zip: customerModel.zip,
      });
    }

    return new Customer({
      id: customerModel.id,
      name: customerModel.name,
      address,
    });
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await prisma.customer.findMany();

    return customerModels.map((customerModel) => {
      let address: Address | undefined;

      if (
        customerModel.street &&
        customerModel.city &&
        customerModel.number &&
        customerModel.zip
      ) {
        address = new Address({
          street: customerModel.street,
          city: customerModel.city,
          number: customerModel.number,
          zip: customerModel.zip,
        });
      }

      return new Customer({
        id: customerModel.id,
        name: customerModel.name,
        address,
      })
    });
  }

}