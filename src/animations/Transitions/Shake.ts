import { type Variants } from "motion/react";

// Shake effect (for error or warning indicators)
export const shakeProps: Variants = {
  animate: {
    x: [-5, 5, -5, 5, -5, 5, 0],
    transition: { duration: 0.4, repeat: Infinity },
  },
};
