import React from "react";
import { List } from "@mui/material";

import SidebarItem from "./SidebarItem";
import SidebarDivider from "./SidebarDivider";
import SidebarCollapse from "./SidebarCollapse";

import { Route } from "src/types/Route";

type Props = {
  routes: Route[];
  isExpanded: boolean;
};

const SidebarList: React.FC<Props> = ({ routes, isExpanded }) => {
  return (
    <List component="div" disablePadding>
      {routes.map((route) =>
        route.isDivider ? (
          <SidebarDivider key={route.key} />
        ) : route.children ? (
          <SidebarCollapse
            key={route.key}
            title={route.title!}
            icon={route.icon!}
            children={route.children}
            isExpanded={isExpanded}
          />
        ) : (
          <SidebarItem
            key={route.key}
            path={route.path!}
            title={route.title!}
            icon={route.icon!}
            isExpanded={isExpanded}
          />
        )
      )}
    </List>
  );
};

export default SidebarList;
