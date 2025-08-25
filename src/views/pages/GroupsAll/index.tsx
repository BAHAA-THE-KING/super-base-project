import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Skeleton, Stack } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

import { BButton } from "src/components/Base";
import { GroupAccordion } from "./components";

import { useBaseTranslation } from "src/hooks";
import { useGroupsData } from "src/views/data";

import { varAlpha } from "src/themes/styles";

const i18ns = ["add_new_group"];
export function Groups() {
  const [AddNewGroupText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const { groups, getGroupsLoading } = useGroupsData();

  const [selectedGroupId, setSelectedGroupId] = useState(0);

  function addGroup() {
    navigate("add");
  }

  return (
    <Box
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
      <BButton
        variant="contained"
        size="large"
        color="secondary"
        sx={{ my: 2 }}
        onClick={addGroup}
        startIcon={<AddIcon />}
      >
        {AddNewGroupText}
      </BButton>
      <Box>
        {getGroupsLoading ? (
          <Stack width={"100%"} alignItems={"stretch"} gap={2} flex={5}>
            {new Array(5).fill(null).map((_, i) => (
              <Skeleton key={i} width={"100%"} height={75} variant="rounded" />
            ))}
          </Stack>
        ) : (
          groups.map((group) => (
            <GroupAccordion
              key={group.id}
              group={group}
              open={selectedGroupId === group.id}
              setSelectedGroupId={setSelectedGroupId}
            />
          ))
        )}
      </Box>
    </Box>
  );
}
