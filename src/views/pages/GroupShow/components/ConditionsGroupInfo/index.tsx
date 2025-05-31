import { useEffect } from "react";
import { CardContent, Stack } from "@mui/material";
import { useFieldArray, useForm, UseFormGetValues } from "react-hook-form";
import { Control } from "react-hook-form";

import {
  Close as CloseIcon,
  HorizontalRule as HorizontalRuleIcon,
} from "@mui/icons-material";

import { FormInput, FormSelect } from "src/components";
import { BButton, BCard, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

type Form = {
  name: string;
  salary: string;
  color: string;
  conditions: {
    id: number;
    name: string;
    params: {
      op: "<" | ">" | "<=" | ">=" | "==" | "!=" | "";
      value: number | "";
    };
  }[];
};

type Props = {
  control: Control<Form>;
  conditions: {
    id: number;
    name: string;
  }[];
  getValues: UseFormGetValues<Form>;
  isAdd: boolean;
  isEdit: boolean;
};

const i18ns = ["conditions", "add_new_condition"];
export function ConditionsGroupInfo({
  control,
  conditions,
  getValues,
  isAdd,
  isEdit,
}: Props) {
  const [ConditionsText, AddNewConditionText] = useBaseTranslation(i18ns);

  const {
    reset: reset1,
    control: control1,
    watch: watch1,
  } = useForm<{
    condition: {
      id: number;
      name: string;
    };
  }>({
    defaultValues: {
      condition: { id: 0, name: "" },
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "conditions",
    control,
    keyName: "key",
  });

  useEffect(() => {
    if (watch1()?.condition?.id) {
      const data = watch1();

      if (!fields.find((e) => e.id === data.condition.id))
        append({
          ...data.condition,
          params: {
            op: "",
            value: "",
          },
        });

      reset1();
    }
  }, [watch1()?.condition?.id]);

  return (
    <BCard
      sx={{
        m: 1,
        width: "100%",
      }}
      animations={{ transitions: "slideInBottom" }}
    >
      <CardContent>
        <BTypography variant="h5" fontWeight={"bold"}>
          {ConditionsText}
        </BTypography>
      </CardContent>
      <CardContent>
        <Stack
          sx={{
            width: {
              sx: "100%",
              md: "75%",
            },
          }}
        >
          {fields.map((field, i) => (
            <Stack
              key={field.id}
              flexDirection={"row"}
              alignItems={"center"}
              my={1}
            >
              {isAdd || isEdit ? (
                <BButton
                  size="small"
                  sx={(theme) => ({
                    mx: 1,
                    width: 24,
                    height: 24,
                    ".MuiSvgIcon-root": {
                      transition: theme.transitions.create("height", {
                        duration: 200,
                      }),
                      position: "absolute",
                    },
                    "&:hover .MuiSvgIcon-root:nth-child(1)": {
                      height: 0,
                    },
                    ".MuiSvgIcon-root:nth-child(2)": {
                      height: 0,
                    },
                    "&:hover .MuiSvgIcon-root:nth-child(2)": {
                      height: 24,
                    },
                  })}
                  icon={
                    <>
                      <HorizontalRuleIcon />
                      <CloseIcon color={"error"} />
                    </>
                  }
                  onClick={() => {
                    remove(i);
                  }}
                />
              ) : (
                <HorizontalRuleIcon />
              )}
              <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                <BTypography>{field.name}</BTypography>
                <FormInput
                  control={control}
                  label="test"
                  name={`conditions.${i}.params.op`}
                  sx={{ width: "100px" }}
                />
                <FormInput
                  control={control}
                  label="test"
                  name={`conditions.${i}.params.value`}
                  sx={{ width: "100px" }}
                />
              </Stack>
            </Stack>
          ))}
          {(isEdit || isAdd) && (
            <FormSelect
              options={conditions}
              sx={{ my: 1 }}
              control={control1}
              label={AddNewConditionText}
              name="condition"
              rules={{
                validate: () => Boolean(getValues("conditions").length),
              }}
            />
          )}
        </Stack>
      </CardContent>
    </BCard>
  );
}
