import { apiAxios } from "./apiAxios";
import { rawAxios } from "./rawAxios";

export const getEventos = async () => {
  return await rawAxios.get(`/api/eventos/eventos`);
};
export const getArtistas = async () => {
  const res = await apiAxios.get(`/api/eventos/artistas`);
  return res.data;
};

export const getEstadios = async () => {
  const res = await apiAxios.get(`/api/eventos/estadios`);
  return res.data;
};
export const getSingleEvent = async ({ id }: { id: string }) => {
  return await apiAxios.get(`/api/eventos/${id}`);
};

export const postEvento = async (eventoData: any) => {
  try {
    const response = await apiAxios.post(`/api/eventos/post`, eventoData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear evento:", error)
    return null;
  }
};

export const putEvento = async (id: string, eventoData: any) => {
  try {
    const response = await apiAxios.put(`/api/eventos/put/${id}`, eventoData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al editar el evento:", error);
    return null;
  }

};

export const deleteEvento = async (id: string) => {
  try {
    const response = await apiAxios.delete(`/api/eventos/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el evento:", error);
    return null;
  }

};


