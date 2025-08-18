import { useParams } from "react-router-dom";
import { useSingleEvent } from "../../../hooks/useSingleEvent";
import { LoadingScreen } from "../../../components";

export const EventEdit = () => {
  const { id } = useParams();
  const { data, error, loading } = useSingleEvent({ id: id ?? "" });

  if (loading) return <LoadingScreen active={loading} />;
  if (error) return <div>Tenemos un Error...</div>;
  if (!data) return null;
  return (
    <>
      <h1>EDITANDO EL EVENTO DE ID {id}</h1>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};
