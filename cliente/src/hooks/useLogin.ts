import { useState } from "react";
import type { LoginProps, UserInfo } from "../models/user";
import { loginUser } from "../services/auth";
import { useAuthContext } from "../context/AuthContext";

interface LoginData {
  userInfo: UserInfo;
  expiresIn: number;
  csrfToken: string;
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
      const response = await loginUser({
        email,
        password,
      });
      if (response.status !== 200) throw new Error();

      const resData = response.data.data as LoginData;
      setAuth({
        userInfo: resData.userInfo,
        csrfToken: resData.csrfToken,
      });
      scheduleTokenRefresh(resData.expiresIn);
      setData(resData);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, doLogin };
};
