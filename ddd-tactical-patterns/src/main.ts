import { Customer } from "./domain/entities/customer";
import { Order } from "./domain/entities/order";
import { OrderItem } from "./domain/entities/order-item";
import { Address } from "./domain/valueObjects/address";

const customer = new Customer({
  id: '1',
  name: 'John Doe',
});

const address = new Address({
  city: 'São Paulo',
  street: 'Rua dos Bobos',
  number: 0,
  zip: '00000-000',
});

customer.changeAddress(address);

customer.activate();

const item1 = new OrderItem({
  id: '1',
  productId: '1',
  name: 'Item 1',
  price: 10,
  quantity: 1,
})
const item2 = new OrderItem({
  id: '2',
  productId: '2',
  name: 'Item 2',
  price: 20,
  quantity: 2,
})
const item3 = new OrderItem({
  id: '3',
  productId: '3',
  name: 'Item 3',
  price: 30,
  quantity: 3,
})

const order = new Order({
  id: '1',
  customerId: customer.id,
  items: [item1, item2, item3],
})