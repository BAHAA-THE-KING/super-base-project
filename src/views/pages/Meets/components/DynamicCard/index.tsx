import { BCard } from "src/components/Base";

import { ShowBeneficiary } from "src/views/pages/Beneficiary";

type Props = {
  requestType: "BeneficiaryRequest" | "EmergencyAssistanceRequest";
  requestId: number;
};

export function DynamicCard({ requestId, requestType }: Props) {
  return (
    <BCard sx={{ p: 2, m: 1 }}>
      {requestType === "BeneficiaryRequest" ? (
        <ShowBeneficiary requestMode requestId={requestId} />
      ) : null}
    </BCard>
  );
}
