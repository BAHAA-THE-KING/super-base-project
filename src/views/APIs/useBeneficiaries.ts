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
  mobile_number: string;
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
    mobile_number: string;
    address: string;
    residence_type: string;
    residence_document_id: number;
    monthly_income: number;
    case_description: string;
    group_id: number;
    request_id: number;
    request_status: string;

    personalImage: {
      id: number;
      file: string;
      extension: string;
    };

    residenceDocument: {
      id: number;
      file: string;
      extension: string;
    };

    partners: {
      id: number;
      first_name: string;
      last_name: string;
      job: string;
      gender: string;
      health_status: string;
    }[];

    uncles: {
      id: number;
      from: string;
      first_name: string;
      last_name: string;
      job: string;
      provided_aid: string;
    }[];

    children: {
      id: number;
      name: string;
      birth_date: string;
      gender: string;
      is_alive: boolean;
      partner_name: string;
      residence_place: string;
    }[];

    group: {
      id: number;
      name: string;
      salary: number;
      color: string;
      conditions: {
        id: number;
        name: string;
        param: string;
      }[];
    };

    request: {
      id: number;
      status: string;
      reason: string | null;
      request_type: string;
      entity: {
        entity_type: string;
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
        mobile_number: string;
        address: string;
        residence_type: string;
        residence_document_id: number;
        monthly_income: number;
        case_description: string;
        group_id: number;
        request_id: number;
        request_status: string;
      };
    };
  };
  message: string;
};

type Partner = {
  first_name: string;
  last_name: string;
  job: string;
  gender: string;
  health_status: string;
};

type Uncle = {
  first_name: string;
  last_name: string;
  from: string; // e.g., "father" or "mother"
  job: string;
  provided_aid: string;
};

type Child = {
  name: string;
  birth_date: string; // ISO format date
  gender: string;
  is_alive: 0 | 1;
  partner_name: string;
  residence_place: string;
};

type AddRequest = {
  "residence_document[file]": any;
  "personal_image[file]": any;
  first_name: string;
  last_name: string;
  father_name: string;
  mother_name: string;
  gender: string;
  national_number: string;
  birth_date: string;
  birth_place: string;
  job: string;
  health_status: string;
  phone_number: string;
  mobile_number: string;
  address: string;
  residence_type: string;
  monthly_income: number;
  case_description: string;
  partners: Partner[];
  uncles: Uncle[];
  children: Child[];
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
    useGetAPI<AllResponse>("/dashboard/beneficiaries/all", {
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
      params: { id },
      keys: ["beneficiaries"],
      enabled: Boolean(id),
    });

  const addBeneficiary = usePostAPI<AddResponse, AddRequest>(
    "/dashboard/beneficiaries/create",
    {
      invalidateKeys: ["beneficiaries"],
    }
  ).mutateAsync;

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
