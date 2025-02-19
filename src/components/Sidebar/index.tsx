import React, { useState } from "react";
import { List } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

import { BaseDrawer, BaseLogo, BaseSidebarItem } from "./Base";
import SidebarList from "./SidebarList";
import { BaseTooltip } from "src/components/Base";

import { usePublicRoutes } from "src/routes/public";

const Sidebar: React.FC = () => {
  const routes = usePublicRoutes();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <BaseDrawer variant="permanent" isExpanded={isExpanded}>
      {/* Toggle Button */}
      <List component="div" disablePadding>
        <BaseTooltip title={isExpanded ? "close" : "open"} placement="right">
          <BaseSidebarItem
            color={"inherit"}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </BaseSidebarItem>
        </BaseTooltip>
      </List>

      {/* Logo - Hide when collapsed */}
      {isExpanded && <BaseLogo>BAHAA THE KING</BaseLogo>}

      {/* Sidebar Items */}
      <SidebarList routes={routes} isExpanded={isExpanded} />
    </BaseDrawer>
  );
};

export { Sidebar };
