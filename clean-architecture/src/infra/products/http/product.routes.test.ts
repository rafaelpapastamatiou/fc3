import request from "supertest";

import { app } from "../../@http/app";
import { prisma } from "../../@shared/prisma/client";

describe("E2E tests for product routes", () => {

  it("should list all products", async () => {
    await Promise.all([
      prisma.product.create({
        data: {
          id: "1",
          name: "Product 1",
          price: 10,
        }
      }),
      prisma.product.create({
        data: {
          id: "2",
          name: "Product 2",
          price: 20,
        }
      }),
    ])

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body.products).toHaveLength(2);

    expect(response.body.products[0].id).toBe("1");
    expect(response.body.products[0].name).toBe("Product 1");
    expect(response.body.products[0].price).toBe(10);

    expect(response.body.products[1].id).toBe("2");
    expect(response.body.products[1].name).toBe("Product 2");
    expect(response.body.products[1].price).toBe(20);
  });

});