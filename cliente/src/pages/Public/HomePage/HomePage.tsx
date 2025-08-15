import { EventList, LoadingScreen, ModalLogin } from "../../../components";
import { useEventos } from "../../../hooks";
import { useModalContext } from "../../../Modal/context/ModalContext";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const { data, error, loading } = useEventos();
  const { state } = useModalContext();

  if (loading) return <LoadingScreen active={loading} />;
  if (error) return <div>Tenemos un Error...</div>;
  return (
    <>
      <div className={styles.home_body}>
        <h2>HOMEPAGE</h2>
        <EventList eventList={data} />
      </div>
      {state && <ModalLogin />}
    </>
  );
};
