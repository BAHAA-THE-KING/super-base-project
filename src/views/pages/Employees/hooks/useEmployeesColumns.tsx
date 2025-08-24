import { useMemo } from "react";
import { useNavigate } from "react-router";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import {
  AssignmentInd as AssignmentIndIcon,
  PersonRemove as PersonRemoveIcon,
} from "@mui/icons-material";

import { BTooltip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { Employee } from "src/types/data/Employee";

const i18ns = [
  "number",
  "first_name",
  "last_name",
  "father_name",
  "birth_date",
  "joined_at",
  "salary",
  "is_active",
  "show_profile",
  "terminate",
];
export function useEmployeesColumns() {
  const [
    EmployeeNumberText,
    FirstNameText,
    LastNameText,
    FatherNameText,
    BirthDateText,
    JoinedAtText,
    SalaryText,
    IsActiveText,
    ShowProfileText,
    TerminateText,
  ] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  return useMemo<GridColDef<Employee>[]>(
    () => [
      {
        field: "id",
        headerName: EmployeeNumberText,
        flex: 1,
      },
      {
        field: "first_name",
        headerName: FirstNameText,
        flex: 1,
      },
      {
        field: "last_name",
        headerName: LastNameText,
        flex: 1,
      },
      {
        field: "father_name",
        headerName: FatherNameText,
        flex: 1,
      },
      {
        field: "birth_date",
        headerName: BirthDateText,
        flex: 1,
      },
      {
        field: "joined_at",
        headerName: JoinedAtText,
        flex: 1,
      },
      {
        field: "salary",
        headerName: SalaryText,
        flex: 1,
      },
      {
        field: "is_active",
        headerName: IsActiveText,
        flex: 1,
      },
      {
        field: "actions",
        flex: 1,
        type: "actions",
        getActions: ({ id }) => [
          <BTooltip title={ShowProfileText}>
            <GridActionsCellItem
              icon={<AssignmentIndIcon />}
              color="primary"
              label={ShowProfileText}
              onClick={() => navigate(id.toString())}
            />
          </BTooltip>,
          <BTooltip title={TerminateText}>
            <GridActionsCellItem
              icon={<PersonRemoveIcon />}
              color="error"
              label={TerminateText}
            />
          </BTooltip>,
        ],
      },
    ],
    []
  );
}
