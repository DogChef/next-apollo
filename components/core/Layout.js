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

const drawerWidth = 280;

const Layout = props => {
  const theme = useTheme();
  const [rootPath, setRootPath] = React.useState([]);
  const [isModalOpen, openModal] = React.useState(false);
  const [articleId, setArticleId] = React.useState(null);
  const [selected, setSelected] = React.useState(props.selected);

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
    minHeight: 64
  });

  const StyledList = matStyled(List)({
    width: drawerWidth
  });

  const StyledMain = styled.main`
    flex-grow: 1;
    background-color: ${theme.palette.background.default};
    padding: ${theme.spacing(3)}px;
    margin-top: ${theme.spacing(8)}px;
    min-height: calc(100vh - 64px);
    ${props.mainStyles}
  `;

  const addSubArticle = id => {
    setArticleId(id);
    openModal(true);
  };

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>

      <FlexBox>
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
            />
          </StyledList>
        </StyledDrawer>
        <StyledMain>
          {React.cloneElement(props.children, { setRootPath: setRootPath })}
        </StyledMain>
        <ArtMod
          open={isModalOpen}
          parentId={articleId}
          handleClose={() => openModal(false)}
        />
      </FlexBox>
    </>
  );
};

export default Layout;
