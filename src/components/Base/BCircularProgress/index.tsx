import {
  Box,
  CircularProgress,
  CircularProgressProps,
  styled,
} from "@mui/material";

import { BTypography } from "..";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";

export type BCircularProgressProps =
  PropsWithAnimations<CircularProgressProps> & {
    label?: string;
  };

const StyledCircularProgress = styled(CircularProgress)<BCircularProgressProps>(
  () => ({})
);

export const BCircularProgress = ({
  animations,
  label,
  ...props
}: BCircularProgressProps) => {
  const animationsProps = useAnimation(animations);
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <StyledCircularProgress
        variant={label ? "determinate" : "indeterminate"}
        {...props}
        {...animationsProps}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BTypography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          {label}
        </BTypography>
      </Box>
    </Box>
  );
};
