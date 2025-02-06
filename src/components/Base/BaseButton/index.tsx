import { Button, ButtonProps, styled } from "@mui/material";

import animationsProps from "src/animations";

import { Animations } from "src/types/Animations";

import { motion, type MotionProps } from "framer-motion";

const StyledButton = styled(Button)(() => {});

type BaseButtonProps = ButtonProps;

export const BaseButton = (props: BaseButtonProps) => {
  return (
    <StyledButton
      {...props}
      component={motion.div}
      variants={animationsProps}
    />
  );
};
