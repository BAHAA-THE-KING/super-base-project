import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router";

import { Add } from "@mui/icons-material";

import { BButton } from "src/components/Base";
import { DonationsGrid } from "./components";

import { useBaseTranslation } from "src/hooks";
import { useDonationsColumns } from "./columns";

import { useDonationAllData } from "./data";

const i18ns = ["add_donation"];
export function Donations() {
  const [AddDonationText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const columns = useDonationsColumns();

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

  const { donations, totalRows, getDonationsLoading } =
    useDonationAllData(params);

  return (
    <Stack height={"100%"} p={3} justifyContent={"stretch"}>
      <Box width={"100%"} mb={2}>
        <BButton
          variant="contained"
          onClick={() => navigate("/accountant/donations/add")}
          startIcon={<Add />}
        >
          {AddDonationText}
        </BButton>
      </Box>
      <DonationsGrid
        rows={donations}
        columns={columns}
        loading={getDonationsLoading}
        page={page}
        setPage={setPage}
        setFilters={setFilters}
        totalRows={totalRows}
      />
    </Stack>
  );
}
