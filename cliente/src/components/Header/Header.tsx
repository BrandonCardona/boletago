import { Link } from "react-router-dom";
import { SessionButton, LogoButton } from "../HeaderButtons";
import style from "./Header.module.css";
import { PrivateRoutes } from "../../models";

export const Header = () => {
  return (
    <>
      <nav className={style.navbar}>
        <LogoButton />
        <ul className={style.ul_list}>
          <Link to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.DASHBOARD}`}>
            Dashboard
          </Link>
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
