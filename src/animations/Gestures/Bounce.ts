import { type Variants } from "framer-motion";

// Bounce effect (for click interactions)
export const bounceProps: Variants = {
  whileTap: {
    scale: [1, 1.2, 0.9, 1],
    transition: { duration: 0.3 },
  },
};
