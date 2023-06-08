import { Customer } from "./entities/customer";
import { Order } from "./entities/order";
import { OrderItem } from "./entities/order-item";
import { Address } from "./valueObjects/address";

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