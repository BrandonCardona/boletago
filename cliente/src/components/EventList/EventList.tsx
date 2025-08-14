import type { EventosData } from "../../models/eventos";
import { SingleEvent } from "./SingleEvent/SingleEvent";
import styles from "./EventList.module.css";

interface EventListProps {
  eventList: EventosData[];
}

export const EventList = ({ eventList }: EventListProps) => {
  const getEventId = (id: number) => {
    console.log("Id del evento", id);
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
