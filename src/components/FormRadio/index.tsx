import { Stack, Typography } from "@mui/material";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

import { BRadio, BTypography } from "../Base";

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
  option: string;
};

const i18ns = ["you_have_to_enter_the"];

export function FormRadio<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  label,
  name,
  rules,
  disabled,
  option,
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
          <Stack direction={"row"}>
            <BRadio {...field} value={option} name={name} />
            <BTypography>{label}</BTypography>
          </Stack>
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
