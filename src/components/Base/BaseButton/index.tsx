import { Button, ButtonProps, styled } from "@mui/material";
import { motion } from "framer-motion";

import animationsProps from "src/animations";

import { Animations } from "src/types/Animations";

type BaseButtonProps = ButtonProps & {
  animations?: Animations;
};

const StyledButton = styled(Button)();

export const BaseButton = ({ animations, ...props }: BaseButtonProps) => {
  const requiredAnimations = {
    ...(animations?.gestures
      ? animationsProps.gestures[animations.gestures]
      : {}),
    ...(animations?.transitions
      ? animationsProps.transitions[animations.transitions]
      : {}),
  };
  const anim = {
    component: motion.button,
    variants: requiredAnimations,
    initial: "initial",
    animate: "animate",
    whileInView: "animate",
    whileHover: "whileHover",
    whileTap: "whileTap",
    viewport: { once: true, amount: 0.2 },
  };
  return <StyledButton {...props} {...anim} />;
};
