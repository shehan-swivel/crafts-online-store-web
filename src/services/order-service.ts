import { Order } from "@/types";
import apiService from "./api-service";
import { OrderStatus } from "@/constants";

const PREFIX = "/v1/orders";

export const orderService = {
  getOrders,
  createOrder,
  deleteOrder,
  updateOrderStatus,
};

/**
 * Get orders list
 */
function getOrders() {
  return apiService.get(`${PREFIX}`);
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
