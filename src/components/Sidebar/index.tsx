import React from "react";

import { BaseDrawer, BaseLogo } from "./Base";
import SidebarList from "./SidebarList";

import { usePublicRoutes } from "src/routes/public";
import { useSidebarOpen } from "src/globals";

const Sidebar: React.FC = () => {
  const routes = usePublicRoutes();
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen();

  return (
    <BaseDrawer open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
      {/* Logo - Hide when collapsed */}
      {sidebarOpen && <BaseLogo>BAHAA THE KING</BaseLogo>}

      {/* Sidebar Items */}
      <SidebarList routes={routes} isExpanded={sidebarOpen} />
    </BaseDrawer>
  );
};

export { Sidebar };
