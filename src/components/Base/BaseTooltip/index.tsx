import { styled, Tooltip, type TooltipProps } from "@mui/material";

const StyledTooltip = styled(Tooltip)(() => ({}));

export const BaseTooltip = (props: TooltipProps) => {
  return <StyledTooltip {...props} arrow></StyledTooltip>;
};
