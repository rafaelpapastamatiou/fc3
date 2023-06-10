import { CustomerFactory } from "../../../domain/customers/factories/customer.factory";
import { CustomersRepositoryStub } from "../../../tests/stubs/customers-repository-stub";
import { FindCustomerOutputDTO } from "./find-customer.dto";
import { FindCustomerUseCase } from "./find-customer.usecase";

describe("FindCustomer usecase unit tests", () => {

  it("should find a customer by id", async () => {
    const customersRepository = new CustomersRepositoryStub();

    const customer = CustomerFactory.create({
      name: "John Doe",
      address: {
        street: "Main Street",
        number: 123,
        city: "New York",
        zip: "12345678"
      }
    });

    await customersRepository.create(customer);

    jest.spyOn(customersRepository, "findById").mockResolvedValueOnce(customer);

    const usecase = new FindCustomerUseCase(customersRepository);
    const output = await usecase.execute({ id: customer.id });

    const expectedOutput: FindCustomerOutputDTO = {
      id: customer.id,
      name: customer.name,
      address: customer.address && {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zip: customer.address.zip
      }
    };

    expect(output).toEqual(expectedOutput);
  });

  it("should throw an error if customer is not found", async () => {
    const customersRepository = new CustomersRepositoryStub();

    const usecase = new FindCustomerUseCase(customersRepository);

    await expect(
      async () => await usecase.execute({ id: "123" })
    ).rejects.toThrowError("Customer not found");
  });

});