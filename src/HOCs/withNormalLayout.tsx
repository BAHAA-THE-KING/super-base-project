import React, { ComponentType, useEffect, useRef, useState } from "react";
import { Stack } from "@mui/material";

import { Header, Sidebar } from "src/components";

export function withNormalLayout<T extends object>(
  Component: ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    const [sidebarWidth, setWidth] = useState(0);

    const sidebarRef = useRef<HTMLElement | null>();

    useEffect(() => {
      if (!sidebarRef.current) return;

      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const newWidth = entry.contentRect.width;
          setWidth(newWidth);
        }
      });

      resizeObserver.observe(sidebarRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    return (
      <Stack
        direction={"row"}
        minHeight={"100vh"}
        bgcolor={(theme) => theme.palette.background.default}
      >
        <Sidebar ref={sidebarRef} />
        <Stack
          width={`CALC(100% - ${sidebarWidth}px)`}
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
