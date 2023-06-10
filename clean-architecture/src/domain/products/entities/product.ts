import { Entity } from "../../@shared/entities/entity";
import { NotificationError } from "../../@shared/notifications/notification.error";
import { ProductValidatorFactory } from "../factories/product-validator.factory";

export type ProductProps = {
  name: string;
  price: number;
};

export type ProductConstructorProps = ProductProps & {
  id: string;
};

export class Product extends Entity {
  private props: ProductProps;

  constructor({ id, name, price }: ProductConstructorProps) {
    super(id);

    this.props = {
      name,
      price,
    };

    this.validate();
  }

  get name() { return this.props.name; }
  get price() { return this.props.price; }

  validate(): boolean {
    const validator = ProductValidatorFactory.create();

    validator.validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors);
    }

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