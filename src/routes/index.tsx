import { useMemo } from "react";
import { People as PeopleIcon } from "@mui/icons-material";

import { Route } from "src/types/Route";

import {
  AllBeneficiariesPage,
  ShowBeneficiaryPage,
  ShowBeneficiaryRequestsPage,
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
  - hidden
  ──────────────────────────────────────
  Collapse
  - key
  - icon
  - title
  - children
  ──────────────────────────────────────
*/

const i18ns = ["all_beneficiaries"];
export function usePublicRoutes() {
  const [AllBeneficiariesText] = useBaseTranslation(i18ns);
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
        key: "show-beneficiary",
        path: "/beneficiary/:beneficiaryId",
        element: <ShowBeneficiaryPage />,
        hidden: true,
      },
      {
        key: "show-beneficiary-requests",
        path: "/beneficiary/:beneficiaryId/requests",
        element: <ShowBeneficiaryRequestsPage />,
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
