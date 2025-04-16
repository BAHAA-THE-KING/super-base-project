type ResidenceType = "rent" | "own" | "host" | "borrow";
type RequestStatus = "accepted" | "rejected";
type Gender = "male" | "female";
type UncleFrom = "father" | "mother";

export interface SingleBeneficiary {
  id: number;
  image_url: string;
  first_name: string;
  last_name: string;
  father_name: string;
  mother_name: string;
  birth_date: string; // YYYY-MM-DD
  birth_place: string;
  national_number: string;
  job: string;
  health_status: string;
  phone_number: string;
  mobile_number: string;
  address: string;
  residence_type: ResidenceType;
  residence_document_id: number;
  group: Group;
  monthly_income: number;
  case_description: string;
  request_id: number;
  request_status: RequestStatus | null;
}

export interface Child {
  id: number;
  beneficiary_id: number;
  name: string;
  birth_date: string; // YYYY-MM-DD
  gender: Gender;
  is_alive: boolean;
  partner_name: string;
  residence_place: string;
}

export interface Uncle {
  id: number;
  beneficiary_id: number;
  from: UncleFrom;
  first_name: string;
  last_name: string;
  job: string;
  provided_aid: string;
}

export interface Partner {
  id: number;
  beneficiary_id: number;
  first_name: string;
  last_name: string;
  job: string;
  gender: Gender;
  health_status: string;
}

export interface Group {
  id: number;
  name: string;
  salary: string;
  color: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}
