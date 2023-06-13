import { Order } from "@/types";
import apiService from "./api-service";

const PREFIX = "/v1/orders";

export const orderService = {
  getOrders,
  createOrder,
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
