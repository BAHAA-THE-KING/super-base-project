import { motion } from "framer-motion";

export const scaleGestureProps = {
  component: motion.div,
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
};
