import axios from "axios";
import { getSession } from "next-auth/react";

const apiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// apiService.interceptors.request.use(
//   async (config) => {
//     console.log("headers");
//     const { data: session } = useSession();

//     if (!config.headers["Authorization"]) {
//       config.headers["Authorization"] = `Bearer 3453465456`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// apiService.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { data: session } = useSession();

//     const prevRequest = error?.config;

//     if (error?.response?.status === 401 && !prevRequest?.sent) {
//       prevRequest.sent = true;

//       const response = await authService.refreshTokens(session?.user?.refreshToken as string);

//       if (session) {
//         session.user.accessToken = response.data.data.accessToken;
//         session.user.refreshToken = response.data.data.refreshToken;
//       }

//       prevRequest.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
//       return apiService(prevRequest);
//     }

//     return Promise.reject(error);
//   }
// );

export default apiService;
