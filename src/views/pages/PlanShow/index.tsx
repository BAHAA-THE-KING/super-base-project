import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Skeleton, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  GeneralPlanInfo,
  NextBeneficiariesPlanInfo,
  PlanTerminatePopup,
} from "./components";

import { useShowPlanData } from "src/views/data";

import { varAlpha } from "src/themes/styles";

type Form = {
  name: string;
  description: string;
  portion: string;
  type: "meat" | "food" | "rice" | "clothes" | "other" | "";
  is_finished: boolean;
  created_at: string;
  plan_attributes: {
    id: number | string;
    attribute_id: number;
    attribute: {
      id: number;
      name: string;
    };
    weight: number;
  }[];
};

export function PlanShow() {
  const navigate = useNavigate();
  const { planId: planIdParam } = useParams();
  const planId = Number(planIdParam) ?? 0;
  const isAdd = planIdParam === "add";
  if ((!planId || planId <= 0) && !isAdd) {
    navigate(-1);
    return <></>;
  }

  const {
    plan,
    createPlan,
    updatePlan,
    attributes,
    getPlanLoading,
    getAttributesLoading,
  } = useShowPlanData(planId);

  const [wantToTerminate, setWantToTerminate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit && !plan) {
    navigate(-1);
    return <></>;
  }

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<Form>({
    defaultValues: {
      name: "",
      description: "",
      portion: "",
      type: "",
      created_at: "",
      plan_attributes: [],
    },
  });

  useEffect(() => {
    if (plan)
      reset({
        name: plan.name,
        description: plan.description,
        portion: plan.portion,
        type: plan.type,
        created_at: plan.created_at,
        plan_attributes: plan.plan_attributes,
      });
  }, [plan, isEdit]);

  const submit = handleSubmit(async (data) => {
    if (isAdd) {
      const newPlan = await createPlan({
        name: data.name,
        description: data.description,
        portion: data.portion,
        type: data.type,
        created_at: data.created_at,
        plan_attributes: data.plan_attributes.map((e) => ({
          attribute_id: e.attribute_id,
          weight: e.weight,
        })),
      });
      navigate("/plans/" + newPlan.data.id, { replace: true });
    } else if (isEdit) {
      await updatePlan({
        id: planId,
        name: data.name,
        description: data.description,
        portion: data.portion,
      });
      setIsEdit(false);
    }
  });
  function handleTerminate() {}

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      borderRadius={1}
      flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems={"stretch"}
      p={2}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? varAlpha(theme.palette.secondary.darkerChannel, 0.2)
            : theme.palette.secondary.lighter,
      })}
    >
      {(!isAdd && (getPlanLoading || getAttributesLoading)) ||
      (isAdd && getAttributesLoading) ? (
        <>
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={350}
            sx={{ my: 1 }}
          />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={400}
            sx={{ my: 3 }}
          />
        </>
      ) : (
        <>
          <GeneralPlanInfo
            control={control}
            isDirty={isDirty}
            handleSubmit={submit}
            handleTerminate={() => setWantToTerminate(true)}
            isAdd={isAdd}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            attributes={attributes}
          />
          {isAdd ? null : plan ? (
            <NextBeneficiariesPlanInfo
              nextBeneficiaries={plan.nextBeneficiaries}
            />
          ) : null}
          <PlanTerminatePopup
            plan={wantToTerminate ? plan : null}
            handleTerminate={handleTerminate}
            close={() => setWantToTerminate(false)}
          />
        </>
      )}
    </Stack>
  );
}
