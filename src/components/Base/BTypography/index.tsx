import { styled, Typography, type TypographyProps } from "@mui/material";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";

type BTypographyProps = PropsWithAnimations<TypographyProps>;

const StyledTypography = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    color: theme.palette.text.primary,
  })
);

export const BTypography = ({ animations, ...props }: BTypographyProps) => {
  const animationsProps = useAnimation(animations);
  return <StyledTypography {...props} {...animationsProps}></StyledTypography>;
};
