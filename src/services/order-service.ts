import apiService from "./api-service";

const PREFIX = "/v1/orders";

export const orderService = {
  getOrders,
};

/**
 * Get orders list
 */
function getOrders() {
  return apiService.get(`${PREFIX}`);
}
