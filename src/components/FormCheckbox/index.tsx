import { Stack, type SxProps, type Theme } from "@mui/material";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

import { BCheckbox, BTypography } from "../Base";

import { useBaseTranslation } from "src/hooks";
import { ComponentProps } from "react";

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
  sx?: SxProps<Theme>;
  checkboxProps?: ComponentProps<typeof BCheckbox>;
};

const i18ns = ["you_have_to_enter_the"];

export function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  label,
  name,
  rules,
  disabled,
  checkboxProps = {},
}: Props<TFieldValues, TName>) {
  const [YouHaveToEnterThe] = useBaseTranslation(i18ns);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({ field, fieldState: { invalid, error } }) => (
        <Stack>
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <BCheckbox {...field} checked={field.value} {...checkboxProps} />
            <BTypography
              sx={{ cursor: "pointer" }}
              onClick={() =>
                !field.disabled &&
                field.onChange({ target: { value: !field.value } })
              }
            >
              {label}
            </BTypography>
          </Stack>
          {Boolean(invalid || error) ? (
            <BTypography color="error" variant="caption">
              {Boolean(invalid || error)
                ? error?.message || YouHaveToEnterThe + " " + label
                : ""}
            </BTypography>
          ) : null}
        </Stack>
      )}
    />
  );
}
