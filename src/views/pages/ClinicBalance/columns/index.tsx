import { useMemo } from "react";
import {
  getGridDateOperators,
  getGridSingleSelectOperators,
  GridColDef,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

import { useBaseTranslation } from "src/hooks";

import { ClinicBalanceRecord } from "src/types/data/ClinicBalanceRecord";
import { RequestStatusChip } from "src/components";

const i18ns = [
  "record_number",
  "date",
  "amount",
  "reason",
  "person",
  "month",
  "status",
  "pending",
  "accepted",
  "rejected",
];
export function useAppointmentsColumns() {
  const [
    RecordNumberText,
    DateText,
    AmountText,
    ReasonText,
    PersonText,
    MonthText,
    StatusText,
    PendingText,
    AcceptedText,
    RejectedText,
  ] = useBaseTranslation(i18ns);

  return useMemo<GridColDef<ClinicBalanceRecord>[]>(
    () => [
      {
        field: "id",
        headerName: RecordNumberText,
        flex: 1,
      },
      {
        field: "month",
        headerName: MonthText,
        flex: 1,
        valueGetter: (value, { date }) => ((value ?? date) as any)?.slice(0, 7),
        filterOperators: getGridDateOperators(false).filter(
          (e) => e.value === "is"
        ),
      },
      {
        field: "date",
        headerName: DateText,
        flex: 1,
        filterOperators: getGridDateOperators(false).filter(
          (e) => e.value === "is"
        ),
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
      {
        field: "status",
        headerName: StatusText,
        flex: 1,
        type: "singleSelect",
        renderCell: ({ value }) => <RequestStatusChip status={value} />,
        filterOperators: getGridSingleSelectOperators().filter(
          (e) => e.value === "is"
        ),
        valueOptions: [
          { value: "pending", label: PendingText },
          { value: "approved", label: AcceptedText },
          { value: "rejected", label: RejectedText },
        ],
      },
    ],
    []
  );
}
