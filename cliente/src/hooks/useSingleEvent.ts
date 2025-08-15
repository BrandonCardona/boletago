import { useCallback, useEffect, useState } from "react";
import type { SingleEventData } from "../models/eventos";
import { getSingleEvent } from "../services";

export const useSingleEvent = ({ id }: { id: string }) => {
  const [data, setData] = useState<SingleEventData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getSingleEvent({ id });
      if (response.status !== 200) throw new Error();
      const newData = response.data.data as SingleEventData;
      setData(newData);
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};
