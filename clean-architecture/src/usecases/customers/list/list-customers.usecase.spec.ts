import { CustomerFactory } from "../../../domain/customers/factories/customer.factory";
import { CustomersRepositoryStub } from "../../../tests/stubs/customers-repository-stub";
import { ListCustomersUseCase } from "./list-customers.usecase";

describe("ListCustomers usecase unit tests", () => {

  it("should list all customers", async () => {
    const customersRepository = new CustomersRepositoryStub();

    const customer1 = CustomerFactory.create({
      name: "John Doe",
      address: {
        street: "Main Street",
        number: 123,
        city: "New York",
        zip: "12345678"
      }
    });

    const customer2 = CustomerFactory.create({
      name: "Jane Doe",
      address: {
        street: "Main Street",
        number: 234,
        city: "New York",
        zip: "12345678"
      }
    });

    jest.spyOn(customersRepository, "findAll").mockResolvedValueOnce(
      [customer1, customer2]
    );

    const usecase = new ListCustomersUseCase(customersRepository);

    const output = await usecase.execute({});

    expect(output.customers).toHaveLength(2);
    expect(output.customers[0]).toEqual({
      id: customer1.id,
      name: customer1.name,
      address: customer1.address && {
        street: customer1.address.street,
        number: customer1.address.number,
        city: customer1.address.city,
        zip: customer1.address.zip
      }
    });
    expect(output.customers[1]).toEqual({
      id: customer2.id,
      name: customer2.name,
      address: customer2.address && {
        street: customer2.address.street,
        number: customer2.address.number,
        city: customer2.address.city,
        zip: customer2.address.zip
      }
    });
  });

});