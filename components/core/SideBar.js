import React from "react";
import TabPanel from "./TabPanel";
import SideBarItem from "./SideBarItem";
import SideBarArticles from "../SideBarArticles";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemIcon,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";

import {
  SupervisedUserCircle as UserIcon,
  ChromeReaderMode as ViewIcon,
  Create as CreateIcon,
  PermIdentity as ProfileIcon
} from "@material-ui/icons";

export const drawerWidth = 280;

const SideBar = ({
  selected,
  setSelected,
  rootPath,
  addSubArticle,
  openModal
}) => {
  const [currentTab, setTab] = React.useState("main");

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

  const StyledList = matStyled(List)({
    width: drawerWidth
  });

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
            url="/profile"
            text="Profile"
            selected={"profile" === selected}
            onClick={() => setSelected("profile")}
          >
            <ListItemIcon>
              <ProfileIcon />
            </ListItemIcon>
          </SideBarItem>
          <SideBarItem
            url="/users"
            text="Users"
            selected={"users" === selected}
            onClick={() => setSelected("users")}
          >
            <ListItemIcon>
              <UserIcon />
            </ListItemIcon>
          </SideBarItem>
        </StyledList>
        <Divider />
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
            url="/articles"
            text="View articles"
            selected={"view_articles" === selected}
            onClick={() => setSelected("view_articles")}
          >
            <ListItemIcon>
              <ViewIcon />
            </ListItemIcon>
          </SideBarItem>
        </StyledList>
        <Divider />
        <StyledList>
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
