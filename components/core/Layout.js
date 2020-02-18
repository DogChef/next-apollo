import React from "react";
import Head from "next/head";
import ArtMod from "../CreateArticleModal";
import MyArticles from "../MyArticles";
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
  Toolbar,
  Typography
} from "@material-ui/core";

import {
  SupervisedUserCircle as UserIcon,
  ChromeReaderMode as ViewIcon,
  Create as CreateIcon,
  PermIdentity as ProfileIcon
} from "@material-ui/icons";

const drawerWidth = 240;

const Layout = props => {
  const theme = useTheme();

  const FlexBox = matStyled(Box)({
    display: "flex",
    flexGrow: 1
  });

  const StyledAppBar = matStyled(AppBar)({
    width: "100%",
    zIndex: theme.zIndex.drawer + 1
  });

  const ImageContainer = matStyled(Box)({
    width: drawerWidth
  });

  const StyledImg = styled.img`
    width: 134px;
    height: 63px;
    margin: 0 auto;
    padding: 8px;
  `;

  const StyledTypography = matStyled(Typography)({
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

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(props.selected);

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>

      <FlexBox>
        <CssBaseline />
        <StyledAppBar position="fixed">
          <Toolbar>
            <ImageContainer>
              <StyledImg src="/logo_white.png" />
            </ImageContainer>
            <StyledTypography variant="h6" noWrap>
              Are we going to have a header?
            </StyledTypography>
            <Button color="inherit" onClick={logout}>
              Log Out
            </Button>
          </Toolbar>
        </StyledAppBar>
        <StyledDrawer variant="permanent" anchor="left">
          <ToolbarSpace />
          <StyledList>
            <SideBarItem
              url="/profile"
              text="Profile"
              selected={"profile" === selected}
              onClick={() => setSelected("profile")}
            >
              <ProfileIcon />
            </SideBarItem>
            <SideBarItem
              url="/users"
              text="Users"
              selected={"users" === selected}
              onClick={() => setSelected("users")}
            >
              <UserIcon />
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
              <CreateIcon />
            </SideBarItem>
            <ArtMod open={open} handleClose={() => setOpen(false)} />
            <SideBarItem
              url="/articles"
              text="View articles"
              selected={"view_articles" === selected}
              onClick={() => setSelected("view_articles")}
            >
              <ViewIcon />
            </SideBarItem>
          </StyledList>
          <Divider />
          <StyledList>
            <MyArticles selected={selected} setSelected={setSelected} />
          </StyledList>
        </StyledDrawer>
        <StyledMain>{props.children}</StyledMain>
      </FlexBox>
    </>
  );
};

export default Layout;
