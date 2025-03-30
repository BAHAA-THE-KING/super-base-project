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

import {
  ButtonsPage,
  CardsPage,
  InputsPage,
  SwitchesPage,
  RadiosPage,
  CheckboxesPage,
  AlertsPage,
  TablePage,
  ChartsPage,
  ProgressesPage,
  SnackbarsPage,
  HomePage,
} from "src/views";

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
    SaveYourselfText,
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
        element: <HomePage />,
      },
      {
        key: "divider-1",
        isDivider: true,
      },
      {
        icon: DeleteOutlinedIcon,
        key: "components",
        title: DeletedRoutesText,
        children: [
          {
            icon: HomeOutlinedIcon,
            key: "buttons",
            path: "/components/buttons",
            title: HomeText,
            element: <ButtonsPage />,
          },
          {
            icon: CloseOutlinedIcon,
            key: "cards",
            path: "/components/cards",
            title: FirstText,
            element: <CardsPage />,
          },
          {
            icon: CloseOutlinedIcon,
            key: "inputs",
            path: "/components/inputs",
            title: SecondText,
            element: <InputsPage />,
          },
          {
            icon: VisibilityOutlinedIcon,
            key: "switches",
            path: "/components/switches",
            title: WatchOtherPeopleText,
            element: <SwitchesPage />,
          },

          {
            icon: EditOutlinedIcon,
            key: "radios",
            path: "/components/radios",
            title: EditYourLifeText,
            element: <RadiosPage />,
          },
          {
            icon: SaveOutlinedIcon,
            key: "checkboxes",
            path: "/components/checkboxes",
            title: SaveYourselfText,
            element: <CheckboxesPage />,
          },
          {
            icon: SaveOutlinedIcon,
            key: "alerts",
            path: "/components/alerts",
            title: SaveYourselfText,
            element: <AlertsPage />,
          },
          {
            icon: SaveOutlinedIcon,
            key: "progresses",
            path: "/components/progresses",
            title: SaveYourselfText,
            element: <ProgressesPage />,
          },
          {
            icon: SaveOutlinedIcon,
            key: "snackbars",
            path: "/components/snackbars",
            title: SaveYourselfText,
            element: <SnackbarsPage />,
          },
          {
            icon: SaveOutlinedIcon,
            key: "table",
            path: "/components/tables",
            title: TablesText,
            element: <TablePage />,
          },
          {
            icon: InsightsIcon,
            key: "chart",
            path: "/components/charts",
            title: ChartsText,
            element: <ChartsPage />,
          },
        ],
      },
    ],
    []
  );
}
