import { useState } from "react";
import { Stack } from "@mui/material";

import { EmployeeGrid } from "./components";

import { useEmployeesColumns } from "./hooks";

import { useEmployeesData } from "./data";

import { varAlpha } from "src/themes/styles";

export function Employees() {
  const columns = useEmployeesColumns();

  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<
    {
      id: string | number;
      field: string;
      operator: string;
      value: string | number;
    }[]
  >([]);

  const params = [
    ...filters,
    { id: "page", field: "page", operator: "=", value: page + 1 },
  ].reduce((p, e) => ({ ...p, [e.field]: e.value }), {});

  const { employees, totalRows, getEmployeesLoading } =
    useEmployeesData(params);

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      borderRadius={1}
      p={3}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? varAlpha(theme.palette.secondary.darkerChannel, 0.2)
            : theme.palette.secondary.lighter,
      })}
    >
      <EmployeeGrid
        columns={columns}
        rows={employees}
        loading={getEmployeesLoading}
        page={page}
        setPage={setPage}
        setFilters={setFilters}
        totalRows={totalRows}
        pageSize={15}
      />
    </Stack>
  );
}
