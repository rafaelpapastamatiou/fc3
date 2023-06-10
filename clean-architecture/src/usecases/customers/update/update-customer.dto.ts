export interface UpdateCustomerInputDTO {
  id: string;
  name: string;
  address?: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
}

export interface UpdateCustomerOutputDTO {
  id: string;
  name: string;
  address?: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
}