import { useMemo } from "react";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import { Edit as EditIcon } from "@mui/icons-material";

import { BTooltip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { AppointmentTable } from "src/types/data/AppointmentTable";
import { AppointmentStatusChip } from "../../AppointmentsDate/components";

const i18ns = [
  "beneficiary_name",
  "beneficiary_national_number",
  "doctor_name",
  "date",
  "from_hour",
  "to_hour",
  "status",
];
export function useAppointmentsColumns(onEdit: (id: number) => void) {
  const [
    BeneficiaryNameText,
    BeneficiaryNationalNumberText,
    DoctorNameText,
    DateText,
    FromHourText,
    ToHourText,
    StatusText,
  ] = useBaseTranslation(i18ns);

  return useMemo<GridColDef<AppointmentTable>[]>(
    () => [
      {
        field: "beneficiary_name",
        headerName: BeneficiaryNameText,
        flex: 1,
      },
      {
        field: "beneficiary_national_number",
        headerName: BeneficiaryNationalNumberText,
        flex: 1,
      },
      {
        field: "doctor_name",
        headerName: DoctorNameText,
        flex: 1,
      },
      {
        field: "date",
        headerName: DateText,
        flex: 1,
      },
      {
        field: "from",
        headerName: FromHourText,
        flex: 1,
      },
      {
        field: "to",
        headerName: ToHourText,
        flex: 1,
      },
      {
        field: "status",
        headerName: StatusText,
        renderCell: ({ value }) => <AppointmentStatusChip status={value} />,
        flex: 1,
      },
      {
        field: "id",
        type: "actions",
        getActions: ({ row: { id } }) => [
          <BTooltip title="Edit">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              color="primary"
              onClick={() => onEdit(id)}
            />
          </BTooltip>,
        ],
      },
    ],
    []
  );
}
