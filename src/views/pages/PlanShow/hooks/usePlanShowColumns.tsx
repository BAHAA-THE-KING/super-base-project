import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";

import { BChip, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { ShowPlanBeneficiary } from "src/views/data";

const i18ns = [
  "beneficiary_order",
  "beneficiary_name",
  "beneficiary_birth",
  "beneficiary_status",
  "finished",
  "pending",
  "missed",
  "not_yet",
  "received_date",
];
export function usePlanShowColumns() {
  const [
    BeneficiaryOrderText,
    BeneficiaryNameText,
    BeneficiaryBirthText,
    BeneficiaryStatusText,
    FinishedText,
    PendingText,
    MissedText,
    NotYetText,
    ReceivedDateText,
  ] = useBaseTranslation(i18ns);

  return useMemo<GridColDef<ShowPlanBeneficiary>[]>(
    () => [
      {
        field: "order",
        headerName: BeneficiaryOrderText,
        flex: 1,
        filterable: false,
      },
      {
        field: "first_name",
        headerName: BeneficiaryNameText,
        valueGetter: (value, row) => value + " " + row.last_name,
        flex: 1,
        filterable: false,
      },
      {
        field: "birth_date",
        headerName: BeneficiaryBirthText,
        valueGetter: (value, row) => row.birth_place + ", " + value,
        flex: 1,
        filterable: false,
      },
      {
        field: "has_taken",
        headerName: BeneficiaryStatusText,
        renderCell: ({ value, row }) => {
          const status = value
            ? "finished"
            : row.due_date && new Date(row.due_date) >= new Date()
            ? "pending"
            : row.due_date && new Date(row.due_date) < new Date()
            ? "missed"
            : "not yet";
          const color =
            status === "finished"
              ? "success"
              : status === "pending"
              ? "warning"
              : status === "missed"
              ? "error"
              : status === "not yet"
              ? "primary"
              : "default";
          const text =
            status === "finished"
              ? FinishedText
              : status === "pending"
              ? PendingText
              : status === "missed"
              ? MissedText
              : status === "not yet"
              ? NotYetText
              : "";
          return (
            <BChip color={color} label={text} size="small" variant="slight" />
          );
        },
        flex: 1,
        filterable: false,
      },
      {
        field: "received_date",
        headerName: ReceivedDateText,
        renderCell: ({ value, row }) => {
          const status = row.has_taken
            ? "finished"
            : row.due_date &&
              row.due_date >= new Date().toLocaleDateString("fr-Ca")
            ? "pending"
            : row.due_date &&
              row.due_date < new Date().toLocaleDateString("fr-Ca")
            ? "missed"
            : "not yet";
          return (
            <BTypography
              fontWeight={status === "missed" ? "bold" : ""}
              sx={(theme) => ({
                color: status === "missed" ? theme.palette.error.main : "",
              })}
            >
              {status === "finished"
                ? value
                : status === "pending"
                ? row.due_date
                : status === "missed"
                ? row.due_date
                : "-"}
            </BTypography>
          );
        },
        flex: 1,
        filterable: false,
      },
    ],
    []
  );
}
