import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  GeneralPlanInfo,
  NextBeneficiariesPlanInfo,
  PlanTerminatePopup,
} from "./components";

import { useShowPlanData } from "./data";

import { varAlpha } from "src/themes/styles";

type Form = {
  name: string;
  description: string;
  portion: string;
  type: "meat" | "food" | "rice" | "clothes" | "other" | "";
  is_finished: boolean;
  created_at: string;
  plan_attributes: {
    id: number;
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
  const planId = Number(planIdParam);
  const isAdd = planIdParam === "add";
  if ((!planId || planId <= 0) && !isAdd) {
    navigate(-1);
    return <></>;
  }

  const { plan } = useShowPlanData(planId);
  if (!plan) {
    navigate(-1);
    return <></>;
  }

  const [wantToTerminate, setWantToTerminate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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

  function submit() {
    handleSubmit((data) => {
      console.log(data);
    });
  }
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
      <GeneralPlanInfo
        control={control}
        isDirty={isDirty}
        handleSubmit={submit}
        handleTerminate={() => setWantToTerminate(true)}
        isAdd={isAdd}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      {isAdd ? null : (
        <NextBeneficiariesPlanInfo nextBeneficiaries={plan.nextBeneficiaries} />
      )}
      <PlanTerminatePopup
        plan={wantToTerminate ? plan : null}
        handleTerminate={handleTerminate}
        close={() => setWantToTerminate(false)}
      />
    </Stack>
  );
}
