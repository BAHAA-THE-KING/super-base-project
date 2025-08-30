export type AidType =
  | "monthly salary"
  | "emergency aids"
  | "aids"
  | "prescription exchange"
  | "special materials";

export interface AvailableAid {
  id: number;
  beneficiary_id: number;
  type: AidType;
  reason?: string;
  amount?: number;
  category_id?: number;
  category_name?: string;
  expiry_date?: string;
}

export type Item = {
  id: number;
  name: string;
  amount: string;
};
