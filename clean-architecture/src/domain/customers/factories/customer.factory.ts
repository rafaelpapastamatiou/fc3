import { v4 as uuidv4 } from "uuid";
import { Customer, CustomerConstructorProps } from "../entities/customer";
import { Address, AddressConstructorProps } from "../../@shared/valueObjects/address";

type CustomerFactoryProps = Omit<CustomerConstructorProps, "id" | "address"> & {
  address?: AddressConstructorProps;
};

export class CustomerFactory {
  static create({ name, address }: CustomerFactoryProps): Customer {
    return new Customer({
      id: uuidv4(),
      name,
      address: address ? new Address(address) : undefined,
    });
  }
}