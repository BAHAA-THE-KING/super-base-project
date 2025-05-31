import {
  styled,
  Autocomplete,
  AutocompleteProps,
  ChipTypeMap,
} from "@mui/material";

export type BAutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
> = AutocompleteProps<
  Value,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent
>;

export const BAutocomplete = styled(Autocomplete)(({ theme }) => {
  return theme.unstable_sx({});
});
