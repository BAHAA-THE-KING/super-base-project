import { styled, Tooltip, type TooltipProps } from "@mui/material";

import { useDirection } from "src/globals";

const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  "& .MuiTooltip-arrow": {
    // left: "auto !important",
    // right: "50% !important",
    // transform: "translateX(50%) !important",
  },
}));

type BaseTooltipProps = Omit<TooltipProps, "placement" | "arrow"> & {
  placement?: TooltipProps["placement"] | "end" | "start";
};

export const BaseTooltip = (props: BaseTooltipProps) => {
  const [direction] = useDirection();
  let placement: TooltipProps["placement"] = "bottom";

  if (props?.placement === "start") {
    if (direction === "ltr") placement = "left";
    else placement = "right";
  } else if (props?.placement === "end") {
    if (direction === "ltr") placement = "right";
    else placement = "left";
  } else if (props.placement) {
    placement = props.placement as TooltipProps["placement"];
  }

  return <StyledTooltip {...props} placement={placement} arrow open />;
};
