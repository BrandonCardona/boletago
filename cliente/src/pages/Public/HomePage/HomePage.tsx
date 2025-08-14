import { EventList, LoadingScreen } from "../../../components";
import { useEventos } from "../../../hooks";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const { data, error, loading } = useEventos();

  if (loading) return <LoadingScreen active={loading} />;
  if (error) return <div>Tenemos un Error...</div>;
  return (
    <>
      <div className={styles.home_body}>
        <h2>HOMEPAGE</h2>
        <EventList eventList={data} />
      </div>
    </>
  );
};
