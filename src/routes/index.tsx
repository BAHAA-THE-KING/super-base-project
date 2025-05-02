import { useMemo } from "react";

import {
  Add as AddIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import { FaHandHoldingUsd as FaHandHoldingUsdIcon } from "react-icons/fa";
import { FaPrescriptionBottleAlt as FaPrescriptionBottleAltIcon } from "react-icons/fa";

import { Route } from "src/types/Route";

import {
  AddRequestPage,
  AllBeneficiariesPage,
  ShowBeneficiaryPage,
  ShowBeneficiaryRequestsPage,
} from "src/views";

import { useBaseTranslation } from "src/hooks";
import { SvgIcon } from "@mui/material";

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

const i18ns = [
  "all_beneficiaries",
  "add_request",
  "emergency_aids",
  "prescription_exchange",
  "special_materials",
];
export function usePublicRoutes() {
  const [
    AllBeneficiariesText,
    AddRequestText,
    EmergencyAidsText,
    PrescriptionExchangeText,
    SpecialMaterialsText,
  ] = useBaseTranslation(i18ns);
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
        key: "requests",
        icon: AddIcon,
        title: AddRequestText,
        children: [
          {
            key: "add-request",
            path: "/requests/add/emergency_aids",
            element: <AddRequestPage requestType="emergency_aids" />,
            icon: () => (
              <SvgIcon>
                <FaHandHoldingUsdIcon />
              </SvgIcon>
            ),
            title: EmergencyAidsText,
          },
          {
            key: "add-request",
            path: "/requests/add/prescription_exchange",
            element: <AddRequestPage requestType="prescription_exchange" />,
            icon: () => (
              <SvgIcon>
                <FaPrescriptionBottleAltIcon />
              </SvgIcon>
            ),
            title: PrescriptionExchangeText,
          },
          {
            key: "add-request",
            path: "/requests/add/special_materials",
            element: <AddRequestPage requestType="special_materials" />,
            icon: InventoryIcon,
            title: SpecialMaterialsText,
          },
        ],
      },
      {
        key: "divider-1",
        isDivider: true,
      },
    ],
    []
  );
}
