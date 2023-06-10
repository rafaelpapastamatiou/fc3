import { CustomersRepositoryStub } from "../../../tests/stubs/customers-repository-stub";
import { CreateCustomerInputDTO, CreateCustomerOutputDTO } from "./create-customer.dto";
import { CreateCustomerUseCase } from "./create-customer.usecase";

describe("CreateCustomer usecase unit tests", () => {

  it("should create a customer", async () => {
    const customersRepository = new CustomersRepositoryStub();

    const input: CreateCustomerInputDTO = {
      name: "John Doe",
      address: {
        street: "Main Street",
        number: 123,
        city: "New York",
        zip: "12345678"
      }
    };

    const usecase = new CreateCustomerUseCase(customersRepository);
    const output = await usecase.execute(input);

    const expectedOutput: CreateCustomerOutputDTO = {
      id: expect.any(String),
      name: input.name,
      address: input.address && {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip
      }
    };

    expect(output).toEqual(expectedOutput);
  });

  it("should throw an error if customer name is not provided", async () => {
    const customersRepository = new CustomersRepositoryStub();

    const input: CreateCustomerInputDTO = {
      name: "",
      address: {
        street: "Main Street",
        number: 123,
        city: "New York",
        zip: "12345678"
      }
    };

    const usecase = new CreateCustomerUseCase(customersRepository);

    await expect(
      usecase.execute(input)
    ).rejects.toThrowError("Name cannot be empty");
  });

});