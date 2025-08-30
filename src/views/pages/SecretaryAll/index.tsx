import { Stack } from "@mui/material";
import { useNavigate } from "react-router";

import { Add as AddIcon } from "@mui/icons-material";

import { BButton } from "src/components/Base";
import { SecretariesGrid } from "./components";

import { useBaseTranslation } from "src/hooks";
import { useSecretaryColumns } from "./columns";
import { useSecretariesAllData } from "src/views/data/useSecretariesAllData";
import { useState } from "react";

const i18ns = ["add_new_secretary"];
export function Secretary() {
  const [AddNewSecretaryText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const onEdit = (id: number) => {
    navigate(id.toString(), { replace: true });
  };
  const columns = useSecretaryColumns(onEdit);

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

  const { secretaries, getSecretariesLoading, totalRows } =
    useSecretariesAllData(params);

  function addSecretary() {
    navigate("add");
  }

  return (
    <Stack width="100%" height="100%" p={3}>
      <BButton
        variant="contained"
        size="medium"
        color="primary"
        sx={{ my: 2, width: "max-content" }}
        onClick={addSecretary}
      >
        <AddIcon />
        {AddNewSecretaryText}
      </BButton>
      <SecretariesGrid
        columns={columns}
        rows={secretaries}
        loading={getSecretariesLoading}
        totalRows={totalRows}
        page={page}
        setPage={setPage}
        filters={filters}
        setFilters={setFilters}
      />
    </Stack>
  );
}
