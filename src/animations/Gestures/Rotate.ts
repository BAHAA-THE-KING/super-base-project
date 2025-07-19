import { type Variants } from "motion/react";

export const rotateProps: Variants = {
  initial: { rotate: 0 },
  whileHover: { rotate: 10 },
  whileTap: { rotate: -10 },
};
