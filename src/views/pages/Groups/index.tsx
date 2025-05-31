import { useState } from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";

import { BButton } from "src/components/Base";
import { GroupAccordion } from "./components";

import { useGroupsData } from "./data";

import { varAlpha } from "src/themes/styles";
import { useBaseTranslation } from "src/hooks";

const i18ns = ["add_new_group"];
export function Groups() {
  const [AddNewGroupText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  const { groups, isLoading } = useGroupsData();

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
      >
        {AddNewGroupText}
      </BButton>
      <Box>
        {groups.map((group) => (
          <GroupAccordion
            key={group.id}
            group={group}
            open={selectedGroupId === group.id}
            setSelectedGroupId={setSelectedGroupId}
          />
        ))}
      </Box>
    </Box>
  );
}
