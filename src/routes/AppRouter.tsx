import { BrowserRouter, Route, Routes, Navigate } from "react-router";

import { usePublicRoutes } from "./public";

export function AppRouter() {
  const publicRoutes = usePublicRoutes();
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => (
          <Route path={route.path} element={route.element} />
        ))}
        <Route path={"*"} element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}
