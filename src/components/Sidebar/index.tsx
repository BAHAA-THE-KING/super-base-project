import React, { useEffect, useState } from "react";

import { BaseDrawer, BaseLogo } from "./Base";
import SidebarList from "./SidebarList";

import { usePublicRoutes } from "src/routes/public";
import { useDirection, useSidebarOpen } from "src/globals";
import { useBreakpoints } from "src/hooks";

const Sidebar: React.FC = () => {
  const routes = usePublicRoutes();
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen();
  const closeSidebar = () => {
    setSidebarOpen(false);
    setWillClose(false);
  };
  const handleMouseLeave = () => {
    if (willClose) {
      closeSidebar();
    }
  };
  const handleMouseEnter = () => setWillClose(true);
  const [direction] = useDirection();

  const [willClose, setWillClose] = useState(false);

  const { isGreater } = useBreakpoints("lg");

  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (isGreater) {
      setIsExpanded(sidebarOpen);
    } else {
      setIsExpanded(true);
    }
  }, [isGreater, sidebarOpen]);

  return (
    <BaseDrawer
      open
      variant="permanent"
      isOpen={sidebarOpen}
      isExpanded={isExpanded}
      onClose={closeSidebar}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      direction={direction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo - Hide when collapsed */}
      {isExpanded && <BaseLogo>BAHAA THE KING</BaseLogo>}

      {/* Sidebar Items */}
      <SidebarList routes={routes} isExpanded={isExpanded} />
    </BaseDrawer>
  );
};

export { Sidebar };
