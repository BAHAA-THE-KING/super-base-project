import { useMemo, useState } from "react";

import { useBeneficiaries, useEmergencyRequests } from "src/views/APIs";

export type AidRequest = {
  id: number;
  beneficiary: { id: number; name: string };
  reason: string;
  urgency_level: "low" | "medium" | "high";
  requested_amount: number;
};

export function useAddEmergencyRequestData(requestId: number) {
  const { getAllBeneficiaries } = useBeneficiaries();
  const {
    createEmergencyRequest: createEmergencyRequestAPI,
    getSingleEmergencyRequests,
  } = useEmergencyRequests();

  const { data: beneficiariesData } = getAllBeneficiaries({});
  const beneficiaries = useMemo(
    () =>
      beneficiariesData?.data?.map((e) => ({
        id: e.id,
        name: e.first_name + " " + e.last_name,
      })) ?? [],
    [beneficiariesData]
  );

  const { data: singleEmergencyRequestResponse } =
    getSingleEmergencyRequests(requestId);
  const singleEmergencyRequestResponseData =
    singleEmergencyRequestResponse?.data;

  const request = singleEmergencyRequestResponseData
    ? {
        id: singleEmergencyRequestResponseData.id,
        beneficiary: {
          id: singleEmergencyRequestResponseData.beneficiary.id,
          name:
            singleEmergencyRequestResponseData.beneficiary.first_name +
            " " +
            singleEmergencyRequestResponseData.beneficiary.last_name,
        },
        reason: singleEmergencyRequestResponseData.reason,
        urgency_level: "medium" as const,
        requested_amount: singleEmergencyRequestResponseData.amount,
      }
    : null;

  const [createEmergencyRequestLoading, setCreateEmergencyRequestLoading] =
    useState(false);

  const createEmergencyRequest = (data: any) => {
    setCreateEmergencyRequestLoading(true);
    return createEmergencyRequestAPI(data).finally(() =>
      setCreateEmergencyRequestLoading(false)
    );
  };

  const getBeneficiariesLoading = beneficiariesData?.message === "wait";
  const getRequestLoading = singleEmergencyRequestResponse?.message === "wait";

  return {
    createEmergencyRequest,
    beneficiaries,
    request,
    createEmergencyRequestLoading,
    getRequestLoading,
    getBeneficiariesLoading,
  };
}
