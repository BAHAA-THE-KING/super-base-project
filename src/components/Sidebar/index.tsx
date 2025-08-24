import { forwardRef, useEffect, useState } from "react";
import { Stack } from "@mui/material";

import { BaseDrawer, BaseLogo } from "./Base";
import SidebarList from "./SidebarList";

import { useBreakpoints } from "src/hooks";

import {
  useAccountantRoutes,
  useServicesRoutes,
  useClinicRoutes,
} from "src/routes";

import { useDirection, useSidebarOpen } from "src/globals";
import { useLocation } from "react-router";

const Sidebar = forwardRef<any>(({}, ref) => {
  const accountantRoutes = useAccountantRoutes();
  const servicesRoutes = useServicesRoutes();
  const clinicRoutes = useClinicRoutes();

  const pathname = useLocation().pathname;
  const routes = pathname.startsWith("/services")
    ? servicesRoutes
    : pathname.startsWith("/clinic")
    ? clinicRoutes
    : pathname.startsWith("/accountant")
    ? accountantRoutes
    : [];

  const [sidebarOpen, setSidebarOpen] = useSidebarOpen();
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  const handleMouseLeave = () => {
    closeSidebar();
  };
  const handleMouseEnter = () => setSidebarOpen(true);
  const [direction] = useDirection();

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
      ref={ref}
    >
      <Stack>
        {/* Logo - Hide when collapsed */}
        {isExpanded && <BaseLogo>BAHAA THE KING</BaseLogo>}

        {/* Sidebar Items */}
        <SidebarList routes={routes} isExpanded={isExpanded} />
      </Stack>
    </BaseDrawer>
  );
});

export { Sidebar };
