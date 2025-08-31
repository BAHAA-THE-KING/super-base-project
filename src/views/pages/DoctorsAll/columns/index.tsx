import { useMemo } from "react";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import { Edit as EditIcon } from "@mui/icons-material";

import { BTooltip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { Doctor } from "src/types/data/Doctor";

const i18ns = [
  "doctor_name",
  "address",
  "birth_information",
  "mobile_number",
  "specification",
  "price_per_appointment",
];
export function useDoctorsColumns(onEdit: (id: number) => void) {
  const [
    DoctorNameText,
    AddressText,
    BirthInformationText,
    MobileNumberText,
    SpecificationText,

    PricePerAppointmentText,
  ] = useBaseTranslation(i18ns);

  return useMemo<GridColDef<Doctor>[]>(
    () => [
      {
        field: "name",
        headerName: DoctorNameText,
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
        field: "specification",
        headerName: SpecificationText,
        flex: 1,
      },
      {
        field: "price",
        headerName: PricePerAppointmentText,
        flex: 1,
      },
      // {
      //   field: "attendance_schedules",
      //   headerName: AttendanceSchedulesText,
      //   flex: 2,
      //   renderCell: ({ value }) => (
      //     <Stack overflow={"auto"}>
      //       {value.map((elm: { from: string; to: string; days: string[] }) => (
      //         <BTypography key={elm.from + "-" + elm.to + ", " + elm.days}>
      //           {elm.from + "-" + elm.to + ", " + elm.days}
      //         </BTypography>
      //       ))}
      //     </Stack>
      //   ),
      // },
      {
        field: "id",
        type: "actions",
        getActions: ({ row: { id } }) => [
          <BTooltip title="Edit">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              color="primary"
              onClick={() => onEdit(id as any)}
            />
          </BTooltip>,
        ],
      },
    ],
    []
  );
}
