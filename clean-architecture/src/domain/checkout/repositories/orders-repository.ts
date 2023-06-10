import { Order } from "../entities/order";
import { Repository } from "../../@shared/repositories/repository";

export interface OrdersRepository extends Repository<Order> {}