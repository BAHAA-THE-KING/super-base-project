import { Stack } from "@mui/material";

import { EmergencyAssistanceRequest } from "../../data";
import { EmergencyAidForm } from "src/views/pages/RequestAdd/components";

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
