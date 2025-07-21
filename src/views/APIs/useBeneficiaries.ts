import { useDeleteAPI, useGetAPI, usePostAPI, usePutAPI } from "src/APIs";

type IndexFilters = {
  name: string;
};

type AllFilters = {
  name: string;
};

type Group = {
  id: number;
  name: string;
  salary: number;
  color: "error" | "warning" | "primary" | "secondary" | "info" | "success";
};

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
  residence_type: "rent" | "own" | "host" | "borrow";
  monthly_income: number;
  case_description: string;
  group_id: number;
  request_status: "accepted" | "pending" | "rejected";
  group: Group;
  request: any | null;
};

type Link = {
  url: string | null;
  label: string;
  active: boolean;
};

type IndexResponse = {
  data: {
    current_page?: number;
    data?: Beneficiary[];
    first_page_url?: string;
    from?: number;
    last_page?: number;
    last_page_url?: string;
    links?: Link[];
    next_page_url?: string | null;
    path?: string;
    per_page?: number;
    prev_page_url?: string | null;
    to?: number;
    total?: number;
  };
  message: string;
};

type AllResponse = {
  data?: Beneficiary[];
  message: string;
};

type ShowResponse = {
  data?: {
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
    residence_type: "rent" | "own" | "host" | "borrow";
    monthly_income: number;
    case_description: string;
    group_id: number;
    request_status: "accepted" | "pending" | "rejected";
    partners: Array<{
      id: number;
      first_name: string;
      last_name: string;
      job: string;
      gender: "male" | "female";
      health_status: string;
    }>;
    uncles: Array<{
      id: number;
      from: "father" | "mother";
      first_name: string;
      last_name: string;
      job: string;
      provided_aid: string;
    }>;
    children: Array<{
      id: number;
      name: string;
      birth_date: string;
      gender: "male" | "female";
      is_alive: boolean;
      partner_name: string;
      residence_place: string;
    }>;
    group: {
      id: number;
      name: string;
      salary: number;
      color: "error" | "warning" | "primary" | "secondary" | "info" | "success";
    };
    request: any | null;
  };
  message: string;
};

type AddRequest = {
  id: number;
  name: string;
  age: number;
};

type AddResponse = {
  name: string;
  age: number;
};

type EditRequest = {
  id: number;
  name: string;
  age: number;
};

type EditResponse = {
  name: string;
  age: number;
};

type DeactivateResponse = any;

type DeactivateRequest = {
  beneficiaryId: number;
};

export function useBeneficiaries() {
  const getAllBeneficiaries = (filters: Partial<AllFilters>) =>
    useGetAPI<AllResponse>("/beneficiaries", {
      defaultData: {
        message: "wait",
        data: [],
      },
      params: filters,
      keys: ["beneficiaries"],
    });
  const getIndexedBeneficiaries = (filters: Partial<IndexFilters>) =>
    useGetAPI<IndexResponse>("/dashboard/beneficiaries/index", {
      defaultData: {
        message: "wait",
        data: {
          data: [],
        },
      },
      params: filters,
      keys: ["beneficiaries"],
    });

  const getSingleBeneficiary = (id: number) =>
    useGetAPI<ShowResponse>("/dashboard/beneficiaries/show/:id/", {
      defaultData: {
        message: "wait",
      },
      params: {
        id,
      },
      keys: ["beneficiaries"],
    });

  const addBeneficiary = usePostAPI<AddResponse, AddRequest>("/create", {
    invalidateKeys: ["beneficiaries"],
  }).mutateAsync;

  const editBeneficiary = usePutAPI<EditResponse, EditRequest>("/update", {
    invalidateKeys: ["beneficiaries"],
  }).mutateAsync;

  const deactivateBeneficiary = useDeleteAPI<
    DeactivateResponse,
    DeactivateRequest
  >("/delete/:beneficiaryId", {
    invalidateKeys: ["beneficiaries"],
  }).mutateAsync;

  return {
    getAllBeneficiaries,
    getIndexedBeneficiaries,
    getSingleBeneficiary,
    addBeneficiary,
    editBeneficiary,
    deactivateBeneficiary,
  };
}
