import { EventList, LoadingScreen, ModalLogin, ModalRegister, ModalDeleteConfirmation } from "../../../components";
import { useEventos } from "../../../hooks";
import { useModalContext } from "../../../Modal/context/ModalContext";
import styles from "./HomePage.module.css";
import { handleApiError } from "../../../utilities/handleApiError";

export const HomePage = () => {
  const { data, error, loading } = useEventos();
  const { state, stateRegister, stateDelete} = useModalContext();

  if (loading) return <LoadingScreen active={loading} />;
    if (error) {
    handleApiError(error);
    return null; 
  }
  return (
    <>
      <div className={styles.home_body}>
        <h2>HOMEPAGE</h2>
        <EventList eventList={data} />
      </div>
      {state && <ModalLogin />}
      {stateRegister && <ModalRegister />}
      {stateDelete && <ModalDeleteConfirmation />}
      
    </>
  );
};
