import { Customer } from "../entities/customer";
import { CustomerFactory } from "./customer.factory";

describe('CustomerFactory unit tests', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create({
      name: 'Customer 1',
    });

    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBeDefined();
    expect(customer.name).toEqual('Customer 1');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with address', () => {
    const customer = CustomerFactory.create({
      name: 'Customer 1',
      address: {
        street: 'Street 1',
        number: 1,
        city: 'City 1',
        zip: 'Zip 1',
      }
    });

    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBeDefined();
    expect(customer.name).toEqual('Customer 1');
    expect(customer.address).toBeDefined();
    expect(customer.address?.street).toEqual('Street 1');
    expect(customer.address?.number).toEqual(1);
    expect(customer.address?.city).toEqual('City 1');
    expect(customer.address?.zip).toEqual('Zip 1');
  });

});