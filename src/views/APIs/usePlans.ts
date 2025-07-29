import { useGetAPI } from "src/APIs";

type PlanAttribute = {
  id: number;
  name: string;
  weight: number;
};

type Plan = {
  id: number;
  name: string;
  description: string;
  portion: string;
  is_finished: number;
  date: string;
  attributes: PlanAttribute[];
};

type PlanLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type IndexPlansResponse = {
  data: {
    data: Plan[];
    current_page?: number;
    first_page_url?: string;
    from?: number;
    last_page?: number;
    last_page_url?: string;
    links?: PlanLink[];
    next_page_url?: string | null;
    path?: string;
    per_page?: number;
    prev_page_url?: string | null;
    to?: number;
    total?: number;
  };
  message: string;
};

type PlanResponse = {
  data: Plan;
  message: string;
};

export function usePlans() {
  const getIndexPlans = () =>
    useGetAPI<IndexPlansResponse>("/dashboard/plans/index", {
      defaultData: {
        message: "wait",
        data: { data: [] },
      },
      keys: ["plans"],
    });
  const getPlan = (planId: number) =>
    useGetAPI<PlanResponse>("/dashboard/plans/show/:id", {
      params: { id: planId },
      defaultData: {
        message: "wait",
        data: {
          id: 0,
          name: "",
          description: "",
          portion: "",
          is_finished: 0,
          date: "",
          attributes: [],
        },
      },
      keys: ["plans"],
    });
  return { getIndexPlans, getPlan };
}
