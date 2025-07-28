import { useEffect, useState } from "react";
import { Stack, Step, StepLabel, Stepper } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormInput, FormSelect } from "src/components";
import { BButton, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useShowEmergencyRequestData } from "../data/useShowEmergencyRequestData";

type Props = {
  beneficiaryId: number;
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
];
export function EmergencyAidForm({ beneficiaryId }: Props) {
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
  ] = useBaseTranslation(i18ns);

  const { control, setValue, handleSubmit } = useForm<Form>({
    defaultValues: {
      reason: "",
      beneficiary_id: 0,
      requested_amount: 0,
      urgency_level: "medium",
    },
  });

  const { beneficiaries, createEmergencyRequests } =
    useShowEmergencyRequestData();

  useEffect(() => {
    if (beneficiaryId && beneficiaries && beneficiaries.length)
      setValue(
        "beneficiary_id",
        beneficiaries.find((e) => e.id === beneficiaryId)?.id ?? 0
      );
  }, [beneficiaries]);

  const steps = [ApplyStepText, PendingStepText, ReceiveStepText];

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Stack mb={5} flexDirection={"row"} justifyContent={"space-between"}>
        <BTypography variant="h5" fontWeight={"bold"}>
          {EmergencyAidFormText}
        </BTypography>
        <Stepper activeStep={0} alternativeLabel>
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
            sx: {
              width: "200px",
            },
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
      <Stack mt={5} alignItems={"flex-start"}>
        <BButton
          variant="contained"
          onClick={handleSubmit((data) => {
            setIsLoading(true);
            createEmergencyRequests({
              data: {
                beneficiary_id: data.beneficiary_id,
                reason: data.reason,
                amount: data.requested_amount,
                // TODO: link when fix
                // urgency_level: data.urgency_level,
              },
            }).finally(() => setIsLoading(false));
          })}
          loading={isLoading}
        >
          {SubmitText}
        </BButton>
      </Stack>
    </>
  );
}
