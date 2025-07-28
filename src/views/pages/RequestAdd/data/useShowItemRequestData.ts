import { useMemo } from "react";
import { useLoading } from "src/globals";
import {
  useBeneficiaries,
  useEmergencyRequests,
  useItems,
} from "src/views/APIs";

// import { useRequests } from "src/views/APIs";
export type AidRequest = {
  id: number;
  beneficiary: { id: number; name: string };
  reason: string;
  urgency_level: "low" | "medium" | "high";
  requested_amount: number;
};

export type PrescriptionRequest = {
  id: number;
  beneficiary: { id: number; name: string };
  reason: string;
  urgency_level: "low" | "medium" | "high";
  what_exchanged: string;
};

export type MaterialRequest = {
  id: number;
  beneficiary: { id: number; name: string };
  reason: string;
  urgency_level: "low" | "medium" | "high";
  requested_item: string
};

export function useShowEmergencyRequestData(
  requestId: number,
  withItems: boolean
) {
  const { getAllBeneficiaries } = useBeneficiaries();
  const { getAllItems } = useItems();
  const { getSingleEmergencyRequests, createEmergencyRequests } =
    useEmergencyRequests();

  const { data: beneficiariesData, isLoading: isLoading1 } =
    getAllBeneficiaries({});
  const { data: itemsData, isLoading: isLoading2 } = getAllItems(
    {},
    { enabled: Boolean(withItems) }
  );

  const beneficiaries = useMemo(
    () =>
      beneficiariesData?.data?.map((e) => ({
        id: e.id,
        name: e.first_name + " " + e.last_name,
      })) ?? [],
    [beneficiariesData]
  );
  const items = useMemo(() => itemsData?.data ?? [], [itemsData]);

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

  const isLoading =
    isLoading1 || isLoading2 || responseRequest?.message === "wait";
  const [_, setLoading] = useLoading();
  setLoading(isLoading);

  return { request, createEmergencyRequests, beneficiaries, items };
}
