import { useParams } from "react-router-dom";
import { useSingleEvent } from "../../../hooks/useSingleEvent";
import { LoadingScreen } from "../../../components";
import styles from "./EventDetail.module.css";

export const EventDetail = () => {
  const { id } = useParams();
  const { data, error, loading } = useSingleEvent({ id: id ?? "" });

  if (loading) return <LoadingScreen active={loading} />;
  if (error) return <div>Tenemos un Error...</div>;
  if (!data) return null;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.topSection}>
          {data.imagen && (
            <div className={styles.imageContainer}>
              <img src={data.imagen} alt={data.nombre_evento} />
            </div>
          )}

          <div className={styles.infoContainer}>
            <h1 className={styles.eventName}>{data.nombre_evento}</h1>

            {(data.fecha || data.hora) && (
              <p className={styles.dateTime}>
                {data.fecha && <span>{data.fecha}</span>}
                {data.fecha && data.hora && " • "}
                {data.hora && <span>{data.hora}</span>}
              </p>
            )}

            {data.ciudad && <p className={styles.location}>{data.ciudad}</p>}
            {data.nombre_estadio && (
              <p className={styles.stadium}>{data.nombre_estadio}</p>
            )}
          </div>
        </div>

        <div className={styles.bottomBar}>
          {data.nombre_estadio && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Lugar:</span>
              <span>{data.nombre_estadio}</span>
            </div>
          )}
          {data.fecha && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Fecha:</span>
              <span>{data.fecha}</span>
            </div>
          )}
          {data.hora && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Hora:</span>
              <span>{data.hora}</span>
            </div>
          )}
          {data.direccion && (
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Dirección:</span>
              <span>{data.direccion}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
