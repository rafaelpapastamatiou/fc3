import { Product } from "../entities/product";
import { Repository } from "../../@shared/repositories/repository";

export interface ProductsRepository extends Repository<Product> {}