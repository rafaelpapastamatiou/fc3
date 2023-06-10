import { Product } from "./product";

describe("Product unit tests", () => {

  it("should throw an error when id is empty", () => {
    expect(() => {
      new Product({
        id: "",
        name: "Product 1",
        price: 100,
      });
    }).toThrowError("Product: Id cannot be empty");
  });

  it("should throw an error when name is empty", () => {
    expect(() => {
      new Product({
        id: "1",
        name: "",
        price: 100,
      });
    }).toThrowError("Product: Name cannot be empty");
  });

  it("should throw an error when price is less than or equal to zero", () => {
    expect(() => {
      new Product({
        id: "1",
        name: "Product 1",
        price: 0,
      });
    }).toThrowError("Product: Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 2");

    expect(product.name).toBe("Product 2");
  });

  it("should throw an error when changing name to empty", () => {
    const product = new Product({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    expect(() => {
      product.changeName("");
    }).toThrowError("Product: Name cannot be empty");
  });

  it("should change price", () => {
    const product = new Product({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    product.changePrice(200);

    expect(product.price).toBe(200);
  });

  it("should throw an error when changing price to less than or equal to zero", () => {
    const product = new Product({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    expect(() => {
      product.changePrice(0);
    }).toThrowError("Product: Price must be greater than zero");
  });
});