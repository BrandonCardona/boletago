import { apiAxios } from "../../services/apiAxios";

export const Test = () => {
  const handleFetch = async () => {
    const response = await apiAxios(`http://localhost:3000/api`);
    console.log(response);
  };

  return (
    <>
      <button onClick={handleFetch}>Consultar Datos</button>
    </>
  );
};
