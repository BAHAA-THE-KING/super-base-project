import { useMemo, useState } from "react";

import { useAttributes, useCategories, usePlans } from "src/views/APIs";

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
  portion: number;
  category_id: number;
  category: { id: number; name: string };
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
  portion: number;
  category_id: number;
  created_at: string;
  plan_attributes: ShowPlanAttribute[];
};

export function useShowPlanData(planId: number) {
  const {
    getPlan,
    addPlan,
    editPlan,
    proceedPlan: proceedPlanAPI,
  } = usePlans();
  const { getAllAttributes } = useAttributes();
  const { getAllCategories } = useCategories();

  const { data: attributesResponse } = getAllAttributes();
  const { data: plansResponse } = getPlan(planId);
  const { data: categoriesResponse } = getAllCategories({});

  const planData = plansResponse?.data;
  const plan = useMemo<ShowPlan | null>(
    () =>
      planData
        ? {
            id: planData.id,
            name: planData.name,
            description: planData.description,
            portion: planData.portion,
            category_id: planData.category_id,
            category: planData.category,
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
            percent: planData.completion_percentage,
            nextBeneficiaries: planData.beneficiaries.map((e) => ({
              id: e.id,
              first_name: e.first_name,
              last_name: e.last_name,
              father_name: e.father_name,
              birth_date: e.birth_date.split("T")[0],
              birth_place: e.birth_place,
              national_number: e.national_number,
              score: Number(e.score),
              order: e.order,
              received_date: e?.received_at?.split("T")?.[0],
              due_date: e.turn_until,
              has_taken: e.has_taken,
            })),
          }
        : null,
    [plansResponse]
  );

  const [createPlanLoading, setCreatePlanLoading] = useState(false);
  const [updatePlanLoading, setUpdatePlanLoading] = useState(false);
  const [proceedPlanLoading, setProceedPlanLoading] = useState(false);

  const createPlan = (data: RawPlan) => {
    setCreatePlanLoading(true);
    return addPlan({
      data: {
        name: data.name,
        date: data.created_at,
        category_id: data.category_id,
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
    portion: number;
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

  const proceedPlan = (planId: number) => {
    setProceedPlanLoading(true);
    return proceedPlanAPI({
      data: {
        capacity: 10,
        duration_in_days: 2,
      },
      params: { planId },
    }).finally(() => setProceedPlanLoading(false));
  };

  const attributes = attributesResponse?.data ?? [];

  const categories = categoriesResponse?.data ?? [];

  const getCategoriesLoading = categoriesResponse?.message === "wait";
  const getPlanLoading = plansResponse?.message === "wait";
  const getAttributesLoading = attributesResponse?.message === "wait";

  return {
    plan,
    createPlan,
    updatePlan,
    proceedPlan,
    attributes,
    categories,
    getCategoriesLoading,
    getPlanLoading,
    createPlanLoading,
    updatePlanLoading,
    getAttributesLoading,
    proceedPlanLoading,
  };
}
