import React from "react";

import { Menu as MenuIcon } from "@mui/icons-material";

import { BaseTooltip } from "src/components/Base";
import { BaseIconButton } from "./Base";

import { useSidebarOpen } from "src/globals";

const SidebarToggle: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen();
  return (
    <BaseTooltip title={"menu toggle"}>
      <BaseIconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        <MenuIcon />
      </BaseIconButton>
    </BaseTooltip>
  );
};

export default SidebarToggle;
