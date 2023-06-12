import { ChangePassword, Login } from "@/types";
import apiService from "./api-service";
import { StorageKeys } from "@/constants";

const PREFIX = "/v1/auth";

export const authService = {
  login,
  getCurrentUser,
  changePassword,
  logout,
  refreshTokens,
};

/**
 * Login
 * @param {Login} data
 */
async function login(data: Login) {
  const response = await apiService.post(`${PREFIX}/login`, data);
  // Save access token in the local storage
  // localStorage.setItem(StorageKeys.ACCESS_TOKEN, response.data.data.accessToken);
  return response;
}

/**
 * Get current logged in user data
 */
function getCurrentUser() {
  return apiService.get(`${PREFIX}/me`);
}

/**
 * Change password
 * @param {ChangePassword} data
 */
function changePassword(data: ChangePassword) {
  return apiService.post(`${PREFIX}/change-password`, data);
}

/**
 * Refresh tokens
 * @param {string} refreshToken
 */
function refreshTokens(refreshToken: string) {
  return apiService.get(`${PREFIX}/refresh`, { headers: { Authorization: `Bearer ${refreshToken}` } });
}

/**
 * Logout user
 */
function logout() {
  localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
  return true;
}
