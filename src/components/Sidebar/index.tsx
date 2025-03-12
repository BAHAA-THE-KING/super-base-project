import React, { useState } from "react";

import { BaseDrawer, BaseLogo } from "./Base";
import SidebarList from "./SidebarList";

import { usePublicRoutes } from "src/routes/public";
import { useDirection, useSidebarOpen } from "src/globals";

const Sidebar: React.FC = () => {
  const routes = usePublicRoutes();
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen();
  const closeSidebar = () => {
    if (willClose) {
      setSidebarOpen(false);
      setWillClose(false);
    }
  };
  const handleWillClose = () => setWillClose(true);
  const [direction] = useDirection();

  const [willClose, setWillClose] = useState(false);

  return (
    <BaseDrawer
      open
      variant="permanent"
      isOpen={sidebarOpen}
      onClose={closeSidebar}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      direction={direction}
      onMouseEnter={handleWillClose}
      // onMouseLeave={closeSidebar}
    >
      {/* Logo - Hide when collapsed */}
      <BaseLogo>BAHAA THE KING</BaseLogo>

      {/* Sidebar Items */}
      <SidebarList routes={routes} isExpanded />
    </BaseDrawer>
  );
};

export { Sidebar };
