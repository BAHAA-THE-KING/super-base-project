import { useState } from "react";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";

import { BDataGrid } from "src/components/Base";

type Props = {
  rows: any[];
  columns: GridColDef[];
  loading?: boolean;
  totalRows: number;
  setFilters: (filters: any) => void;
  setSelection: (selection: (number | string)[]) => void;
};

export function RecordsGrid({
  rows,
  columns,
  loading = false,
  totalRows,
  setFilters,
  setSelection,
}: Props) {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      month: false,
    });

  return (
    <BDataGrid
      //basic
      rows={rows}
      columns={columns}
      loading={loading}
      //pagination
      pagination
      paginationMode="server"
      rowCount={totalRows}
      //column visibility
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={setColumnVisibilityModel}
      onFilterChange={setFilters}
      //selection
      checkboxSelection
      onRowSelectionModelChange={(selection) => setSelection([...selection])}
    />
  );
}
