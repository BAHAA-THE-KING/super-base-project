import { styled, Tooltip, type TooltipProps } from "@mui/material";

import { useDirection } from "src/globals";

const StyledTooltip = styled(Tooltip)(() => ({}));

type BTooltipProps = Omit<TooltipProps, "placement" | "arrow"> & {
  placement?: TooltipProps["placement"] | "end" | "start";
};

export const BTooltip = (props: BTooltipProps) => {
  const [direction] = useDirection();
  let placement: TooltipProps["placement"];

  if (props?.placement === "start") {
    if (direction === "ltr") placement = "left";
    else placement = "right";
  } else if (props?.placement === "end") {
    if (direction === "ltr") placement = "right";
    else placement = "left";
  } else {
    placement = props.placement as TooltipProps["placement"];
  }

  return <StyledTooltip {...props} placement={placement} arrow />;
};
