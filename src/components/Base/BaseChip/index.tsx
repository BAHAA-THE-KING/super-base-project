import { Chip, type ChipProps, styled } from "@mui/material";

type BaseChipProps = Omit<ChipProps, "variant"> & {
  variant?: "outlined" | "filled" | "slight";
};

const StyledChip = styled(Chip)<{
  hasSlightBG: boolean;
}>(({ theme, hasSlightBG, color = "primary" }) => ({
  backgroundColor:
    hasSlightBG && color !== "default" ? theme.palette[color].background : "",
}));

export const BaseChip = ({ ...props }: BaseChipProps) => {
  let variant: ChipProps["variant"];
  let hasSlightBG = false;
  if (props.variant !== "slight") variant = props.variant;
  else {
    variant = "outlined";
    hasSlightBG = true;
  }
  return <StyledChip {...props} variant={variant} hasSlightBG={hasSlightBG} />;
};
