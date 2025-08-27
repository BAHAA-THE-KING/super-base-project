import { useMemo } from "react";

import { Request } from "src/types/data/Request";
import {
  useEmergencyRequests,
  usePrescriptionRequest,
  useSpecialMaterialRequest,
} from "../APIs";

export function useBeneficiaryRequestsData(beneficiary_id: number) {
  const { getFilteredEmergencyRequests } = useEmergencyRequests();
  const { getFilteredPrescriptionRequests } = usePrescriptionRequest();
  const { getFilteredSpecialMaterialRequests } = useSpecialMaterialRequest();

  const { data: SpecialMaterialResponse } = getFilteredSpecialMaterialRequests({
    beneficiary_id,
  });
  const { data: EmergencyResponse } = getFilteredEmergencyRequests({
    beneficiary_id,
  });
  const { data: PrescriptionResponse } = getFilteredPrescriptionRequests({
    beneficiary_id,
  });

  const specialMaterial: Request[] =
    SpecialMaterialResponse?.data?.data?.map((e) => ({
      id: e.id,
      beneficiary_id: e.beneficiary.id,
      created_at: e?.created_at?.split("T")?.[0],
      status: e.request_status,
      type: "special materials",
      // status = accepted
      is_collected: Boolean(e.received_at),
      collection_date: e?.received_at?.split("T")?.[0],
      // status = rejected
      rejection_reason: e.request.reason ?? "",
      requested_item_name: e.item,
      accepted_item_name: e.item,
      // TODO:
      requested_item_id: 0,
      accepted_item_id: 0,
      reason: "",
      urgency_level: "medium",
      accepted_at: "",
      expiry_date: "",
      recipient_name: "",
      rejected_at: "",
    })) ?? [];
  const emergency: Request[] =
    EmergencyResponse?.data?.data?.map((e) => ({
      id: e.id,
      beneficiary_id: e.beneficiary.id,
      created_at: e?.created_at?.split("T")?.[0],
      type: "emergency aids",
      status: e.request_status,
      reason: e.reason,
      requested_amount: e.amount,
      accepted_amount: e.amount,
      rejection_reason: e.request.reason ?? "",
      is_collected: Boolean(e.received_at),
      collection_date: e?.received_at?.split("T")?.[0],
      urgency_level: e.urgency_level,
      // TODO:
      accepted_at: "",
      expiry_date: "",
      recipient_name: "",
      rejected_at: "",
    })) ?? [];
  const prescription: Request[] =
    PrescriptionResponse?.data?.data?.map((e) => ({
      id: e.id,
      beneficiary_id: e.beneficiary.id,
      created_at: e?.created_at?.split("T")?.[0],
      type: "prescription exchange",
      rejection_reason: "",
      status: "accepted",
      what_exchanged: e.item,
      is_collected: true,
      collection_date: e?.received_at?.split("T")?.[0],
      recipient_name: e.beneficiary.first_name + " " + e.beneficiary.last_name,
      accepted_at: e?.created_at?.split("T")?.[0],
      reason: e.reason,
      urgency_level: e.urgency_level,
    })) ?? [];

  const requests: Request[] = useMemo(
    () => [...specialMaterial, ...emergency, ...prescription],
    [specialMaterial, emergency, prescription]
  );

  const getSpecialMaterialLoading = SpecialMaterialResponse?.message === "wait";
  const getEmergencyLoading = EmergencyResponse?.message === "wait";
  const getPrescriptionLoading = PrescriptionResponse?.message === "wait";

  return {
    getSpecialMaterialLoading,
    getEmergencyLoading,
    getPrescriptionLoading,
    requests,
  };
}
