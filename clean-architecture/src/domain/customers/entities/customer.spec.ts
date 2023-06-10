import { Address } from "../../@shared/valueObjects/address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {

  it("should throw an error when id is empty", () => {
    expect(() => {
      new Customer({
        id: "",
        name: "John Doe",
      });
    }).toThrowError("Customer: Id cannot be empty");
  });

  it("should throw an error when name is empty", () => {
    expect(() => {
      new Customer({
        id: "1",
        name: "",
      });
    }).toThrowError("Customer: Name cannot be empty");
  });

  it("should throw an error when both name and id are empty", () => {
    expect(() => {
      new Customer({
        id: "",
        name: "",
      });
    }).toThrowError("Customer: Id cannot be empty, Customer: Name cannot be empty");
  });


  it("should change name", () => {
    const customer = new Customer({
      id: "1",
      name: "John Doe",
    });

    customer.changeName("Jane Doe");

    expect(customer.name).toBe("Jane Doe");
  });

  it("should throw an error when changing name to empty", () => {
    const customer = new Customer({
      id: "1",
      name: "John Doe",
    });

    expect(() => {
      customer.changeName("")
    }).toThrowError("Customer: Name cannot be empty");
  });

  it("should activate customer", () => {
    const customer = new Customer({
      id: "1",
      name: "John Doe",
    });

    const address = new Address({
      city: "São Paulo",
      zip: "00000-000",
      street: "Rua 1",
      number: 1,
    });

    customer.changeAddress(address);
    customer.activate();

    expect(customer.isActive).toBe(true);
  });

  it("should throw an error when activating customer without address", () => {
    const customer = new Customer({
      id: "1",
      name: "John Doe",
    });

    expect(() => {
      customer.activate();
    }).toThrowError("Client must have an address to be activated");
  });

  it("should deactivate customer", () => {
    const customer = new Customer({
      id: "1",
      name: "John Doe",
    });

    const address = new Address({
      city: "São Paulo",
      zip: "00000-000",
      street: "Rua 1",
      number: 1,
    });

    customer.changeAddress(address);
    customer.activate();

    customer.deactivate();

    expect(customer.isActive).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer({
      id: "1",
      name: "John Doe",
    });

    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);


    customer.addRewardPoints(15);

    expect(customer.rewardPoints).toBe(25);

    customer.addRewardPoints(-5);

    expect(customer.rewardPoints).toBe(20);
  });

  it("should throw an error if reward points are negative", () => {
    const customer = new Customer({
      id: "1",
      name: "John Doe",
    });

    expect(customer.rewardPoints).toBe(0);

    expect(() => {
      customer.addRewardPoints(-10);
    }).toThrowError("Customer: Reward points cannot be negative");
  });

});