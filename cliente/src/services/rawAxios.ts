import axios from "axios";
import { VITE_API_URL } from "../config";

export const rawAxios = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
});
