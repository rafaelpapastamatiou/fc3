export type ProductProps = {
  id: string;
  name: string;
  price: number;
};

export type ProductConstructorProps = ProductProps;

export interface ProductInterface {
  get id(): string;
  get name(): string;
  get price(): number;
  validate(): boolean;
  changeName(name: string): void;
  changePrice(price: number): void;
}

export class Product implements ProductInterface {
  private props: ProductProps;

  constructor({ id, name, price }: ProductProps) {
    this.props = {
      id,
      name,
      price,
    };

    this.validate();
  }

  get id() { return this.props.id; }
  get name() { return this.props.name; }
  get price() { return this.props.price; }

  validate(): boolean {
    if (!this.id) { throw new Error("Id cannot be empty"); }
    if (!this.name) { throw new Error("Name cannot be empty"); }
    if (this.price <= 0) { throw new Error("Price must be greater than zero"); }

    return true;
  }

  changeName(name: string) {
    this.props.name = name;
    this.validate();
  }

  changePrice(price: number) {
    this.props.price = price;
    this.validate();
  }
}