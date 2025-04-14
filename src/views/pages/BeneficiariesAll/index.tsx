import { useState } from "react";
import { Box } from "@mui/material";

import { BeneficiariesGrid } from "./components";

import { useBeneficiariesColumns } from "./columns";

import { useData } from "./data";

export function AllBeneficiaries() {
  const columns = useBeneficiariesColumns();
  const rows = useData();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Box>
      <BeneficiariesGrid
        rows={rows}
        columns={columns}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </Box>
  );
}
