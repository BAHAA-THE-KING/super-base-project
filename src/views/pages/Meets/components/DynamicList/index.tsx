import { Grid2 } from "@mui/material";

import { BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { BeneficiaryRequest, EmergencyAssistanceRequest } from "../../data";

type Props = {
  request:
    | ({ type: "BeneficiaryRequest" } & BeneficiaryRequest)
    | ({ type: "EmergencyAssistanceRequest" } & EmergencyAssistanceRequest);
};

const i18ns = [
  "is_married",
  "yes",
  "no",
  "number_of_children",
  "case_description",
];
export function DynamicList({ request }: Props) {
  const [
    IsMarriedText,
    YesText,
    NoText,
    NumberOfChildrenText,
    CaseDescriptionText,
  ] = useBaseTranslation(i18ns);

  return request.type === "BeneficiaryRequest" ? (
    <>
      <Grid2
        height={"100px"}
        borderRadius={"50%"}
        overflow={"hidden"}
        sx={(theme) => ({
          width: "100px",
          border: `3px solid ${theme.palette.primary.main}`,
        })}
      >
        <img
          src={request.image_url || ""}
          alt={request.first_name}
          style={{
            objectFit: "contain",
            width: "100%",
            aspectRatio: 1,
          }}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 2 }}>
        <BTypography variant="h6">
          {request.first_name} {request.last_name}
        </BTypography>
        <BTypography>{request.birth_date}</BTypography>
        <BTypography>{request.address}</BTypography>
        <BTypography>
          {IsMarriedText}: {Boolean(request.partner) ? YesText : NoText}
        </BTypography>
        <BTypography>
          {NumberOfChildrenText}: {request.children?.length}
        </BTypography>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: "auto" }}>
        <BTypography variant="h6">{CaseDescriptionText}:</BTypography>
        <BTypography>{request.case_description}</BTypography>
      </Grid2>
    </>
  ) : null;
}
