import { Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import { varAlpha } from "src/themes/styles";

const ListItem = styled(Button)<{ selected: boolean }>(({ theme, selected }) =>
  theme.unstable_sx({
    width: "50%",
    p: 1,
    my: 0.5,
    borderRadius: 20,
    color: theme.palette.text.primary,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
    transition: "0.2s",
    "&:hover, &:focus": {
      ...(selected
        ? { backgroundColor: varAlpha(theme.palette.grey["500Channel"], 0.2) }
        : {}),
    },
    ...(selected
      ? {
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[800]
              : theme.palette.grey[300],
          color: theme.palette.text.primary,
        }
      : {}),
  })
);

type Props = {
  tabs: { name: string; label: string }[];
  currentTab: number;
  setCurrentTab: (index: number) => void;
};

export function BeneficiaryTabList({ tabs, currentTab, setCurrentTab }: Props) {
  return (
    <Stack width={"100%"} direction={"column"} alignItems={"center"}>
      {tabs.map((tab, index) => (
        <ListItem
          key={tab.name}
          selected={currentTab === index}
          onClick={() => setCurrentTab(index)}
        >
          {tab.label}
        </ListItem>
      ))}
    </Stack>
  );
}
