import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "../../utilities";
import { PrivateRoutes } from "../../models";
import { Dashboard } from "./Dashboard/Dashboard";

export const Private = () => {
  return (
    <>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
        <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
      </RoutesWithNotFound>
    </>
  );
};
