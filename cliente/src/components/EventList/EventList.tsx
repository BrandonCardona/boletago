import type { EventosData } from "../../models/eventos";
import { SingleEvent } from "./SingleEvent/SingleEvent";
import styles from "./EventList.module.css";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes, Roles } from "../../models";
import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../Modal/context/ModalContext";

interface EventListProps {
  eventList: EventosData[];
}

export const EventList = ({ eventList }: EventListProps) => {
  const navigate = useNavigate();
  const { setState, setPendingPath, setStateDelete, setEventToDelete } = useModalContext();
  const { auth } = useAuthContext();

  const isAdmin = auth.userInfo?.nombre_rol === Roles.ADMIN;

  const getEventId = (id: number) => {
    const path = `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.EVENT_DETAIL}/${id}`;
    if (auth.userInfo) {
      navigate(path);
    } else {
      setPendingPath(path);
      setState(true);
    }
  };

  const editEvent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    navigate(`/${PrivateRoutes.EDIT}/${id}`);
  };

  const deleteEvent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
     console.log("🗑 deleteEvent called with id:", id);
    setEventToDelete(id);  // Guardamos el id en el contexto
    setStateDelete(true);  // Abrimos el modal
 

  };

  return (
    <ul className={styles.event_grid}>
      {eventList.map((event) => (
        <SingleEvent
          handleClick={getEventId}
          key={event.id_evento}
          event={event}
          isAdmin={isAdmin}
          adminActions={{ editEvent, deleteEvent }}
        />
      ))}
    </ul>
  );
};
