import { Product, ProductDeletionConfirmation, MyProduct } from "../../domain/models/product.model";
import { ProductApiResponse, ProductApiResult, ProductDeleteByIdRespose, ProductSaveRespose } from "../interfaces/product-api.interface";

// Mapea un solo producto desde 'ProductApiResult' al modelo 'Product'
const toProduct = (response: ProductApiResult): Product => {
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    logo: response.logo,
    date_releas: new Date(response.date_release),
    date_revision: new Date(response.date_revision)
  };
};


export const toProducts = (response: ProductApiResponse): Product[] => {
  const results = response.data;
  return results.map(result => toProduct(result));
};

export const toDeleteMessage = (id: string, response: ProductDeleteByIdRespose): ProductDeletionConfirmation => {
  return {
    id,
    message: response.message
  };
};



export const toProductAdd = ({ data, message }: ProductSaveRespose): MyProduct => {
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