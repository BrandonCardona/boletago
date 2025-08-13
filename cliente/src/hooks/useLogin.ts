import { useState } from "react";
import type { LoginProps, UserInfo } from "../models/user";
import { loginUser } from "../services/auth";
import { useAuthContext } from "../context/AuthContext";

interface LoginData {
  userInfo: UserInfo;
  expiresIn: number;
  csrfToken: string;
}

interface LoginResponse {
  error: boolean;
  data: LoginData;
}

export const useLogin = () => {
  const [data, setData] = useState<LoginData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const { setAuth, scheduleTokenRefresh } = useAuthContext();

  const doLogin = async ({ email, password }: LoginProps) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = (await loginUser({
        email,
        password,
      })) as LoginResponse;

      const resData = response.data;
      setAuth({
        userInfo: resData.userInfo,
        csrfToken: resData.csrfToken,
      });
      scheduleTokenRefresh(resData.expiresIn);
      setData(resData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, doLogin };
};
