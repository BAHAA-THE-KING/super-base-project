import { useEffect } from "react";
import {
  Stack,
  StepLabel,
  Stepper,
  Step,
  Skeleton,
  Box,
  BoxProps,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { FormInput, FormSelect } from "src/components";
import { BButton, BChip, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useAddPrescriptionRequestData } from "src/views/data";

type Props = { beneficiaryId: number };
type Form = {
  beneficiary_id: number;
  reason: string;
  urgency_level: "low" | "medium" | "high";
  what_exchanged: string;
};

const i18ns = [
  "submit",
  "dear_members",
  "greetings",
  "i_am_applicant",
  "i_need_this_medicines",
  "the_doctor_said",
  "thank_you_very_much_for_medicines",
  "in_date",
  "prescription_exchange_form",
  "apply_step",
  "pending_step",
  "receive_step",
  "low",
  "medium",
  "high",
  "urgency_level",
];
export function PrescriptionExchangeForm({ beneficiaryId }: Props) {
  const [
    SubmitText,
    DearMembersText,
    GreetingsText,
    IAmApplicantText,
    INeedThisMedicinesText,
    TheDoctorSaidText,
    ThankYouVeryMuchForMedicinesText,
    InDateText,
    PrescriptionExchangeFormText,
    ApplyStepText,
    PendingStepText,
    ReceiveStepText,
    LowText,
    MediumText,
    HighText,
    UrgencyLevelText,
  ] = useBaseTranslation(i18ns);

  const { control, setValue, handleSubmit } = useForm<Form>();

  const {
    beneficiaries,
    createPrescriptionRequest,
    getBeneficiariesLoading,
    createPrescriptionRequestLoading,
  } = useAddPrescriptionRequestData();

  useEffect(() => {
    if (beneficiaryId && beneficiaries && beneficiaries.length)
      setValue(
        "beneficiary_id",
        beneficiaries.find((e) => e.id === beneficiaryId)?.id ?? 0
      );
  }, [beneficiaries]);

  const steps = [ApplyStepText, PendingStepText, ReceiveStepText];

  return getBeneficiariesLoading ? (
    <Skeleton width={"100%"} height={500} variant="rounded" />
  ) : (
    <>
      <Stack mb={5} flexDirection={"row"} justifyContent={"space-between"}>
        <BTypography variant="h5" fontWeight={"bold"}>
          {PrescriptionExchangeFormText}
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
          control={control}
          label=""
          name="beneficiary_id"
          options={beneficiaries}
          rules={{ required: true }}
          inputProps={{
            fullWidth: false,
            sx: { width: "200px" },
          }}
        />
      </Stack>
      <Stack flexDirection={"row"} flexWrap={"wrap"} mt={2}>
        <BTypography marginInlineEnd={1}>{INeedThisMedicinesText}</BTypography>
        <FormInput
          rules={{ required: true }}
          control={control}
          label=""
          name="what_exchanged"
          inputProps={{
            fullWidth: false,
            sx: {
              minWidth: "300px",
              maxWidth: "500px",
            },
            slotProps: {
              htmlInput: {
                style: {
                  fieldSizing: "content",
                },
              },
            },
          }}
        />
        <BTypography mx={1}>{TheDoctorSaidText},</BTypography>
        <FormInput
          rules={{ required: true }}
          control={control}
          label=""
          name="reason"
          inputProps={{
            fullWidth: false,
            sx: {
              minWidth: "300px",
              maxWidth: "500px",
            },
            slotProps: {
              htmlInput: {
                style: {
                  fieldSizing: "content",
                },
              },
            },
          }}
        />
      </Stack>
      <Stack mt={2}>
        <BTypography>{ThankYouVeryMuchForMedicinesText}.</BTypography>
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
      <Stack mt={5} alignItems={"flex-start"}>
        <BButton
          variant="contained"
          loading={createPrescriptionRequestLoading}
          onClick={handleSubmit((data) =>
            createPrescriptionRequest({
              beneficiary_id: data.beneficiary_id,
              description: data.what_exchanged,
              reason: data.reason,
              urgency_level: data.urgency_level,
            })
          )}
        >
          {SubmitText}
        </BButton>
      </Stack>
    </>
  );
}
