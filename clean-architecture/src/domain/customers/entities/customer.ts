import { Entity } from "../../@shared/entities/entity";
import { NotificationError } from "../../@shared/notifications/notification.error";
import { Address } from "../../@shared/valueObjects/address";
import { CustomerValidatorFactory } from "../factories/customer-validator.factory";

type CustomerProps = {
  name: string;
  active: boolean;
  rewardPoints: number;
  address?: Address;
}

export type CustomerConstructorProps =
  Omit<CustomerProps, "active" | "rewardPoints"> & {
    id: string;
  }

export class Customer extends Entity {
  private props: CustomerProps;

  constructor({ id, name, address }: CustomerConstructorProps) {
    super(id);

    this.props = {
      name,
      address,
      active: false,
      rewardPoints: 0,
    };

    this.validate();
  }

  get name() { return this.props.name; }
  get address() { return this.props.address; }
  get isActive() { return this.props.active; }
  get rewardPoints() { return this.props.rewardPoints; }

  validate(): boolean {
    const validator = CustomerValidatorFactory.create();

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

  activate() {
    if (!this.address) {
      throw new Error("Client must have an address to be activated");
    }

    this.props.active = true;
  }

  deactivate() {
    this.props.active = false;
  }

  changeAddress(address: Address) {
    this.props.address = address;
  }

  addRewardPoints(points: number) {
    this.props.rewardPoints += points;
    this.validate();
  }
}