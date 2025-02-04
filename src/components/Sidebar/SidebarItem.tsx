import React from "react";
import { ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

import { BaseSidebarItem } from "./Base";

interface SidebarItemProps {
  path: string;
  title: string;
  icon: React.FC;
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
    <>
      <BaseSidebarItem onClick={handleClick} isActive={isActive}>
        <ListItemIcon>{React.createElement(route.icon)}</ListItemIcon>
        <ListItemText primary={route.title} />
      </BaseSidebarItem>
    </>
  );
};

export default SidebarItem;
