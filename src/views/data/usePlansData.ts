import { useMemo, useRef } from "react";

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
export function usePlansData(
  params: Partial<{
    type: "meat" | "food" | "rice" | "clothes" | "other";
    is_finished: boolean;
    date: string;
  }>
) {
  const { getIndexPlans } = usePlans();
  const { data: plansResponse } = getIndexPlans(params);
  const plans = useMemo(
    () =>
      plansResponse?.data.data.map((e) => ({
        id: e.id,
        name: e.name,
        description: e.description,
        portion: e.portion,
        type: e.type,
        is_finished: Boolean(e.is_finished),
        created_at: e.date.split("T")[0],
        plan_attributes: e.attributes.map((ee) => ({
          id: ee.id,
          attribute_id: ee.id,
          attribute: {
            id: ee.id,
            name: ee.name,
          },
          weight: ee.weight,
        })) as PlanAttribute[],
        percent: e.completion_percentage,
        // No Need
        nextBeneficiaries: [],
      })) as Plan[],
    [plansResponse]
  );

  const totalRows = useRef(0);

  if (plansResponse?.data?.total !== undefined) {
    totalRows.current = plansResponse.data.total;
  }

  const getPlansLoading = plansResponse?.message === "wait";

  return { plans, totalRows: totalRows.current, getPlansLoading };
}
