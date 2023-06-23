import { OrderStatus } from "@/constants";
import { Order, OrderQuery } from "@/types";
import apiService from "./api-service";

const PREFIX = "/v1/orders";

export const orderService = {
  getOrders,
  createOrder,
  deleteOrder,
  updateOrderStatus,
};

/**
 * Get orders list
 * @param {OrderQuery} [queryParams]
 */
function getOrders(queryParams?: OrderQuery) {
  const params = queryParams ? { ...queryParams } : {};
  return apiService.get(`${PREFIX}`, { params });
}

/**
 * Create an order
 * @param {Order} data
 */
function createOrder(data: Order) {
  return apiService.post(`${PREFIX}`, data);
}

/**
 * Delete an order
 * @param {string} id
 */
function deleteOrder(id: string) {
  return apiService.delete(`${PREFIX}/${id}`);
}

/**
 * Update order status
 * @param {string} id
 * @param {OrderStatus} status
 */
function updateOrderStatus(id: string, status: OrderStatus) {
  return apiService.patch(`${PREFIX}/${id}`, { status });
}
