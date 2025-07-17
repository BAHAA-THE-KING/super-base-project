import { Stack } from "@mui/material";
import { useNavigate } from "react-router";

import { Add as AddIcon } from "@mui/icons-material";

import { BButton, BDataGrid } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useSecretaryColumns } from "./columns";
import { useSecretaryData } from "./data";

const i18ns = ["add_new_secretary"];
export function Secretary() {
  const [AddNewSecretaryText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const onEdit = (id: number) => {
    navigate(id.toString());
  };
  const columns = useSecretaryColumns(onEdit);

  const { secretaries } = useSecretaryData();

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
      <BDataGrid columns={columns} rows={secretaries} />
    </Stack>
  );
}
