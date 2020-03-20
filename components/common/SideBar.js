import React from "react";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemIcon,
  Tab,
  Tabs
} from "@material-ui/core";
import {
  SupervisedUserCircle as UserIcon,
  ChromeReaderMode as ViewIcon,
  Create as CreateIcon,
  LabelImportant as WelcomeIcon
} from "@material-ui/icons";

import TabPanel from "./TabPanel";
import SideBarItem from "./SideBarItem";
import SideBarArticles from "../SideBarArticles";

export const drawerWidth = 280;

const StyledDrawer = matStyled(Drawer)({
  width: drawerWidth,
  flexShrink: 0
});

const ToolbarSpace = matStyled(Box)({
  minHeight: 64
});

const StyledAppBar = matStyled(AppBar)({
  width: drawerWidth
});

const StyledTab = matStyled(Tab)({
  minWidth: 0
});

const StyledDivider = matStyled(Divider)({
  margin: "8px 0px"
});

const StyledList = matStyled(List)({
  width: drawerWidth
});

const SideBar = ({
  selected,
  setSelected,
  rootPath,
  addSubArticle,
  openModal
}) => {
  const [currentTab, setTab] = React.useState("main");

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <ToolbarSpace />
      <StyledAppBar position="static" color="secondary">
        <Tabs
          onChange={(event, newValue) => setTab(newValue)}
          value={currentTab}
          variant="fullWidth"
          indicatorColor="secondary"
        >
          <StyledTab value="main" label="Main" textColor="secondary" wrapped />
          <StyledTab value="favourite" label="Favourite Articles" wrapped />
        </Tabs>
      </StyledAppBar>
      <TabPanel value={currentTab} index="main">
        <StyledList>
          <SideBarItem
            url=""
            text="Create Article"
            onClick={() => openModal(true)}
            selected={false}
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
          </SideBarItem>
          <SideBarItem
            url="/welcome"
            text="Welcome Article"
            selected={"welcome" === selected}
            onClick={() => setSelected("welcome")}
          >
            <ListItemIcon>
              <WelcomeIcon />
            </ListItemIcon>
          </SideBarItem>
          <StyledDivider />
          <SideBarArticles
            selected={selected}
            rootPath={rootPath}
            addSubArticle={addSubArticle}
            isMain={true}
          />
        </StyledList>
      </TabPanel>
      <TabPanel value={currentTab} index="favourite">
        <StyledList>
          <SideBarArticles
            selected={selected}
            rootPath={rootPath}
            addSubArticle={addSubArticle}
            isMain={false}
          />
        </StyledList>
      </TabPanel>
    </StyledDrawer>
  );
};

export default SideBar;
