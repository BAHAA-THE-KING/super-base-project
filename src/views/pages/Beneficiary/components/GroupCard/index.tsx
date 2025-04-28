import { Card, CardContent, Box } from "@mui/material";
import {
  Check as CheckIcon,
  HorizontalRule as HorizontalRuleIcon,
} from "@mui/icons-material";

import { BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { Group } from "src/types/data/SingleBeneficiary";

type Props = {
  group: Group;
  isActive: boolean;
};

const i18ns = [
  "group_details",
  "name",
  "salary",
  "conditions",
  "active",
  "not_active",
];
export function GroupCard({ group, isActive }: Props) {
  const [
    GroupDetailsText,
    NameText,
    SalaryText,
    ConditionsText,
    ActiveText,
    NotActiveText,
  ] = useBaseTranslation(i18ns);

  return (
    <Card
      sx={(theme) => ({
        minWidth: {
          xs: "auto",
          md: "400px",
        },
        m: 1,
        border: isActive ? `3px solid ${theme.palette.primary.main}` : "",
      })}
    >
      <Box
        px={2}
        py={1}
        textAlign={"center"}
        bgcolor={(theme) => (isActive ? theme.palette.primary.main : "")}
      >
        {
          <BTypography
            fontWeight={"bold"}
            sx={(theme) => ({
              color: isActive
                ? theme.palette.primary.contrastText
                : theme.palette.background.paper,
            })}
          >
            {isActive ? ActiveText : NotActiveText}
          </BTypography>
        }
      </Box>
      <CardContent>
        <BTypography variant="h6" fontWeight={"bold"} mb={3}>
          {GroupDetailsText}
        </BTypography>
        <BTypography my={2}>
          {NameText}: {group.name}
        </BTypography>
        <BTypography my={2}>
          {SalaryText}: {group.salary}
        </BTypography>
      </CardContent>
      <CardContent>
        <BTypography fontWeight={"bold"}>{ConditionsText}</BTypography>
        {group.group_conditions.map((group_condition) => (
          <Box
            key={group_condition.id}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            {group_condition.is_satisfied ? (
              <CheckIcon color="success" sx={{ mx: 1 }} />
            ) : (
              <HorizontalRuleIcon sx={{ mx: 1 }} />
            )}
            <BTypography my={2}>{group_condition.condition.name}</BTypography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
