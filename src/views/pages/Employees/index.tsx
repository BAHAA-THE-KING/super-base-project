import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Stack } from "@mui/material";

import { Add } from "@mui/icons-material";

import { BButton } from "src/components/Base";
import { EmployeeGrid } from "./components";

import { useEmployeesColumns } from "./hooks";

import { useEmployeesData } from "./data";
import { useBaseTranslation } from "src/hooks";

const i18ns = ["add_employee"];
export function Employees() {
  const [AddEmployeeText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();
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
    <Stack height={"100%"} p={3} justifyContent={"stretch"}>
      <Box width={"100%"} mb={2}>
        <BButton
          variant="contained"
          onClick={() => navigate("/employees/add")}
          startIcon={<Add />}
        >
          {AddEmployeeText}
        </BButton>
      </Box>
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
