import { useMemo } from "react";
import { useLoading } from "src/globals";
import { useBeneficiaries, useEmergencyRequests } from "src/views/APIs";

export type AidRequest = {
  id: number;
  beneficiary: { id: number; name: string };
  reason: string;
  urgency_level: "low" | "medium" | "high";
  requested_amount: number;
};

export function useShowEmergencyRequestData(requestId: number) {
  const { getAllBeneficiaries } = useBeneficiaries();
  const { createEmergencyRequests, getSingleEmergencyRequests } =
    useEmergencyRequests();

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

  const isLoading = beneficiariesData?.message === "wait";
  const [_, setLoading] = useLoading();
  setLoading(isLoading);

  return { createEmergencyRequests, beneficiaries, request };
}
