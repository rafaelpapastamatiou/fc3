import { Customer } from "../entities/customer";
import { Repository } from "../../@shared/repositories/repository";

export interface CustomersRepository extends Repository<Customer> {}