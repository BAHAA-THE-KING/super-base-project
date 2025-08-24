import { useMemo } from "react";
import { SvgIcon } from "@mui/material";

import { Home as HomeIcon, Add as AddIcon } from "@mui/icons-material";
import { GrPlan as GrPlanIcon } from "react-icons/gr";
import { FaBook as FaBookIcon, FaTable as FaTableIcon } from "react-icons/fa";
import { IoIosPerson as IoIosPersonIcon } from "react-icons/io";
import { IoReceiptOutline as IoReceiptOutlineIcon } from "react-icons/io5";
import { GiReceiveMoney as GiReceiveMoneyIcon } from "react-icons/gi";

import { Route } from "src/types/Route";

import {
  MeetsPage,
  DonationBooksPage,
  DonationBooksShowPage,
  EmployeesPage,
  EmployeesShowPage,
  ExpensesPage,
  ExpensesShowPage,
  DonationsPage,
  DonationsShowPage,
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
  "meets_info",
  "accountant_department",
  "donation_books",
  "employees",
  "expenses",
  "donations",
  "home_page",
  "show_donation_books",
  "add_donation_book",
  "show_employees",
  "add_employee",
  "show_expenses",
  "add_expense",
  "show_donations",
  "add_donation",
];
export function useAccountantRoutes() {
  const [
    MeetsInfoText,
    AccountantDepartmentText,
    DonationBooksText,
    EmployeesText,
    ExpensesText,
    DonationsText,
    HomePageText,
    ShowDonationBooksText,
    AddDonationBookText,
    ShowEmployeesText,
    AddEmployeeText,
    ShowExpensesText,
    AddExpenseText,
    ShowDonationsText,
    AddDonationText,
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
        key: "accountant-department",
        title: AccountantDepartmentText,
      },
      {
        key: "donation-books",
        title: DonationBooksText,
        icon: () => (
          <SvgIcon>
            <FaBookIcon />
          </SvgIcon>
        ),
        children: [
          {
            key: "all-donation-books",
            path: "/accountant/donation-books",
            element: <DonationBooksPage />,
            icon: () => (
              <SvgIcon>
                <FaTableIcon />
              </SvgIcon>
            ),
            title: ShowDonationBooksText,
          },
          {
            key: "add-donation-books",
            path: "/accountant/donation-books/add",
            element: <DonationBooksShowPage isAdd />,
            icon: AddIcon,
            title: AddDonationBookText,
          },
        ],
      },
      {
        key: "show-donation-books",
        path: "/accountant/donation-books/:bookId",
        element: <DonationBooksShowPage />,
        hidden: true,
      },
      {
        key: "employees",
        title: EmployeesText,
        icon: () => (
          <SvgIcon>
            <IoIosPersonIcon />
          </SvgIcon>
        ),
        children: [
          {
            key: "employees",
            path: "/accountant/employees",
            element: <EmployeesPage />,
            icon: () => (
              <SvgIcon>
                <FaTableIcon />
              </SvgIcon>
            ),
            title: ShowEmployeesText,
          },
          {
            key: "show-employees",
            path: "/accountant/employees/add",
            element: <EmployeesShowPage isAdd />,
            icon: AddIcon,
            title: AddEmployeeText,
          },
        ],
      },
      {
        key: "show-employees",
        path: "/accountant/employees/:employeeId",
        element: <EmployeesShowPage />,
        hidden: true,
      },
      {
        key: "expenses",
        title: ExpensesText,
        icon: () => (
          <SvgIcon>
            <IoReceiptOutlineIcon />
          </SvgIcon>
        ),
        children: [
          {
            key: "all-expenses",
            path: "/accountant/expenses",
            element: <ExpensesPage />,
            icon: () => (
              <SvgIcon>
                <FaTableIcon />
              </SvgIcon>
            ),
            title: ShowExpensesText,
          },
          {
            key: "add-expenses",
            path: "/accountant/expenses/add",
            element: <ExpensesShowPage isAdd />,
            icon: AddIcon,
            title: AddExpenseText,
          },
        ],
      },
      {
        key: "show-expenses",
        path: "/accountant/expenses/:expenseId",
        element: <ExpensesShowPage />,
        hidden: true,
      },
      {
        key: "donations",
        title: DonationsText,
        icon: () => (
          <SvgIcon>
            <GiReceiveMoneyIcon />
          </SvgIcon>
        ),
        children: [
          {
            key: "all-donations",
            path: "/accountant/donations",
            element: <DonationsPage />,
            icon: () => (
              <SvgIcon>
                <FaTableIcon />
              </SvgIcon>
            ),
            title: ShowDonationsText,
          },
          {
            key: "add-donations",
            path: "/accountant/donations/add",
            element: <DonationsShowPage isAdd />,
            icon: AddIcon,
            title: AddDonationText,
          },
        ],
      },
      {
        key: "show-donations",
        path: "/accountant/donations/:donationId",
        element: <DonationsShowPage />,
        hidden: true,
      },
      {
        key: "meets",
        path: "/accountant/meets",
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
