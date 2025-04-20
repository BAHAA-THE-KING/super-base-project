import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";

import { varAlpha } from "src/themes/styles";

const TabItem = styled(Tab)(({ theme }) =>
  theme.unstable_sx({
    overflow: "initial",
    px: 1,
    mx: 0.5,
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
    "&:first-child": {
      marginInlineStart: 0,
    },
    //"&:last-child": {
    //  marginInlineEnd: 0,
    //},
    "&:hover, &:focus": {
      [`&:not(.${tabClasses.selected}), &:not(.${tabClasses.selected}):before, &:not(.${tabClasses.selected}):after`]:
        {
          backgroundColor: varAlpha(theme.palette.grey["500Channel"], 0.2),
        },
    },
    [`&.${tabClasses.selected}, &.${tabClasses.selected}:after, &.${tabClasses.selected}:before`]:
      {
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.grey[300],
        color: theme.palette.text.primary,
      },
    "&:before, &:after": {
      position: "absolute",
      bottom: 0,
      width: 10,
      height: 10,
      content: '" "',
      transition: "0.2s",
    },
    "&:before": {
      left: -10,
      clipPath: "path('M 10 10 C 2 10 0 8 0 0 L 0 10 Z')",
    },
    "&:first-child:before": {
      left: 0,
      clipPath: "",
    },
    "&:after": {
      right: -10,
      clipPath: "path('M 0 10 C 8 10 10 8 10 0 L 10 10 Z')",
    },
    //"&:last-child:after": {
    //  right: 0,
    //  clipPath: "",
    //},
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
      {tabs.map((tab, index) => (
        <TabItem
          key={tab.name}
          label={tab.label}
          tabIndex={index + 1}
          disableRipple
        />
      ))}
    </Tabs>
  );
}
