import { Stack } from "@mui/material";

import { GroupAccordion } from "./components";

import { useGroupsData } from "./data";

import { varAlpha } from "src/themes/styles";
import { useState } from "react";

export function Groups() {
  const { groups, isLoading } = useGroupsData();

  const [selectedGroupId, setSelectedGroupId] = useState(0);

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      borderRadius={1}
      p={3}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? varAlpha(theme.palette.secondary.darkerChannel, 0.2)
            : theme.palette.secondary.lighter,
      })}
    >
      {groups.map((group) => (
        <GroupAccordion
          key={group.id}
          group={group}
          open={selectedGroupId === group.id}
          setSelectedGroupId={setSelectedGroupId}
        />
      ))}
    </Stack>
  );
}
