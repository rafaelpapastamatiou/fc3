import { CustomerFactory } from "../../../domain/customers/factories/customer.factory";
import { CustomersRepositoryStub } from "../../../tests/stubs/customers-repository-stub";
import { UpdateCustomerInputDTO, UpdateCustomerOutputDTO } from "./update-customer.dto";
import { UpdateCustomerUseCase } from "./update-customer.usecase";

describe("UpdateCustomer usecase unit tests", () => {

  it("should update a customer", async () => {
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

    jest.spyOn(customersRepository, "findById").mockResolvedValueOnce(customer);

    const input: UpdateCustomerInputDTO = {
      id: customer.id,
      name: "John Doe Updated",
      address: {
        street: "Main Street Updated",
        number: 234,
        city: "New York Updated",
        zip: "87654321"
      }
    };

    const usecase = new UpdateCustomerUseCase(customersRepository);
    const output = await usecase.execute(input);

    const expectedOutput: UpdateCustomerOutputDTO = {
      id: customer.id,
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

});