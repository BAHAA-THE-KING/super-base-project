import { useMemo } from "react";
import { Avatar } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { useBaseTranslation } from "src/hooks";

import { Batch } from "src/types/data/DonationBook";

const i18ns = [
  "batch_order",
  "employee_image",
  "employee_name",
  "employee_national_number",
  "batch_date",
  "batch_amount",
  "batch_numbers",
];
export function useBatchColumns() {
  const [
    BatchOrderText,
    EmployeeImageText,
    EmployeeNameText,
    EmployeeNationalNumberText,
    BatchDateText,
    BatchAmountText,
    BatchNumbersText,
  ] = useBaseTranslation(i18ns);

  return useMemo<GridColDef<Batch>[]>(
    () => [
      {
        field: "order",
        headerName: BatchOrderText,
        flex: 1,
      },
      {
        field: "person_image",
        headerName: EmployeeImageText,
        renderCell: ({
          row: {
            person: { image_url },
          },
        }) => <Avatar src={image_url} />,
        flex: 1,
        filterable: false,
      },
      {
        field: "person_name",
        headerName: EmployeeNameText,
        valueGetter: (_, { person: { name } }) => name,
        flex: 1,
        filterable: false,
      },
      {
        field: "person_national_number",
        headerName: EmployeeNationalNumberText,
        valueGetter: (_, { person: { national_number } }) => national_number,
        flex: 1,
      },
      {
        field: "date",
        headerName: BatchDateText,
        flex: 1,
      },
      {
        field: "got_money",
        headerName: BatchAmountText,
        flex: 1,
      },
      {
        field: "numbers",
        headerName: BatchNumbersText,
        valueGetter: (_, { from, to }) => `${from} -> ${to}`,
        flex: 1,
      },
    ],
    []
  );
}
