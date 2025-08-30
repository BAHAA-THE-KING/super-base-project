import { useState } from "react";
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

  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<
    {
      id: string | number;
      field: string;
      operator: string;
      value: string | number;
    }[]
  >([
    { id: "99506", field: "request_status", operator: "is", value: "accepted" },
  ]);

  const params = [
    ...filters,
    { id: "page", field: "page", operator: "=", value: page + 1 },
  ].reduce((p, e) => ({ ...p, [e.field]: e.value }), {});

  const {
    beneficiaries,
    totalRows,
    getBeneficiariesLoading,
    deactivateBeneficiary,
    deactivateBeneficiaryLoading,
  } = useBeneficiaryAllData(params);

  const columns = useBeneficiariesColumns(
    deactivateBeneficiary,
    deactivateBeneficiaryLoading
  );

  return (
    <Stack height={"100%"} p={3} justifyContent={"stretch"}>
      <Box width={"100%"} mb={2}>
        <BButton
          variant="contained"
          onClick={() => navigate("/services/beneficiary/add")}
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
        filters={filters}
        setFilters={setFilters}
        totalRows={totalRows}
      />
    </Stack>
  );
}
