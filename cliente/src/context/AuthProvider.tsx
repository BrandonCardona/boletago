import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AuthContext, type AuthState } from "./AuthContext";
import { rawAxios } from "../services/rawAxios";
import type { UserInfo } from "../models/user";
import axios from "axios";
import { attachInterceptors } from "../services/apiAxios";

interface Props {
  children: ReactNode;
}

export interface RefreshProps {
  userInfo: UserInfo;
  message: string;
  csrfToken: string;
  expiresIn: number;
}

export const AuthProvider = ({ children }: Props) => {
  const attachedRef = useRef(false);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const refreshAuthRef = useRef<() => Promise<void> | null>(null);
  const csrfTokenRef = useRef<string | null>(null);
  const [auth, setAuth] = useState<AuthState>({
    userInfo: null,
    csrfToken: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const scheduleTokenRefresh = useCallback((expiresIn: number) => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    const refreshTime = expiresIn - 10 * 1000;
    // const refreshTime = expiresIn - 292 * 1000;
    refreshTimeoutRef.current = setTimeout(() => {
      console.log("⏳ Token por expirar, refrescando...");
      refreshAuthRef.current?.();
    }, refreshTime);
  }, []);

  const refreshAuth = useCallback(async () => {
    try {
      const res = await rawAxios.post("/auth/refresh/refresh-token");
      if (res.data?.data) {
        const data = res.data?.data as RefreshProps;

        setAuth({
          userInfo: data.userInfo,
          csrfToken: data.csrfToken,
        });

        scheduleTokenRefresh(data.expiresIn);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setAuth({ userInfo: null, csrfToken: null });
      } else {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [scheduleTokenRefresh]);

  const logout = useCallback(async () => {
    try {
      await rawAxios.get(`/api/logout`);
      await rawAxios.get(`/auth/refresh/logout`);
    } finally {
      setAuth({ userInfo: null, csrfToken: null });
    }
  }, []);

  useEffect(() => {
    csrfTokenRef.current = auth.csrfToken;
  }, [auth.csrfToken]);

  useEffect(() => {
    refreshAuthRef.current = refreshAuth;
    refreshAuth();

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [refreshAuth]);

  useEffect(() => {
    if (!attachedRef.current) {
      attachInterceptors({
        getCsrfToken: () => csrfTokenRef.current,
        setAuth: (data) => setAuth((prev) => ({ ...prev, ...data })),
      });
      attachedRef.current = true;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        refreshAuth,
        logout,
        scheduleTokenRefresh,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
