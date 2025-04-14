import { Box } from "@mui/material";

import { BDataGrid } from "src/components/Base";

import { useBeneficiariesColumns } from "./columns";

import { useData } from "./data";

export function AllBeneficiaries() {
  const rows = useData();

  const columns = useBeneficiariesColumns();

  return (
    <Box>
      <BDataGrid rows={rows} columns={columns} />
    </Box>
  );
}
