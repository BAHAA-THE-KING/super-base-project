export type Group = {
  id: number;
  name: string;
  color: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  salary: string;
  conditions: {
    id: number;
    name: string;
    param: {
      op: "<" | ">" | "<=" | ">=" | "=" | "!=" | "";
      value: number | "";
    };
  }[];
  number_of_beneficiaries: number;
  percent_of_beneficiaries: number;
};
