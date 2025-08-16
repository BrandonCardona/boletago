import type { LoginProps } from "../models/user";
import type { RegisterProps } from "../models/user";
import { rawAxios } from "./rawAxios.ts";

export const loginUser = async ({ email, password }: LoginProps) => {
  return await rawAxios.post(`/auth/login`, { email, password });
};

export const registerUser = async ({name, email, password}: RegisterProps) =>{
  const response = await rawAxios.post(`/auth/register`, {name, email, password });
  return response.data;
};

