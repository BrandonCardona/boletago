import styles from "./LoginPage.module.css";
import fotoLogin from "../../../assets/img/ticket.png";
import { useLogin } from "../../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../models";
import { Login } from "../../../components";
import { LoginTittle } from "../../../components/Login/LoginTitle/LoginTitle";
import { useModalContext } from "../../../Modal/context/ModalContext";
import { ModalRegister } from "../../../components/ModalRegister/ModalRegister";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { doLogin } = useLogin();
  const { stateRegister } = useModalContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("correo") as string;
    const password = formData.get("contraseña") as string;

    const result = await doLogin({ email, password });
    if (!result) return console.log("Usuario no logueado");
    navigate(`/${PublicRoutes.HOME}`);
  };

  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.loginPageIzquierda}>
          <LoginTittle />
          <Login handleSubmit={handleSubmit} styles={styles} />
        </div>
        <div className={styles.loginPageDerecha}>
          <img src={fotoLogin} alt="Fondo Boleta" />
        </div>
      </div>
      {stateRegister && <ModalRegister />}
    </>
  );
};
