import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";

export function useTableColumns() {
  return useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
      },
    ],
    []
  );
}
