import { useMemo, useState } from "react";
import { Stack } from "@mui/material";

import { Check as CheckIcon } from "@mui/icons-material";

import { RecordsGrid } from "./components";

import { useBaseTranslation } from "src/hooks";
import { useAppointmentsColumns } from "./columns";
import { useClinicBalanceData } from "src/views/data";
import { BButton } from "src/components/Base";

const i18ns = ["total", "accept_payment"];
export function ClinicBalance() {
  const [TotalText, AcceptPaymentText] = useBaseTranslation(i18ns);

  const [selection, setSelection] = useState<(number | string)[]>([]);
  const [filters, setFilters] = useState<
    {
      id: string | number;
      field: string;
      operator: string;
      value: string | number | Date;
    }[]
  >([]);

  const params = filters.reduce(
    (p, e) =>
      e.field === "month" && e.value instanceof Date
        ? { ...p, date: e.value.toLocaleDateString("fr-Ca").slice(0, 7) }
        : { ...p, [e.field]: e.value },
    {}
  );

  const { balance, getBalanceLoading, acceptPayment, acceptPaymentLoading } =
    useClinicBalanceData(params);

  const columns = useAppointmentsColumns();

  const updatedRecords = useMemo(
    () => [
      ...balance,
      {
        id: TotalText,
        date: "",
        month: balance[0]?.date,
        amount: balance.reduce((p, e) => p + e.amount, 0),
        reason: "",
        person: "",
      },
    ],
    [balance]
  );

  return (
    <Stack width="100%" height="100%" p={3}>
      <Stack width="100%" flexDirection={"row"} justifyContent={"flex-start"}>
        <BButton
          variant="contained"
          size="medium"
          color="success"
          sx={{ my: 2, width: "max-content" }}
          onClick={() =>
            acceptPayment(selection.map((e) => Number(e)).filter((e) => e))
          }
          startIcon={<CheckIcon />}
          loading={acceptPaymentLoading}
          disabled={!Boolean(selection.length)}
        >
          {AcceptPaymentText}
        </BButton>
      </Stack>
      <RecordsGrid
        columns={columns}
        rows={updatedRecords}
        loading={getBalanceLoading}
        totalRows={balance.length}
        setFilters={setFilters}
        setSelection={setSelection}
      />
    </Stack>
  );
}
