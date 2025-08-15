import type { LoginProps } from "../models/user";
import { rawAxios } from "./rawAxios.ts";

export const loginUser = async ({ email, password }: LoginProps) => {
  return await rawAxios.post(`/auth/login`, { email, password });
};
