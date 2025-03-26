import { useMemo, useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

import { useBaseTranslation } from "src/hooks";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  options: { id: number; name: string }[];
  control: Control<TFieldValues>;
  label: string;
  rules: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
};

const i18ns = ["you_have_to_choose_the", "no_options"];

export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  label,
  options,
  name,
  rules,
  disabled,
}: Props<TFieldValues, TName>) {
  const [YouHaveToChooseThe, NoOptionsText] = useBaseTranslation(i18ns);
  const defaultOption = { id: 0, name: "" };
  const allOptions = useMemo(() => [defaultOption, ...options], [options]);

  const newOptionsCount = useRef(0);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({ field, fieldState: { invalid, error } }) => (
        <Autocomplete
          {...field}
          freeSolo
          options={allOptions}
          onChange={(_, value, reason) => {
            if (reason === "clear") {
              field.onChange({ target: { value: defaultOption } });
            } else if (typeof value === "string") {
              field.onChange({
                target: {
                  value: { id: -++newOptionsCount.current, name: value },
                },
              });
            } else {
              field.onChange({ target: { value } });
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={Boolean(invalid || error)}
              helperText={
                Boolean(invalid || error)
                  ? error?.message || YouHaveToChooseThe + " " + label
                  : ""
              }
            />
          )}
          noOptionsText={NoOptionsText}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name
          }
          //isOptionEqualToValue={(option, value) =>
          //  typeof option === "string"
          //    ? option === (typeof value === "string" ? value : value.name)
          //    : option.id === (typeof value === "string" ? -1 : value.id)
          //}
          //filterOptions={(options, params) => {
          //  const filtered = options.filter((e) => e.id);
          //  if (params.inputValue !== "") {
          //    filtered.push({ id: -1, name: params.inputValue });
          //  }
          //  return filtered;
          //}}
        />
      )}
    />
  );
}
