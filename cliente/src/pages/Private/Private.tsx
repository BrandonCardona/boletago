import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "../../utilities";
import { PrivateRoutes } from "../../models";
import { Dashboard } from "./Dashboard/Dashboard";
import { EventDetail } from "./EventDetail/EventDetail";

export const Private = () => {
  return (
    <>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
        <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
        <Route
          path={`${PrivateRoutes.EVENT_DETAIL}/${PrivateRoutes.EVENT_DETAIL_PARAM}`}
          element={<EventDetail />}
        />
      </RoutesWithNotFound>
    </>
  );
};
