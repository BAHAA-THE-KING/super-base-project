import React, { useState } from "react";
import { List, Tooltip } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

import { BaseDrawer, BaseLogo, BaseSidebarItem } from "./Base";
import SidebarList from "./SidebarList";

import { usePublicRoutes } from "src/routes/public";

const Sidebar: React.FC = () => {
  const routes = usePublicRoutes();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <BaseDrawer variant="permanent" isExpanded={isExpanded}>
      {/* Toggle Button */}
      <List component="div" disablePadding>
        <Tooltip title={isExpanded ? "close" : "open"} placement="right">
          <BaseSidebarItem
            color={"inherit"}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </BaseSidebarItem>
        </Tooltip>
      </List>

      {/* Logo - Hide when collapsed */}
      {isExpanded && <BaseLogo>BAHAA THE KING</BaseLogo>}

      {/* Sidebar Items */}
      <SidebarList routes={routes} isExpanded={isExpanded} />
    </BaseDrawer>
  );
};

export { Sidebar };
