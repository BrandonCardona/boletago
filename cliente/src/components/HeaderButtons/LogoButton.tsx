import { useNavigate } from "react-router-dom";
import style from "./HeaderButtons.module.css";
import { PublicRoutes } from "../../models";

export const LogoButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${PublicRoutes.HOME}`);
  };

  return (
    <>
      <p className={style.title} onClick={handleNavigate}>
        BoletaGO
      </p>
    </>
  );
};
