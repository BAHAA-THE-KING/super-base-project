import React, { ComponentType } from "react";
import { Box } from "@mui/system";

import { Header, Sidebar } from "src/components";

export function withNormalLayout<T extends object>(
  Component: ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    return (
      <Box
        display={"flex"}
        minHeight={"100vh"}
        bgcolor={(theme) => theme.palette.background.default}
      >
        <Sidebar />
        <Box width={"100%"} m={1}>
          <Header />
          <Component {...props} />
        </Box>
      </Box>
    );
  };
}
