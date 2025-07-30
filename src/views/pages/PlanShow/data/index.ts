import { useMemo } from "react";
import { useAttributes, usePlans } from "src/views/APIs";

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
export type RawPlan = {
  id?: number;
  name: string;
  description: string;
  portion: string;
  type: string;
  created_at: string;
  plan_attributes: PlanAttribute[];
};
export function useShowPlanData(planId: number) {
  const { getPlan, addPlan, editPlan } = usePlans();
  const { getAllAttributes } = useAttributes();
  const { data: plansResponse } = getPlan(planId);
  const planData = plansResponse!.data;
  const plan = useMemo(
    () =>
      ({
        id: planData.id,
        name: planData.name,
        description: planData.description,
        portion: planData.portion,
        type: "other",
        is_finished: Boolean(planData.is_finished),
        created_at: "",
        plan_attributes: planData.attributes.map((ee) => ({
          id: ee.id,
          attribute_id: ee.id,
          attribute: {
            id: ee.id,
            name: ee.name,
          },
          weight: ee.weight,
        })) as PlanAttribute[],
        nextBeneficiaries: [],
        percent: 0,
      } as Plan),
    [plansResponse]
  );

  const createPlan = (data: RawPlan) =>
    addPlan({
      data: {
        name: data.name,
        date: data.created_at,
        description: data.description,
        portion: data.portion,
        attributes: data.plan_attributes.map((e) => ({
          id: e.attribute_id,
          weight: e.weight,
        })),
      },
    });

  const updatePlan = (data: {
    id: number;
    name: string;
    description: string;
    portion: string;
  }) =>
    editPlan({
      data: {
        name: data.name,
        description: data.description,
        portion: data.portion,
      },
      params: { id: data.id },
    });

  const { data: attributesResponse } = getAllAttributes();

  const attributes = attributesResponse?.data ? attributesResponse.data : [];

  return { plan, createPlan, updatePlan, attributes };
}
