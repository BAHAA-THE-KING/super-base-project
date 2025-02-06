import { motion } from "framer-motion";

export const fadeInAppearProps = {
  component: motion.div,
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut", delay: 0 },
};
