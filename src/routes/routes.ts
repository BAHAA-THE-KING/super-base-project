import { useMemo } from "react";

import { Route } from "src/types/Route";

import { WrongLocationSharp as WrongLocationSharpIcon } from "@mui/icons-material";

export function useRoutes() {
  return useMemo<Route[]>(
    () => [
      {
        icon: WrongLocationSharpIcon,
        key: "",
        path: "",
        title: "",
        component: WrongLocationSharpIcon,
      },
    ],
    []
  );
}
