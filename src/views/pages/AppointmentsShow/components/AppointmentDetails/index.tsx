import { useEffect } from "react";
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
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
} from "@mui/lab";

import { RestoreOutlined } from "@mui/icons-material";

import { FormInput } from "src/components";
import {
  BButton,
  BCard,
  BCheckbox,
  BTooltip,
  BTypography,
} from "src/components/Base";
import { AppointmentStatusChip } from "src/views/pages/AppointmentsDate/components";

import { useBaseTranslation } from "src/hooks";

import { AppointmentTable } from "src/types/data/AppointmentTable";
import { AppointmentCreate } from "src/types/data/AppointmentCreate";

type Props = {
  appointment: AppointmentTable & AppointmentCreate;
  editAppointmentStatus: (
    status: "pending" | "missed" | "finished" | "canceled",
    id: number
  ) => void;
  editHealthInfo: (
    healthInfo: string,
    id: number,
    type: "beneficiary" | "patient"
  ) => void;
  addAppointmentResult: (result: string, id: number) => void;
  editHealthInfoLoading: boolean;
  editAppointmentLoading: boolean;
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
  "appointment_result",
];

export function AppointmentDetails({
  appointment,
  editAppointmentStatus,
  editHealthInfo,
  addAppointmentResult,
  editHealthInfoLoading,
  editAppointmentLoading,
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
    AppointmentResultText,
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

  const {
    control: controlHealthInfo,
    reset: resetHealthInfo,
    handleSubmit: handleSubmitHealthInfo,
  } = useForm<{ healthInfo: string }>({
    defaultValues: { healthInfo: "" },
  });

  const {
    control: controlAppointmentResult,
    reset: resetAppointmentResult,
    handleSubmit: handleSubmitAppointmentResult,
  } = useForm<{ appointmentResult: string }>({
    defaultValues: { appointmentResult: "" },
  });

  useEffect(() => {
    resetHealthInfo({ healthInfo: appointment.healthInfo });
  }, [appointment]);
  useEffect(() => {
    resetAppointmentResult({ appointmentResult: appointment.result });
  }, [appointment]);

  return (
    <Stack
      width={"100%"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
    >
      <Stack
        width={"100%"}
        height={{ xs: "auto", md: "50%" }}
        maxHeight={{ xs: "auto", md: 550 }}
        flexDirection={{
          sx: "column",
          md: "row",
        }}
        justifyContent={"space-between"}
      >
        <BCard
          sx={{
            m: 1,
            width: {
              xs: "100%",
              md: "50%",
            },
          }}
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
                <BTypography variant="h6">
                  {AppointmentStatusText}:{" "}
                </BTypography>
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
                        <BButton
                          {...bindTrigger(popupState)}
                          loading={editAppointmentLoading}
                        >
                          {UpdateText}
                        </BButton>
                        <Menu {...bindMenu(popupState)}>
                          {(["finished", "canceled", "missed"] as const).map(
                            (status) => (
                              <MenuItem
                                onClick={() => {
                                  editAppointmentStatus(status, appointment.id);
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
          sx={{
            m: 1,
            width: {
              xs: "100%",
              md: "50%",
            },
            overflowY: "auto",
          }}
          animations={{ transitions: "slideInLeft" }}
        >
          <CardContent>
            <Stack gap={2} justifyContent={"flex-start"}>
              <FormInput
                control={controlHealthInfo}
                label={HealthInfoText}
                name="healthInfo"
                multiline
                inputProps={{
                  variant: "outlined",
                }}
              />
              <Box display={"flex"} justifyContent={"space-between"}>
                <BButton
                  variant="contained"
                  onClick={handleSubmitHealthInfo((data) => {
                    editHealthInfo(
                      data.healthInfo,
                      appointment.beneficiary_id,
                      appointment.beneficiary_type
                    );
                  })}
                  loading={editHealthInfoLoading}
                >
                  {SaveText}
                </BButton>
                <BTooltip title={ResetValueText}>
                  <BButton
                    color="info"
                    onClick={() =>
                      resetHealthInfo({ healthInfo: appointment.healthInfo })
                    }
                    icon={<RestoreOutlined />}
                  />
                </BTooltip>
              </Box>
            </Stack>
          </CardContent>
        </BCard>
      </Stack>
      <BCard
        sx={{ m: 1, width: { xs: "100%", md: "auto" } }}
        animations={{ transitions: "slideInBottom" }}
      >
        <CardContent>
          <Stack gap={2} justifyContent={"flex-start"}>
            {appointment.status === "pending" ? (
              <>
                <FormInput
                  control={controlAppointmentResult}
                  label={AppointmentResultText}
                  name="appointmentResult"
                  multiline
                  inputProps={{
                    variant: "outlined",
                  }}
                />
                <Box>
                  <BButton
                    variant="contained"
                    onClick={handleSubmitAppointmentResult((data) => {
                      addAppointmentResult(
                        data.appointmentResult,
                        appointment.id
                      );
                    })}
                    loading={editAppointmentLoading}
                  >
                    {SaveText}
                  </BButton>
                </Box>
              </>
            ) : null}
            <Box
              width={"10%"}
              overflow={"visible"}
              sx={{ wordBreak: "keep-all", whiteSpace: "nowrap" }}
            >
              <Timeline position="right">
                {appointment.history?.map((app, i) => (
                  <TimelineItem key={app.id} sx={{ width: "100%" }}>
                    <TimelineOppositeContent>
                      <BTypography fontWeight={"bold"}>{app.date}</BTypography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        color={
                          app.status === "pending"
                            ? "warning"
                            : app.status === "finished"
                            ? "success"
                            : app.status === "missed"
                            ? "error"
                            : "secondary"
                        }
                      />
                      {(appointment.history?.length ?? 0) - 1 === i || (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <BTypography fontWeight={"bold"}>
                        {app.doctor_name}
                      </BTypography>
                      <BTypography fontWeight={"bold"}>
                        {app.result}
                      </BTypography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
          </Stack>
        </CardContent>
      </BCard>
    </Stack>
  );
}
