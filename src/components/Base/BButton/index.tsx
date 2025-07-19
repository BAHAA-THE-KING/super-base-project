import React from "react";
import { Button, ButtonProps, styled } from "@mui/material";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";
import { varAlpha } from "src/themes/styles";

export type BButtonProps = PropsWithAnimations<ButtonProps> & {
  circular?: boolean;
  icon?: React.ReactNode;
};

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "circular" && prop !== "icon",
})<BButtonProps>(({ theme, circular = false, icon, color, variant, size }) => {
  const containedInheritStyles = {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.grey[200],
    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.grey[200],
    },
  };
  const softStyles = {
    backgroundColor:
      color && color !== "inherit" && theme.palette[color]
        ? varAlpha(theme.palette[color]["mainChannel"], 0.08)
        : "",
    color:
      color && color !== "inherit" && theme.palette[color]
        ? theme.palette[color]?.dark
        : "",
    "&:hover": {
      backgroundColor:
        color && color !== "inherit" && theme.palette[color]
          ? varAlpha(theme.palette[color]["mainChannel"], 0.16)
          : "",
    },
  };
  const largeStyles = {
    minHeight: "48px",
  };

  return theme.unstable_sx({
    borderRadius: circular || icon ? "1000px" : "",
    aspectRatio: icon ? "1" : "",
    minWidth: icon ? 0 : "",
    color: icon && !color ? theme.palette.grey[600] : "",
    "&:hover": {
      bgcolor:
        icon && !color ? varAlpha(theme.palette.grey["600Channel"], 0.08) : "",
    },
    ...(variant === "contained" && color === "inherit"
      ? containedInheritStyles
      : {}),
    ...(variant === "soft" ? softStyles : {}),
    ...(size === "large" ? largeStyles : {}),
  });
});

export const BButton = ({
  animations,
  icon,
  children,
  ...props
}: BButtonProps) => {
  const animationsProps = useAnimation(animations, true);
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
