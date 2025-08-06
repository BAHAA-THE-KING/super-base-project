import { useMemo, useState } from "react";

import { useAttributes, usePlans } from "src/views/APIs";

export type ShowPlanAttribute = {
  attribute_id: number;
  weight: number;
};

export type ShowPlanBeneficiary = {
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

export type ShowPlan = {
  id: number;
  name: string;
  description: string;
  portion: string;
  type: "meat" | "food" | "rice" | "clothes" | "other";
  is_finished: boolean;
  created_at: string;
  plan_attributes: ShowPlanAttribute[];
  nextBeneficiaries: ShowPlanBeneficiary[];
  percent: number;
};

export type RawPlan = {
  id?: number;
  name: string;
  description: string;
  portion: string;
  type: string;
  created_at: string;
  plan_attributes: ShowPlanAttribute[];
};

export function useShowPlanData(planId: number) {
  const { getPlan, addPlan, editPlan } = usePlans();
  const { getAllAttributes } = useAttributes();

  const { data: attributesResponse } = getAllAttributes();
  const { data: plansResponse } = getPlan(planId);

  const planData = plansResponse?.data;
  const plan = useMemo<ShowPlan | null>(
    () =>
      planData
        ? {
            id: planData.id,
            name: planData.name,
            description: planData.description,
            portion: planData.portion,
            type: planData.type,
            is_finished: Boolean(planData.is_finished),
            created_at: planData.date.split("T")[0],
            plan_attributes: planData.attributes.map((ee) => ({
              id: ee.id,
              attribute_id: ee.id,
              attribute: {
                id: ee.id,
                name: ee.name,
              },
              weight: ee.weight,
            })),
            // TODO: Fill them
            nextBeneficiaries: [],
            percent: 0,
          }
        : null,
    [plansResponse]
  );

  const [createPlanLoading, setCreatePlanLoading] = useState(false);
  const [updatePlanLoading, setUpdatePlanLoading] = useState(false);

  const createPlan = (data: RawPlan) => {
    setCreatePlanLoading(true);
    return addPlan({
      data: {
        name: data.name,
        date: data.created_at,
        type: data.type,
        description: data.description,
        portion: data.portion,
        attributes: data.plan_attributes.map((e) => ({
          id: e.attribute_id,
          weight: e.weight,
        })),
      },
    }).finally(() => setCreatePlanLoading(false));
  };

  const updatePlan = (data: {
    id: number;
    name: string;
    description: string;
    portion: string;
  }) => {
    setUpdatePlanLoading(true);
    return editPlan({
      data: {
        name: data.name,
        description: data.description,
        portion: data.portion,
      },
      params: { id: data.id },
    }).finally(() => setUpdatePlanLoading(false));
  };

  const attributes = attributesResponse?.data ? attributesResponse.data : [];

  const getPlanLoading = plansResponse?.message === "wait";
  const getAttributesLoading = attributesResponse?.message === "wait";

  return {
    plan,
    createPlan,
    updatePlan,
    attributes,
    getPlanLoading,
    createPlanLoading,
    updatePlanLoading,
    getAttributesLoading,
  };
}
