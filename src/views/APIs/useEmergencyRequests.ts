import { useGetAPI, usePostAPI } from "src/APIs";

type Beneficiary = {
  id: number;
  first_name: string;
  last_name: string;
  father_name: string;
  mother_name: string;
  birth_date: string;
  birth_place: string;
  national_number: string;
  job: string;
  health_status: string;
  phone_number: string;
  address: string;
  residence_type: string;
  monthly_income: number;
  case_description: string;
  group_id: number;
  request_status: string;
};

type Entity = {
  id: number;
  amount: number;
  reason: string;
  request_status: string;
  received_at: string;
};

type Request = {
  id: number;
  status: string;
  reason: string | null;
  request_type: string;
  entity: Entity;
};

type EmergencyRequestData = {
  id: number;
  amount: number;
  reason: string;
  request_status: string;
  received_at: string;
  beneficiary: Beneficiary;
  request: Request;
};

type ShowResponse = {
  data?: EmergencyRequestData;
  message: string;
};

type CreateResponse = {
  data: {
    id: number;
    amount: number;
    reason: string;
    request_status: "pending" | "rejected" | "accepted";
    received_at: null;
  };
  message: string;
};
type CreateRequest = {
  amount: number;
  reason: string;
  beneficiary_id: number;
};

export function useEmergencyRequests() {
  const getSingleEmergencyRequests = (id: number) =>
    useGetAPI<ShowResponse>("/dashboard/instant-aids/show/:id", {
      defaultData: {
        message: "wait",
      },
      params: {
        id,
      },
      keys: ["instant-aids"],
      enabled: Boolean(id),
    });
  const createEmergencyRequest = usePostAPI<CreateResponse, CreateRequest>(
    "/dashboard/instant-aids/create",
    {
      invalidateKeys: ["instant-aids"],
    }
  ).mutateAsync;

  return {
    getSingleEmergencyRequests,
    createEmergencyRequest,
  };
}
