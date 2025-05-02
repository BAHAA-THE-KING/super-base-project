import { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormInput, FormSelect } from "src/components";
import { BButton, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useAddRequestData } from "../hooks";

type Props = { beneficiaryId: number };
type Form = {
  beneficiary: { id: number; name: string };
  reason: string;
  urgency_level: "low" | "medium" | "high";
  requested_amount: number;
};

const i18ns = ["submit"];
export function EmergencyAidForm({ beneficiaryId }: Props) {
  const [SubmitText] = useBaseTranslation(i18ns);

  const { control, setValue, handleSubmit } = useForm<Form>();

  const { beneficiaries, isLoading } = useAddRequestData();

  useEffect(() => {
    if (beneficiaryId && beneficiaries && beneficiaries.length)
      setValue(
        "beneficiary",
        beneficiaries.find((e) => e.id === beneficiaryId) ?? { id: 0, name: "" }
      );
  }, [beneficiaries]);

  return (
    <>
      <Box mb={4}>
        <BTypography>السادة أعضاء الجمعية</BTypography>
        <BTypography>تحية طيبة و بعد</BTypography>
      </Box>
      <Stack flexDirection={"row"}>
        <BTypography marginInlineEnd={1}>أنا مقدم الطلب السيد\ة</BTypography>
        <FormSelect
          control={control}
          label=""
          name="beneficiary"
          options={beneficiaries}
          inputProps={{
            fullWidth: false,
            sx: {
              width: "150px",
            },
          }}
        />
      </Stack>
      <Stack flexDirection={"row"} flexWrap={"wrap"} mt={2}>
        <BTypography marginInlineEnd={1}>
          أوجه لكم هذا الطلب راجياً مساعدتي في تغطية تكاليف
        </BTypography>
        <FormInput
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
        <BTypography mx={1}>
          حيث أنني غير قادر على سداد المبلغ المطلوب و البالغ
        </BTypography>
        <FormInput
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
        <BTypography>ل.س</BTypography>
      </Stack>
      <Stack mt={2}>
        <BTypography>
          وتفضلوا بقبول فائق الاحترام والتقدير، سائلاً المولى عز وجل أن يجزيكم
          خير الجزاء على ما تقدّمونه من دعم وعون للمحتاجين، وأن يبارك في جهودكم
          الخيّرة.
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
