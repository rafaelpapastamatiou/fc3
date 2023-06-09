import { Customer } from "../../../domain/entities/customer";
import { Address } from "../../../domain/valueObjects/address";
import { prisma } from "../client";
import { clearPrismaDb } from "../prisma-test-utils";
import { PrismaCustomersRepository } from "./prisma-customers-repository";

describe("Prisma CustomersRepository", () => {
  beforeEach(() => {
    clearPrismaDb();
  });

  it("should create a customer", async () => {
    const customersRepository = new PrismaCustomersRepository()

    const address = new Address({
      street: "Rua 1",
      number: 123,
      city: "São Paulo",
      zip: "12345678",
    });

    const customer = new Customer({
      id: "1",
      name: "John Doe",
      address,
    });

    await customersRepository.create(customer);

    const customerFound = await prisma.customer.findFirst({
      where: {
        id: customer.id,
      }
    });

    expect(customerFound).not.toBeNull();
    expect(customerFound!.id).toEqual(customer.id);
    expect(customerFound!.name).toEqual(customer.name);
    expect(customerFound!.city).toEqual(address.city);
    expect(customerFound!.number).toEqual(address.number);
    expect(customerFound!.street).toEqual(address.street);
    expect(customerFound!.zip).toEqual(address.zip);
  });

  it("should update a customer", async () => {
    const customersRepository = new PrismaCustomersRepository();

    const address = new Address({
      street: "Rua 1",
      number: 123,
      city: "São Paulo",
      zip: "12345678",
    });

    const customer = new Customer({
      id: "1",
      name: "John Doe",
      address,
    });

    await customersRepository.create(customer);

    customer.changeName("John Doe Updated");
    customer.changeAddress(
      new Address({
        street: "Rua 2",
        number: 456,
        city: "São Paulo",
        zip: "12345678",
      })
    );

    await customersRepository.update(customer);

    const customerFound = await prisma.customer.findFirst({
      where: {
        id: customer.id,
      }
    });

    expect(customerFound).not.toBeNull();
    expect(customerFound!.id).toEqual(customer.id);
    expect(customerFound!.name).toEqual(customer.name);
    expect(customerFound!.city).toEqual(customer.address?.city || null);
    expect(customerFound!.number).toEqual(customer.address?.number || null);
    expect(customerFound!.street).toEqual(customer.address?.street || null);
    expect(customerFound!.zip).toEqual(customer.address?.zip || null);
  });

  it("should find a customer by id", async () => {
    const customersRepository = new PrismaCustomersRepository();

    const address = new Address({
      street: "Rua 1",
      number: 123,
      city: "São Paulo",
      zip: "12345678",
    });

    const customer = new Customer({
      id: "1",
      name: "Customer 1",
      address
    });

    await customersRepository.create(customer);

    const customerFound = await customersRepository.findById(customer.id);

    expect(customerFound).not.toBeNull();
    expect(customerFound!.id).toEqual(customer.id);
    expect(customerFound!.name).toEqual(customer.name);
    expect(customerFound!.address?.city).toEqual(customer.address?.city || null);
    expect(customerFound!.address?.number).toEqual(customer.address?.number || null);
    expect(customerFound!.address?.street).toEqual(customer.address?.street || null);
    expect(customerFound!.address?.zip).toEqual(customer.address?.zip || null);
  });

  it("should return null when customer is not found", async () => {
    const customersRepository = new PrismaCustomersRepository();

    const customerFound = await customersRepository.findById("1");

    expect(customerFound).toBeNull();
  });

  it("should find all customers", async () => {
    const customersRepository = new PrismaCustomersRepository();

    const address1 = new Address({
      street: "Rua 1",
      number: 123,
      city: "São Paulo",
      zip: "12345678",
    });

    const customer1 = new Customer({
      id: "1",
      name: "Customer 1",
      address: address1
    });

    const address2 = new Address({
      street: "Rua 2",
      number: 456,
      city: "São Paulo",
      zip: "12345678",
    });

    const customer2 = new Customer({
      id: "2",
      name: "Customer 2",
      address: address2
    });

    await customersRepository.create(customer1);
    await customersRepository.create(customer2);

    const customersFound = await customersRepository.findAll();

    expect(customersFound).not.toBeNull();
    expect(customersFound).toHaveLength(2);
    expect(customersFound).toEqual([customer1, customer2])
  });

  it("should return an empty array when there are no customers", async () => {
    const customersRepository = new PrismaCustomersRepository();

    const customersFound = await customersRepository.findAll();

    expect(customersFound).not.toBeNull();
    expect(customersFound).toHaveLength(0);
  });
});