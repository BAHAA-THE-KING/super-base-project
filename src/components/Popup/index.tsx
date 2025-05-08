import { ReactNode } from "react";
import { Box, Modal, Paper, Stack } from "@mui/material";

import { Close as CloseIcon } from "@mui/icons-material";

import { BButton } from "../Base";

import { varAlpha } from "src/themes/styles";

type Props = {
  open: boolean;
  close: () => void;
  children: ReactNode;
};
export function Popup({ open, close, children }: Props) {
  return (
    <Modal
      open={open}
      onClose={close}
      slotProps={{
        backdrop: {
          sx: (theme) => ({
            bgcolor: varAlpha(theme.palette.grey["900Channel"], 0.5),
          }),
        },
      }}
    >
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "fit-content",
          minWidth: "40%",
          height: "auto",
          borderRadius: "20px",
        }}
      >
        <Stack alignItems={"flex-end"} p={1}>
          <BButton icon={<CloseIcon />} onClick={close} />
        </Stack>
        <Box p={3}>{children}</Box>
      </Paper>
    </Modal>
  );
}
