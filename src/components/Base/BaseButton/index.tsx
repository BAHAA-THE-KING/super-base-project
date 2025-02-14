import { Button, ButtonProps, styled } from "@mui/material";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";

type BaseButtonProps = PropsWithAnimations<ButtonProps>;

const StyledButton = styled(Button)();

export const BaseButton = ({ animations, ...props }: BaseButtonProps) => {
  const animationsProps = useAnimation(animations);
  return <StyledButton {...props} {...animationsProps} />;
};
