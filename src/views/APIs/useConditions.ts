import { useGetAPI } from "src/APIs";

type AllConditionsResponse = {
  data: {
    id: number;
    name: string;
  }[];
  message: string;
};

export function useConditions() {
  const getAllConditions = () =>
    useGetAPI<AllConditionsResponse>("/dashboard/conditions/all");

  return {
    getAllConditions,
  };
}
