import { CreateProductDto, DeleteProductDto, Product, UpdateProductDto } from "../../domain/models/product.model";
import { GetProductsResponse, ProductsResponseResult, ProductDeleteByIdRespose, CreateProductsResponse, UpdateRespose } from "../interfaces/product-api.interface";

// Mapea un solo producto desde 'GetProductsResponse' al modelo 'Product'
const toProduct = (response: ProductsResponseResult): Product => {
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    logo: response.logo,
    date_release: new Date(response.date_release).toDateString(),
    date_revision: new Date(response.date_revision).toDateString(),
  };
};

export const toProducts = (response: GetProductsResponse): Product[] => {
  const results = response.data;
  return results.map(result => toProduct(result));
};

export const toDeleteMessage = (id: string, response: ProductDeleteByIdRespose): DeleteProductDto => {
  // The mapper transforms the API delete response into a DeleteProductDto.
  // Preserve the API message so callers get the original server message.
  return {
    id,
    message: response.message
  };
};


export const toProductAdd = ({ data, message }: CreateProductsResponse): CreateProductDto => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    logo: data.logo,
    date_release: data.date_release,
    date_revision: data.date_revision,
    message: message
  };
};


export const toUpdateProduct = ({ data, message }: UpdateRespose): UpdateProductDto => {
  return {
    name: data.name,
    description: data.description,
    logo: data.logo,
    date_release: data.date_release,
    date_revision: data.date_revision,
    message: message
  };
};