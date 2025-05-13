import { useState } from "react";
import { Stack } from "@mui/material";

import { BeneficiariesGrid } from "./components";

import { useBeneficiariesColumns } from "./columns";

import { useData } from "./data";

export function AllBeneficiaries() {
  const columns = useBeneficiariesColumns();
  const rows = useData();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Stack width={"100%"} height={"100%"} p={3}>
      <BeneficiariesGrid
        rows={rows}
        columns={columns}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </Stack>
  );
}
