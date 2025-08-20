import { ReactNode, useMemo } from "react";
import { Box, BoxProps, type SxProps, type Theme } from "@mui/material";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

import { BAutocomplete, BTextField } from "src/components/Base";
import { useBaseTranslation } from "src/hooks";

type Option = { id: string; icon: ReactNode };

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
};

const i18ns = ["you_have_to_choose_the", "no_options"];

export function IconSelect<
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
}: Props<TFieldValues, TName>) {
  const [YouHaveToChooseThe, NoOptionsText] = useBaseTranslation(i18ns);

  const defaultOption = { id: "", icon: <></> };
  const allOptions = useMemo<Option[]>(
    () => [defaultOption, ...options],
    [options, readOnly]
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({ field, fieldState: { invalid, error } }) => {
        const autoValue =
          allOptions.find((option) => option.id === field.value) ??
          defaultOption;

        return (
          <BAutocomplete
            {...field}
            value={autoValue}
            options={allOptions}
            // prevent opening the popup when readOnly
            open={readOnly ? false : undefined}
            onOpen={readOnly ? /* no-op */ () => {} : undefined}
            onChange={(_, value, reason) => {
              if (readOnly) return; // block all edits
              if (reason === "clear") {
                field.onChange(defaultOption.id);
                return;
              }
              if (value && typeof value === "object") {
                field.onChange(value.id);
              } else {
                field.onChange(defaultOption.id);
              }
            }}
            isOptionEqualToValue={(option, val) => option.id === val?.id}
            getOptionLabel={() => ""}
            filterOptions={(options) => options.filter((option) => option.id)}
            renderInput={(params) => (
              <BTextField
                {...params}
                value={""}
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
                  startAdornment:
                    options.find((e) => e.id === field?.value)?.icon ?? null,
                }}
              />
            )}
            noOptionsText={NoOptionsText}
            // UX polish when read-only: hide icons & clearing affordance
            forcePopupIcon={readOnly ? false : undefined}
            disableClearable={readOnly ? true : undefined}
            sx={sx}
            renderOption={(params, option) => (
              <Box {...(params as BoxProps)}>{option.icon}</Box>
            )}
            selectOnFocus={!readOnly}
            clearOnBlur={!readOnly}
            handleHomeEndKeys={!readOnly}
          />
        );
      }}
    />
  );
}
