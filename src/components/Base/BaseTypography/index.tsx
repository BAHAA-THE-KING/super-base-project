import { styled, Typography, type TypographyProps } from "@mui/material";

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const BaseTypography = (props: TypographyProps) => {
  return <StyledTypography {...props}></StyledTypography>;
};
