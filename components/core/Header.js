import React from "react";
import styled from "styled-components";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import { AppBar, Button, Box, Toolbar, Typography } from "@material-ui/core";

const Header = props => {
  const theme = useTheme();

  const StyledAppBar = matStyled(AppBar)({
    width: "100%",
    zIndex: theme.zIndex.drawer + 1
  });

  const ImageContainer = matStyled(Box)({
    width: props.drawerWidth
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

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <ImageContainer>
          <StyledImg src="/logo_white.png" />
        </ImageContainer>
        <StyledTypography variant="h6" noWrap>
          Are we going to have a header?
        </StyledTypography>
        <Button color="inherit" onClick={props.logout}>
          Log Out
        </Button>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
