import { Button, ButtonProps, styled } from "@mui/material";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";

export type BButtonProps = PropsWithAnimations<ButtonProps> & {
  circular?: boolean;
};

const StyledButton = styled(Button)<BButtonProps>(({ circular = false }) => ({
  borderRadius: circular ? "1000px" : "",
}));

export const BButton = ({ animations, ...props }: BButtonProps) => {
  const animationsProps = useAnimation(animations);
  return <StyledButton {...props} {...animationsProps} />;
};
