import { useGetAPI } from "src/APIs";

type AllAttributesResponse = {
  data: {
    id: number;
    name: string;
  }[];
  message: string;
};

export function useAttributes() {
  const getAllAttributes = () =>
    useGetAPI<AllAttributesResponse>("/dashboard/attributes/all", {
      defaultData: {
        message: "wait",
        data: [],
      },
      keys: ["attributes"],
    });

  return { getAllAttributes };
}
