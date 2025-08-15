import type { EventosData } from "../../models/eventos";
import { SingleEvent } from "./SingleEvent/SingleEvent";
import styles from "./EventList.module.css";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../models";
import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../Modal/context/ModalContext";

interface EventListProps {
  eventList: EventosData[];
}

export const EventList = ({ eventList }: EventListProps) => {
  const navigate = useNavigate();
  const { setState, setPendingPath } = useModalContext();
  const { auth } = useAuthContext();

  const getEventId = (id: number) => {
    const path = `/${PrivateRoutes.PRIVATE}/${PrivateRoutes.EVENT_DETAIL}/${id}`;

    if (auth.userInfo) {
      navigate(path);
    } else {
      setPendingPath(path);
      setState(true);
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
            />
          );
        })}
      </ul>
    </>
  );
};
