import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import { usePublicRoutes } from "./public";

import { NotFoundPage } from "src/views";

import { Route as RouteType } from "src/types/Route";

export function AppRouter() {
  const publicRoutes = usePublicRoutes();
  const mapRoutes = (routes: RouteType[]) =>
    routes.map((route) => (
      <React.Fragment key={route.key}>
        {route.isDivider ? null : route?.children?.length ? (
          mapRoutes(route.children)
        ) : (
          <Route key={route.key!} path={route.path!} element={route.element!} />
        )}
      </React.Fragment>
    ));
  return (
    <BrowserRouter>
      <Routes>
        {mapRoutes(publicRoutes)}
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
