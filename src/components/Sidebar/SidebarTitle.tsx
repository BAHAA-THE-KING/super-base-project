import React from "react";
import { ListItemText } from "@mui/material";

import { BaseSidebarTitle } from "./Base";

interface SidebarTitleProps {
  title: string;
  isExpanded: boolean;
}

const SidebarTitle: React.FC<SidebarTitleProps> = (route) => {
  return (
    route.isExpanded && (
      <BaseSidebarTitle>
        <ListItemText primary={route.title} />
      </BaseSidebarTitle>
    )
  );
};

export default SidebarTitle;
