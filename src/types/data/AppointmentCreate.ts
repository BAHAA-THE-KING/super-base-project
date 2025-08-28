export type AppointmentCreate = {
  id: number;
  beneficiary_id: number;
  beneficiary_original_id: number;
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
  type: "beneficiary" | "patient";
};

export type Patient = {
  first_name: string;
  last_name: string;
  father_name: string;
  address: string;
  birthDate: string;
  phoneNumber: string;
  national_number: string;
  healthInfo: string;
};
