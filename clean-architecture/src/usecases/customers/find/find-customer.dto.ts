export interface FindCustomerInputDTO {
  id: string;
}

export interface FindCustomerOutputDTO {
  id: string;
  name: string;
  address?: {
    street: string;
    number: number;
    city: string;
    zip: string;
  };
}