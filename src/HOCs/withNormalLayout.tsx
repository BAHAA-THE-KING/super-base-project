import { Box } from "@mui/system";
import React, { ComponentType } from "react";
import { Sidebar } from "src/components";

export function withNormalLayout<T extends object>(
  Component: ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    return (
      <Box display={"flex"} minHeight={"100vh"}>
        <Sidebar />
        <Box width={"100%"}>
          <Component {...props} />
        </Box>
      </Box>
    );
  };
}
