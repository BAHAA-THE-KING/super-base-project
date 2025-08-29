export type AidType =
  | "monthly salary"
  | "emergency aids"
  | "aids"
  | "prescription exchange"
  | "special materials";

export interface AvailableAid {
  id: number;
  type: AidType;
  reason?: string;
  amount?: number;
  item_name?: string;
  expiry_date?: string;
}
