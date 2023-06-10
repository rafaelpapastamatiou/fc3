type OrderItemProps = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderItemConstructorProps = OrderItemProps;

export class OrderItem {
  private props: OrderItemProps;

  constructor({ id, productId, name, price, quantity }: OrderItemProps) {
    this.props = {
      id,
      productId,
      name,
      price,
      quantity,
    };

    this.validate();
  }

  get id() { return this.props.id; }
  get productId() { return this.props.productId; }
  get name() { return this.props.name; }
  get price() { return this.props.price; }
  get quantity() { return this.props.quantity; }

  orderItemTotal(): number {
    return this.props.price * this.props.quantity;
  }

  validate(): boolean {
    if (!this.id) { throw new Error("Id cannot be empty"); }
    if (!this.productId) { throw new Error("ProductId cannot be empty"); }
    if (!this.name) { throw new Error("Name cannot be empty"); }
    if (this.price <= 0) { throw new Error("Price must be greater than zero"); }
    if (this.quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    return true;
  }
}