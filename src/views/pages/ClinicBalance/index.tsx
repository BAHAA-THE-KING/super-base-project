import { Stack } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

import { BButton, BDataGrid } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useAppointmentsColumns } from "./columns";
import { useBalanceData } from "./data";

const i18ns = ["add_new_appointment"];
export function ClinicBalance() {
  const [AddNewRecordText] = useBaseTranslation(i18ns);

  const columns = useAppointmentsColumns();

  const { records, isLoading } = useBalanceData();

  function addRecord() {
    // TODO: popup
  }

  return (
    <Stack width="100%" height="100%" p={3}>
      <Stack width="100%" flexDirection={"row"} justifyContent={"flex-start"}>
        <BButton
          variant="contained"
          size="medium"
          color="primary"
          sx={{ my: 2, width: "max-content" }}
          onClick={addRecord}
          startIcon={<AddIcon />}
        >
          {AddNewRecordText}
        </BButton>
      </Stack>
      <BDataGrid columns={columns} rows={records} />
      {/* TODO: add total */}
    </Stack>
  );
}
