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

type Option = { id: number | string; name: string };

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  options: Option[];
  control: Control<TFieldValues>;
  label: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  disabled?: boolean;
  /** New: can focus/copy but cannot change */
  readOnly?: boolean;
  sx?: SxProps<Theme>;
  canType?: boolean;
  inputProps?: ComponentProps<typeof BTextField>;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement> & { key: any },
    option: Option,
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
  readOnly = false,
  sx,
  canType = false,
  inputProps = {},
  renderOption,
}: Props<TFieldValues, TName>) {
  const [YouHaveToChooseThe, NoOptionsText] = useBaseTranslation(i18ns);

  const defaultOption = { id: 0, name: "" };
  const allOptions = useMemo<Option[]>(
    () => (canType && !readOnly ? options : [defaultOption, ...options]),
    [options, canType, readOnly]
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({ field, fieldState: { invalid, error } }) => {
        const autoValue =
          canType && !readOnly && typeof field.value === "string"
            ? field.value
            : allOptions.find((option) => option.id === field.value) ??
              (canType && !readOnly ? null : defaultOption);

        const currentText =
          typeof field.value === "string"
            ? field.value
            : options.find((option) => option.id === field.value)?.name ?? "";

        const { inputRef } = useVoiceInputHandler(currentText, (v) => {
          if (!readOnly && canType) field.onChange(v ?? "");
        });

        return (
          <BAutocomplete
            {...field}
            value={autoValue}
            options={allOptions}
            freeSolo={canType && !readOnly}
            // prevent opening the popup when readOnly
            open={readOnly ? false : undefined}
            onOpen={readOnly ? /* no-op */ () => {} : undefined}
            // make typing a no-op when readOnly
            onInputChange={(_, newInputValue, reason) => {
              if (readOnly) return;
              if (!canType) return;
              if (reason === "input") field.onChange(newInputValue);
            }}
            onChange={(_, value: Option | string, reason) => {
              if (readOnly) return; // block all edits
              if (reason === "clear") {
                field.onChange(canType ? "" : defaultOption.id);
                return;
              }
              if (typeof value === "string") {
                field.onChange(value);
              } else if (value && typeof value === "object") {
                field.onChange(value.id);
              } else {
                field.onChange(canType ? "" : defaultOption.id);
              }
            }}
            getOptionLabel={(option: Option | string) =>
              typeof option === "string"
                ? options?.find((e) => e.id === option)?.name ?? option
                : option.name
            }
            isOptionEqualToValue={(option: Option, val: Option | string) =>
              typeof val === "string"
                ? option.name === val
                : option.id === val?.id
            }
            filterOptions={(options: Option[], state) =>
              options.filter(
                (option) =>
                  option.id &&
                  option.name
                    .toLowerCase()
                    .includes((state.inputValue ?? "").toLowerCase())
              )
            }
            renderInput={(params) => (
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
                // pass readOnly down to the HTML input
                inputProps={{
                  ...params.inputProps,
                  readOnly,
                  "aria-readonly": readOnly ? true : undefined,
                }}
                InputProps={{
                  ...params.InputProps,
                }}
                inputRef={inputRef}
                {...inputProps}
              />
            )}
            noOptionsText={NoOptionsText}
            // UX polish when read-only: hide icons & clearing affordance
            forcePopupIcon={readOnly ? false : undefined}
            disableClearable={readOnly ? true : undefined}
            sx={sx}
            renderOption={renderOption}
            selectOnFocus={!readOnly}
            clearOnBlur={!readOnly}
            handleHomeEndKeys={!readOnly}
          />
        );
      }}
    />
  );
}
