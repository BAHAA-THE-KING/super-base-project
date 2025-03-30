import { styled, Typography, type TypographyProps } from "@mui/material";

const StyledTypography = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    color: theme.palette.text.primary,
  })
);

export const BTypography = (props: TypographyProps) => {
  return <StyledTypography {...props}></StyledTypography>;
};
