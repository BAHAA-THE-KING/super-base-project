import { useMemo } from "react";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import { Edit as EditIcon } from "@mui/icons-material";

import { BTooltip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { SecretaryType } from "src/types/data/Secretary";

const i18ns = [
  "secretary_name",
  "address",
  "birth_information",
  "mobile_number",
  "attendance_schedules",
  "salary",
];
export function useSecretaryColumns(onEdit: (id: number) => void) {
  const [
    SecretaryNameText,
    AddressText,
    BirthInformationText,
    MobileNumberText,
    AttendanceSchedulesText,
    PricePerReservationText,
  ] = useBaseTranslation(i18ns);

  return useMemo<GridColDef<SecretaryType>[]>(
    () => [
      {
        field: "name",
        headerName: SecretaryNameText,
        flex: 1,
      },
      {
        field: "address",
        headerName: AddressText,
        flex: 1,
      },
      {
        field: "birth",
        headerName: BirthInformationText,
        flex: 1,
      },
      {
        field: "mobile",
        headerName: MobileNumberText,
        flex: 1,
      },
      {
        field: "salary",
        headerName: PricePerReservationText,
        flex: 1,
      },
      {
        field: "attendance_schedule",
        headerName: AttendanceSchedulesText,
        flex: 2,
        valueGetter: (value: any) =>
          value.from + "-" + value.to + ", " + value.days,
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
