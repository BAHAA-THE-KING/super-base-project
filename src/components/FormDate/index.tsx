import { ComponentProps } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { type SxProps, type Theme } from "@mui/material";

import { BDatePicker } from "../Base";

import { useBaseTranslation, useVoiceInputHandler } from "src/hooks";
import dayjs from "dayjs";

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
  readonly?: boolean;
  label: string;
  sx?: SxProps<Theme>;
  dateInputProps?: ComponentProps<typeof BDatePicker>;
};

const i18ns = ["you_have_to_enter_the"];

export function FormDate<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  label,
  name,
  rules,
  disabled,
  readonly,
  sx,
  dateInputProps = {},
}: Props<TFieldValues, TName>) {
  const [YouHaveToEnterThe] = useBaseTranslation(i18ns);

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
          <BDatePicker
            {...field}
            {...dateInputProps}
            sx={sx}
            value={dayjs(field.value)}
            label={label}
            inputRef={inputRef}
            format="YYYY-MM-DD"
            readOnly={readonly}
            slotProps={{
              ...(dateInputProps?.slotProps ?? {}),
              textField: {
                ...(dateInputProps?.slotProps?.textField ?? {}),
                fullWidth: true,
                variant: "standard",
                error: Boolean(invalid || error),
                helperText: Boolean(invalid || error)
                  ? error?.message || YouHaveToEnterThe + " " + label
                  : "",
              },
            }}
          />
        );
      }}
    />
  );
}
