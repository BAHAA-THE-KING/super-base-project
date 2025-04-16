import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";

const TabItem = styled(Tab)(({ theme }) =>
  theme.unstable_sx({
    overflow: "initial",
    px: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    color: theme.palette.text.primary,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
    transition: "0.2s",
    [theme.breakpoints.up("md")]: {
      minWidth: "160px",
    },
    "&:hover": {
      [`&:not(.${tabClasses.selected})`]: {
        backgroundColor: "rgba(0 0 0 / 0.2)",
      },
    },
    [`&.${tabClasses.selected}`]: {
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[800]
          : theme.palette.grey[300],
      color: theme.palette.text.primary,
    },
  })
);

type Props = {
  tabs: { name: string; label: string }[];
  currentTab: number;
  setCurrentTab: (index: number) => void;
};

export function BeneficiaryTabs({ tabs, currentTab, setCurrentTab }: Props) {
  return (
    <Tabs
      value={currentTab}
      onChange={(_, newTab) => setCurrentTab(newTab)}
      sx={{
        [`& .${tabsClasses.indicator}`]: {
          display: "none",
        },
        [`& .${tabsClasses.scroller}`]: {
          overflowX: "auto !important",
        },
      }}
    >
      {tabs.map((tab) => (
        <TabItem key={tab.name} label={tab.label} />
      ))}
    </Tabs>
  );
}
