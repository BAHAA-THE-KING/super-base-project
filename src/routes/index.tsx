import { useMemo } from "react";
import { People as PeopleIcon } from "@mui/icons-material";

import { Route } from "src/types/Route";

import { AllBeneficiariesPage } from "src/views";

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

const i18ns = ["show_beneficiaries"];
export function usePublicRoutes() {
  const [ShowBeneficiariesText] = useBaseTranslation(i18ns);
  return useMemo<Route[]>(
    () => [
      {
        icon: PeopleIcon,
        key: "show-beneficiaries",
        path: "/",
        title: ShowBeneficiariesText,
        element: <AllBeneficiariesPage />,
      },
      {
        key: "divider-1",
        isDivider: true,
      },
    ],
    []
  );
}
