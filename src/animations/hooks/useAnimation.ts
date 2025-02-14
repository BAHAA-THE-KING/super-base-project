import { motion } from "motion/react";

import animationsStyles from "src/animations";

import { Animations } from "src/types/Animations";

export function useAnimation(animations?: Animations) {
  const requiredAnimations = {
    ...(animations?.gestures
      ? animationsStyles.gestures[animations.gestures]
      : {}),
    ...(animations?.transitions
      ? animationsStyles.transitions[animations.transitions]
      : {}),
  };
  return {
    component: motion.button,
    variants: requiredAnimations,
    initial: "initial",
    animate: "animate",
    whileInView: "animate",
    whileHover: "whileHover",
    whileTap: "whileTap",
  };
}
