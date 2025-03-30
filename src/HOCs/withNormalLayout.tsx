import React, { ComponentType, useEffect, useRef } from "react";
import { Stack } from "@mui/material";

import { Header, Sidebar } from "src/components";

export function withNormalLayout<T extends object>(
  Component: ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    const sidebarRef = useRef<HTMLElement | null>();

    return (
      <Stack
        direction={"row"}
        minHeight={"100vh"}
        bgcolor={(theme) => theme.palette.background.default}
      >
        <Sidebar ref={sidebarRef} />
        <Stack
          width={`CALC(100% - ${sidebarRef.current?.clientWidth ?? 0}px)`}
          m={1}
          sx={(theme) => ({
            transition: theme.transitions.create(["transform", "width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.shorter,
            }),
          })}
        >
          <Header />
          <Component {...props} />
        </Stack>
      </Stack>
    );
  };
}
