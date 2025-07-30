import { Box, Stack } from "@mui/material";
import { Control, useWatch } from "react-hook-form";

import { BChip, BTypography } from "src/components/Base";
import { BeneficiaryTabList } from "../BeneficiaryTabList";

import { SingleBeneficiary } from "src/types/data/SingleBeneficiary";

type Props = {
  tabs: { name: string; label: string; external?: boolean; link?: string }[];
  currentTab: number;
  setCurrentTab: (tab: number) => void;
  requestMode: boolean;
  createMode: boolean;
  control: Control<SingleBeneficiary>;
  handleSubmit: () => void;
};

export function GeneralPart({
  tabs,
  setCurrentTab,
  currentTab,
  requestMode,
  createMode,
  control,
  handleSubmit,
}: Props) {
  const { image_url, first_name, last_name, group } = useWatch({ control });
  const name = first_name + " " + last_name;

  return (
    <Stack width={"20%"} flexDirection={"column"}>
      <Stack
        width={"100%"}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Stack
          height={"100%"}
          borderRadius={"10px"}
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
          {requestMode || createMode ? null : (
            <BChip color={group?.color} label={group?.name} />
          )}
        </Stack>
      </Stack>
      <Box width={"100%"} mt={3}>
        <BeneficiaryTabList
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          createMode={createMode}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Stack>
  );
}
