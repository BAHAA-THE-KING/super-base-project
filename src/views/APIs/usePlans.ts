import { useGetAPI, usePostAPI, usePutAPI } from "src/APIs";

type PlanAttribute = {
  id: number;
  name: string;
  weight: number;
};

type Plan = {
  id: number;
  name: string;
  type: "meat" | "food" | "rice" | "clothes" | "other";
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

type IndexPageParams = {
  type: "meat" | "food" | "rice" | "clothes" | "other";
  is_finished: boolean;
  date: string;
};

type PlanResponse = {
  data?: Plan;
  message: string;
};

type AddPlanRequest = {
  name: string;
  description: string;
  portion: string;
  type: string;
  date: string; // ISO date string, e.g. "2025-08-15"
  attributes: {
    id: number;
    weight: number;
  }[];
};

type AddPlanResponse = {
  data: {
    id: number;
    name: string;
    description: string;
    portion: string;
    is_finished: number; // 0 or 1
    date: string; // ISO date string
    attributes: {
      id: number;
      name: string;
      weight: number;
    }[];
  };
  message: string;
};

type EditPlanRequest = {
  name: string;
  description: string;
  portion: string;
};

type EditPlanResponse = {
  data: {
    id: number;
    name: string;
    description: string;
    portion: string;
    is_finished: number; // 0 or 1
    date: string; // ISO date string
    attributes: {
      id: number;
      name: string;
      weight: number;
    }[];
  };
  message: string;
};

export function usePlans() {
  const getIndexPlans = (params: Partial<IndexPageParams>) =>
    useGetAPI<IndexPlansResponse>("/dashboard/plans/index", {
      defaultData: {
        message: "wait",
        data: { data: [] },
      },
      keys: ["plans"],
      params,
    });
  const getPlan = (planId: number) =>
    useGetAPI<PlanResponse>("/dashboard/plans/show/:id", {
      params: { id: planId },
      defaultData: {
        message: "wait",
      },
      keys: ["plans"],
      enabled: Boolean(planId),
    });

  const addPlan = usePostAPI<AddPlanResponse, AddPlanRequest>(
    "/dashboard/plans/create",
    {
      invalidateKeys: ["plans"],
    }
  ).mutateAsync;

  const editPlan = usePutAPI<EditPlanResponse, EditPlanRequest>(
    "/dashboard/plans/update/:id",
    {
      invalidateKeys: ["plans"],
    }
  ).mutateAsync;

  return { getIndexPlans, getPlan, addPlan, editPlan };
}
