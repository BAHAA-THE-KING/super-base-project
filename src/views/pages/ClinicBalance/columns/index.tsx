import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import { useBaseTranslation } from "src/hooks";

import { ClinicBalanceRecord } from "src/types/data/ClinicBalanceRecord";

const i18ns = ["record_number", "date", "amount", "reason", "person"];
export function useAppointmentsColumns() {
  const [RecordNumberText, DateText, AmountText, ReasonText, PersonText] =
    useBaseTranslation(i18ns);

  return useMemo<GridColDef<ClinicBalanceRecord>[]>(
    () => [
      {
        field: "id",
        headerName: RecordNumberText,
        flex: 1,
      },
      {
        field: "date",
        headerName: DateText,
        flex: 1,
      },
      {
        field: "amount",
        headerName: AmountText,
        flex: 1,
        renderCell: ({ value }) => (
          <Box
            fontWeight={"bolder"}
            color={(theme) =>
              value > 0
                ? theme.palette["success"].main
                : theme.palette["error"].main
            }
            dir="ltr"
          >
            {value > 0 ? "+" : ""}
            {value}
          </Box>
        ),
      },
      {
        field: "reason",
        headerName: ReasonText,
        flex: 1,
      },
      {
        field: "person",
        headerName: PersonText,
        flex: 1,
      },
    ],
    []
  );
}
