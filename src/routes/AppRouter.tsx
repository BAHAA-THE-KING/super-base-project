import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import { useAccountantRoutes, useClinicRoutes, useServicesRoutes } from ".";

import { NotFoundPage } from "src/views";

import { Route as RouteType } from "src/types/Route";

export function AppRouter() {
  const servicesRoutes = useServicesRoutes();
  const clinicRoutes = useClinicRoutes();
  const accountantRoutes = useAccountantRoutes();
  const mapRoutes = (routes: RouteType[]) =>
    routes.map((route) => (
      <React.Fragment key={route.key}>
        {route.isDivider ? null : route?.children?.length ? (
          mapRoutes(route.children)
        ) : route.path ? (
          <Route key={route.key!} path={route.path!} element={route.element!} />
        ) : null}
      </React.Fragment>
    ));
  return (
    <BrowserRouter>
      <Routes>
        {mapRoutes(
          servicesRoutes.concat(clinicRoutes).concat(accountantRoutes)
        )}
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
