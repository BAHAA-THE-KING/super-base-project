import { useDeleteAPI, useGetAPI, usePostAPI, usePutAPI } from "src/APIs";

type FilteredSecretariesResponse = {
  data?: {
    current_page: number;
    data: {
      id: number;
      name: string;
      address: string;
      birth_date: string;
      birth_place: string;
      phone: string;
      salary: number;
      is_active: number;
    }[];
    total: number;
  };
  message: string;
};

type SecretaryResponse = {
  data?: {
    id: number;
    name: string;
    address: string;
    birth_date: string;
    birth_place: string;
    phone: string;
    salary: number;
    is_active: number;
  };
  message: string;
};

type CreateSecretaryResponse = {
  data: {
    id: number;
    name: string;
    address: string;
    birth_date: string;
    birth_place: string;
    phone: string;
    salary: number;
  };
  message: string;
};
type CreateSecretaryRequest = {
  name: string;
  address: string;
  birth_date: string;
  birth_place: string;
  phone: string;
  salary: number;
};

type UpdateSecretaryResponse = {
  data: {
    id: number;
    name: string;
    address: string;
    birth_date: string;
    birth_place: string;
    phone: string;
    salary: number;
  };
  message: string;
};
type UpdateSecretaryRequest = {
  id: number;
  name: string;
  address: string;
  birth_date: string;
  birth_place: string;
  phone: string;
  salary: number;
};

type DeleteSecretaryResponse = {
  id: number;
  name: string;
  address: string;
  birth_date: string;
  birth_place: string;
  phone: string;
  salary: number;
  is_active: boolean;
};

export function useSecretaries() {
  const getFilteredSecretaries = (params: any) =>
    useGetAPI<FilteredSecretariesResponse>("/dashboard/secretaries/index", {
      params,
      defaultData: { message: "wait" },
      keys: ["secretaries", params],
    });

  const getSecretary = (id: number) =>
    useGetAPI<SecretaryResponse>("/dashboard/secretaries/show/:id", {
      params: { id },
      defaultData: { message: "wait" },
      enabled: Boolean(id),
      keys: ["secretaries", id],
    });

  const createSecretary = usePostAPI<
    CreateSecretaryResponse,
    CreateSecretaryRequest
  >("/dashboard/secretaries/create", {
    invalidateKeys: ["secretaries"],
  }).mutateAsync;

  const updateSecretary = usePutAPI<
    UpdateSecretaryResponse,
    UpdateSecretaryRequest
  >("/dashboard/secretaries/update/:id", {
    invalidateKeys: ["secretaries"],
  }).mutateAsync;

  const deleteSecretary = useDeleteAPI<DeleteSecretaryResponse>(
    "/dashboard/secretaries/delete/:id",
    {
      invalidateKeys: ["secretaries"],
    }
  ).mutateAsync;

  return {
    getFilteredSecretaries,
    getSecretary,
    createSecretary,
    updateSecretary,
    deleteSecretary,
  };
}
