import { Button, ButtonProps, styled } from "@mui/material";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";

type BButtonProps = PropsWithAnimations<ButtonProps>;

const StyledButton = styled(Button)<BButtonProps>(({}) => ({}));

export const BButton = ({ animations, ...props }: BButtonProps) => {
  const animationsProps = useAnimation(animations);
  return <StyledButton {...props} {...animationsProps} />;
};
