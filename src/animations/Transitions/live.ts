import { type Variants } from "motion/react";

// Shake effect (for error or warning indicators)
export const liveProps: Variants = {
  animate: {
    rotateZ: [0, -0.5, 0.5, 0],
    transition: { duration: 5, repeat: Infinity },
  },
};
