import React from "react";
import { ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

import { BaseSidebarItem } from "./Base";
import { BaseTooltip } from "src/components/Base";

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

  const handleClick = () => {
    navigate(route.path || "/");
  };

  return (
    <BaseTooltip title={route.title} placement="right">
      <BaseSidebarItem onClick={handleClick} isActive={isActive}>
        <ListItemIcon>{React.createElement(route.icon)}</ListItemIcon>
        {route.isExpanded && <ListItemText primary={route.title} />}
      </BaseSidebarItem>
    </BaseTooltip>
  );
};

export default SidebarItem;
