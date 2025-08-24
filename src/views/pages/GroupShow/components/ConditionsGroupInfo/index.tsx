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

import { Condition } from "src/types/data/SingleBeneficiary";

type Form = {
  name: string;
  salary: string;
  color: string;
  conditions: {
    id: number;
    name: string;
    param: {
      op: "<" | ">" | "<=" | ">=" | "=" | "!=" | "";
      value: number | "";
    };
  }[];
};

type Props = {
  control: Control<Form>;
  conditions: Condition[];
  getValues: UseFormGetValues<Form>;
  isAdd: boolean;
  isEdit: boolean;
};

const i18ns = [
  "conditions",
  "add_new_condition",
  "condition",
  "value",
  "less_than",
  "greater_than",
  "less_than_or_equal",
  "greater_than_or_equal",
  "equals",
  "not_equals",
];
export function ConditionsGroupInfo({
  control,
  conditions,
  getValues,
  isAdd,
  isEdit,
}: Props) {
  const [
    ConditionsText,
    AddNewConditionText,
    ConditionText,
    ValueText,
    LessThanText,
    GreaterThanText,
    LessThanOrEqualText,
    GreaterThanOrEqualText,
    EqualsText,
    NotEqualsText,
  ] = useBaseTranslation(i18ns);

  const {
    reset: reset1,
    control: control1,
    watch: watch1,
  } = useForm<{
    condition: number;
  }>({
    defaultValues: {
      condition: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "conditions",
    control,
    keyName: "key",
  });

  useEffect(() => {
    if (watch1()?.condition) {
      const data = watch1();

      const condition = conditions.find((e) => e.id === data.condition);

      if (!fields.find((e) => e.id === data.condition) && condition)
        append({
          id: data.condition,
          name: condition.name,
          param: {
            op: "",
            value: "",
          },
        });

      reset1({ condition: 0 });
    }
  }, [watch1()?.condition]);

  return (
    <BCard
      sx={{ m: 1, width: "100%" }}
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
                  onClick={() => remove(i)}
                />
              ) : (
                <HorizontalRuleIcon />
              )}
              <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                <BTypography>{field.name}</BTypography>
                <FormSelect
                  readOnly={!(isEdit || isAdd)}
                  control={control}
                  options={[
                    { id: "<", name: LessThanText },
                    { id: ">", name: GreaterThanText },
                    { id: "<=", name: LessThanOrEqualText },
                    { id: ">=", name: GreaterThanOrEqualText },
                    { id: "=", name: EqualsText },
                    { id: "!=", name: NotEqualsText },
                  ]}
                  label={ConditionText}
                  name={`conditions.${i}.param.op`}
                  sx={{ width: "200px" }}
                />
                <FormInput
                  control={control}
                  label={ValueText}
                  name={`conditions.${i}.param.value`}
                  sx={{ width: "200px" }}
                  inputProps={{
                    slotProps: {
                      input: { readOnly: !(isEdit || isAdd) },
                    },
                  }}
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
