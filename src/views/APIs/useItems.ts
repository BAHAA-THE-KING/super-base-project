import { useGetAPI } from "src/APIs";

type AllResponse = {
  data: {
    id: number;
    name: string;
    description: string;
    category_id: number;
    amount: number;
    unit: string;
    donor: null;
    expiry_date: string;
    addition_date: string;
  }[];
  message: string;
};

export function useItems() {
  const getAllItems = (filters: any) =>
    useGetAPI<AllResponse>("/dashboard/items/all", {
      defaultData: { message: "wait", data: [] },
      params: filters,
      keys: ["items"],
    });

  return {
    getAllItems,
  };
}
