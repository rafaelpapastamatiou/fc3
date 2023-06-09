import { Order } from "../entities/order";
import { Repository } from "./repository";

export interface OrdersRepository extends Repository<Order> {}