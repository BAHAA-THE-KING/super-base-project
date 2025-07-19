import { type Variants } from "motion/react";

export const goEndProps: Variants = {
  initial: {
    translateX: 0,
  },
  whileHover: {
    translateX: [0, -10],
  },
};
