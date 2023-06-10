import { Router } from "express";

import { PrismaProductsRepository } from "../repositories/prisma-products-repository";
import { ListProductsUseCase } from "../../../usecases/products/list/list-products.usecase";

export const productRoutes = Router();

productRoutes.get("/", async (req, res) => {
  const productsRepository = new PrismaProductsRepository();
  const listProductsUseCase = new ListProductsUseCase(productsRepository);

  try {
    const output = await listProductsUseCase.execute({});

    return res.status(200).json(output);
  } catch (err) {
    return res.status(500).send(err);
  }
});