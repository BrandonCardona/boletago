import axios, { type InternalAxiosRequestConfig } from "axios";
import { VITE_API_URL } from "../config";
import { rawAxios } from "./rawAxios";
import type { AuthState } from "../context/AuthContext";
import type { RefreshProps } from "../context/AuthProvider";

interface AttachInterceptorsProps {
  getCsrfToken: () => string | null;
  setAuth: (data: AuthState) => void;
}

export const apiAxios = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});

export const attachInterceptors = ({
  getCsrfToken,
  setAuth,
}: AttachInterceptorsProps) => {
  apiAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getCsrfToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers["X-CSRF-Token"] = token;
    }
    return config;
  });

  apiAxios.interceptors.response.use(
    (res) => res,
    async (error) => {
      console.log("Original Request Error", error);
      const originalRequest = error.config;

      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.includes("/auth/refresh/refresh-token")
      ) {
        originalRequest._retry = true;

        try {
          const res = await rawAxios.post(`/auth/refresh/refresh-token`);

          const data = res.data?.data as RefreshProps;
          setAuth({
            userInfo: data.userInfo,
            csrfToken: data.csrfToken,
          });
          originalRequest.headers["X-CSRF-Token"] = data.csrfToken;
          return apiAxios(originalRequest);
        } catch {
          setAuth({ csrfToken: null, userInfo: null });
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
};
