import { Box, Stack } from "@mui/material";

import { BChip, BTypography } from "src/components/Base";
import { BeneficiaryTabList } from "../BeneficiaryTabList";

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

export function GeneralPart({
  group_name,
  group_color,
  name,
  image_url,
  tabs,
  setCurrentTab,
  currentTab,
}: Props) {
  return (
    <Stack width={"30%"} flexDirection={"column"}>
      <Stack
        width={"100%"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Stack
          height={"100%"}
          borderRadius={"50%"}
          overflow={"hidden"}
          sx={(theme) => ({
            width: "70%",
            [theme.breakpoints.up("sm")]: { width: "40%" },
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
        <Stack mx={3} flexDirection={"row"} justifyContent={"center"}>
          <BTypography variant="h3">{name}</BTypography>
          <BChip color={group_color} label={group_name} />
        </Stack>
      </Stack>
      <Box width={"100%"} mt={3}>
        <BeneficiaryTabList
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </Box>
    </Stack>
  );
}
