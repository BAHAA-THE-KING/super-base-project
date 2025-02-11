import { type Variants } from "framer-motion";

// Wiggle effect (subtle rotation for attention)
export const wiggleProps: Variants = {
  whileHover: {
    rotate: [0, 5, -5, 3, -3, 0],
    transition: { duration: 0.3 },
  },
};
