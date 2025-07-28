import { useMemo } from "react";

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
  requested_item: string;
};

export function useShowRequestData(
  requestId: number,
  type: "aid" | "prescription" | "material"
) {
  // const { getRequest } = useRequests();

  // const { data: requestData, isLoading: isLoading1 } = getRequest(requestId);

  // const request = useMemo(() => requestData?.data ?? [], [requestData]);

  // const isLoading = isLoading1;

  return {
    request: useMemo(
      () =>
        type === "aid"
          ? ({
              id: requestId,
              beneficiary: { id: 1, name: "John Doe" },
              reason: "I need help",
              urgency_level: "low",
              requested_amount: 100,
            } as AidRequest)
          : type === "prescription"
          ? ({
              id: requestId,
              beneficiary: { id: 1, name: "John Doe" },
              reason: "I need help",
              urgency_level: "low",
              what_exchanged: "adrenaline",
            } as PrescriptionRequest)
          : type === "material"
          ? ({
              id: requestId,
              beneficiary: { id: 1, name: "John Doe" },
              reason: "I need help",
              urgency_level: "low",
              requested_item: "Item 1",
            } as MaterialRequest)
          : null,
      [type]
    ),
    isLoading: false,
  };
}
