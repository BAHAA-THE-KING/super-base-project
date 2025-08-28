import { useMemo, useState } from "react";
import { Stack } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

import { BButton, BDataGrid } from "src/components/Base";
import { AddRecordPopup } from "./components";

import { useBaseTranslation } from "src/hooks";
import { useAppointmentsColumns } from "./columns";
import { useBalanceData } from "./data";

const i18ns = ["add_new_record", "total"];
export function ClinicBalance() {
  const [AddNewRecordText, TotalText] = useBaseTranslation(i18ns);

  const [popupOpen, setPopupOpen] = useState(false);

  const columns = useAppointmentsColumns();

  const { records, isLoading, addRecord } = useBalanceData();

  const updatedRecords = useMemo(
    () => [
      ...records,
      {
        id: TotalText,
        date: "",
        amount: records.reduce((p, e) => p + e.amount, 0),
        reason: "",
        person: "",
      },
    ],
    [records]
  );

  return (
    <Stack width="100%" height="100%" p={3}>
      {/* <Stack width="100%" flexDirection={"row"} justifyContent={"flex-start"}>
        <BButton
          variant="contained"
          size="medium"
          color="primary"
          sx={{ my: 2, width: "max-content" }}
          onClick={() => setPopupOpen(true)}
          startIcon={<AddIcon />}
        >
          {AddNewRecordText}
        </BButton>
      </Stack> */}
      <BDataGrid columns={columns} rows={updatedRecords} />
      <AddRecordPopup
        open={popupOpen}
        close={() => setPopupOpen(false)}
        onAdd={addRecord}
      />
    </Stack>
  );
}
