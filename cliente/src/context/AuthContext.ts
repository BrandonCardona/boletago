import { createContext, useContext } from "react";
import type { UserInfo } from "../models/user";

export interface AuthState {
  userInfo: UserInfo | null;
  csrfToken: string | null;
}

interface AuthContextProps {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
  scheduleTokenRefresh: (expiresIn: number) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext must be used within a Provider");

  return context;
};
