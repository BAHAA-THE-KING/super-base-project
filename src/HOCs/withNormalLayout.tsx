import { Box } from "@mui/system";
import React, { ComponentType } from "react";
import { Sidebar } from "src/components";

export function withNormalLayout<T extends object>(
  Component: ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    return (
      <Box width={"100%"} minHeight={"100vh"}>
        <Sidebar />
        <Component {...props} />
      </Box>
    );
  };
}
