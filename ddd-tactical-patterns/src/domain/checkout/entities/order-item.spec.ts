import { OrderItem } from "./order-item";

describe("OrderItem unit tests", () => {

  it("should throw an error when id is empty", () => {
    expect(() => {
      new OrderItem({
        id: "",
        productId: "1",
        name: "Item 1",
        price: 10,
        quantity: 1,
      });
    }).toThrowError("Id cannot be empty");
  });

  it("should throw an error when productId is empty", () => {
    expect(() => {
      new OrderItem({
        id: "1",
        productId: "",
        name: "Item 1",
        price: 10,
        quantity: 1,
      });
    }).toThrowError("ProductId cannot be empty");
  });

  it("should throw an error when name is empty", () => {
    expect(() => {
      new OrderItem({
        id: "1",
        productId: "1",
        name: "",
        price: 10,
        quantity: 1,
      });
    }).toThrowError("Name cannot be empty");
  });

  it("should throw an error when price is less than or equal to zero", () => {
    expect(() => {
      new OrderItem({
        id: "1",
        productId: "1",
        name: "Item 1",
        price: 0,
        quantity: 1,
      });
    }).toThrowError("Price must be greater than zero");
  });

  it("should throw an error when quantity is less than or equal to zero", () => {
    expect(() => {
      new OrderItem({
        id: "1",
        productId: "1",
        name: "Item 1",
        price: 10,
        quantity: 0,
      });
    }).toThrowError("Quantity must be greater than zero");
  });

});