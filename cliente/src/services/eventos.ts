import { apiAxios } from "./apiAxios";
import { rawAxios } from "./rawAxios";

export const getEventos = async () => {
  return await rawAxios.get(`/api/eventos/eventos`);
};

export const getSingleEvent = async ({ id }: { id: string }) => {
  return await apiAxios.get(`/api/eventos/${id}`);
};
