import { useRef } from "react";
import { Box, Stack } from "@mui/material";
import { Control, Controller, useWatch } from "react-hook-form";

import { AddPhotoAlternate as AddPhotoAlternateIcon } from "@mui/icons-material";

import { BButton, BChip, BTypography } from "src/components/Base";
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
  createBeneficiaryLoading: boolean;
  aiInfo: string;
};

export function GeneralPart({
  tabs,
  setCurrentTab,
  currentTab,
  requestMode,
  createMode,
  control,
  handleSubmit,
  createBeneficiaryLoading,
  aiInfo,
}: Props) {
  const { image_url, first_name, last_name, group } = useWatch({ control });
  const name = first_name + " " + last_name;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = () => {
    if (createMode && inputRef.current) inputRef.current.click();
  };

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
          {image_url ? (
            <img
              src={
                typeof image_url === "string"
                  ? image_url
                  : URL.createObjectURL(image_url)
              }
              alt={name}
              style={{
                objectFit: "contain",
                width: "100%",
                aspectRatio: 1,
                cursor: "pointer",
              }}
              onClick={handleFileChange}
            />
          ) : (
            <>
              <BButton
                onClick={handleFileChange}
                icon={
                  <AddPhotoAlternateIcon
                    sx={{ fontSize: 120, width: "100%", aspectRatio: 1 }}
                  />
                }
              />
            </>
          )}
          <Controller
            name="image_url"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                multiple={false}
                ref={(e) => {
                  inputRef.current = e;
                  field.ref(e);
                }}
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
              />
            )}
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
          createBeneficiaryLoading={createBeneficiaryLoading}
        />
        <BTypography sx={(theme) => ({ color: theme.palette.error.main })}>
          {aiInfo.split("\n").reduce(
            (p, e) => (
              <>
                {p}
                {e}
                <br />
              </>
            ),
            <></>
          )}
        </BTypography>
      </Box>
    </Stack>
  );
}
