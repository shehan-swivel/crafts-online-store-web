import { StorageKeys } from "@/constants";
import { authService } from "@/services";
import { ChangePassword, Login } from "@/types";
import { getCookie } from "@/utils/cookie-utils";
import { AnyAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ReactNode, createContext, useEffect, useMemo, useReducer } from "react";

type AuthContextState = {
  isAuthenticated: boolean;
  user: any;
  isInitialised: boolean;
};

type AuthContextType = AuthContextState & {
  login: (data: Login) => Promise<AxiosResponse>;
  logout: () => void;
  changePassword: (data: ChangePassword) => Promise<AxiosResponse>;
};

const initialState: AuthContextState = {
  isAuthenticated: false,
  user: null,
  isInitialised: false,
};

const reducer = (state: AuthContextState, action: AnyAction) => {
  switch (action.type) {
    case "INITIALISE": {
      const { isAuthenticated, user } = action.payload;

      return {
        isAuthenticated,
        user,
        isInitialised: true,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: () => Promise.resolve({} as AxiosResponse),
  logout: () => Promise.resolve(),
  changePassword: () => Promise.resolve({} as AxiosResponse),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (data: Login) => {
    const response = await authService.login(data);
    dispatch({ type: "LOGIN", payload: { user: response.data.data.user } });
    return response;
  };

  const logout = async () => {
    authService.logout();
    dispatch({ type: "LOGOUT" });
  };

  const changePassword = async (data: ChangePassword) => {
    const response = await authService.changePassword(data);
    return response;
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        let user = null;
        const token = getCookie(StorageKeys.ACCESS_TOKEN);

        if (token) {
          const response = await authService.getCurrentUser();
          user = response.data.data;
        }

        dispatch({ type: "INITIALISE", payload: { isAuthenticated: !!user, user } });
      } catch (err) {
        dispatch({ type: "INITIALISE", payload: { isAuthenticated: false, user: null } });
      }
    };

    initialise();
  }, []);

  const providerValue = useMemo(() => ({ ...state, login, logout, changePassword }), [state]);

  if (!state.isInitialised) {
    return null;
  } else {
    return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
  }
};

export default AuthContext;
