import { Accordion, AccordionProps, styled } from "@mui/material";

import { useAnimation } from "src/animations/hooks";

import { PropsWithAnimations } from "src/animations/types/PropsWithAnimations";

export type BAccordionProps = PropsWithAnimations<AccordionProps>;

const StyledAccordion = styled(Accordion)<BAccordionProps>(
  // ({ theme, variant, color }) => {}
);

export const BAccordion = ({ animations, ...props }: BAccordionProps) => {
  const animationsProps = useAnimation(animations);
  return <StyledAccordion {...props} {...animationsProps} />;
};
