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

export function useAids() {
  const getAllAvailableAids = (filters: Partial<AllFilters>) =>
    useGetAPI<AllResponse>("/available-aids", {
      defaultData: { message: "", data: [] },
      params: filters,
      keys: ["available-aids"],
    });

  return {
    getAllAvailableAids,
  };
}
