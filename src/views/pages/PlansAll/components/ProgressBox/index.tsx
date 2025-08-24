import { Box, Stack } from "@mui/material";
import { BTypography } from "src/components/Base";

type Props = {
  value: number;
};

export function ProgressBox({ value }: Props) {
  return (
    <Stack
      width={"100%"}
      height={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        width={"CALC(100% - 20px)"}
        height={"CALC(100% - 20px)"}
        position={"relative"}
        flexDirection={"row"}
        justifyContent={"flex-start"}
        alignItems={"stretch"}
      >
        <Box
          bgcolor={(theme) =>
            theme.palette[
              value < 40 ? "error" : value < 80 ? "warning" : "success"
            ].main
          }
          width={`${value}%`}
          display={"inline-block"}
        ></Box>
        <Box
          bgcolor={(theme) =>
            theme.palette[
              value < 40 ? "error" : value < 80 ? "warning" : "success"
            ].light
          }
          width={`${100 - value}%`}
          display={"inline-block"}
        ></Box>
        <BTypography
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {value}%
        </BTypography>
      </Stack>
    </Stack>
  );
}
