import React from "react";

import { BaseDrawer, BaseLogo } from "./Base";

import SidebarList from "./SidebarList";

import { usePublicRoutes } from "src/routes/public";

const Sidebar: React.FC = () => {
  const routes = usePublicRoutes();

  return (
    <BaseDrawer variant="permanent">
      <BaseLogo>BAHAA THE KING</BaseLogo>
      <SidebarList routes={routes} />
    </BaseDrawer>
  );
};

export { Sidebar };
