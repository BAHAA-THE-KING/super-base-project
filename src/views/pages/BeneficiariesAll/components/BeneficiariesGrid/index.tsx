import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { useState } from "react";
import { BDataGrid } from "src/components/Base";

type Props = {
  rows: any[];
  columns: GridColDef[];
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setFilters: (filters: any) => void;
};

export function BeneficiariesGrid({
  rows,
  columns,
  page,
  pageSize,
  setPage,
  setPageSize,
  setFilters,
}: Props) {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>({
      mother_name: false,
      national_number: false,
      mobile_number: false,
      residence_type: false,
      monthly_income: false,
      request_status: false,
    });

  return (
    <BDataGrid
      //basic
      rows={rows}
      columns={columns}
      //pagination
      pageSizeOptions={[10, 20, 30]}
      paginationModel={{
        page,
        pageSize,
      }}
      onPaginationModelChange={({ page, pageSize }) => {
        setPage(page);
        setPageSize(pageSize);
      }}
      //column visibility
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={setColumnVisibilityModel}
      onFilterChange={setFilters}
    />
  );
}
