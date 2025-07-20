import { useEffect, useState } from "react";
import { CardContent, Grid2, Stack } from "@mui/material";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";

import { BButton, BCard, BTypography } from "src/components/Base";
import { FormCheckbox, FormInput, FormSelect } from "src/components";

import { useBaseTranslation } from "src/hooks";

import { AppointmentCreate } from "src/types/data/AppointmentCreate";
import { AppointmentTable } from "src/types/data/AppointmentTable";
import { NewPatientPopup } from "../NewPatientPopup";

type Form = AppointmentCreate &
  AppointmentTable & { showWantDiscount: boolean };

type Props = {
  control: Control<Form>;
  beneficiaries: { id: number; name: string; national_number: string }[];
  doctors: {
    id: number;
    name: string;
    attendance_schedules: {
      from: string;
      to: string;
      days: string[];
    }[];
  }[];
  isValid: boolean;
  isDirty: boolean;
  watch: UseFormWatch<Form>;
  setValue: UseFormSetValue<Form>;
  submit: () => void;
};

const i18ns = [
  "beneficiary_name",
  "beneficiary_national_number",
  "doctor_name",
  "date",
  "from_hour",
  "to_hour",
  "reason",
  "need_discount",
  "save_new_appointment",
  "add_new_appointment",
  "discount_reason",
  "new_patient",
];

export function AppointmentForm({
  control,
  beneficiaries,
  doctors,
  isValid,
  isDirty,
  watch,
  setValue,
  submit,
}: Props) {
  const [
    BeneficiaryNameText,
    BeneficiaryNationalNumberText,
    DoctorNameText,
    DateText,
    FromHourText,
    ToHourText,
    ReasonText,
    NeedDiscountText,
    SaveNewAppointmentText,
    AddNewAppointmentText,
    DiscountReasonText,
    NewPatientText,
  ] = useBaseTranslation(i18ns);

  const [doctorAttendanceSchedules, setDoctorAttendanceSchedules] = useState<{
    [key: string]: { from: string; to: string }[];
  }>({});

  useEffect(() => {
    const beneficiary_id = watch("beneficiary_id");
    setValue(
      "beneficiary_national_number",
      beneficiaries.find((e) => e.id === beneficiary_id)?.national_number ?? ""
    );
  }, [watch("beneficiary_id")]);
  useEffect(() => {
    const doctor_id = watch("doctor_id");
    const doctorAttendanceSchedules =
      doctors.find((e) => e.id === doctor_id)?.attendance_schedules ?? [];
    const temp: any = {};
    doctorAttendanceSchedules.map((e) => {
      e.days.map((ee) => {
        if (temp[ee]) temp[ee].push({ from: e.from, to: e.to });
        else temp[ee] = [];
      });
      setDoctorAttendanceSchedules(temp);
    });
  }, [watch("doctor_id")]);
  useEffect(() => {
    const from = Number(watch("from"));
    setValue(
      "to",
      Object.entries(doctorAttendanceSchedules)?.[
        Number(watch("date")) - 1
      ]?.[1]?.[from - 1]?.to ?? ""
    );
  }, [watch("from")]);

  const [showPopup, setShowPopup] = useState(false);
  const setPatientId = (id: number) => {
    setValue("beneficiary_id", id);
  };

  return (
    <>
      <BCard
        sx={{ m: 1, width: "100%" }}
        animations={{ transitions: "slideInBottom" }}
      >
        <CardContent>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <BTypography variant="h5" fontWeight={"bold"}>
              {AddNewAppointmentText}
            </BTypography>
          </Stack>
        </CardContent>
        <CardContent>
          <Grid2 container spacing={3}>
            <Grid2 size={4}>
              <FormSelect
                sx={{ my: 1 }}
                control={control}
                label={BeneficiaryNameText}
                name="beneficiary_id"
                rules={{ required: true }}
                options={beneficiaries}
              />
            </Grid2>
            <Grid2 size={4}>
              <FormInput
                sx={{ my: 1 }}
                control={control}
                label={BeneficiaryNationalNumberText}
                name="beneficiary_national_number"
                inputProps={{
                  slotProps: {
                    input: {
                      readOnly: true,
                    },
                  },
                }}
              />
            </Grid2>
            <Grid2
              size={4}
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"flex-end"}
            >
              <BButton
                color="primary"
                variant="text"
                onClick={() => setShowPopup(true)}
              >
                {NewPatientText}
              </BButton>
            </Grid2>
            <Grid2 size={12}></Grid2>
            <Grid2 size={3}>
              <FormSelect
                sx={{ my: 1 }}
                control={control}
                label={DoctorNameText}
                name="doctor_id"
                options={doctors}
                rules={{ required: true }}
              />
            </Grid2>
            <Grid2 size={3}>
              <FormSelect
                sx={{ my: 1 }}
                control={control}
                label={DateText}
                name="date"
                rules={{ required: true }}
                options={
                  Object.keys(doctorAttendanceSchedules)?.map((e, i) => ({
                    id: i + 1,
                    name: e,
                  })) ?? []
                }
              />
            </Grid2>
            <Grid2 size={3}>
              <FormSelect
                sx={{ my: 1 }}
                control={control}
                label={FromHourText}
                name="from"
                rules={{ required: true }}
                options={
                  Object.entries(doctorAttendanceSchedules)?.[
                    Number(watch("date")) - 1
                  ]?.[1]?.map((e, i) => ({
                    id: i + 1,
                    name: e.from,
                  })) ?? []
                }
              />
            </Grid2>
            <Grid2 size={3}>
              <FormInput
                sx={{ my: 1 }}
                control={control}
                label={ToHourText}
                name="to"
                inputProps={{
                  slotProps: {
                    input: {
                      readOnly: true,
                    },
                  },
                }}
              />
            </Grid2>
            <Grid2 size={12}></Grid2>
            <Grid2 size={4}>
              <FormInput
                sx={{ my: 1 }}
                control={control}
                label={ReasonText}
                name="reason"
              />
            </Grid2>
            <Grid2
              size={2}
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <FormCheckbox
                sx={{ my: 1 }}
                control={control}
                label={NeedDiscountText}
                name="showWantDiscount"
              />
            </Grid2>
            {Boolean(watch("showWantDiscount")) && (
              <Grid2 size={3}>
                <FormInput
                  sx={{ my: 1 }}
                  control={control}
                  label={DiscountReasonText}
                  name="wantDiscount"
                />
              </Grid2>
            )}
            <Grid2 size={12}></Grid2>
            <Grid2 size={{ xs: "auto" }}>
              <Stack
                flexDirection={{
                  sx: "column",
                  md: "row",
                }}
                justifyContent={{
                  sx: "flex-start",
                  md: "flex-end",
                }}
                alignItems={"stretch"}
              >
                <BButton
                  variant="contained"
                  disabled={true ? !isValid : !isDirty}
                  onClick={submit}
                >
                  {SaveNewAppointmentText}
                </BButton>
              </Stack>
            </Grid2>
          </Grid2>
        </CardContent>
      </BCard>
      <NewPatientPopup
        open={showPopup}
        close={() => setShowPopup(false)}
        setPatientId={setPatientId}
      />
    </>
  );
}
