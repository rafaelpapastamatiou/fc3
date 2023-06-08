type AddressProps = {
  street: string;
  number: number;
  city: string;
  zip: string;
}

export class Address {
  private props: AddressProps;

  constructor({ street, number, city, zip }: AddressProps) {
    this.props = {
      street,
      number,
      city,
      zip
    };

    this.validate();
  }

  get street() { return this.props.street; }
  get number() { return this.props.number; }
  get city() { return this.props.city; }
  get zip() { return this.props.zip; }

  validate() {
    if (!this.street) throw new Error('Street is required');
    if (!this.number) throw new Error('Number is required');
    if (!this.city) throw new Error('City is required');
    if (!this.zip) throw new Error('Zip code is required');
  }

  toString() {
    return `${this.street}, ${this.number} - ${this.city} ${this.zip}`;
  }
}