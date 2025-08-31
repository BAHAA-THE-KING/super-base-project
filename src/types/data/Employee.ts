export type Employee = {
  id?: number;
  first_name: string;
  last_name: string;
  father_name: string;
  national_number: string;
  address: string;
  mobile: string;
  birth_date: string;
  birth_place: string;
  role: string;
  joined_at: string;
  is_active?: string;
  salary: number;
  history?: EmployeeHistory[];
};

export type EmployeeHistory = {
  id: number;
  type: string;
  icon: "mosque" | "donation_book" | "bill" | "event" | "card" | "other" | "";
  date: string;
  description: string;
  expenses: number;
  composition: number;
  gain: number;
};
