import { Stack } from "@mui/material";

import { EmergencyAidForm } from "src/views/pages/RequestAdd/components";

import { EmergencyAssistanceRequest } from "src/views/data";

type Props = {
  request: EmergencyAssistanceRequest;
};

export function ShowEmergencyAssistanceRequest({ request }: Props) {
  return (
    <Stack>
      <EmergencyAidForm
        beneficiaryId={request.beneficiary.id}
        requestMode
        requestId={request.id}
      />
    </Stack>
  );
}
