export type AidRequest = {
  id: number;
  request_id: number;
  beneficiary: { id: number; name: string };
  reason: string;
  urgency_level: "low" | "medium" | "high";
  requested_amount: number;
};
