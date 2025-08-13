import { useMemo, useState } from "react";

import { useBeneficiaries, usePrescriptionRequest } from "src/views/APIs";

export function useAddPrescriptionRequestData() {
  const { getAllBeneficiaries } = useBeneficiaries();
  const { createPrescription } = usePrescriptionRequest();

  const { data: beneficiariesResponse } = getAllBeneficiaries({});

  const beneficiaries = useMemo(
    () =>
      beneficiariesResponse?.data?.map((e) => ({
        id: e.id,
        name:
          e.first_name +
          " " +
          e.father_name +
          " " +
          e.last_name +
          " /" +
          e.national_number,
      })) ?? [],
    [beneficiariesResponse]
  );

  const [
    createPrescriptionRequestLoading,
    setCreatePrescriptionRequestLoading,
  ] = useState(false);
  const createPrescriptionRequest = ({
    beneficiary_id,
    description,
    reason,
    urgency_level,
  }: {
    beneficiary_id: number;
    description: string;
    reason: string;
    urgency_level: "low" | "medium" | "high";
  }) => {
    setCreatePrescriptionRequestLoading(true);
    return createPrescription({
      data: { beneficiary_id, description, reason, urgency_level },
    }).finally(() => setCreatePrescriptionRequestLoading(false));
  };

  const getBeneficiariesLoading = beneficiariesResponse?.message === "wait";

  return {
    beneficiaries,
    createPrescriptionRequest,
    getBeneficiariesLoading,
    createPrescriptionRequestLoading,
  };
}
