import { ProductQuery } from "@/types";
import apiService from "./api-service";

const PREFIX = "/v1/products";

export const productService = {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

/**
 * Get product list
 * @param {ProductQuery} [queryParams]
 */
function getProducts(queryParams?: ProductQuery) {
  const params = queryParams ? { ...queryParams } : {};
  return apiService.get(`${PREFIX}`, { params });
}

/**
 * Add new product
 * @param {FormData} data
 */
function addProduct(data: FormData) {
  return apiService.post(`${PREFIX}`, data, { headers: { "Content-Type": "multipart/form-data" } });
}

/**
 * Get a product by product id
 * @param {string} id
 */
function getProductById(id: string) {
  return apiService.get(`${PREFIX}/${id}`);
}

/**
 * Update a product
 * @param {string} id
 * @param {Employee} data
 */
function updateProduct(id: string, data: FormData) {
  return apiService.put(`${PREFIX}/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
}

/**
 * Delete a product
 * @param {string} id
 */
function deleteProduct(id: string) {
  return apiService.delete(`${PREFIX}/${id}`);
}
