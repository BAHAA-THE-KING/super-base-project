import { useMemo } from "react";
import { usePlans } from "src/views/APIs";

export type PlanAttribute = {
  id: number;
  attribute_id: number;
  attribute: {
    id: number;
    name: string;
  };
  weight: number;
};

export type PlanBeneficiary = {
  id: number;
  first_name: string;
  last_name: string;
  father_name: string;
  birth_date: string;
  birth_place: string;
  national_number: string;
  score: number;
  order: number;
  received_date?: string;
  due_date?: string;
  has_taken: boolean;
};

export type Plan = {
  id: number;
  name: string;
  description: string;
  portion: string;
  type: "meat" | "food" | "rice" | "clothes" | "other";
  is_finished: boolean;
  created_at: string;
  plan_attributes: PlanAttribute[];
  nextBeneficiaries: PlanBeneficiary[];
  percent: number;
};
export function usePlansData() {
  const { getIndexPlans } = usePlans();
  const { data: plansResponse } = getIndexPlans();
  const plans = useMemo(
    () =>
      plansResponse?.data.data.map((e) => ({
        id: e.id,
        name: e.name,
        description: e.description,
        portion: e.portion,
        type: e.type,
        is_finished: Boolean(e.is_finished),
        created_at: e.date,
        plan_attributes: e.attributes.map((ee) => ({
          id: ee.id,
          attribute_id: ee.id,
          attribute: {
            id: ee.id,
            name: ee.name,
          },
          weight: ee.weight,
        })) as PlanAttribute[],
        // TODO: Fill them
        nextBeneficiaries: [],
        percent: 0,
      })) as Plan[],
    [plansResponse]
  );

  const getPlansLoading = plansResponse?.message === "wait";

  return { plans, getPlansLoading };
}
