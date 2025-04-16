import { Box, Stack } from "@mui/material";

import { BChip, BTypography } from "src/components/Base";
import { BeneficiaryTabs } from "../BeneficiaryTabs";

import { Group } from "src/types/data/SingleBeneficiary";

type Props = {
  name: string;
  group_name: string;
  group_color: Group["color"];
  image_url: string;
  tabs: { name: string; label: string }[];
  currentTab: number;
  setCurrentTab: (tab: number) => void;
};

export function UpPart({
  group_name,
  group_color,
  name,
  image_url,
  tabs,
  setCurrentTab,
  currentTab,
}: Props) {
  return (
    <Stack
      width={"100%"}
      minHeight={"20vh"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"flex-start"}
    >
      <Stack
        width={"100%"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        sx={(theme) => ({
          flexDirection: "row",
          [theme.breakpoints.down("sm")]: { flexDirection: "column" },
        })}
      >
        <Stack
          height={"100%"}
          borderRadius={"50%"}
          overflow={"hidden"}
          sx={(theme) => ({
            width: "30%",
            [theme.breakpoints.up("sm")]: { width: "20%" },
            border: `3px solid ${theme.palette.primary.main}`,
          })}
        >
          <img
            src={image_url}
            alt={name}
            style={{
              objectFit: "contain",
              width: "100%",
              aspectRatio: 1,
            }}
          />
        </Stack>
        <Stack
          width={"100%"}
          height={"100%"}
          mx={3}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        >
          <BTypography variant="h3">{name}</BTypography>
          <BChip color={group_color} label={group_name} />
        </Stack>
      </Stack>
      <Box width={"100%"} mt={3}>
        <BeneficiaryTabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Box>
    </Stack>
  );
}
