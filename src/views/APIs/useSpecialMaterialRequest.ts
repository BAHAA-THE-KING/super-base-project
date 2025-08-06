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

type SpecialMaterialData = {
  id: number;
  item: string;
  request_status: string;
  received_at: string;
  beneficiary: Beneficiary;
  request: Request;
};

type ShowResponse = {
  data?: SpecialMaterialData;
  message: string;
};

type CreateResponse = {
  data: {
    id: number;
    item: string;
    request_status: "pending" | "rejected" | "accepted";
    received_at: null;
  };
  message: string;
};
type CreateRequest = {
  item: string;
  reason: string;
  beneficiary_id: number;
};

export function useSpecialMaterialRequest() {
  const getSingleSpecialMaterials = (id: number) =>
    useGetAPI<ShowResponse>("/dashboard/need-requests/show/:id", {
      defaultData: {
        message: "wait",
      },
      params: {
        id,
      },
      keys: ["need-requests"],
      enabled: Boolean(id),
    });
  const createSpecialMaterials = usePostAPI<CreateResponse, CreateRequest>(
    "/dashboard/need-requests/create",
    {
      invalidateKeys: ["need-requests"],
    }
  ).mutateAsync;

  return {
    getSingleSpecialMaterials,
    createSpecialMaterials,
  };
}
