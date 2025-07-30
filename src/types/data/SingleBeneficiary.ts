type RequestStatus = "accepted" | "pending" | "rejected";

export interface SingleBeneficiary {
  id: number | string;
  image_url: string;
  first_name: string;
  last_name: string;
  father_name: string;
  mother_name: string;
  birth_date: string; // YYYY-MM-DD
  birth_place: string;
  national_number: string;
  gender: "" | "male" | "female";
  job: string;
  health_status: string;
  phone_number: string;
  mobile_number: string;
  address: string;
  residence_type: "" | "rent" | "own" | "host" | "borrow";
  residence_document_url: string;
  children: Child[];
  uncles: Uncle[];
  partner: Partner;
  group: Group;
  monthly_income: number;
  case_description: string;
  request_id: number | string;
  request_status: RequestStatus;
}

export interface Child {
  id: number | string;
  beneficiary_id: number | string;
  name: string;
  birth_date: string; // YYYY-MM-DD
  gender: "" | "male" | "female";
  is_alive: boolean;
  partner_name: string;
  residence_place: string;
}

export interface Uncle {
  id: number | string;
  beneficiary_id: number | string;
  from: "" | "father" | "mother";
  first_name: string;
  last_name: string;
  job: string;
  provided_aid: string;
}

export interface Partner {
  id: number | string;
  beneficiary_id: number | string;
  first_name: string;
  last_name: string;
  job: string;
  gender: "" | "male" | "female";
  health_status: string;
}

export interface Group {
  id: number | string;
  name: string;
  salary: string;
  color: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  group_conditions: {
    id: number | string;
    params: string;
    condition: Condition;
    is_satisfied: boolean;
  }[];
}

export interface Condition {
  id: number | string;
  name: string;
}
