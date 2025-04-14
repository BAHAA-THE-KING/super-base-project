export type Beneficiary = {
  id: number;
  first_name: string;
  last_name: string;
  father_name: string;
  mother_name: string;
  birth_date: string;
  birth_place: string;
  national_number: string;
  job: string;
  phone_number: string;
  mobile_number: string;
  residence_type: "rent" | "own" | "host" | "borrow";
  family_members: number;
  monthly_income: number;
  request_status: "accepted" | "rejected" | "pending";
};
