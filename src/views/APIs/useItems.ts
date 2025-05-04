import { useGetAPI } from "src/APIs";

type AllFilters = {
  beneficiary_id: string;
};

type AllResponse = {
  message: string;
  data: {
    id: number;
    name: string;
    age: number;
  }[];
};

export function useItems() {
  const getAllItems = (
    filters: Partial<AllFilters>,
    config: { enabled?: boolean } = {}
  ) =>
    useGetAPI<AllResponse>("/items", {
      defaultData: { message: "", data: [] },
      params: filters,
      keys: ["items"],
      ...config,
    });

  return {
    getAllItems,
  };
}
