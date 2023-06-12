import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import apiService from "@/services/api-service";

const useAxios = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = apiService.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
        }
        console.log(config)
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = apiService.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          await refreshToken();

          prevRequest.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;

          return apiService(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiService.interceptors.request.eject(requestIntercept);
      apiService.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return apiService;
};

export default useAxios;
