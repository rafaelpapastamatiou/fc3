export interface ListProductsInputDTO {}

export interface ListProductsOutputDTO {
  products: {
    id: string;
    name: string;
    price: number;
  }[];
}