import { Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Launch as LaunchIcon } from "@mui/icons-material";

import { varAlpha } from "src/themes/styles";
import { useNavigate } from "react-router";
import { BButton } from "src/components/Base";
import { useBaseTranslation } from "src/hooks";

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
  tabs: { name: string; label: string; external?: boolean; link?: string }[];
  currentTab: number;
  setCurrentTab: (index: number) => void;
  createMode: boolean;
  handleSubmit: () => void;
  createBeneficiaryLoading: boolean;
};

const i18ns = ["save_request"];
export function BeneficiaryTabList({
  tabs,
  currentTab,
  setCurrentTab,
  createMode,
  handleSubmit,
  createBeneficiaryLoading,
}: Props) {
  const [SaveRequestText] = useBaseTranslation(i18ns);
  const navigate = useNavigate();

  return (
    <Stack width={"100%"} direction={"column"} alignItems={"center"}>
      {tabs.map((tab, index) => (
        <ListItem
          key={tab.name}
          selected={currentTab === index}
          onClick={() => {
            if (tab.external) {
              navigate(tab.link!);
            } else {
              setCurrentTab(index);
            }
          }}
        >
          {tab.label}
          {tab.external && (
            <LaunchIcon
              sx={(theme) => ({
                scale: (theme.direction === "ltr" ? 1 : -1) + " 1",
              })}
            />
          )}
        </ListItem>
      ))}
      {createMode && (
        <ListItem selected={false} sx={{ mt: 5 }}>
          <BButton
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            loading={createBeneficiaryLoading}
          >
            {SaveRequestText}
          </BButton>
        </ListItem>
      )}
    </Stack>
  );
}
