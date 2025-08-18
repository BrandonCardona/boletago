import type { EventosData } from "../../../models/eventos";
import styles from "./SingleEvent.module.css";

interface AdminActionsType {
  editEvent: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void;
  deleteEvent: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void;
}

interface SingleEventProps {
  event: EventosData;
  handleClick: (id: number) => void;
  isAdmin: boolean;
  adminActions: AdminActionsType;
}

export const SingleEvent = ({
  event,
  handleClick,
  isAdmin,
  adminActions: { editEvent, deleteEvent },
}: SingleEventProps) => {
  const [day, month, year] = event.fecha.split("/").map(Number);
  const eventData = new Date(year, month - 1, day);

  return (
    <>
      <li
        className={styles.card}
        onClick={() => {
          handleClick(event.id_evento);
        }}
      >
        <div className={styles.imageWrapper}>
          <img src={event.imagen} alt={event.nombre_evento} />
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{event.nombre_evento}</h3>
          <p className={styles.artist}>{event.nombre_artista}</p>
          <p className={styles.location}>
            {event.nombre_estadio} <br />
            {event.ciudad}
          </p>
        </div>

        <div className={styles.date}>
          <span className={styles.day}>{eventData.getDate()}</span>
          <span className={styles.month}>
            {eventData.toLocaleString("es-ES", { month: "short" })}
          </span>
          <span className={styles.weekday}>
            {eventData.toLocaleString("es-Es", {
              weekday: "short",
            })}
          </span>
        </div>

        {isAdmin && (
          <div className={styles.adminActions}>
            <button
              className={`${styles.adminButton} ${styles.editButton}`}
              onClick={(e) => {
                editEvent(e, event.id_evento);
              }}
            >
              Editar
            </button>
            <button
              className={`${styles.adminButton} ${styles.deleteButton}`}
              onClick={(e) => {
                deleteEvent(e, event.id_evento);
              }}
            >
              Eliminar
            </button>
          </div>
        )}
      </li>
    </>
  );
};
