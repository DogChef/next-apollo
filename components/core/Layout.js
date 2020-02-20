import React from "react";
import Head from "next/head";
import ArtMod from "../CreateArticleModal";
import SideBarArticles from "../SideBarArticles";
import Header from "./Header";
import SideBarItem from "./SideBarItem";
import { logout } from "../../lib/useAuth";
import styled from "styled-components";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItemIcon,
  Toolbar,
  Typography
} from "@material-ui/core";

import {
  SupervisedUserCircle as UserIcon,
  ChromeReaderMode as ViewIcon,
  Create as CreateIcon,
  PermIdentity as ProfileIcon
} from "@material-ui/icons";

const drawerWidth = 300;

const Layout = props => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(props.selected);
  const [articleId, setArticleId] = React.useState(null);

  const FlexBox = matStyled(Box)({
    display: "flex",
    flexGrow: 1
  });

  const LogOutButton = matStyled(Button)({
    marginRight: theme.spacing(2)
  });

  const StyledDrawer = matStyled(Drawer)({
    width: drawerWidth,
    flexShrink: 0
  });

  const ToolbarSpace = matStyled(Box)({
    ...theme.mixins.toolbar
  });

  const StyledList = matStyled(List)({
    width: drawerWidth
  });

  const StyledMain = styled.main`
    flex-grow: 1;
    background-color: ${theme.palette.background.default};
    padding: ${theme.spacing(3)}px;
    margin-top: ${theme.spacing(8)}px;
    ${props.mainStyles}
  `;

  const addSubArticle = id => {
    setArticleId(id);
    setOpen(true);
  };

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>

      <FlexBox>
        <CssBaseline />
        <Header logout={logout} drawerWidth={drawerWidth} />
        <StyledDrawer variant="permanent" anchor="left">
          <ToolbarSpace />
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
              onClick={() => setOpen(true)}
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
              addSubArticle={addSubArticle}
            />
          </StyledList>
        </StyledDrawer>
        <StyledMain>{props.children}</StyledMain>
        <ArtMod
          open={open}
          parentId={articleId}
          handleClose={() => setOpen(false)}
        />
      </FlexBox>
    </>
  );
};

export default Layout;
