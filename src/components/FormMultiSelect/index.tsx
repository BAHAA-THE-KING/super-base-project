import { useRef } from "react";
import { Autocomplete } from "@mui/material";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

import { BChip, BTextField } from "../Base";

import { useBaseTranslation, useVoiceInputHandler } from "src/hooks";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  options: { id: number; name: string }[];
  control: Control<TFieldValues>;
  label: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
};

const i18ns = ["you_have_to_enter_the", "no_options"];

export function FormMultiSelect<
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

  const newOptionsCount = useRef(0);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { invalid, error } }) => (
        <Autocomplete
          {...field}
          multiple
          freeSolo
          options={options}
          disabled={disabled}
          onChange={(_, value) => {
            const updatedValue = value.map((item) =>
              typeof item === "string"
                ? { id: -++newOptionsCount.current, name: item }
                : item
            );
            field.onChange(updatedValue);
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <BChip
                  label={typeof option === "string" ? option : option.name}
                  key={key}
                  {...tagProps}
                />
              );
            })
          }
          renderInput={(params) => {
            const { inputRef } = useVoiceInputHandler(
              field?.value?.name ?? "",
              (value) =>
                params.inputProps.onChange &&
                params.inputProps.onChange({ target: { value } })
            );
            return (
              <BTextField
                {...params}
                label={label}
                error={Boolean(invalid || error)}
                helperText={
                  Boolean(invalid || error)
                    ? error?.message || `${YouHaveToChooseThe} ${label}`
                    : ""
                }
                inputRef={inputRef}
              />
            );
          }}
          noOptionsText={NoOptionsText}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name
          }
        />
      )}
    />
  );
}
