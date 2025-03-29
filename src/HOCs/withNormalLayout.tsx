import React, { ComponentType } from "react";
import { Box } from "@mui/material";

import { Header, Sidebar } from "src/components";
import { useSidebarOpen } from "src/globals";
import { useBreakpoints } from "src/hooks";

export function withNormalLayout<T extends object>(
  Component: ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    const [sidebarOpen] = useSidebarOpen();
    const { isGreater } = useBreakpoints("lg");

    return (
      <Box
        display={"flex"}
        minHeight={"100vh"}
        bgcolor={(theme) => theme.palette.background.default}
      >
        <Sidebar />
        <Box
          // I don't like it :(
          width={(theme) =>
            isGreater
              ? sidebarOpen
                ? `CALC(100% - 280px - ${theme.spacing(1)})`
                : `CALC(100% - 60px - ${theme.spacing(1)})`
              : `CALC(100% - ${theme.spacing(1)})`
          }
          m={1}
        >
          <Header />
          <Component {...props} />
        </Box>
      </Box>
    );
  };
}
