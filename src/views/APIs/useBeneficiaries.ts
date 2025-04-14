import { useDeleteAPI, useGetAPI, usePostAPI, usePutAPI } from "src/APIs";

type IndexFilters = {
  name: string;
};

type IndexResponse = {
  id: number;
  name: string;
  age: number;
}[];

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
  const getIndexedBeneficiaries = (filters: Partial<IndexFilters>) =>
    useGetAPI<IndexResponse>("/beneficiaries/index", {
      defaultData: [],
      params: filters,
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
    getIndexedBeneficiaries,
    addBeneficiary,
    editBeneficiary,
    deactivateBeneficiary,
  };
}
