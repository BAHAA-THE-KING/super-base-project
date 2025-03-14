import { BaseDataGrid } from "src/components/Base/BaseDataGrid";

import { useHomePageData } from "src/views/data";

import { useTableColumns } from "./columns";
import { Box } from "@mui/material";

export function Table() {
  const { users } = useHomePageData();

  const columns = useTableColumns();

  return (
    <Box display={"flex"} flexGrow={1} width={"100%"} >
      <BaseDataGrid rows={users} columns={columns} />
    </Box>
  );
}
