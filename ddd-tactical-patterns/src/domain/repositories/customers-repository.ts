import { Customer } from "../entities/customer";
import { Repository } from "./repository";

export interface CustomersRepository extends Repository<Customer> {}