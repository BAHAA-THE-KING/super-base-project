import { useGetAPI } from "src/APIs";

type AllResponse = {
  data: { id: number; name: string }[];
  message: string;
};

export function useCategories() {
  const getAllCategories = (filters: any) =>
    useGetAPI<AllResponse>("/dashboard/categories/all", {
      defaultData: { message: "wait", data: [] },
      params: filters,
      keys: ["categories"],
    });

  return {
    getAllCategories,
  };
}
