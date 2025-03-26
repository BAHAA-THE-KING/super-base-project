import { Card, type CardProps, styled } from "@mui/material";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";
import { varAlpha } from "src/themes/styles";

type BCardProps = PropsWithAnimations<CardProps> & {
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "error";
};

const StyledCard = styled(Card)<BCardProps>(({ theme, color }) => ({
  width: "100%",
  height: "100%",
  margin: 0,
  padding: theme.spacing(1),
  color: color ? theme.palette[color].main : "",
  backgroundColor: color
    ? theme.palette[color]?.background ??
      varAlpha(theme.vars.palette[color]["mainChannel"], 0.2)
    : "",
  fontWeight: "600",
  border: "none",
  boxShadow: "none",
  pointerEvents: "initial",
  userSelect: "initial",
  cursor: "initial",
}));

export const BCard = ({ animations, ...props }: BCardProps) => {
  const animationsProps = useAnimation(animations);
  return <StyledCard {...props} {...animationsProps} />;
};
