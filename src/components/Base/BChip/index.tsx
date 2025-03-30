import { Chip, type ChipProps, styled } from "@mui/material";
import { varAlpha } from "src/themes/styles";

type BChipProps = Omit<ChipProps, "variant"> & {
  variant?: "outlined" | "filled" | "slight";
};

const StyledChip = styled(Chip)<{
  hasSlightBG: boolean;
}>(({ theme, hasSlightBG, color = "primary" }) =>
  theme.unstable_sx({
    bgcolor:
      hasSlightBG && color !== "default"
        ? varAlpha(theme.palette[color]["mainChannel"], 0.2)
        : "",
  })
);

export const BChip = ({ ...props }: BChipProps) => {
  let variant: ChipProps["variant"];
  let hasSlightBG = false;
  if (props.variant !== "slight") variant = props.variant;
  else {
    variant = "outlined";
    hasSlightBG = true;
  }
  return <StyledChip {...props} variant={variant} hasSlightBG={hasSlightBG} />;
};
