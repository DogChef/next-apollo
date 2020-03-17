import React from "react";
import styled from "styled-components";
import { styled as matStyled, makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Box, Toolbar, Typography } from "@material-ui/core";

import { drawerWidth } from "./SideBar";
import { logout } from "../../lib/useAuth";

const ImageContainer = matStyled(Box)({
  width: drawerWidth,
  height: "64px"
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

const useStyles = makeStyles(theme => ({
  appbar: {
    width: "100%",
    zIndex: theme.zIndex.drawer + 1
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar>
        <ImageContainer>
          <StyledImg src="/logo_white.png" />
        </ImageContainer>
        <StyledTypography variant="h6" noWrap></StyledTypography>
        <Button color="inherit" onClick={logout}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
