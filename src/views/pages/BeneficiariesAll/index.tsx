import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";

import { BeneficiariesGrid } from "./components";

import { useBeneficiariesColumns } from "./columns";

import { useData } from "./data";
import { BButton } from "src/components/Base";
import { useBaseTranslation } from "src/hooks";
import { useNavigate } from "react-router";
import { Add } from "@mui/icons-material";

const i18ns = ["add_beneficiary"];
export function AllBeneficiaries() {
  const [AddBeneficiaryText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const columns = useBeneficiariesColumns();

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    setFilters((f: any) => ({ ...f, page: page + 1 }));
  }, [page]);

  const { beneficiaries, totalRows } = useData(filters);

  return (
    <Stack width={"100%"} height={"100%"} p={3}>
      <Box width={"100%"} mb={2}>
        <BButton
          variant="contained"
          onClick={() => navigate("/beneficiary/add")}
          startIcon={<Add />}
        >
          {AddBeneficiaryText}
        </BButton>
      </Box>
      <BeneficiariesGrid
        rows={beneficiaries}
        columns={columns}
        page={page}
        setPage={setPage}
        setFilters={setFilters}
        totalRows={totalRows}
      />
    </Stack>
  );
}
