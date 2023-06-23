import { StorageKeys } from "@/constants";
import { getCookie, setCookie } from "@/utils/cookie-utils";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const apiService = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
  async (config) => {
    const token = getCookie(StorageKeys.ACCESS_TOKEN);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response) {
      const token = getCookie(StorageKeys.REFRESH_TOKEN);

      if (error.response.status === 401 && token && !originalConfig._retry) {
        originalConfig._retry = true;

        // Refresh tokens when access token is expired using refresh token
        try {
          const response = await axios.get(`${baseURL}/v1/auth/refresh`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const { accessToken, refreshToken } = response.data.data;

          // Update stored tokens
          setCookie(StorageKeys.ACCESS_TOKEN, accessToken, { expires: 7 });
          setCookie(StorageKeys.REFRESH_TOKEN, refreshToken, { expires: 7 });

          return apiService(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }

      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default apiService;
