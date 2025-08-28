import { useGetAPI, usePutAPI } from "src/APIs";

type ClinicBalanceAllResponse = {
  data: {
    id: number;
    owner_id: number;
    owner_type:
      | "App\\Models\\Secretary"
      | "App\\Models\\Appointment"
      | "App\\Models\\ClinicBeneficiary"
      | "App\\Models\\Beneficiary"
      | "App\\Models\\Doctor";
    date: string;
    amount: number;
    reason: string;
    status: "approved" | "pending" | "rejected";
    owner: any;
    beneficiary: any;
  }[];
  message: string;
};

type UpdateRecordsResponse = {};
type UpdateRecordsRequest = {
  payments: number[];
};

export function useClinicBalance() {
  const getBalanceAPI = (params: any) =>
    useGetAPI<ClinicBalanceAllResponse>("/dashboard/clinic-payments/all", {
      params,
      defaultData: {
        message: "wait",
        data: [],
      },
      keys: ["clinic-payments"],
    });

  const updateBalanceRecordsAPI = usePutAPI<
    UpdateRecordsResponse,
    UpdateRecordsRequest
  >("/dashboard/meets/accept-payments", {
    invalidateKeys: ["clinic-payments"],
  }).mutateAsync;

  return { getBalanceAPI, updateBalanceRecordsAPI };
}
