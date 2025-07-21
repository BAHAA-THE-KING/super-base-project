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
  const { getSingleEmergencyRequests, createEmergencyRequests } =
    useEmergencyRequests();

  const { data: beneficiariesData, isLoading: isLoading1 } =
    getAllBeneficiaries({});
  const beneficiaries = useMemo(
    () =>
      beneficiariesData?.data?.map((e) => ({
        id: e.id,
        name: e.first_name + " " + e.last_name,
      })) ?? [],
    [beneficiariesData]
  );

  const { data: responseRequest } = getSingleEmergencyRequests(requestId);

  const requestData = responseRequest?.data;
  const request: AidRequest | null = useMemo(
    () =>
      requestData
        ? {
            id: requestData.id,
            beneficiary: {
              id: requestData.beneficiary.id,
              name:
                requestData.beneficiary.first_name +
                " " +
                requestData.beneficiary.last_name,
            },
            reason: requestData.reason,
            // TODO: fill later
            urgency_level: "low",
            requested_amount: requestData.amount,
          }
        : null,
    [requestData]
  );

  const isLoading = isLoading1 || responseRequest?.message === "wait";
  const [_, setLoading] = useLoading();
  setLoading(isLoading);

  return { request, createEmergencyRequests, beneficiaries };
}
