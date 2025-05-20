import { useMemo } from "react";
import { usePlansData } from "../../Plans/data";

export function useShowPlanData(planId: number) {
  const { plans } = usePlansData();
  const plan = useMemo(() => plans.find((e) => e.id === planId), [plans]);
  return { plan, isLoading: false };
}
