import request from "supertest";
import { v4 as uuidv4 } from "uuid";

import { app } from "../../@http/app";
import { clearPrismaDb } from "../../@shared/prisma/prisma-test-utils";
import { prisma } from "../../@shared/prisma/client";

describe("E2E tests for customer routes", () => {
  beforeEach(() => {
    clearPrismaDb();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "John Doe",
        address: {
          street: "Rua 1",
          number: 123,
          city: "São Paulo",
          zip: "12345-123"
        }
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.address.street).toBe("Rua 1");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.city).toBe("São Paulo");
    expect(response.body.address.zip).toBe("12345-123");
  });

  it("should throw an error when trying to create a customer with invalid data", async () => {
    let response = await request(app)
      .post("/customers")
      .send({});

    expect(response.status).toBe(500);

    response = await request(app)
      .post("/customers")
      .send({
        address: {
          street: "Rua 1",
          number: 123,
          city: "São Paulo",
          zip: "12345-123"
        }
      });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    await Promise.all([
      prisma.customer.create({
        data: {
          id: uuidv4(),
          name: "John Doe",
          active: true,
          rewardPoints: 0,
          city: "São Paulo",
          street: "Rua 1",
          number: 123,
          zip: "12345-123"
        }
      }),
      prisma.customer.create({
        data: {
          id: uuidv4(),
          name: "Jane Doe",
          active: true,
          rewardPoints: 0,
          city: "São Paulo",
          street: "Rua 2",
          number: 123,
          zip: "23456-234"
        }
      })
    ]);

    const response = await request(app).get("/customers");

    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);

    expect(response.body.customers[0].name).toBe("John Doe");
    expect(response.body.customers[0].address.street).toBe("Rua 1");
    expect(response.body.customers[0].address.number).toBe(123);
    expect(response.body.customers[0].address.city).toBe("São Paulo");
    expect(response.body.customers[0].address.zip).toBe("12345-123");

    expect(response.body.customers[1].name).toBe("Jane Doe");
    expect(response.body.customers[1].address.street).toBe("Rua 2");
    expect(response.body.customers[1].address.number).toBe(123);
    expect(response.body.customers[1].address.city).toBe("São Paulo");
    expect(response.body.customers[1].address.zip).toBe("23456-234");

    const xmlResponse = await request(app)
      .get("/customers")
      .set("Accept", "application/xml");

    const regExp = /[\n\r\s\t]/g;

    expect(xmlResponse.status).toBe(200);
    expect(xmlResponse.text).toContain("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
    expect(xmlResponse.text.replace(regExp, "")).toContain(`<?xml version="1.0" encoding="UTF-8"?>
      <customers>
        <customer>
          <id>${response.body.customers[0].id}</id>
          <name>John Doe</name>
          <address>
            <street>Rua 1</street>
            <number>123</number>
            <city>São Paulo</city>
            <zip>12345-123</zip>
          </address>
        </customer>
        <customer>
          <id>${response.body.customers[1].id}</id>
          <name>Jane Doe</name>
          <address>
            <street>Rua 2</street>
            <number>123</number>
            <city>São Paulo</city>
            <zip>23456-234</zip>
          </address>
        </customer>
      </customers>
    `.replace(regExp, ""));
  });

});