import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "../../utilities";
import { PrivateRoutes, PublicRoutes } from "../../models";
import { EventDetail } from "./EventDetail/EventDetail";

export const Private = () => {
  return (
    <>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={PublicRoutes.HOME} />} />
        <Route
          path={`${PrivateRoutes.EVENT_DETAIL}/${PrivateRoutes.EVENT_DETAIL_PARAM}`}
          element={<EventDetail />}
        />
      </RoutesWithNotFound>
    </>
  );
};
