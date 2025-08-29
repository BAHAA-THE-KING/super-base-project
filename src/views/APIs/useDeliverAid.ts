import { usePostAPI } from "src/APIs";

type DeliverResponse = {};
type DeliverRequest = {
  qr_code: string;
  beneficiary_id: number;
  type: "plan" | "need_request" | "instant_aid" | "salary";
  item_id?: number;
  entity_id: number;
};

export function useDeliverAid() {
  const deliverAPI = usePostAPI<DeliverResponse, DeliverRequest>(
    "/dashboard/deliver",
    {
      invalidateKeys: [
        "instant-aids",
        "prescriptions",
        "need-requests",
        "plans",
        "salary",
      ],
    }
  ).mutateAsync;
  return { deliverAPI };
}
