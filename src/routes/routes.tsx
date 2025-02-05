import { useMemo } from "react";

import {
  Home as HomeIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

import { Route } from "src/types/Route";

export function useRoutes() {
  return useMemo<Route[]>(
    () => [
      {
        icon: HomeIcon,
        key: "home",
        path: "/",
        title: "Home",
        component: <HomeIcon />,
      },
      {
        key: "divider-1",
        isDivider: true,
      },
      {
        icon: DeleteIcon,
        key: "deleted",
        title: "Deleted Routes",
        children: [
          {
            icon: CloseIcon,
            key: "x-1",
            path: "/x-1",
            title: "First",
            component: <CloseIcon />,
          },
          {
            icon: CloseIcon,
            key: "x-2",
            path: "/x-2",
            title: "Second",
            component: <CloseIcon />,
          },
        ],
      },
      {
        icon: VisibilityIcon,
        key: "watch",
        path: "/watch",
        title: "Watch Other People",
        component: <VisibilityIcon />,
      },
      {
        key: "divider-2",
        isDivider: true,
      },
      {
        icon: EditIcon,
        key: "edit",
        path: "/edit",
        title: "Edit Your Life",
        component: <EditIcon />,
      },
      {
        icon: SaveIcon,
        key: "save",
        path: "/save",
        title: "Save Yourself",
        component: <SaveIcon />,
      },
    ],
    []
  );
}
