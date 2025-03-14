import { Box } from "@mui/material";

import { BaseDataGrid } from "src/components/Base/BaseDataGrid";

import { useTableColumns } from "./columns";

import { useData } from "./data";

export function Table() {
  const rows = useData();

  const columns = useTableColumns();

  return (
    <Box display={"flex"} flexGrow={1} width={"100%"} >
      <BaseDataGrid rows={rows} columns={columns} />
    </Box>
  );
}
