export type Expense = {
  id: number;
  type: string;
  amount: number;
  description: string;
  to: string;
  request_id: number;
  request_status: "accepted" | "pending" | "rejected";
};
