import { useMemo } from "react";
import { t } from "i18next";

import {
  Home as HomeIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

import { Route } from "src/types/Route";

import { HomePage } from "src/views";

/*
  ──────────────────────────────────────
  Divider
  - key
  - isDivider
  ──────────────────────────────────────
  Item
  - icon
  - key
  - path
  - title
  - element
  ──────────────────────────────────────
  Collapse
  - key
  - icon
  - title
  - children
  ──────────────────────────────────────
*/

export function usePublicRoutes() {
  return useMemo<Route[]>(
    () => [
      {
        icon: HomeIcon,
        key: "home",
        path: "/",
        title: t("home"),
        element: <HomePage Component={HomeIcon} />,
      },
      {
        key: "divider-1",
        isDivider: true,
      },
      {
        icon: DeleteIcon,
        key: "deleted",
        title: t("deleted_routes"),
        children: [
          {
            icon: CloseIcon,
            key: "x-1",
            path: "/x-1",
            title: t("first"),
            element: <HomePage Component={CloseIcon} />,
          },
          {
            icon: CloseIcon,
            key: "x-2",
            path: "/x-2",
            title: t("second"),
            element: <HomePage Component={CloseIcon} />,
          },
        ],
      },
      {
        icon: VisibilityIcon,
        key: "watch",
        path: "/watch",
        title: t("watch_other_people"),
        element: <HomePage Component={VisibilityIcon} />,
      },
      {
        key: "divider-2",
        isDivider: true,
      },
      {
        icon: EditIcon,
        key: "edit",
        path: "/edit",
        title: t("edit_your_life"),
        element: <HomePage Component={EditIcon} />,
      },
      {
        icon: SaveIcon,
        key: "save",
        path: "/save",
        title: t("save_yourself"),
        element: <HomePage Component={SaveIcon} />,
      },
    ],
    []
  );
}
