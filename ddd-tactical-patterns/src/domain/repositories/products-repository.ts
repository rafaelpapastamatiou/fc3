import { Product } from "../entities/product";
import { Repository } from "./repository";

export interface ProductsRepository extends Repository<Product> {}