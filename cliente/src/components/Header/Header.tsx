import { Link } from "react-router-dom";
import { SessionButton, LogoButton } from "../HeaderButtons";
import style from "./Header.module.css";
import { PrivateRoutes, Roles } from "../../models";
import { useAuthContext } from "../../context/AuthContext";

export const Header = () => {
  const { auth } = useAuthContext();

  const isAdmin = auth.userInfo?.nombre_rol === Roles.ADMIN;

  return (
    <>
      <nav className={style.navbar}>
        <LogoButton />
        {isAdmin && (
          <ul className={style.ul_list}>
            <li>
              <Link to={`/${PrivateRoutes.DASHBOARD}`}>Crear Evento</Link>
            </li>
          </ul>
        )}
        <ul className={style.ul_list}>
          <li>Conciertos</li>
          <li>Deportes</li>
          <li>Teatro</li>
        </ul>
        <ul className={`${style.ul_list}`}>
          <li>Bono Regalo</li>
          <li>Contacto</li>
          <SessionButton />
        </ul>
      </nav>
    </>
  );
};
