import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router";

import { Add } from "@mui/icons-material";

import { BButton } from "src/components/Base";
import { ExpensesGrid } from "./components";

import { useBaseTranslation } from "src/hooks";
import { useExpensesColumns } from "./columns";

import { useExpenseAllData } from "./data";

const i18ns = ["add_expense"];
export function Expenses() {
  const [AddExpenseText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const columns = useExpensesColumns();

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

  const { expenses, totalRows, getExpensesLoading } =
    useExpenseAllData(params);

  return (
    <Stack height={"100%"} p={3} justifyContent={"stretch"}>
      <Box width={"100%"} mb={2}>
        <BButton
          variant="contained"
          onClick={() => navigate("/expense/add")}
          startIcon={<Add />}
        >
          {AddExpenseText}
        </BButton>
      </Box>
      <ExpensesGrid
        rows={expenses}
        columns={columns}
        loading={getExpensesLoading}
        page={page}
        setPage={setPage}
        setFilters={setFilters}
        totalRows={totalRows}
      />
    </Stack>
  );
}
