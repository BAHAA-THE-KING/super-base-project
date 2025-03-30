import React from "react";
import { Button, ButtonProps, styled } from "@mui/material";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";
import { varAlpha } from "src/themes/styles";

export type BButtonProps = PropsWithAnimations<ButtonProps> & {
  circular?: boolean;
  icon?: React.ReactNode;
};

const StyledButton = styled(Button)<BButtonProps>(
  ({ theme, circular = false, icon, color }) =>
    theme.unstable_sx({
      borderRadius: circular || icon ? "1000px" : "",
      aspectRatio: icon ? "1" : "",
      minWidth: icon ? 0 : "",
      color: icon && !color ? theme.palette.grey[600] : "",
      "&:hover": {
        bgcolor:
          icon && !color
            ? varAlpha(theme.palette.grey["600Channel"], 0.08)
            : "",
      },
    })
);

export const BButton = ({
  animations,
  icon,
  children,
  ...props
}: BButtonProps) => {
  const animationsProps = useAnimation(animations);
  return (
    <StyledButton
      centerRipple={Boolean(icon)}
      {...props}
      {...animationsProps}
      icon={icon}
      children={icon ?? children}
    />
  );
};
