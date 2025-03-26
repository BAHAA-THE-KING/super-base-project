import React from "react";
import { ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

import { BaseSidebarItem } from "./Base";
import { BaseTooltip } from "src/components/Base";
import { useBreakpoints } from "src/hooks";
import { useSidebarOpen } from "src/globals";

interface SidebarItemProps {
  path: string;
  title: string;
  icon: React.FC;
  isExpanded: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = (route) => {
  const { pathname } = useLocation();

  const isActive =
    pathname.replace(/^\//, "") === route.path.replace(/^\//, "");

  const navigate = useNavigate();

  const [, setSidebarOpen] = useSidebarOpen();

  const handleClick = () => {
    navigate(route.path || "/");
    setSidebarOpen(false);
  };

  const { isLower } = useBreakpoints("sm");

  return (
    <BaseTooltip
      title={route.title}
      placement="end"
      disableHoverListener={isLower}
      disableFocusListener={isLower}
      disableTouchListener={isLower}
      disableInteractive={isLower}
    >
      <BaseSidebarItem
        onClick={handleClick}
        isActive={isActive}
        isExpanded={route.isExpanded}
      >
        <ListItemIcon>{React.createElement(route.icon)}</ListItemIcon>
        <ListItemText primary={route.title} />
      </BaseSidebarItem>
    </BaseTooltip>
  );
};

export default SidebarItem;
