import { CardContent, Stack } from "@mui/material";
import { Control, useFieldArray } from "react-hook-form";

import {
  HorizontalRule as HorizontalRuleIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import { BButton, BCard, BTypography } from "src/components/Base";
import { FormInput, FormMultiSelect } from "src/components";

import { useBaseTranslation } from "src/hooks";

type Form = {
  name: string;
  address: string;
  birth_date: string;
  birth_place: string;
  mobile: string;
  specification: string;
  price: string;
  attendance_schedules: {
    from: string;
    to: string;
    days: { id: number; name: string }[];
  }[];
};

type Props = {
  control: Control<Form>;
  isAdd: boolean;
  isEdit: boolean;
};

const i18ns = [
  "doctor_attendance",
  "add_schedule",
  "from_time",
  "to_time",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function DoctorAttendanceInfo({ control, isAdd, isEdit }: Props) {
  const [
    DoctorAttendanceText,
    AddScheduleText,
    FromTimeText,
    ToTimeText,
    SundayText,
    MondayText,
    TuesdayText,
    WednesdayText,
    ThursdayText,
    FridayText,
    SaturdayText,
  ] = useBaseTranslation(i18ns);

  const { fields, append, remove } = useFieldArray({
    name: "attendance_schedules",
    control,
    keyName: "key",
  });

  return (
    <BCard
      sx={{
        m: 1,
        width: "100%",
      }}
      animations={{ transitions: "slideInBottom" }}
    >
      <CardContent>
        <BTypography variant="h5" fontWeight={"bold"}>
          {DoctorAttendanceText}
        </BTypography>
      </CardContent>
      <CardContent>
        <Stack width={"100%"} justifyContent={"start"} alignItems={"start"}>
          {fields.map((field, i) => (
            <Stack
              key={
                field.from +
                "-" +
                field.to +
                ", " +
                JSON.stringify(field.days) +
                Math.random()
              }
              flexDirection={"row"}
              alignItems={"center"}
              my={1}
            >
              {isAdd || isEdit ? (
                <BButton
                  size="small"
                  sx={(theme) => ({
                    mx: 1,
                    width: 24,
                    height: 24,
                    ".MuiSvgIcon-root": {
                      transition: theme.transitions.create("height", {
                        duration: 200,
                      }),
                      position: "absolute",
                    },
                    "&:hover .MuiSvgIcon-root:nth-child(1)": {
                      height: 0,
                    },
                    ".MuiSvgIcon-root:nth-child(2)": {
                      height: 0,
                    },
                    "&:hover .MuiSvgIcon-root:nth-child(2)": {
                      height: 24,
                    },
                  })}
                  icon={
                    <>
                      <HorizontalRuleIcon />
                      <CloseIcon color={"error"} />
                    </>
                  }
                  onClick={() => remove(i)}
                />
              ) : (
                <HorizontalRuleIcon />
              )}
              <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                <FormInput
                  control={control}
                  label={FromTimeText}
                  name={`attendance_schedules.${i}.from`}
                  sx={{ width: "100px" }}
                  inputProps={{
                    slotProps: { input: { readOnly: !isEdit && !isAdd } },
                  }}
                />
                <FormInput
                  control={control}
                  label={ToTimeText}
                  name={`attendance_schedules.${i}.to`}
                  sx={{ width: "100px" }}
                  inputProps={{
                    slotProps: { input: { readOnly: !isEdit && !isAdd } },
                  }}
                />
                <FormMultiSelect
                  control={control}
                  label={ToTimeText}
                  name={`attendance_schedules.${i}.days`}
                  enableNew={false}
                  options={[
                    { id: 1, name: SundayText },
                    { id: 2, name: MondayText },
                    { id: 3, name: TuesdayText },
                    { id: 4, name: WednesdayText },
                    { id: 5, name: ThursdayText },
                    { id: 6, name: FridayText },
                    { id: 7, name: SaturdayText },
                  ]}
                  disabled={!isEdit && !isAdd}
                />
              </Stack>
            </Stack>
          ))}
          {(isEdit || isAdd) && (
            <BButton
              sx={{ mt: 2, px: 10 }}
              onClick={() => append({ from: "", to: "", days: [] })}
              size="large"
            >
              {AddScheduleText}
            </BButton>
          )}
        </Stack>
      </CardContent>
    </BCard>
  );
}
