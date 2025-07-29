import { BCard } from "src/components/Base";

import { ShowBeneficiary } from "src/views/pages/Beneficiary";
import { ShowEmergencyAssistanceRequest } from "./ShowEmergencyAssistanceRequest";
import { ShowSpecialMaterialRequest } from "./ShowSpecialMaterialRequest";

type Props = {
  requestType:
    | "BeneficiaryRequest"
    | "EmergencyAssistanceRequest"
    | "SpecialMaterialRequest"
    | "WithdrawalOrderRequest";
  requestId: number;
  request: any;
};

export function DynamicCard({ requestId, requestType, request }: Props) {
  return (
    <BCard sx={{ p: 2, m: 1 }}>
      {requestType === "BeneficiaryRequest" ? (
        <ShowBeneficiary requestMode requestId={requestId} />
      ) : requestType === "EmergencyAssistanceRequest" ? (
        <ShowEmergencyAssistanceRequest request={request} />
      ) : requestType === "SpecialMaterialRequest" ? (
        <ShowSpecialMaterialRequest request={request} />
      ) : requestType === "WithdrawalOrderRequest" ? (
        <div>Withdrawal Order Request Details</div>
      ) : null}
    </BCard>
  );
}
