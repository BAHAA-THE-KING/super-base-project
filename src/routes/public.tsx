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

import { HomePage, TablePage } from "src/views";
import { useBaseTranslation } from "src/hooks";

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

const i18ns = [
  "home",
  "deleted_routes",
  "first",
  "second",
  "watch_other_people",
  "edit_your_life",
  "save_yourself",
  "tables",
];
export function usePublicRoutes() {
  const [
    HomeText,
    DeletedRoutesText,
    FirstText,
    SecondText,
    WatchOtherPeopleText,
    EditYourLifeText,
    WaveYourselfText,
    TablesText,
  ] = useBaseTranslation(i18ns);
  return useMemo<Route[]>(
    () => [
      {
        icon: HomeOutlinedIcon,
        key: "home",
        path: "/",
        title: HomeText,
        element: <HomePage Component={HomeOutlinedIcon} />,
      },
      {
        key: "divider-1",
        isDivider: true,
      },
      {
        icon: DeleteOutlinedIcon,
        key: "deleted",
        title: DeletedRoutesText,
        children: [
          {
            icon: CloseOutlinedIcon,
            key: "x-1",
            path: "/x-1",
            title: FirstText,
            element: <HomePage Component={CloseOutlinedIcon} />,
          },
          {
            icon: CloseOutlinedIcon,
            key: "x-2",
            path: "/x-2",
            title: SecondText,
            element: <HomePage Component={CloseOutlinedIcon} />,
          },
        ],
      },
      {
        icon: VisibilityOutlinedIcon,
        key: "watch",
        path: "/watch",
        title: WatchOtherPeopleText,
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
        title: EditYourLifeText,
        element: <HomePage Component={EditOutlinedIcon} />,
      },
      {
        icon: SaveOutlinedIcon,
        key: "save",
        path: "/save",
        title: WaveYourselfText,
        element: <HomePage Component={SaveOutlinedIcon} />,
      },
      {
        icon: SaveOutlinedIcon,
        key: "table",
        path: "/tables",
        title: TablesText,
        element: <TablePage />,
      },
    ],
    []
  );
}
