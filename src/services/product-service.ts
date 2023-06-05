import { ProductQuery } from "@/types";
import apiService from "./api-service";

const PREFIX = "/v1/products";

export const productService = {
  getProducts,
};

/**
 * Get product list
 * @param {ProductQuery} queryParams
 */
function getProducts(queryParams: ProductQuery) {
  const params = { ...queryParams };
  return apiService.get(`${PREFIX}`, { params });
}
