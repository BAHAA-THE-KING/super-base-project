import React from "react";
import { Card, CardContent } from "@mui/material";

import { BCheckbox, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

import { Group } from "src/types/data/SingleBeneficiary";
import { Box } from "@mui/material";

type Props = {
  group: Group;
  isActive: boolean;
};

const i18ns = [
  "group_details",
  "name",
  "salary",
  "conditions",
  "the_beneficiary_has",
  "active",
];
export function GroupCard({ group, isActive }: Props) {
  const [
    GroupDetailsText,
    NameText,
    SalaryText,
    ConditionsText,
    TheBeneficiaryHasText,
    ActiveText,
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
        {isActive ? (
          <BTypography
            fontWeight={"bold"}
            sx={(theme) => ({ color: theme.palette.primary.contrastText })}
          >
            {ActiveText}
          </BTypography>
        ) : null}
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
        <BTypography fontWeight={"bold"} my={2}>
          {ConditionsText}
        </BTypography>
        {group.group_conditions.map((group_condition) => (
          <React.Fragment key={group_condition.id}>
            <BTypography my={2}>{group_condition.condition.name}</BTypography>
            <BTypography my={2}>
              <BCheckbox checked={group_condition.is_satisfied} readOnly />{" "}
              {TheBeneficiaryHasText} {group_condition.params}
            </BTypography>
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
