import { Card, type CardProps, styled } from "@mui/material";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";

type BaseCardProps = PropsWithAnimations<CardProps> & {
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "error";
};

const StyledCard = styled(Card)<BaseCardProps>(({ theme, color }) => ({
  width: "100%",
  height: "100%",
  margin: 0,
  padding: theme.spacing(1),
  color: color ? theme.palette[color].main : theme.palette.text.primary,
  backgroundColor: color ? theme.palette[color].background : "",
  fontWeight: "600",
  border: "none",
  boxShadow: "none",
  pointerEvents: "initial",
  userSelect: "initial",
  cursor: "initial",
}));

export const BaseCard = ({ animations, ...props }: BaseCardProps) => {
  const animationsProps = useAnimation(animations);
  return <StyledCard {...props} {...animationsProps} />;
};
