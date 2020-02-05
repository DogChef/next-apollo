import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import { Box, Drawer, CssBaseline, AppBar, Toolbar, List, Typography, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { Inbox as InboxIcon, Mail as MailIcon, SupervisedUserCircle as UserIcon,
  ChromeReaderMode as ViewIcon, Create as CreateIcon, PermIdentity as ProfileIcon } from "@material-ui/icons";
import styled from 'styled-components'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

const Sidebar = (props) => {
  //const theme = useTheme();
  //const [logInUser, { data }] = useMutation(LOG_IN);
  const classes = useStyles();

  const StyledImg = styled.img`
    width: 134px;
    height: 63px;
    margin: 0 auto;
    padding: 8px;
  `;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Are we going to have a header?
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <StyledImg src="/logo.png"/>
        
        <Divider />
        <List>
          <ListItem button key={"Profile"}>
            <ListItemIcon>
              <ProfileIcon/>
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
          <ListItem button key={"Users"}>
            <ListItemIcon>
              <UserIcon/>
            </ListItemIcon>
            <ListItemText primary={"Users"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={"Create Article"}>
            <ListItemIcon>
              <CreateIcon/>
            </ListItemIcon>
            <ListItemText primary={"Create article"} />
          </ListItem>
          <ListItem button key={"View article"}>
            <ListItemIcon>
              <ViewIcon/>
            </ListItemIcon>
            <ListItemText primary={"View article"} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  );
}

export default Sidebar;
