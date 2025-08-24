import { useMemo } from "react";
import { SvgIcon } from "@mui/material";

import {
  Add as AddIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import {
  FaHandHoldingUsd as FaHandHoldingUsdIcon,
  FaPrescriptionBottleAlt as FaPrescriptionBottleAltIcon,
  FaTable as FaTableIcon,
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
  LoginPage,
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
  - hidden
  ──────────────────────────────────────
  Collapse
  - key
  - icon
  - title
  - children
  ──────────────────────────────────────
  Title
  - key
  - title
  ──────────────────────────────────────
*/

const i18ns = [
  "all_beneficiaries",
  "add_request",
  "emergency_aids",
  "prescription_exchange",
  "special_materials",
  "show_groups",
  "plans_info",
  "services_department",
  "home_page",
  "add_beneficiary",
  "manage_beneficiaries",
  "manage_groups",
  "add_group",
  "add_plan",
  "plans",
];
export function useServicesRoutes() {
  const [
    AllBeneficiariesText,
    AddRequestText,
    EmergencyAidsText,
    PrescriptionExchangeText,
    SpecialMaterialsText,
    ShowGroupsText,
    PlansInfoText,
    ServicesDepartmentText,
    HomePageText,
    AddBeneficiaryText,
    ManageBeneficiariesText,
    ManageGroupsText,
    AddGroupText,
    AddPlanText,
    PlansText,
  ] = useBaseTranslation(i18ns);
  return useMemo<Route[]>(
    () => [
      {
        key: "login",
        path: "/login",
        element: <LoginPage />,
        hidden: true,
      },
      {
        icon: HomeIcon,
        key: "home",
        path: "/",
        element: <HomePage />,
        title: HomePageText,
      },
      {
        key: "services-department",
        title: ServicesDepartmentText,
      },
      {
        key: "beneficiaries",
        icon: PeopleIcon,
        title: ManageBeneficiariesText,
        children: [
          {
            key: "all-beneficiaries",
            icon: () => (
              <SvgIcon>
                <FaTableIcon />
              </SvgIcon>
            ),
            path: "/services/beneficiary",
            title: AllBeneficiariesText,
            element: <AllBeneficiariesPage />,
          },
          {
            key: "add-beneficiary",
            icon: AddIcon,
            path: "/services/beneficiary/add",
            element: <ShowBeneficiaryPage createMode />,
            title: AddBeneficiaryText,
          },
        ],
      },
      {
        key: "show-beneficiary",
        path: "/services/beneficiary/:beneficiaryId",
        element: <ShowBeneficiaryPage />,
        hidden: true,
      },
      {
        key: "show-beneficiary-requests",
        path: "/services/beneficiary/:beneficiaryId/requests",
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
            icon: () => (
              <SvgIcon>
                <FaHandHoldingUsdIcon />
              </SvgIcon>
            ),
            path: "/services/requests/add/emergency_aids",
            element: <AddRequestPage requestType="emergency_aids" />,
            title: EmergencyAidsText,
          },
          {
            key: "add-request",
            path: "/services/requests/add/prescription_exchange",
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
            path: "/services/requests/add/special_materials",
            element: <AddRequestPage requestType="special_materials" />,
            icon: InventoryIcon,
            title: SpecialMaterialsText,
          },
        ],
      },
      {
        key: "groups",
        title: ManageGroupsText,
        icon: () => (
          <SvgIcon>
            <GrGroupIcon />
          </SvgIcon>
        ),
        children: [
          {
            key: "all-groups",
            path: "/services/groups",
            element: <GroupsPage />,
            icon: () => (
              <SvgIcon>
                <FaTableIcon />
              </SvgIcon>
            ),
            title: ShowGroupsText,
          },
          {
            key: "add-groups",
            path: "/services/groups/add",
            element: <GroupShowPage isAdd />,
            icon: AddIcon,
            title: AddGroupText,
          },
        ],
      },
      {
        key: "show-groups",
        path: "/services/groups/:groupId",
        element: <GroupShowPage />,
        hidden: true,
      },
      {
        key: "plans",
        icon: () => (
          <SvgIcon>
            <GrPlanIcon />
          </SvgIcon>
        ),
        title: PlansText,
        children: [
          {
            key: "all-plans",
            path: "/services/plans",
            element: <PlansPage />,
            icon: () => (
              <SvgIcon>
                <FaTableIcon />
              </SvgIcon>
            ),
            title: PlansInfoText,
          },
          {
            key: "add-plan",
            icon: AddIcon,
            title: AddPlanText,
            path: "/services/plans/add",
            element: <PlanShowPage isAdd />,
          },
        ],
      },
      {
        key: "show-plan",
        path: "/services/plans/:planId",
        element: <PlanShowPage />,
        hidden: true,
      },
    ],
    []
  );
}
