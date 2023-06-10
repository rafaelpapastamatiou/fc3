import { Router } from "express";
import { PrismaCustomersRepository } from "../repositories/prisma-customers-repository";
import { CreateCustomerUseCase } from "../../../usecases/customers/create/create-customer.usecase";
import { CreateCustomerInputDTO } from "../../../usecases/customers/create/create-customer.dto";
import { ListCustomersUseCase } from "../../../usecases/customers/list/list-customers.usecase";
import { ListCustomersPresenter } from "./presenters/list-customers.presenter";

export const customerRoutes = Router();

customerRoutes.post("/", async (req, res) => {
  const customersRepository = new PrismaCustomersRepository();
  const createCustomerUsecase = new CreateCustomerUseCase(customersRepository);

  try {
    const createCustomerDto: CreateCustomerInputDTO = {
      name: req.body.name,
      address: req.body.address && {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip,
      }
    };

    const output = await createCustomerUsecase.execute(createCustomerDto);

    return res.status(201).json(output);
  } catch (err) {
    return res.status(500).send(err);
  }
});

customerRoutes.get("/", async (req, res) => {
  const customersRepository = new PrismaCustomersRepository();
  const listCustomersUsecase = new ListCustomersUseCase(customersRepository);

  try {
    const output = await listCustomersUsecase.execute({});

    return res.status(200).format({
      json: () => res.json(output),
      xml: () => res.send(ListCustomersPresenter.toXML(output)),
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});