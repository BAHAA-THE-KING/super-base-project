import { useState } from "react";
import { Box, Stack } from "@mui/material";

import { BeneficiariesGrid } from "./components";

import { useBeneficiariesColumns } from "./columns";

import { useData } from "./data";
import { BButton } from "src/components/Base";
import { useBaseTranslation } from "src/hooks";
import { useNavigate } from "react-router";

const i18ns = ["add_beneficiary"];
export function AllBeneficiaries() {
  const [AddBeneficiaryText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const columns = useBeneficiariesColumns();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<any>({});

  const { beneficiaries } = useData(filters);

  return (
    <Stack width={"100%"} height={"100%"} p={3}>
      <Box width={"100%"} mb={2}>
        <BButton variant="contained" onClick={() => navigate("/beneficiary/add")}>
          {AddBeneficiaryText}
        </BButton>
      </Box>
      <BeneficiariesGrid
        rows={beneficiaries}
        columns={columns}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        setFilters={setFilters}
      />
    </Stack>
  );
}
