import { Product } from "../../domain/models/product.model";
import { ProductApiResponse, ProductApiResult } from "../interfaces/product-api.interface";

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

// Mapea la respuesta completa, extrayendo el array 'data'
export const toProducts = (response: ProductApiResponse): Product[] => {
  const results = response.data;
  return results.map(result => toProduct(result));
};