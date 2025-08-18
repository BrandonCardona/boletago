import {
  EventList,
  LoadingScreen,
  ModalLogin,
  ModalRegister,
} from "../../../components";
import { useEventos } from "../../../hooks";
import { useModalContext } from "../../../Modal/context/ModalContext";
import styles from "./HomePage.module.css";
import { handleApiError } from "../../../utilities/handleApiError";
import { useEffect } from "react";

export const HomePage = () => {
  const { data, error, loading } = useEventos();
  const { state, stateRegister } = useModalContext();

  useEffect(() => {
    if (error) {
      handleApiError(error);
    }
  }, [error]);

  if (loading) return <LoadingScreen active={loading} />;
  if (error) return null;
  return (
    <>
      <div className={styles.home_body}>
        <EventList eventList={data} />
      </div>
      {state && <ModalLogin />}
      {stateRegister && <ModalRegister />}
    </>
  );
};
