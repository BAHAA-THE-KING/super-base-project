export type AppointmentTable = {
  id: number;
  beneficiary_id: number;
  beneficiary_name: string;
  beneficiary_national_number: string;
  doctor_id: number;
  doctor_name: string;
  date: string;
  from: string;
  to: string;
  status: "pending" | "missed" | "finished" | "canceled";
  reason: string;
  wantDiscount?: string;
  price?: string;
  healthInfo?: string;
  result?: string;
  history?: {
    id: number;
    doctor_name: string;
    date: string;
    status: "pending" | "missed" | "finished" | "canceled";
    result: string;
  }[];
};
