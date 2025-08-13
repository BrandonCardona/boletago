import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "../pages";

export const RoutesWithNotFound = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Routes>
        {children}
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </>
  );
};
