export interface BaseRequest {
  id: number;
  beneficiary_id: number;
  reason: string;
  urgency_level: "low" | "medium" | "high";
}
export interface AcceptedFields {
  status: "accepted";
  accepted_at: string;
  expiry_date: string;
  is_collected: boolean;
  collection_date?: string;
  recipient_name?: string;
}
export interface PendingFields {
  status: "pending";
}
export interface RejectedFields {
  status: "rejected";
  rejection_reason: string;
  rejected_at: string;
}
export interface EmergencyAidsFields {
  type: "emergency aids";
  requested_amount: number;
  accepted_amount?: number;
}
export interface PrescriptionExchangeFields {
  type: "prescription exchange";
  what_exchanged?: string;
}
export interface SpecialMaterialsFields {
  type: "special materials";
  requested_item_id: number;
  requested_item_name: string;
  accepted_item_id?: number;
  accepted_item_name?: string;
}
export type Request =
  | (BaseRequest & EmergencyAidsFields & AcceptedFields)
  | (BaseRequest & EmergencyAidsFields & PendingFields)
  | (BaseRequest & EmergencyAidsFields & RejectedFields)
  | (BaseRequest & PrescriptionExchangeFields & AcceptedFields)
  | (BaseRequest & PrescriptionExchangeFields & PendingFields)
  | (BaseRequest & PrescriptionExchangeFields & RejectedFields)
  | (BaseRequest & SpecialMaterialsFields & AcceptedFields)
  | (BaseRequest & SpecialMaterialsFields & PendingFields)
  | (BaseRequest & SpecialMaterialsFields & RejectedFields);
