import { useGetAPI } from "src/APIs";

type AllConditionsResponse = {
  data: {
    current_page: number;
    data: {
      id: number;
      name: string;
    }[];
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  message: string;
};

export function useConditions() {
  const getAllConditions = () => useGetAPI<AllConditionsResponse>("conditions");

  return {
    getAllConditions,
  };
}
