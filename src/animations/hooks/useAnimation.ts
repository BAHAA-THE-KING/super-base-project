import { motion } from "motion/react";

import animationsStyles from "src/animations";

import { Animations } from "src/types/Animations";

export function useAnimation(animations?: Animations, isButton?: boolean) {
  const requiredAnimations = {
    ...(animations?.gestures
      ? animationsStyles.gestures[animations.gestures]
      : {}),
    ...(animations?.transitions
      ? animationsStyles.transitions[animations.transitions]
      : {}),
  };
  return {
    component: isButton ? motion.button : motion.div,
    variants: requiredAnimations,
    initial: "initial",
    animate: "animate",
    whileInView: "animate",
    whileHover: "whileHover",
    whileTap: "whileTap",
  };
}
