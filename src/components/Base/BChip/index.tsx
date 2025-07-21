import { Chip, type ChipProps, styled } from "@mui/material";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";
import { varAlpha } from "src/themes/styles";

type BChipProps = PropsWithAnimations<Omit<ChipProps, "variant">> & {
  variant?: "outlined" | "filled" | "slight";
};

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "hasSlightBG", // Exclude the hasSlightBG prop
})<{
  hasSlightBG: boolean;
}>(({ theme, hasSlightBG, color = "primary" }) =>
  theme.unstable_sx({
    bgcolor:
      hasSlightBG && color !== "default"
        ? varAlpha(theme.palette[color]["mainChannel"], 0.2)
        : "",
  })
);

export const BChip = ({ animations, ...props }: BChipProps) => {
  let variant: ChipProps["variant"];
  let hasSlightBG = false;
  if (props.variant !== "slight") variant = props.variant;
  else {
    variant = "outlined";
    hasSlightBG = true;
  }
  const animationsProps = useAnimation(animations);

  return (
    <StyledChip
      {...props}
      variant={variant}
      hasSlightBG={hasSlightBG}
      {...animationsProps}
    />
  );
};
