import { useMemo } from "react";
import { Stack } from "@mui/material";
import { useLocation } from "react-router";

import { EmergencyAidForm, PrescriptionExchangeForm } from "./components";

import { varAlpha } from "src/themes/styles";

type Props = {
  requestType: "emergency_aids" | "prescription_exchange" | "special_materials";
};

export function AddRequest({ requestType }: Props) {
  const { state } = useLocation();
  const BeneficiaryId = state?.BeneficiaryId;

  const Form = useMemo(
    () =>
      requestType === "emergency_aids" ? (
        <EmergencyAidForm beneficiaryId={BeneficiaryId} />
      ) : requestType === "prescription_exchange" ? (
        <PrescriptionExchangeForm beneficiaryId={BeneficiaryId} />
      ) : (
        <></>
      ),
    [requestType, BeneficiaryId]
  );

  return (
    <Stack
      p={3}
      borderRadius={2}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? varAlpha(theme.palette.secondary.darkerChannel, 0.2)
            : theme.palette.secondary.lighter,
      })}
    >
      {Form}
    </Stack>
  );
}
