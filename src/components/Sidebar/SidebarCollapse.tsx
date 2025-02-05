import React, { useState } from "react";
import { ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import SidebarList from "./SidebarList";

import { Route } from "src/types/Route";
import { BaseSidebarCollapse } from "./Base";
import { BaseTooltip } from "src/components/Base";

interface SidebarCollapseProps {
  title: string;
  icon: React.FC;
  children: Route[];
  isExpanded: boolean;
}

const SidebarCollapse: React.FC<SidebarCollapseProps> = (route) => {
  const [open, setOpen] = useState(false);

  const isActive = false;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <BaseTooltip title={route.title} placement="right">
        <BaseSidebarCollapse
          onClick={handleClick}
          isActive={isActive}
          open={open}
        >
          <ListItemIcon>
            {route.icon && React.createElement(route.icon)}
          </ListItemIcon>
          {route.isExpanded && <ListItemText primary={route.title} />}
          {open ? <ExpandLess /> : <ExpandMore />}
        </BaseSidebarCollapse>
      </BaseTooltip>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {open ? (
          <SidebarList routes={route.children} isExpanded={route.isExpanded} />
        ) : null}
      </Collapse>
    </>
  );
};

export default SidebarCollapse;
