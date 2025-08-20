import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";

import { useBaseTranslation } from "src/hooks";

import { Batch } from "src/types/data/DonationBook";

const i18ns = [
  "date",
  "type",
  "description",
  "expenses",
  "gain",
  "composition",
];
export function useHistoryColumns() {
  const [
    DateText,
    TypeText,
    DescriptionText,
    ExpensesText,
    GainText,
    CompositionText,
  ] = useBaseTranslation(i18ns);

  return useMemo<GridColDef<Batch>[]>(
    () => [
      {
        field: "date",
        headerName: DateText,
        flex: 1,
      },
      {
        field: "type",
        headerName: TypeText,
        flex: 1,
      },
      {
        field: "expenses",
        headerName: ExpensesText,
        flex: 1,
      },
      {
        field: "gain",
        headerName: GainText,
        flex: 1,
      },
      {
        field: "composition",
        headerName: CompositionText,
        flex: 1,
      },
      {
        field: "description",
        headerName: DescriptionText,
        flex: 5,
      },
    ],
    []
  );
}
