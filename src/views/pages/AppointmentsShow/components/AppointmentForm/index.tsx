import { useEffect, useState } from "react";
import { CardContent, Grid2, Stack } from "@mui/material";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";

import { BButton, BCard, BTextField, BTypography } from "src/components/Base";
import { FormCheckbox, FormDate, FormInput, FormSelect } from "src/components";
import { NewPatientPopup } from "..";

import { useBaseTranslation } from "src/hooks";

import {
  AppointmentBeneficiary,
  AppointmentCreate,
  AppointmentDoctor,
  Patient,
} from "src/types/data/AppointmentCreate";
import { AppointmentTable } from "src/types/data/AppointmentTable";

function add30m(time: string) {
  let hh: any = Number(time.split(":")[0]);
  let mm: any = Number(time.split(":")[1]);

  mm += 30;

  if (mm >= 60) {
    hh++;
    mm = 0;
  }
  if (hh >= 24) hh = 0;

  if (mm < 10) mm = "0" + mm;
  else mm = mm.toString();
  if (hh < 10) hh = "0" + hh;
  else hh = hh.toString();

  return hh + ":" + mm;
}

type Form = AppointmentCreate &
  AppointmentTable & { showWantDiscount: boolean };

type Props = {
  control: Control<Form>;
  beneficiaries: AppointmentBeneficiary[];
  doctors: AppointmentDoctor[];
  isValid: boolean;
  isDirty: boolean;
  watch: UseFormWatch<Form>;
  setValue: UseFormSetValue<Form>;
  submit: () => void;
  aiInfo: string;
  loading: boolean;
  createPatient: (data: Patient) => Promise<any>;
  createPatientLoading: boolean;
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
  "attendance_start",
  "attendance_end",
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
  aiInfo,
  loading,
  createPatient,
  createPatientLoading,
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
    AttendanceStartText,
    AttendanceEndText,
  ] = useBaseTranslation(i18ns);

  const newBeneficiaries = beneficiaries.map((e, i) => ({
    id: i + 1,
    name: e.name,
    national_number: e.national_number,
    original: {
      id: e.id,
      type: e.type,
    },
  }));

  const [doctorAttendanceSchedules, setDoctorAttendanceSchedules] = useState<
    [number, { from: string; to: string }[]][]
  >([]);

  const fromTo = doctorAttendanceSchedules
    ?.find((e) => e[0] === new Date(watch("date")).getDay() + 1)?.[1]
    ?.map((e) => ({
      from: e.from,
      to: e.to,
    }))[0];

  useEffect(() => {
    const beneficiary_id = watch("beneficiary_id");
    setValue(
      "beneficiary_national_number",
      newBeneficiaries.find((e) => e.id === beneficiary_id)?.national_number ?? ""
    );
    setValue(
      "beneficiary_original_id",
      newBeneficiaries.find((e) => e.id === beneficiary_id)?.original.id ?? 0
    );
    setValue(
      "beneficiary_type",
      newBeneficiaries.find((e) => e.id === beneficiary_id)?.original.type ??
        "beneficiary"
    );
  }, [watch("beneficiary_id")]);
  useEffect(() => {
    const doctor_id = watch("doctor_id");
    const doctorAttendanceSchedules =
      doctors.find((e) => e.id === doctor_id)?.attendance_schedules ?? [];
    let temp: any = [];
    doctorAttendanceSchedules.map((e) => {
      e.days.map((d) => {
        temp.push([d, { from: e.from, to: e.to }]);
      });
    });
    temp = temp.reduce(
      (
        p: [number, { from: string; to: string }[]][],
        e: [number, { from: string; to: string }]
      ) => {
        const oldI = p.findIndex((ee) => ee[0] === e[0]);
        if (oldI !== -1) {
          p[oldI][1].push(e[1]);
        } else {
          p.push([e[0], [e[1]]]);
        }
        return [...p];
      },
      []
    ) as [number, { from: string; to: string }[]][];
    setDoctorAttendanceSchedules(temp);
  }, [watch("doctor_id")]);
  useEffect(() => {
    const from = watch("from");
    if (from) {
      try {
        setValue("to", add30m(from));
      } catch (_) {
        setValue("to", "");
      }
    }
  }, [watch("from")]);

  const [showPopup, setShowPopup] = useState(false);

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
                options={newBeneficiaries}
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
              <FormDate
                sx={{ my: 1 }}
                control={control}
                label={DateText}
                name="date"
                rules={{ required: true }}
              />
            </Grid2>
            <Grid2 size={3}>
              <BTextField
                value={fromTo?.from ?? ""}
                label={AttendanceStartText}
                fullWidth
              />
            </Grid2>
            <Grid2 size={3}>
              <BTextField
                value={fromTo?.to ?? ""}
                label={AttendanceEndText}
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}></Grid2>
            <Grid2 size={3}>
              <FormInput
                sx={{ my: 1 }}
                control={control}
                label={FromHourText}
                name="from"
                rules={{ required: true }}
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
                  loading={loading}
                >
                  {SaveNewAppointmentText}
                </BButton>
              </Stack>
            </Grid2>
            <Grid2 size={12}>
              <BTypography
                sx={(theme) => ({ color: theme.palette.error.main })}
              >
                {aiInfo.split("\n").reduce(
                  (p, e) => (
                    <>
                      {p}
                      {e}
                      <br />
                    </>
                  ),
                  <></>
                )}
              </BTypography>
            </Grid2>
          </Grid2>
        </CardContent>
      </BCard>
      <NewPatientPopup
        open={showPopup}
        close={() => setShowPopup(false)}
        createPatient={createPatient}
        createPatientLoading={createPatientLoading}
      />
    </>
  );
}
