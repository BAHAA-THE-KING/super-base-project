import { type Variants } from "motion/react";

export const ElevateProps: Variants = {
  initial: {
    y: 0,
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
  },
  whileHover: {
    y: -10,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  whileTap: {
    y: 1,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
};
