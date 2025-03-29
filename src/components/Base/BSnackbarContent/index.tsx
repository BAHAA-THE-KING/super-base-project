import {
  Box,
  SnackbarContent,
  SnackbarContentProps,
  Stack,
  styled,
} from "@mui/material";

import {
  Close as CloseIcon,
  CheckCircleSharp as CheckCircleSharpIcon,
  WarningSharp as WarningSharpIcon,
  InfoSharp as InfoSharpIcon,
  NewReleasesSharp as NewReleasesSharpIcon,
} from "@mui/icons-material";

import { varAlpha } from "src/themes/styles";

import { BButton } from "../BButton";

export type BSnackbarContentProps = Omit<SnackbarContentProps, "color"> & {
  close?: () => void;
  color?: "info" | "success" | "warning" | "error";
  message?: string;
};

const StyledSnackbarContent = styled(SnackbarContent)(({ theme }) =>
  theme.unstable_sx({
    py: 0,
    px: 1,
    bgcolor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
  })
);

export const BSnackbarContent = ({
  color,
  message,
  close,
  ...props
}: BSnackbarContentProps) => {
  return (
    <StyledSnackbarContent
      {...props}
      message={
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          {color ? (
            <Box
              sx={(theme) => ({
                width: "48px",
                height: "48px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: varAlpha(theme.palette[color]?.["mainChannel"], 0.08),
                marginInlineEnd: 1,
                borderRadius: "12px",
              })}
            >
              {color === "info" ? (
                <InfoSharpIcon color={color} />
              ) : color === "success" ? (
                <CheckCircleSharpIcon color={color} />
              ) : color === "warning" ? (
                <WarningSharpIcon color={color} />
              ) : color === "error" ? (
                <NewReleasesSharpIcon color={color} />
              ) : (
                ""
              )}
            </Box>
          ) : (
            ""
          )}
          {message}
        </Stack>
      }
      action={<BButton icon={<CloseIcon />} onClick={close} />}
    />
  );
};
