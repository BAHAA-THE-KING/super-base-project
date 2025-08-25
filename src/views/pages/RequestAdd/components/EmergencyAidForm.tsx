import { useEffect } from "react";
import {
  Box,
  BoxProps,
  Skeleton,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { FormInput, FormSelect } from "src/components";
import { BButton, BChip, BTypography } from "src/components/Base";
import { AIFormButton } from "src/views/components";

import { useBaseTranslation } from "src/hooks";
import { useAddEmergencyRequestData } from "src/views/data";

type Props = {
  beneficiaryId: number;
  requestId?: number;
  requestMode?: boolean;
};
type Form = {
  beneficiary_id: number;
  reason: string;
  urgency_level: "low" | "medium" | "high";
  requested_amount: number;
};

const i18ns = [
  "submit",
  "dear_members",
  "greetings",
  "i_am_applicant",
  "this_request_will_help_with",
  "because_i_cannot_afford",
  "thank_you_very_much",
  "in_date",
  "emergency_aid_form",
  "s.p",
  "apply_step",
  "pending_step",
  "receive_step",
  "low",
  "medium",
  "high",
  "urgency_level",
];
export function EmergencyAidForm({
  beneficiaryId,
  requestMode,
  requestId = 0,
}: Props) {
  const [
    SubmitText,
    DearMembersText,
    GreetingsText,
    IAmApplicantText,
    ThisRequestWillHelpWithText,
    BecauseICannotAffordText,
    ThankYouVeryMuchText,
    InDateText,
    EmergencyAidFormText,
    SPText,
    ApplyStepText,
    PendingStepText,
    ReceiveStepText,
    LowText,
    MediumText,
    HighText,
    UrgencyLevelText,
  ] = useBaseTranslation(i18ns);

  const { control, setValue, handleSubmit, reset } = useForm<Form>({
    defaultValues: {
      reason: "",
      beneficiary_id: 0,
      requested_amount: 0,
      urgency_level: "medium",
    },
  });

  const {
    beneficiaries,
    request,
    createEmergencyRequest,
    createEmergencyRequestLoading,
    getBeneficiariesLoading,
    getRequestLoading,
  } = useAddEmergencyRequestData(requestId);

  useEffect(() => {
    if (requestMode) {
      if (request)
        reset({
          beneficiary_id: request.beneficiary.id,
          reason: request.reason,
          requested_amount: request.requested_amount,
          urgency_level: request.urgency_level,
        });
    } else if (beneficiaryId && beneficiaries && beneficiaries.length)
      setValue(
        "beneficiary_id",
        beneficiaries.find((e) => e.id === beneficiaryId)?.id ?? 0
      );
  }, [beneficiaries, request]);

  const steps = [ApplyStepText, PendingStepText, ReceiveStepText];

  return (!requestMode && getBeneficiariesLoading) ||
    (requestMode && getRequestLoading) ? (
    <Skeleton width={"100%"} height={500} variant="rounded" />
  ) : (
    <>
      <Stack mb={5} flexDirection={"row"} justifyContent={"space-between"}>
        <BTypography variant="h5" fontWeight={"bold"}>
          {EmergencyAidFormText}
        </BTypography>
        <Stepper activeStep={0 + Number(Boolean(requestMode))} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <Stack mb={4}>
        <BTypography>{DearMembersText}</BTypography>
        <BTypography>{GreetingsText}</BTypography>
      </Stack>
      <Stack flexDirection={"row"}>
        <BTypography marginInlineEnd={1}>{IAmApplicantText}</BTypography>
        <FormSelect
          rules={{ required: true }}
          control={control}
          label=""
          name="beneficiary_id"
          options={beneficiaries}
          inputProps={{
            fullWidth: false,
            sx: { width: "200px" },
          }}
        />
      </Stack>
      <Stack flexDirection={"row"} flexWrap={"wrap"} mt={2}>
        <BTypography marginInlineEnd={1}>
          {ThisRequestWillHelpWithText}
        </BTypography>
        <FormInput
          rules={{ required: true }}
          control={control}
          label=""
          name="reason"
          inputProps={{
            fullWidth: false,
            sx: {
              minWidth: "300px",
            },
          }}
        />
        <BTypography mx={1}>{BecauseICannotAffordText}</BTypography>
        <FormInput
          rules={{ required: true }}
          control={control}
          label=""
          name="requested_amount"
          inputProps={{
            fullWidth: false,
            sx: {
              width: "150px",
            },
          }}
        />
        <BTypography>{SPText}</BTypography>
      </Stack>
      <Stack mt={2}>
        <BTypography>{ThankYouVeryMuchText}</BTypography>
      </Stack>
      <Stack mt={2}>
        <BTypography>
          {InDateText}: {new Date().toLocaleDateString("fr-Ca")}
        </BTypography>
      </Stack>
      <Stack flexDirection={"row"} flexWrap={"wrap"} mt={10}>
        <FormSelect
          options={[
            { id: "low", name: LowText },
            { id: "medium", name: MediumText },
            { id: "high", name: HighText },
          ]}
          rules={{ required: true }}
          control={control}
          label={UrgencyLevelText}
          name="urgency_level"
          renderOption={(params, option) => (
            <Box {...(params as BoxProps)}>
              <BChip
                label={option.name}
                color={
                  option.id === "low"
                    ? "info"
                    : option.id === "medium"
                    ? "warning"
                    : option.id === "high"
                    ? "error"
                    : "secondary"
                }
                variant="slight"
              />
            </Box>
          )}
          inputProps={{
            fullWidth: false,
            sx: { minWidth: "300px" },
          }}
        />
      </Stack>
      {requestMode || (
        <Stack mt={5} flexDirection={"row"} alignItems={"flex-start"} gap={3}>
          <BButton
            variant="contained"
            onClick={handleSubmit((data) =>
              createEmergencyRequest({
                data: {
                  beneficiary_id: data.beneficiary_id,
                  reason: data.reason,
                  amount: data.requested_amount,
                  // TODO: link when fix
                  // urgency_level: data.urgency_level,
                },
              })
            )}
            loading={createEmergencyRequestLoading}
          >
            {SubmitText}
          </BButton>
          <AIFormButton setValue={setValue} />
        </Stack>
      )}
    </>
  );
}
