import { useEffect } from "react";
import { useModalContext } from "../../Modal/context/ModalContext";
import { Register } from "../Register/Register";
import styles from "./ModalRegister.module.css";
import { useRegister } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../models";
import { LoginTittle } from "../Login/LoginTitle/LoginTitle";
import { ModalRegisterContainer } from "../../Modal/ModalRegisterContainer";

export const ModalRegister = () => {
    const { setStateRegister, pendingPath } = useModalContext();
    const { doRegister } = useRegister();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("nombre") as string;
        const email = formData.get("correo") as string;
        const password = formData.get("contraseña") as string;

        const result = await doRegister({ name, email, password });
        if (!result) return console.log("Hubo un error al registrarse");

        const path = pendingPath ?? `${PublicRoutes.HOME}`;
        setStateRegister(false);
        navigate(path);
    };

    useEffect(() => {
        setStateRegister(true);
    }, [setStateRegister]);

    return (
        <>
            <ModalRegisterContainer>
                <LoginTittle />
                <Register handleSubmit={handleSubmit} styles={styles} />
            </ModalRegisterContainer>

        </>
    );
};
