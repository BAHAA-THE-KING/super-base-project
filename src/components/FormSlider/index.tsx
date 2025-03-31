import React from "react";
import { Slider, Stack, Typography } from "@mui/material";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

import { BTypography } from "../Base";

import { useBaseTranslation } from "src/hooks";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  label: string;
  min: number;
  max: number;
  step?: number;
  valueLabelDisplay?: "on" | "off" | "auto";
  valueLabelFormat?:
    | string
    | ((value: number, index: number) => React.ReactNode);
  marks?: boolean | { value: number; label: React.ReactNode }[];
};

const i18ns = ["you_have_to_enter_the"];

export function FormSlider<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  label,
  name,
  rules,
  disabled,
  min,
  max,
  step,
  valueLabelDisplay = "auto",
  valueLabelFormat,
  marks = Boolean(step),
}: Props<TFieldValues, TName>) {
  const [YouHaveToEnterThe] = useBaseTranslation(i18ns);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({ field, fieldState: { invalid, error } }) => (
        <Stack mx={3}>
          <BTypography>{label}</BTypography>
          <Slider
            {...field}
            min={min}
            max={max}
            step={step}
            valueLabelDisplay={valueLabelDisplay}
            valueLabelFormat={valueLabelFormat}
            marks={marks}
          />
          {Boolean(invalid || error) ? (
            <Typography color="error" variant="caption">
              {Boolean(invalid || error)
                ? error?.message || YouHaveToEnterThe + " " + label
                : ""}
            </Typography>
          ) : null}
        </Stack>
      )}
    />
  );
}
