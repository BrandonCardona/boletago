import { useCallback, useEffect, useState } from "react";
import { getEventos } from "../services";
import type { EventosData } from "../models/eventos";

export const useEventos = () => {
  const [data, setData] = useState<EventosData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getEventos();
      if (response.status !== 200) throw new Error("Error al obtener datos");
      const newData = response.data.data as EventosData[];
      setData(newData);
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};


