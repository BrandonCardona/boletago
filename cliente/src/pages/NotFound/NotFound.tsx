import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <h2>PAGINA NO ENCONTRADA</h2>
      <button onClick={handleClick}>Ir a la pagina principal</button>
    </>
  );
};
