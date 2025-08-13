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

import { useBaseTranslation } from "src/hooks";
import { useAddSpecialMaterialRequestData } from "src/views/data";

type Props = {
  beneficiaryId: number;
  requestMode?: boolean;
  requestId?: number;
};
type Form = {
  beneficiary_id: number;
  reason: string;
  urgency_level: "low" | "medium" | "high";
  requested_item: string;
};

const i18ns = [
  "submit",
  "dear_members",
  "greetings",
  "i_am_applicant",
  "i_need_this_item",
  "my_conditions",
  "thank_you_very_much_for_item",
  "in_date",
  "special_material_form",
  "best_regards",
  "apply_step",
  "pending_step",
  "receive_step",
  "low",
  "medium",
  "high",
  "urgency_level",
];
export function SpecialMaterialForm({
  beneficiaryId,
  requestMode,
  requestId = 0,
}: Props) {
  const [
    SubmitText,
    DearMembersText,
    GreetingsText,
    IAmApplicantText,
    INeedThisItemText,
    MyConditionsText,
    ThankYouVeryMuchForItemText,
    InDateText,
    SpecialMaterialFormText,
    BestRegardsText,
    ApplyStepText,
    PendingStepText,
    ReceiveStepText,
    LowText,
    MediumText,
    HighText,
    UrgencyLevelText,
  ] = useBaseTranslation(i18ns);

  const { control, setValue, handleSubmit, reset } = useForm<Form>();

  const {
    beneficiaries,
    createSpecialMaterialsRequest,
    request,
    createSpecialMaterialsRequestLoading,
    getBeneficiariesLoading,
    getRequestLoading,
  } = useAddSpecialMaterialRequestData(requestId);

  useEffect(() => {
    if (requestMode) {
      if (request)
        reset({
          beneficiary_id: request.beneficiary_id,
          reason: request.reason,
          requested_item: request.requested_item,
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
    <Skeleton variant="rounded" width={"100%"} height={500} />
  ) : (
    <>
      <Stack mb={5} flexDirection={"row"} justifyContent={"space-between"}>
        <BTypography variant="h5" fontWeight={"bold"}>
          {SpecialMaterialFormText}
        </BTypography>
        <Stepper activeStep={0 + Number(requestMode)} alternativeLabel>
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
              width: "500px",
            },
          }}
        />
      </Stack>
      <Stack flexDirection={"row"} flexWrap={"wrap"} mt={2}>
        <BTypography marginInlineEnd={1}>{INeedThisItemText}</BTypography>
        <FormInput
          rules={{ required: true }}
          control={control}
          label=""
          name="requested_item"
          inputProps={{
            fullWidth: false,
            sx: {
              minWidth: "300px",
              maxWidth: "500px",
            },
          }}
        />
        <BTypography mx={1}>{MyConditionsText},</BTypography>
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
        <BTypography>.</BTypography>
      </Stack>
      <Stack mt={2}>
        <BTypography>{ThankYouVeryMuchForItemText}.</BTypography>
      </Stack>
      <Stack mt={1}>
        <BTypography>{BestRegardsText}.</BTypography>
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
        <Stack mt={5} alignItems={"flex-start"}>
          <BButton
            variant="contained"
            onClick={handleSubmit((data) =>
              createSpecialMaterialsRequest({
                beneficiary_id: data.beneficiary_id,
                item: data.requested_item,
                reason: data.reason,
                urgency_level: data.urgency_level,
              })
            )}
            loading={createSpecialMaterialsRequestLoading}
          >
            {SubmitText}
          </BButton>
        </Stack>
      )}
    </>
  );
}
