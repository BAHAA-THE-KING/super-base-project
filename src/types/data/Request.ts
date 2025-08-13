export interface Request {
  id: number;
  beneficiary_id: number;
  reason: string;
  created_at: string;
  urgency_level: "low" | "medium" | "high";
  status: "accepted" | "pending" | "rejected";
  type: "emergency aids" | "prescription exchange" | "special materials";
  // status = accepted
  accepted_at?: string;
  expiry_date?: string;
  is_collected?: boolean;
  collection_date?: string;
  recipient_name?: string;
  // status = rejected
  rejection_reason?: string;
  rejected_at?: string;
  // type = emergency aids
  requested_amount?: number;
  accepted_amount?: number;
  // type = prescription exchange
  what_exchanged?: string;
  // type = special materials
  requested_item_id?: number;
  requested_item_name?: string;
  accepted_item_id?: number;
  accepted_item_name?: string;
}
