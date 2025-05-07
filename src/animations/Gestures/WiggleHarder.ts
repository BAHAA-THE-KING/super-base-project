import { type Variants } from "motion/react";

// Wiggle effect (subtle rotation for attention)
export const wiggleHarderProps: Variants = {
  whileHover: {
    rotate: [0, 20, -20, 12, -12, 0],
    transition: { duration: 0.3 },
  },
};
