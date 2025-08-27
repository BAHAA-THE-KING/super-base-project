export type AppointmentCreate = {
  id: number;
  beneficiary_id: number;
  beneficiary_type: "beneficiary" | "patient";
  doctor_id: number;
  date: string;
  from: string;
  to: string;
  reason?: string;
  wantDiscount?: string;
};

export type AppointmentDoctor = {
  id: number;
  name: string;
  attendance_schedules: {
    from: string;
    to: string;
    days: number[];
  }[];
};

export type AppointmentBeneficiary = {
  id: number;
  name: string;
  national_number: string;
};
