import { Address } from "../valueObjects/address";

type CustomerProps = {
  id: string;
  name: string;
  active: boolean;
  address?: Address;
}

type CustomerConstructorProps = Omit<CustomerProps, 'active'>;

export class Customer {
  private props: CustomerProps;

  constructor({ id, name, address }: CustomerConstructorProps) {
    this.props = {
      id,
      name,
      address,
      active: false,
    };

    this.validate();
  }

  get id() { return this.props.id; }
  get name() { return this.props.name; }
  get address() { return this.props.address; }
  get isActive() { return this.props.active; }

  validate(): boolean {
    if (!this.id) { throw new Error("Id cannot be empty"); }
    if (!this.name) { throw new Error("Name cannot be empty"); }

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
}