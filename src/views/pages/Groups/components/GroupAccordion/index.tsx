import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";

import {
  ExpandMore as ExpandMoreIcon,
  HorizontalRule as HorizontalRuleIcon,
  Settings,
} from "@mui/icons-material";

import { useBaseTranslation } from "src/hooks";
import { BButton, BTypography } from "src/components/Base";

type Props = {
  group: {
    id: number;
    name: string;
    salary: string;
    conditions: { id: number; name: string }[];
    number_of_beneficiaries: number;
    percent_of_beneficiaries: number;
  };
  open: boolean;
  setSelectedGroupId: (groupId: number) => void;
};

const i18ns = [
  "this_group_receives_salary",
  "conditions",
  "s.p",
  "follows_it",
  "beneficiaries",
  "about",
];
export function GroupAccordion({ group, open, setSelectedGroupId }: Props) {
  const [
    ThisGroupReceivesSalaryText,
    ConditionsText,
    SP,
    FollowsItText,
    BeneficiariesText,
    AboutText,
  ] = useBaseTranslation(i18ns);

  const handleEditButton = (e: any) => {
    e.stopPropagation();
  };

  return (
    <Accordion
      key={group.id}
      sx={{ p: 1 }}
      slotProps={{ transition: { unmountOnExit: true } }}
      expanded={open}
      onChange={(_, expanded: boolean) => {
        setSelectedGroupId(expanded ? group.id : 0);
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <BButton
          icon={<Settings />}
          animations={{ gestures: "rotate90" }}
          color={"secondary"}
          sx={{ marginInlineEnd: 2, py: 1 }}
          onClick={handleEditButton}
        />
        <BTypography
          fontWeight={"bold"}
          variant="h6"
          sx={{ width: "7%", py: 1 }}
        >
          {group.name}
        </BTypography>
        <BTypography
          sx={(theme) => ({ color: theme.palette.grey[500], py: 1 })}
        >
          {FollowsItText} {group.number_of_beneficiaries} {BeneficiariesText},{" "}
          {AboutText} ({group.percent_of_beneficiaries}%)
        </BTypography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          borderTop: "1px solid",
          borderTopColor: "divider",
        }}
      >
        <BTypography my={2}>
          {ThisGroupReceivesSalaryText}: {group.salary} {SP}
        </BTypography>
        <BTypography fontWeight={"semibold"}>{ConditionsText}</BTypography>
        {group.conditions.map((condition) => (
          <Box
            key={condition.id}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <HorizontalRuleIcon sx={{ mx: 1 }} />
            <BTypography my={2}>{condition.name}</BTypography>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
