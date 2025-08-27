import { useState } from "react";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";

import { BDataGrid } from "src/components/Base";

type Props = {
  rows: any[];
  columns: GridColDef[];
  loading?: boolean;
  page: number;
  totalRows: number;
  pageSize?: number;
  setPage: (page: number) => void;
  setPageSize?: (pageSize: number) => void;
  setFilters: (filters: any) => void;
};

export function SecretariesGrid({
  rows,
  columns,
  loading = false,
  page,
  totalRows,
  pageSize = 15,
  setPage,
  setPageSize = () => {},
  setFilters,
}: Props) {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({});

  return (
    <BDataGrid
      //basic
      rows={rows}
      columns={columns}
      loading={loading}
      //pagination
      pagination
      paginationMode="server"
      pageSizeOptions={[15]}
      paginationModel={{
        page,
        pageSize,
      }}
      onPaginationModelChange={({ page: newPage, pageSize: newPageSize }) => {
        if (newPage !== page) setPage(newPage);
        if (newPageSize !== pageSize) setPageSize(newPageSize);
      }}
      rowCount={totalRows}
      //column visibility
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={setColumnVisibilityModel}
      onFilterChange={setFilters}
    />
  );
}
