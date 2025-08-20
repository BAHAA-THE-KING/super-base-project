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
  DoctorsPage,
  DoctorsShowPage,
  SecretaryPage,
  SecretaryShowPage,
  AppointmentsPage,
  AppointmentsDatePage,
  AppointmentsShowPage,
  ClinicBalancePage,
  DonationBooksPage,
  DonationBooksShowPage,
  EmployeesPage,
  EmployeesShowPage,
  ExpensesPage,
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
  "groups_info",
  "plans_info",
  "meets_info",
  "services_department",
  "clinic_department",
  "doctors",
  "secretary",
  "appointments",
  "clinic_balance",
  "accountant_department",
  "donation_books",
  "employees",
  "expenses",
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
    ServicesDepartmentText,
    ClinicDepartmentText,
    DoctorsText,
    SecretaryText,
    AppointmentsText,
    ClinicBalanceText,
    AccountantDepartmentText,
    DonationBooksText,
    EmployeesText,
    ExpensesText,
  ] = useBaseTranslation(i18ns);
  return useMemo<Route[]>(
    () => [
      {
        key: "services-department",
        title: ServicesDepartmentText,
      },
      {
        icon: PeopleIcon,
        key: "all-beneficiaries",
        path: "/beneficiary",
        title: AllBeneficiariesText,
        element: <AllBeneficiariesPage />,
      },
      {
        key: "add-beneficiary",
        path: "/beneficiary/add",
        element: <ShowBeneficiaryPage createMode />,
        hidden: true,
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
      {
        key: "clinic-department",
        title: ClinicDepartmentText,
      },
      {
        key: "doctor",
        path: "/doctors",
        element: <DoctorsPage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        title: DoctorsText,
      },
      {
        key: "show-doctors",
        path: "/doctors/:doctorId",
        element: <DoctorsShowPage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        hidden: true,
      },
      {
        key: "secretary",
        path: "/secretary",
        element: <SecretaryPage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        title: SecretaryText,
      },
      {
        key: "show-secretary",
        path: "/secretary/:secretaryId",
        element: <SecretaryShowPage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        hidden: true,
      },
      {
        key: "appointments",
        path: "/appointments",
        element: <AppointmentsPage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        title: AppointmentsText,
      },
      {
        key: "appointments-date",
        path: "/appointments/date/:date",
        element: <AppointmentsDatePage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        hidden: true,
      },
      {
        key: "show-appointments",
        path: "/appointments/:appointmentId",
        element: <AppointmentsShowPage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        hidden: true,
      },
      {
        key: "clinic-balance",
        path: "/clinic-balance",
        element: <ClinicBalancePage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        title: ClinicBalanceText,
      },
      {
        key: "accountant-department",
        title: AccountantDepartmentText,
      },
      {
        key: "donation-books",
        path: "/donation-books",
        element: <DonationBooksPage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        title: DonationBooksText,
      },
      {
        key: "show-donation-books",
        path: "/donation-books/:bookId",
        element: <DonationBooksShowPage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        hidden: true,
      },
      {
        key: "employees",
        path: "/employees",
        element: <EmployeesPage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        title: EmployeesText,
      },
      {
        key: "show-employees",
        path: "/employees/:employeeId",
        element: <EmployeesShowPage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        hidden: true,
      },
      {
        key: "expenses",
        path: "/expenses",
        element: <ExpensesPage />,
        icon: () => (
          <SvgIcon>
            {/* TODO: change the icon */}
            <GrPlanIcon />
          </SvgIcon>
        ),
        title: ExpensesText,
      },
    ],
    []
  );
}
