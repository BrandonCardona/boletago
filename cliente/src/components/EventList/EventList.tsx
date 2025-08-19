import type { EventosData } from "../../models/eventos";
import { SingleEvent } from "./SingleEvent/SingleEvent";
import styles from "./EventList.module.css";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes, Roles } from "../../models";
import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../Modal/context/ModalContext";
import { toast } from "react-toastify";
import { deleteEvento } from "../../services/eventos";


interface EventListProps {
  eventList: EventosData[];
}

export const EventList = ({ eventList }: EventListProps) => {
  const navigate = useNavigate();
  const { setState, setPendingPath } = useModalContext();
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

const deleteEvent = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  id: number
) => {
  e.stopPropagation();

  try {
    const result = await deleteEvento(String(id));
    if (!result) {
      toast.error("Error al eliminar el evento");
      return;
    }
    toast.success("Evento eliminado");
    window.location.reload(); 
  } catch (err) {
    console.error("Error:", err);
    toast.error("No se pudo eliminar el evento");
  }
};

  return (
    <>
      <ul className={styles.event_grid}>
        {eventList.map((event) => {
          return (
            <SingleEvent
              handleClick={getEventId}
              key={event.id_evento}
              event={event}
              isAdmin={isAdmin}
              adminActions={{ editEvent, deleteEvent }}
            />
          );
        })}
      </ul>
    </>
  );
};
