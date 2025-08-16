import { EventList, LoadingScreen, ModalLogin, ModalRegister } from "../../../components";
import { useEventos } from "../../../hooks";
import { useModalContext } from "../../../Modal/context/ModalContext";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const { data, error, loading } = useEventos();
  const { state, stateRegister } = useModalContext();

  if (loading) return <LoadingScreen active={loading} />;
  if (error) return <div>Tenemos un Error...</div>;
  return (
    <>
      <div className={styles.home_body}>
        <h2>HOMEPAGE</h2>
        <EventList eventList={data} />
      </div>
      {state && <ModalLogin />}
      {stateRegister && <ModalRegister />}
    </>
  );
};
