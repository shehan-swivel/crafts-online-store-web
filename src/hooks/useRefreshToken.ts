import apiService from "@/services/api-service";
import { signIn, useSession } from "next-auth/react";

const PREFIX = "/v1/auth";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await apiService.get(`${PREFIX}/refresh`, {
      headers: { Authorization: `Bearer ${session?.user.refreshToken}` },
    });

    if (session) {
      session.user.accessToken = res.data.accessToken;
    } else {
      signIn();
    }
  };

  return refreshToken;
};
