import { useEffect } from "react";
import { useModalContext } from "../../Modal/context/ModalContext";
import { Modal } from "../../Modal/Modal";
import { Login } from "../Login/Login";
import styles from "./ModalLogin.module.css";
import { useLogin } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../models";
import { LoginTittle } from "../Login/LoginTitle/LoginTitle";

export const ModalLogin = () => {
  const { setState, pendingPath } = useModalContext();
  const { doLogin } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("correo") as string;
    const password = formData.get("contraseña") as string;

    const result = await doLogin({ email, password });
    if (!result) return console.log("Credenciales incorrectas");

    const path = pendingPath ?? `${PublicRoutes.HOME}`;
    setState(false);
    navigate(path);
  };

  useEffect(() => {
    setState(true);
  }, [setState]);

  return (
    <>
      <Modal>
        <LoginTittle />
        <Login handleSubmit={handleSubmit} styles={styles} />
      </Modal>
    </>
  );
};
