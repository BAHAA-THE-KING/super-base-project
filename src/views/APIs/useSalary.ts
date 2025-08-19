import { useGetAPI } from "src/APIs";

type AvailableSalariesShow = {
  data: any[];
  message: string;
};

export function useSalary() {
  const getAvailableSalaries = (beneficiaryId: number) =>
    useGetAPI<AvailableSalariesShow>("/dashboard/salaries/currently-due", {
      params: { beneficiary_id: beneficiaryId },
      defaultData: {
        data: [],
        message: "wait",
      },
      enabled: Boolean(beneficiaryId),
    });
  return { getAvailableSalaries };
}
