export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
  message?:string;
}

export interface CreateProductDto {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
  message?:string;
}

export interface UpdateProductDto {
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
  message?: string;
}

export interface DeleteProductDto{
  id: string;
  message?: string;
}

export interface MessageApi{
  status: number;
  message: string;
}