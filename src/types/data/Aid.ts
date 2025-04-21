export type AidType =
  | "monthly salary"
  | "emergency aids"
  | "aids"
  | "prescription exchange"
  | "special materials";

export interface Aid {
  id: number;
  type: AidType;
  description: string;
  expiry_date: string;
  is_collected: boolean;
  collection_date: string | null;
  recipient_name: string;
}
