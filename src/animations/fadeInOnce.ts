import { motion } from "framer-motion";

export const faceInOnceProps = {
  component: motion.div,
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay: 0 },
};
