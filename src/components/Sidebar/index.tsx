import React from "react";

import { BaseDrawer, BaseLogo } from "./Base";

import SidebarList from "./SidebarList";

import { useRoutes } from "src/routes/routes";

const Sidebar: React.FC = () => {
  const routes = useRoutes();

  return (
    <BaseDrawer variant="permanent">
      <BaseLogo>Modernize</BaseLogo>
      <SidebarList routes={routes} />
    </BaseDrawer>
  );
};

export { Sidebar };
