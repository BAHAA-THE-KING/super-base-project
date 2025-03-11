import { useMemo } from "react";
import { t } from "i18next";

import {
  HomeOutlined as HomeOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  CloseOutlined as CloseOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  SaveOutlined as SaveOutlinedIcon,
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
        icon: HomeOutlinedIcon,
        key: "home",
        path: "/",
        title: t("home"),
        element: <HomePage Component={HomeOutlinedIcon} />,
      },
      {
        key: "divider-1",
        isDivider: true,
      },
      {
        icon: DeleteOutlinedIcon,
        key: "deleted",
        title: t("deleted_routes"),
        children: [
          {
            icon: CloseOutlinedIcon,
            key: "x-1",
            path: "/x-1",
            title: t("first"),
            element: <HomePage Component={CloseOutlinedIcon} />,
          },
          {
            icon: CloseOutlinedIcon,
            key: "x-2",
            path: "/x-2",
            title: t("second"),
            element: <HomePage Component={CloseOutlinedIcon} />,
          },
        ],
      },
      {
        icon: VisibilityOutlinedIcon,
        key: "watch",
        path: "/watch",
        title: t("watch_other_people"),
        element: <HomePage Component={VisibilityOutlinedIcon} />,
      },
      {
        key: "divider-2",
        isDivider: true,
      },
      {
        icon: EditOutlinedIcon,
        key: "edit",
        path: "/edit",
        title: t("edit_your_life"),
        element: <HomePage Component={EditOutlinedIcon} />,
      },
      {
        icon: SaveOutlinedIcon,
        key: "save",
        path: "/save",
        title: t("save_yourself"),
        element: <HomePage Component={SaveOutlinedIcon} />,
      },
    ],
    []
  );
}
