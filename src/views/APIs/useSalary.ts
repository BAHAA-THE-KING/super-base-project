import { useGetAPI } from "src/APIs";

type AvailableSalariesShow = {
  data: {
    id: number;
    amount: number;
    issued_at: string;
    received_at: string;
    beneficiary_id: number;
    has_taken: boolean;
  }[];
  message: string;
};

export function useSalary() {
  const getAvailableSalaries = (beneficiary_id: number) =>
    useGetAPI<AvailableSalariesShow>("/dashboard/salaries/currently-due", {
      params: { beneficiary_id },
      defaultData: {
        data: [],
        message: "wait",
      },
      enabled: Boolean(beneficiary_id),
    });
  return { getAvailableSalaries };
}
