import { Entity } from "../../@shared/entities/entity";
import { NotificationError } from "../../@shared/notifications/notification.error";

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
    if (!this.id) {
      this.notification.addError({
        context: "Product",
        message: "Id cannot be empty",
      });
    }

    if (!this.name) {
      this.notification.addError({
        context: "Product",
        message: "Name cannot be empty",
      });
    }

    if (this.price <= 0) {
      this.notification.addError({
        context: "Product",
        message: "Price must be greater than zero",
      });
    }

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