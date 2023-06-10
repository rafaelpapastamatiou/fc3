export interface ListCustomersInputDTO {}

export interface ListCustomersOutputDTO {
  customers: {
    id: string;
    name: string;
    address?: {
      street: string;
      number: number;
      city: string;
      zip: string;
    };
  }[];
}