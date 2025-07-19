import { useEffect } from "react";
import { RestoreOutlined } from "@mui/icons-material";
import {
  Box,
  CardContent,
  ListItemText,
  MenuItem,
  Menu,
  Stack,
} from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { useForm } from "react-hook-form";

import { FormInput } from "src/components";

import {
  BButton,
  BCard,
  BCheckbox,
  BTooltip,
  BTypography,
} from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { AppointmentTable } from "src/types/data/AppointmentTable";
import { AppointmentStatusChip } from "src/views/pages/AppointmentsDate/components";

type Props = {
  appointment: AppointmentTable;
  editAppointment: (params: {
    data: { id: number; status: Pick<AppointmentTable, "status"> };
  }) => void;
  editHealthInfo: (params: {
    data: { id: number; healthInfo: string };
  }) => void;
};

const i18ns = [
  "beneficiary_name",
  "beneficiary_national_number",
  "reason",
  "need_discount",
  "appointment_info",
  "discount_reason",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "at_hour",
  "with_doctor",
  "to",
  "health_info",
  "save",
  "appointment_status",
  "reset_value",
  "update",
];

export function AppointmentDetails({
  appointment,
  editAppointment,
  editHealthInfo,
}: Props) {
  const [
    BeneficiaryNameText,
    BeneficiaryNationalNumberText,
    ReasonText,
    NeedDiscountText,
    AppointmentInfoText,
    DiscountReasonText,
    SundayText,
    MondayText,
    TuesdayText,
    WednesdayText,
    ThursdayText,
    FridayText,
    SaturdayText,
    AtHourText,
    WithDoctorText,
    ToText,
    HealthInfoText,
    SaveText,
    AppointmentStatusText,
    ResetValueText,
    UpdateText,
  ] = useBaseTranslation(i18ns);

  const days = [
    SundayText,
    MondayText,
    TuesdayText,
    WednesdayText,
    ThursdayText,
    FridayText,
    SaturdayText,
  ];

  const { control, reset, handleSubmit } = useForm<{ healthInfo: string }>({
    defaultValues: { healthInfo: "" },
  });

  useEffect(() => {
    reset({ healthInfo: appointment.healthInfo });
  }, [appointment]);

  return (
    <>
      <BCard
        sx={{ m: 1, width: "50%" }}
        animations={{ transitions: "slideInRight" }}
      >
        <CardContent>
          <Stack>
            <BTypography variant="h5" fontWeight={"bold"}>
              {AppointmentInfoText +
                " " +
                days[new Date(appointment.date).getDay()] +
                " " +
                appointment.date +
                " " +
                AtHourText +
                " " +
                appointment.from +
                " " +
                ToText +
                " " +
                appointment.to}
            </BTypography>
            <BTypography variant="h5" fontWeight={"bold"}>
              {WithDoctorText + " " + appointment.doctor_name}
            </BTypography>
          </Stack>
        </CardContent>
        <CardContent>
          <Stack spacing={3} mt={3}>
            <Box
              display={"flex"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <BTypography variant="h6">{BeneficiaryNameText}: </BTypography>
              <BTypography>{appointment.beneficiary_name}</BTypography>
            </Box>
            <Box
              display={"flex"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <BTypography variant="h6">
                {BeneficiaryNationalNumberText}:{" "}
              </BTypography>
              <BTypography>
                {appointment.beneficiary_national_number}
              </BTypography>
            </Box>
            {appointment.reason && (
              <Box
                display={"flex"}
                gap={1}
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                <BTypography variant="h6">{ReasonText}: </BTypography>
                <BTypography>{appointment.reason}</BTypography>
              </Box>
            )}
            <Box
              display={"flex"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <BCheckbox checked={Boolean(appointment.wantDiscount)} />
              <BTypography>{NeedDiscountText}</BTypography>
            </Box>
            {appointment.wantDiscount && (
              <Box
                display={"flex"}
                gap={1}
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                <BTypography variant="h6">{DiscountReasonText}: </BTypography>
                <BTypography>{appointment.wantDiscount}</BTypography>
              </Box>
            )}
            <Box
              display={"flex"}
              gap={1}
              justifyContent={"flex-start"}
              alignItems={"flex-end"}
            >
              <BTypography variant="h6">{AppointmentStatusText}: </BTypography>
              <AppointmentStatusChip status={appointment.status} />
            </Box>
            {appointment.status === "pending" && (
              <Box
                display={"flex"}
                gap={1}
                justifyContent={"flex-start"}
                alignItems={"flex-end"}
              >
                <PopupState variant="popover">
                  {(popupState) => (
                    <>
                      <BButton {...bindTrigger(popupState)}>
                        {UpdateText}
                      </BButton>
                      <Menu {...bindMenu(popupState)}>
                        {(["finished", "canceled", "missed"] as const).map(
                          (status) => (
                            <MenuItem
                              onClick={() => {
                                editAppointment({
                                  data: { id: appointment.id, status },
                                });
                                bindMenu(popupState).onClose();
                              }}
                            >
                              <ListItemText>
                                <AppointmentStatusChip status={status} />
                              </ListItemText>
                            </MenuItem>
                          )
                        )}
                      </Menu>
                    </>
                  )}
                </PopupState>
              </Box>
            )}
          </Stack>
        </CardContent>
      </BCard>
      <BCard
        sx={{ m: 1, width: "50%" }}
        animations={{ transitions: "slideInLeft" }}
      >
        <CardContent>
          <Stack gap={2} justifyContent={"flex-start"}>
            <FormInput
              control={control}
              label={HealthInfoText}
              name="healthInfo"
              multiline
              inputProps={{
                variant: "outlined",
              }}
            />
            <Box display={"flex"} justifyContent={"space-between"}>
              {/* TODO: You've edited the past things, Are you sure ? */}
              <BButton
                variant="contained"
                onClick={handleSubmit((data) => {
                  editHealthInfo({
                    data: {
                      id: appointment.id,
                      healthInfo: data.healthInfo,
                    },
                  });
                })}
              >
                {SaveText}
              </BButton>
              <BTooltip title={ResetValueText}>
                <BButton
                  color="info"
                  onClick={() => reset({ healthInfo: appointment.healthInfo })}
                  icon={<RestoreOutlined />}
                />
              </BTooltip>
            </Box>
          </Stack>
        </CardContent>
      </BCard>
    </>
  );
}
