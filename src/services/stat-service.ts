import apiService from "./api-service";

const PREFIX = "/v1/stats";

export const statService = {
  getAnalytics,
};

/**
 * Get dashboard analytics data
 */
function getAnalytics() {
  return apiService.get(`${PREFIX}`);
}
