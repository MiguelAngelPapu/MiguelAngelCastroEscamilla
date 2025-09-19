import { Product, ProductDeletionConfirmation } from "../../domain/models/product.model";
import { ProductApiResponse, ProductApiResult, ProductDeleteByIdRespose } from "../interfaces/product-api.interface";

// Mapea un solo producto desde 'ProductApiResult' al modelo 'Product'
const toProduct = (apiResult: ProductApiResult): Product => {
  return {
    id: apiResult.id,
    name: apiResult.name,
    description: apiResult.description,
    logo: apiResult.logo,
    date_release: new Date(apiResult.date_release),
    date_revision: new Date(apiResult.date_revision)
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