import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router";

import { Add } from "@mui/icons-material";

import { BButton } from "src/components/Base";
import { BeneficiariesGrid } from "./components";

import { useBaseTranslation } from "src/hooks";
import { useBeneficiariesColumns } from "./columns";

import { useBeneficiaryAllData } from "src/views/data";

const i18ns = ["add_beneficiary"];
export function AllBeneficiaries() {
  const [AddBeneficiaryText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const columns = useBeneficiariesColumns();

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

  const { beneficiaries, totalRows, getBeneficiariesLoading } =
    useBeneficiaryAllData(params);

  return (
    <Stack height={"100%"} p={3} justifyContent={"stretch"}>
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
        loading={getBeneficiariesLoading}
        page={page}
        setPage={setPage}
        setFilters={setFilters}
        totalRows={totalRows}
      />
    </Stack>
  );
}
