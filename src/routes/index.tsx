import { useMemo } from "react";
import { SvgIcon } from "@mui/material";

import {
  Add as AddIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import {
  FaHandHoldingUsd as FaHandHoldingUsdIcon,
  FaPrescriptionBottleAlt as FaPrescriptionBottleAltIcon,
} from "react-icons/fa";
import { GrGroup as GrGroupIcon, GrPlan as GrPlanIcon } from "react-icons/gr";

import { Route } from "src/types/Route";

import {
  AddRequestPage,
  AllBeneficiariesPage,
  ShowBeneficiaryPage,
  ShowBeneficiaryRequestsPage,
  GroupsPage,
  GroupShowPage,
  PlansPage,
  PlanShowPage,
  MeetsPage,
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

const i18ns = [
  "all_beneficiaries",
  "add_request",
  "emergency_aids",
  "prescription_exchange",
  "special_materials",
  "groups_info",
  "plans_info",
  "meets_info",
];
export function usePublicRoutes() {
  const [
    AllBeneficiariesText,
    AddRequestText,
    EmergencyAidsText,
    PrescriptionExchangeText,
    SpecialMaterialsText,
    GroupsInfoText,
    PlansInfoText,
    MeetsInfoText,
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
      {
        key: "groups",
        path: "/groups",
        element: <GroupsPage />,
        icon: () => (
          <SvgIcon>
            <GrGroupIcon />
          </SvgIcon>
        ),
        title: GroupsInfoText,
      },
      {
        key: "show-groups",
        path: "/groups/:groupId",
        element: <GroupShowPage />,
        hidden: true,
      },
      {
        key: "plans",
        path: "/plans",
        element: <PlansPage />,
        icon: () => (
          <SvgIcon>
            <GrPlanIcon />
          </SvgIcon>
        ),
        title: PlansInfoText,
      },
      {
        key: "show-plan",
        path: "/plans/:planId",
        element: <PlanShowPage />,
        hidden: true,
      },
      {
        key: "divider-2",
        isDivider: true,
      },
      {
        key: "meets",
        path: "/meets",
        element: <MeetsPage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        title: MeetsInfoText,
      },
    ],
    []
  );
}
