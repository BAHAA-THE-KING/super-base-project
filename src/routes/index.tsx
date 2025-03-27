import { useMemo } from "react";
import {
  HomeOutlined as HomeOutlinedIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  CloseOutlined as CloseOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  SaveOutlined as SaveOutlinedIcon,
  Insights as InsightsIcon,
} from "@mui/icons-material";

import { Route } from "src/types/Route";

import { ButtonsPage, CardsPage, TablePage, ChartsPage } from "src/views";
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
  "charts",
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
    ChartsText,
  ] = useBaseTranslation(i18ns);
  return useMemo<Route[]>(
    () => [
      {
        icon: HomeOutlinedIcon,
        key: "home",
        path: "/",
        title: HomeText,
        element: <ButtonsPage Component={HomeOutlinedIcon} />,
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
            element: <CardsPage Component={CloseOutlinedIcon} />,
          },
          {
            icon: CloseOutlinedIcon,
            key: "x-2",
            path: "/x-2",
            title: SecondText,
            element: <ButtonsPage Component={CloseOutlinedIcon} />,
          },
        ],
      },
      {
        icon: VisibilityOutlinedIcon,
        key: "watch",
        path: "/watch",
        title: WatchOtherPeopleText,
        element: <ButtonsPage Component={VisibilityOutlinedIcon} />,
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
        element: <ButtonsPage Component={EditOutlinedIcon} />,
      },
      {
        icon: SaveOutlinedIcon,
        key: "save",
        path: "/save",
        title: WaveYourselfText,
        element: <ButtonsPage Component={SaveOutlinedIcon} />,
      },
      {
        icon: SaveOutlinedIcon,
        key: "table",
        path: "/tables",
        title: TablesText,
        element: <TablePage />,
      },
      {
        icon: InsightsIcon,
        key: "chart",
        path: "/charts",
        title: ChartsText,
        element: <ChartsPage />,
      },
    ],
    []
  );
}
