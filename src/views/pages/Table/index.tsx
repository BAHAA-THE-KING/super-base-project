import { Box } from "@mui/material";

import { BDataGrid } from "src/components/Base";

import { useTableColumns } from "./columns";

import { useData } from "./data";

export function Table() {
  const rows = useData();

  const columns = useTableColumns();

  return (
    <Box>
      <BDataGrid rows={rows} columns={columns} />
    </Box>
  );
}
