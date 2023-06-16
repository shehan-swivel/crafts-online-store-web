import { ChangePassword, Login } from "@/types";
import apiService from "./api-service";
import { StorageKeys } from "@/constants";
import { removeCookie, setCookie } from "@/utils/cookie-utils";

const PREFIX = "/v1/auth";

export const authService = {
  login,
  getCurrentUser,
  changePassword,
  logout,
};

/**
 * Login
 * @param {Login} data
 */
async function login(data: Login) {
  const response = await apiService.post(`${PREFIX}/login`, data);
  const { accessToken, refreshToken } = response.data.data;
  // Save tokens as cookies
  setCookie(StorageKeys.ACCESS_TOKEN, accessToken);
  setCookie(StorageKeys.REFRESH_TOKEN, refreshToken);
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
 * Logout user
 */
function logout() {
  removeCookie(StorageKeys.ACCESS_TOKEN);
  removeCookie(StorageKeys.REFRESH_TOKEN);
  return true;
}
