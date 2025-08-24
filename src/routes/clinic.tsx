import { useMemo } from "react";
import { SvgIcon } from "@mui/material";

import { Home as HomeIcon, Add as AddIcon } from "@mui/icons-material";
import { FaUserDoctor as FaUserDoctorIcon } from "react-icons/fa6";
import { FaTable as FaTableIcon } from "react-icons/fa";
import { TbDeviceDesktopCog as TbDeviceDesktopCogIcon } from "react-icons/tb";
import { RiCalendarScheduleFill as RiCalendarScheduleFillIcon } from "react-icons/ri";
import { GiMoneyStack as GiMoneyStackIcon } from "react-icons/gi";

import { Route } from "src/types/Route";

import {
  DoctorsPage,
  DoctorsShowPage,
  SecretaryPage,
  SecretaryShowPage,
  AppointmentsPage,
  AppointmentsDatePage,
  AppointmentsShowPage,
  ClinicBalancePage,
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
  "clinic_department",
  "doctors",
  "secretary",
  "appointments",
  "clinic_balance",
  "home_page",
  "show_doctors",
  "add_doctor",
  "show_secretaries",
  "add_secretary",
  "show_appointments",
  "add_appointment",
];
export function useClinicRoutes() {
  const [
    ClinicDepartmentText,
    DoctorsText,
    SecretaryText,
    AppointmentsText,
    ClinicBalanceText,
    HomePageText,
    ShowDoctorsText,
    AddDoctorText,
    ShowSecretariesText,
    AddSecretaryText,
    ShowAppointmentsText,
    AddAppointmentText,
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
        key: "clinic-department",
        title: ClinicDepartmentText,
      },
      {
        key: "doctors",
        icon: () => (
          <SvgIcon>
            <FaUserDoctorIcon />
          </SvgIcon>
        ),
        title: DoctorsText,
        children: [
          {
            key: "all-doctors",
            path: "/clinic/doctors",
            element: <DoctorsPage />,
            icon: () => (
              <SvgIcon>
                <FaTableIcon />
              </SvgIcon>
            ),
            title: ShowDoctorsText,
          },
          {
            key: "add-doctors",
            path: "/clinic/doctors/add",
            element: <DoctorsShowPage isAdd />,
            icon: AddIcon,
            title: AddDoctorText,
          },
        ],
      },
      {
        key: "show-doctors",
        path: "/clinic/doctors/:doctorId",
        element: <DoctorsShowPage />,
        hidden: true,
      },
      {
        key: "secretary",
        icon: () => (
          <SvgIcon>
            <TbDeviceDesktopCogIcon />
          </SvgIcon>
        ),
        title: SecretaryText,
        children: [
          {
            key: "all-secretaries",
            path: "/clinic/secretary",
            element: <SecretaryPage />,
            icon: () => (
              <SvgIcon>
                <FaTableIcon />
              </SvgIcon>
            ),
            title: ShowSecretariesText,
          },
          {
            key: "add-secretary",
            path: "/clinic/secretary/add",
            element: <SecretaryShowPage isAdd />,
            icon: AddIcon,
            title: AddSecretaryText,
          },
        ],
      },
      {
        key: "show-secretary",
        path: "/clinic/secretary/:secretaryId",
        element: <SecretaryShowPage />,
        hidden: true,
      },
      {
        key: "appointments",
        icon: () => (
          <SvgIcon>
            <RiCalendarScheduleFillIcon />
          </SvgIcon>
        ),
        title: AppointmentsText,
        children: [
          {
            key: "all-appointments",
            path: "/clinic/appointments",
            element: <AppointmentsPage />,
            icon: () => (
              <SvgIcon>
                <FaTableIcon />
              </SvgIcon>
            ),
            title: ShowAppointmentsText,
          },
          {
            key: "add-appointments",
            path: "/clinic/appointments/add",
            element: <AppointmentsShowPage isAdd />,
            icon: AddIcon,
            title: AddAppointmentText,
          },
        ],
      },
      {
        key: "appointments-date",
        path: "/clinic/appointments/date/:date",
        element: <AppointmentsDatePage />,
        hidden: true,
      },
      {
        key: "show-appointments",
        path: "/clinic/appointments/:appointmentId",
        element: <AppointmentsShowPage />,
        hidden: true,
      },
      {
        key: "clinic-balance",
        path: "/clinic/clinic-balance",
        element: <ClinicBalancePage />,
        icon: () => (
          <SvgIcon>
            <GiMoneyStackIcon />
          </SvgIcon>
        ),
        title: ClinicBalanceText,
      },
    ],
    []
  );
}
