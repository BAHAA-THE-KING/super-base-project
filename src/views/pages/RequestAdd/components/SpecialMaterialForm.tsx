import { useEffect } from "react";
import { Stack, Step, StepLabel, Stepper } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormInput, FormSelect } from "src/components";
import { BButton, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useAddRequestData } from "../data";

type Props = { beneficiaryId: number };
type Form = {
  beneficiary: { id: number; name: string };
  reason: string;
  urgency_level: "low" | "medium" | "high";
  requested_item: { id: number; name: string };
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
];
export function SpecialMaterialForm({ beneficiaryId }: Props) {
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
  ] = useBaseTranslation(i18ns);

  const { control, setValue, handleSubmit } = useForm<Form>();

  const { beneficiaries, items, isLoading } = useAddRequestData(true);

  useEffect(() => {
    if (beneficiaryId && beneficiaries && beneficiaries.length)
      setValue(
        "beneficiary",
        beneficiaries.find((e) => e.id === beneficiaryId) ?? { id: 0, name: "" }
      );
  }, [beneficiaries]);

  const steps = [ApplyStepText, PendingStepText, ReceiveStepText];

  return (
    <>
      <Stack mb={5} flexDirection={"row"} justifyContent={"space-between"}>
        <BTypography variant="h5" fontWeight={"bold"}>
          {SpecialMaterialFormText}
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
          name="beneficiary"
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
        <BTypography marginInlineEnd={1}>{INeedThisItemText}</BTypography>
        <FormSelect
          options={items}
          control={control}
          label=""
          name="requested_item"
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
        <BTypography mx={1}>{MyConditionsText},</BTypography>
        <FormInput
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
      <Stack mt={5} alignItems={"flex-start"}>
        <BButton
          variant="contained"
          onClick={handleSubmit((data) => {
            console.log(data);
          })}
        >
          {SubmitText}
        </BButton>
      </Stack>
    </>
  );
}
