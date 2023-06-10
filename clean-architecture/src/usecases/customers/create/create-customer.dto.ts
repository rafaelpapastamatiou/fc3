export interface CreateCustomerInputDTO {
  name: string;
  address?: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
}

export interface CreateCustomerOutputDTO {
  id: string;
  name: string;
  address?: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
}