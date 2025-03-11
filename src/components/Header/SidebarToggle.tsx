import React from "react";

import {
  MenuOpenOutlined as MenuOpenOutlinedIcon,
  MenuOutlined as MenuOutlinedIcon,
} from "@mui/icons-material";

import { BaseTooltip } from "src/components/Base";
import { BaseIconButton } from "./Base";

import { useDirection, useSidebarOpen } from "src/globals";

const SidebarToggle: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen();
  const [direction] = useDirection();
  return (
    <BaseTooltip title={"menu toggle"}>
      <BaseIconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? (
          direction === "ltr" ? (
            <MenuOpenOutlinedIcon sx={{ scale: "-1 1" }} />
          ) : (
            <MenuOpenOutlinedIcon />
          )
        ) : (
          <MenuOutlinedIcon />
        )}
      </BaseIconButton>
    </BaseTooltip>
  );
};

export default SidebarToggle;
