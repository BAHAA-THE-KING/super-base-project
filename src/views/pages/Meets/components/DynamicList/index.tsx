import { Box, Stack } from "@mui/material";

import { BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import {
  BeneficiaryRequest,
  EmergencyAssistanceRequest,
  SpecialMaterialRequest,
  WithdrawalOrderRequest,
} from "../../data";

type Props = {
  request:
    | ({ type: "BeneficiaryRequest" } & BeneficiaryRequest)
    | ({ type: "EmergencyAssistanceRequest" } & EmergencyAssistanceRequest)
    | ({ type: "SpecialMaterialRequest" } & SpecialMaterialRequest)
    | ({ type: "WithdrawalOrderRequest" } & WithdrawalOrderRequest);
};

const i18ns = [
  "is_married",
  "yes",
  "no",
  "number_of_children",
  "case_description",
  "beneficiary",
  "reason",
  "urgency_level",
  "requested_amount",
  "requested_item",
];
export function DynamicList({ request }: Props) {
  const [
    IsMarriedText,
    YesText,
    NoText,
    NumberOfChildrenText,
    CaseDescriptionText,
    BeneficiaryText,
    ReasonText,
    UrgencyLevelText,
    RequestedAmountText,
    RequestedItemText,
  ] = useBaseTranslation(i18ns);

  if (request.type === "BeneficiaryRequest") {
    return (
      <Stack
        flexDirection={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={3}
      >
        <Box
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
        </Box>
        <Box width={"auto"}>
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
        </Box>
        <Stack
          width={"35%"}
          height={"100%"}
          whiteSpace={"nowrap"}
          marginInlineStart={10}
        >
          <BTypography variant="h6" whiteSpace={"nowrap"}>
            {CaseDescriptionText}:
          </BTypography>
          <BTypography>
            {request.case_description.length > 100
              ? request.case_description.slice(0, 100) + "..."
              : request.case_description}
          </BTypography>
        </Stack>
      </Stack>
    );
  }

  if (request.type === "EmergencyAssistanceRequest") {
    return (
      <Stack
        flexDirection={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={10}
      >
        <Box>
          <BTypography variant="h6">{BeneficiaryText}:</BTypography>
          <BTypography>{request.beneficiary.name}</BTypography>
        </Box>
        <Box>
          <BTypography variant="h6">{ReasonText}:</BTypography>
          <BTypography>{request.reason}</BTypography>
        </Box>
        <Box>
          <BTypography variant="h6">{UrgencyLevelText}:</BTypography>
          <BTypography>{request.urgency_level}</BTypography>
        </Box>
        <Box>
          <BTypography variant="h6">{RequestedAmountText}:</BTypography>
          <BTypography>{request.requested_amount}</BTypography>
        </Box>
      </Stack>
    );
  }

  if (request.type === "SpecialMaterialRequest") {
    return (
      <Stack
        flexDirection={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={10}
      >
        <Box>
          <BTypography variant="h6">{BeneficiaryText}:</BTypography>
          <BTypography>{request.beneficiary.name}</BTypography>
        </Box>
        <Box>
          <BTypography variant="h6">{ReasonText}:</BTypography>
          <BTypography>{request.reason}</BTypography>
        </Box>
        <Box>
          <BTypography variant="h6">{UrgencyLevelText}:</BTypography>
          <BTypography>{request.urgency_level}</BTypography>
        </Box>
        <Box>
          <BTypography variant="h6">{RequestedItemText}:</BTypography>
          <BTypography>{request.requested_item}</BTypography>
        </Box>
      </Stack>
    );
  }

  if (request.type === "WithdrawalOrderRequest") {
    return (
      <Stack
        flexDirection={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={10}
      >
        <Box>
          <BTypography variant="h6">{BeneficiaryText}:</BTypography>
          <BTypography>{request.beneficiary.name}</BTypography>
        </Box>
        <Box>
          <BTypography variant="h6">{ReasonText}:</BTypography>
          <BTypography>{request.reason}</BTypography>
        </Box>
        <Box>
          <BTypography variant="h6">{UrgencyLevelText}:</BTypography>
          <BTypography>{request.urgency_level}</BTypography>
        </Box>
        <Box>
          <BTypography variant="h6">{RequestedAmountText}:</BTypography>
          <BTypography>{request.requested_amount}</BTypography>
        </Box>
      </Stack>
    );
  }

  return null;
}
