export type ClinicBalanceRecord = {
  id: number;
  date: string;
  amount: number;
  reason: string;
  person: string;
  status: "accepted" | "pending" | "rejected";
};
