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
  reason: string | null;
  request_type: string;
};

type PrescriptionRequestData = {
  id: number;
  item: string;
  request_status: "pending" | "rejected" | "accepted";
  received_at: string;
  beneficiary: Beneficiary;
  request: Request;
  created_at: string;
  reason: string;
  urgency_level: "low" | "medium" | "high";
};

type ShowResponse = {
  data?: PrescriptionRequestData;
  message: string;
};

type CreateResponse = {
  data: {
    id: number;
    description: string;
    request_status: "pending" | "rejected" | "accepted";
    created_at: null;
    reason: string;
    urgency_level: "low" | "medium" | "high";
  };
  message: string;
};

type CreateRequest = {
  beneficiary_id: number;
  description: string;
  reason: string;
  urgency_level: "low" | "medium" | "high";
};

type IndexResponse = {
  data: {
    data: PrescriptionRequestData[];
    total: number;
  };
  message: string;
};

export function usePrescriptionRequest() {
  const getFilteredPrescriptionRequests = (filters: any) =>
    useGetAPI<IndexResponse>("/dashboard/prescriptions/index", {
      params: filters,
      defaultData: {
        data: {
          data: [],
          total: 0,
        },
        message: "wait",
      },
    });
  const getSinglePrescriptionRequest = (id: number) =>
    useGetAPI<ShowResponse>("/dashboard/prescriptions/show/:id", {
      defaultData: {
        message: "wait",
      },
      params: {
        id,
      },
      keys: ["prescriptions"],
      enabled: Boolean(id),
    });
  const createPrescription = usePostAPI<CreateResponse, CreateRequest>(
    "/dashboard/prescriptions/create",
    {
      invalidateKeys: ["prescriptions"],
    }
  ).mutateAsync;

  return {
    getFilteredPrescriptionRequests,
    getSinglePrescriptionRequest,
    createPrescription,
  };
}
