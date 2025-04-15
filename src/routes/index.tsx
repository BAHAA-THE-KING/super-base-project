import { useMemo } from "react";
import {
  People as PeopleIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

import { Route } from "src/types/Route";

import { AllBeneficiariesPage, ShowBeneficiariesPage } from "src/views";

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
  - hidden
  ──────────────────────────────────────
  Collapse
  - key
  - icon
  - title
  - children
  ──────────────────────────────────────
*/

const i18ns = ["all_beneficiaries", "show_beneficiary"];
export function usePublicRoutes() {
  const [AllBeneficiariesText, ShowBeneficiariesText] =
    useBaseTranslation(i18ns);
  return useMemo<Route[]>(
    () => [
      {
        icon: PeopleIcon,
        key: "all-beneficiaries",
        path: "/",
        title: AllBeneficiariesText,
        element: <AllBeneficiariesPage />,
      },
      {
        icon: PersonIcon,
        key: "show-beneficiary",
        path: "/beneficiary/:beneficiaryId",
        title: ShowBeneficiariesText,
        element: <ShowBeneficiariesPage />,
        hidden: true,
      },
      {
        key: "divider-1",
        isDivider: true,
      },
    ],
    []
  );
}
