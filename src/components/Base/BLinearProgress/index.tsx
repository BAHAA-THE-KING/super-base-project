import {
  Box,
  LinearProgress,
  type LinearProgressProps,
  styled,
} from "@mui/material";

import { BTypography } from "..";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";

export type BLinearProgressProps = PropsWithAnimations<LinearProgressProps> & {
  label?: string;
};

const StyledLinearProgress = styled(LinearProgress)<BLinearProgressProps>(
  ({ theme }) => theme.unstable_sx({})
);

export const BLinearProgress = ({
  animations,
  label,
  ...props
}: BLinearProgressProps) => {
  const animationsProps = useAnimation(animations);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <StyledLinearProgress
          variant={label ? "determinate" : "indeterminate"}
          {...props}
          {...animationsProps}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <BTypography variant="body2" sx={{ color: "text.secondary" }}>
          {label}
        </BTypography>
      </Box>
    </Box>
  );
};
