import { Router } from "express";

import { customerRoutes } from "../customers/http/customer.routes";
import { productRoutes } from "../products/http/product.routes";

export const routes = Router();

routes.use("/customers", customerRoutes)
routes.use("/products", productRoutes);