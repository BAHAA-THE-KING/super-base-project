import { ComponentProps, useState } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { type SxProps, type Theme } from "@mui/material";

import { BTextField } from "../Base";

import { useBaseTranslation, useVoiceInputHandler } from "src/hooks";

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
  multiline?: boolean;
  inputProps?: ComponentProps<typeof BTextField>;
};

const i18ns = ["you_have_to_enter_the"];

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  label,
  name,
  rules,
  disabled,
  sx,
  multiline,
  inputProps = {},
}: Props<TFieldValues, TName>) {
  const [YouHaveToEnterThe] = useBaseTranslation(i18ns);
  const [lineNum, setLineNum] = useState(3);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({ field, fieldState: { invalid, error } }) => {
        const { inputRef } = useVoiceInputHandler(field.value, (value) =>
          field.onChange({ target: { value } })
        );

        return (
          <BTextField
            {...field}
            fullWidth
            sx={sx}
            variant="standard"
            multiline={multiline}
            rows={multiline ? lineNum : 1}
            label={label}
            error={Boolean(invalid || error)}
            helperText={
              Boolean(invalid || error)
                ? error?.message || YouHaveToEnterThe + " " + label
                : ""
            }
            onChange={(e) => {
              field.onChange(e);
              setLineNum(
                Math.max(
                  e.target.value.split("").filter((e) => e === "\n").length + 1,
                  3
                )
              );
            }}
            inputRef={inputRef}
            {...inputProps}
          />
        );
      }}
    />
  );
}
