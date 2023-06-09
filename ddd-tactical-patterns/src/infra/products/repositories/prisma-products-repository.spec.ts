import { Product } from "../../../domain/products/entities/product";
import { prisma } from "../../@shared/prisma/client";
import { clearPrismaDb } from "../../@shared/prisma/prisma-test-utils";
import { PrismaProductsRepository } from "./prisma-products-repository";

describe("Prisma ProductsRepository", () => {
  beforeEach(() => {
    clearPrismaDb();
  });

  it("should create a new product", async () => {
    const productsRepository = new PrismaProductsRepository();

    const product = new Product({
      id: "1",
      name: "Product 1",
      price: 10,
    });

    await productsRepository.create(product);

    const productFound = await prisma.product.findFirst({
      where: {
        id: product.id,
      }
    });

    expect(productFound).not.toBeNull();
    expect(productFound!.id).toEqual(product.id);
    expect(productFound!.name).toEqual(product.name);
    expect(productFound!.price).toEqual(product.price);
  });

  it("should update a product", async () => {
    const productsRepository = new PrismaProductsRepository();

    const product = new Product({
      id: "1",
      name: "Product 1",
      price: 10,
    });

    await productsRepository.create(product);

    product.changeName("Product 1 Updated");
    product.changePrice(20);

    await productsRepository.update(product);

    const productFound = await prisma.product.findFirst({
      where: {
        id: product.id,
      }
    });

    expect(productFound).not.toBeNull();
    expect(productFound!.id).toEqual(product.id);
    expect(productFound!.name).toEqual(product.name);
    expect(productFound!.price).toEqual(product.price);
  });

  it("should find a product by id", async () => {
    const productsRepository = new PrismaProductsRepository();

    const product = new Product({
      id: "1",
      name: "Product 1",
      price: 10,
    });

    await productsRepository.create(product);

    const productFound = await productsRepository.findById(product.id);

    expect(productFound).not.toBeNull();
    expect(productFound!.id).toEqual(product.id);
    expect(productFound!.name).toEqual(product.name);
    expect(productFound!.price).toEqual(product.price);
  });

  it("should find all products", async () => {
    const productsRepository = new PrismaProductsRepository();

    const product1 = new Product({
      id: "1",
      name: "Product 1",
      price: 10,
    });

    const product2 = new Product({
      id: "2",
      name: "Product 2",
      price: 20,
    });

    await productsRepository.create(product1);
    await productsRepository.create(product2);

    const productsFound = await productsRepository.findAll();

    expect(productsFound).toHaveLength(2);
    expect(productsFound).toEqual([product1, product2]);
  });

});