export type AppointmentCreate = {
  id: number;
  beneficiary_id: number;
  doctor_id: number;
  date: string;
  from: string;
  to: string;
  reason?: string;
  wantDiscount?: string;
};
