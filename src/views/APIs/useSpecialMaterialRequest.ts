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
  request_status: "pending" | "rejected" | "accepted";
};

type Request = {
  id: number;
  status: "pending" | "rejected" | "accepted";
  reason?: string;
  request_type: string;
};

type SpecialMaterialData = {
  id: number;
  item: string;
  request_status: "pending" | "rejected" | "accepted";
  received_at: string;
  beneficiary: Beneficiary;
  request: Request;
  created_at: string;
  reason: string;
  amount: number;
  urgency_level: "low" | "medium" | "high";
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
    reason: string;
    urgency_level: "low" | "medium" | "high";
  };
  message: string;
};

type CreateRequest = {
  item: string;
  reason: string;
  beneficiary_id: number;
  urgency_level: "low" | "medium" | "high";
};

type IndexResponse = {
  data: {
    data: SpecialMaterialData[];
    total: number;
  };
  message: string;
};

type AllResponse = {
  data: SpecialMaterialData[];
  message: string;
};

export function useSpecialMaterialRequest() {
  const getAllSpecialMaterialRequests = (filters: any) =>
    useGetAPI<AllResponse>("/dashboard/need-requests/all", {
      params: filters,
      defaultData: {
        data: [],
        message: "wait",
      },
      keys: ["need-requests"],
    });

  const getFilteredSpecialMaterialRequests = (filters: any) =>
    useGetAPI<IndexResponse>("/dashboard/need-requests/index", {
      params: filters,
      defaultData: {
        data: {
          data: [],
          total: 0,
        },
        message: "wait",
      },
      keys: ["need-requests"],
    });

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

  const createSpecialMaterialRequest = usePostAPI<
    CreateResponse,
    CreateRequest
  >("/dashboard/need-requests/create", {
    invalidateKeys: ["need-requests"],
  }).mutateAsync;

  return {
    getAllSpecialMaterialRequests,
    getFilteredSpecialMaterialRequests,
    getSingleSpecialMaterials,
    createSpecialMaterialRequest,
  };
}
