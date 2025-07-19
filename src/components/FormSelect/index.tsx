import { ComponentProps, useMemo } from "react";
import {
  AutocompleteRenderOptionState,
  type SxProps,
  type Theme,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

import { BAutocomplete, BTextField } from "../Base";

import { useBaseTranslation, useVoiceInputHandler } from "src/hooks";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  options: { id: number | string; name: string }[];
  control: Control<TFieldValues>;
  label: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  inputProps?: ComponentProps<typeof BTextField>;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement> & { key: any },
    option: {
      id: number | string;
      name: string;
    },
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
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
  sx,
  inputProps = {},
  renderOption,
}: Props<TFieldValues, TName>) {
  const [YouHaveToChooseThe, NoOptionsText] = useBaseTranslation(i18ns);
  const defaultOption = { id: 0, name: "" };
  const allOptions = useMemo(() => [defaultOption, ...options], [options]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({ field, fieldState: { invalid, error } }) => (
        <BAutocomplete
          {...field}
          value={allOptions.find((e) => e.id === field?.value) ?? defaultOption}
          options={allOptions}
          onChange={(_, value: { id: number; name: string }, reason) => {
            if (reason === "clear") {
              field.onChange({ target: { value: defaultOption.id } });
            } else {
              field.onChange({ target: { value: value.id } });
            }
          }}
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
                fullWidth
                variant="standard"
                label={label}
                error={Boolean(invalid || error)}
                helperText={
                  Boolean(invalid || error)
                    ? error?.message || YouHaveToChooseThe + " " + label
                    : ""
                }
                inputRef={inputRef}
                {...inputProps}
              />
            );
          }}
          noOptionsText={NoOptionsText}
          getOptionLabel={(option) => option.name}
          filterOptions={(options, state) =>
            options.filter(
              (option) => option.id && option.name.includes(state.inputValue)
            )
          }
          sx={sx}
          renderOption={renderOption}
        />
      )}
    />
  );
}
