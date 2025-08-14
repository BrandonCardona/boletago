import { apiAxios } from "./apiAxios";

export const getEventos = async () => {
  return await apiAxios.get(`/api/eventos/eventos`);
};
