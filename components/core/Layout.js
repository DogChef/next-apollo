import React from "react";
import Head from "next/head";
import Link from "next/link";
import CAM from "../CreateArticleModal";
import styled from "styled-components";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
    display: "flex"
  });

  const StyledAppBar = matStyled(AppBar)({
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  });

  const StyledDrawer = matStyled(Drawer)({
    width: drawerWidth,
    flexShrink: 0
  });

  const StyledList = matStyled(List)({
    width: drawerWidth
  });

  const StyledImg = styled.img`
    width: 134px;
    height: 63px;
    margin: 0 auto;
    padding: 8px;
  `;

  const StyledMain = styled.main`
    flex-grow: 1;
    background-color: ${theme.palette.background.default};
    padding: ${theme.spacing(3)}px;
    margin-top: ${theme.spacing(8)}px;
  `;

  const [selected, setSelected] = React.useState(props.selected);

  const StyledListItem = matStyled(ListItem)({
    "&.Mui-selected .MuiListItemText-primary": {
      fontWeight: 600,
      color: `${theme.palette.primary.dark}`
    },

    "&.Mui-selected .MuiListItemIcon-root": {
      color: `${theme.palette.primary.dark} !important`
    }
  });

  const ListItemLink = localProps => {
    return (
      <Link href={localProps.url} passHref>
        <StyledListItem
          button
          selected={localProps.selector === selected}
          onClick={localProps.onClick || setSelected(localProps.selector)}
        >
          <ListItemIcon>{localProps.children}</ListItemIcon>
          <ListItemText primary={localProps.text} />
        </StyledListItem>
      </Link>
    );
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>

      <FlexBox>
        <CssBaseline />
        <StyledAppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Are we going to have a header?
            </Typography>
          </Toolbar>
        </StyledAppBar>
        <StyledDrawer variant="permanent" anchor="left">
          <StyledImg src="/logo.png" />

          <Divider />
          <StyledList>
            <ListItemLink url="/profile" text="Profile" selector="profile">
              <ProfileIcon />
            </ListItemLink>
            <ListItemLink url="/users" text="Users" selector="users">
              <UserIcon />
            </ListItemLink>
          </StyledList>
          <Divider />
          <StyledList>
            <ListItemLink
              url=""
              text="Create Article"
              selector="create_article"
              onClick={handleOpen}
            >
              <CreateIcon />
            </ListItemLink>
            <CAM open={open} handleClose={handleClose} />
            <ListItemLink
              url="/articles"
              text="View articles"
              selector="view_articles"
              onClick="undefined"
            >
              <ViewIcon />
            </ListItemLink>
          </StyledList>
          <Divider />
        </StyledDrawer>
        <StyledMain>{props.children}</StyledMain>
      </FlexBox>
    </>
  );
};

export default Layout;
