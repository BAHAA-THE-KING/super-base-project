import { MobileDatePicker, MobileDatePickerProps } from "@mui/x-date-pickers";

import { BTextField } from "../BTextField";

export type BDatePickerProps<TDate = any> = MobileDatePickerProps<TDate>;

export function BDatePicker<TDate>({ ...props }: BDatePickerProps<TDate>) {
  return (
    <MobileDatePicker
      {...props}
      slots={{
        ...(props?.slots ?? {}),
        textField: BTextField,
      }}
    />
  );
}
