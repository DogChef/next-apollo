import React, { useState } from "react";
import Head from "next/head";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import Login from "../components/login";
import SignUp from "../components/signup";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Link as MLink,
  Paper,
  Typography
} from "@material-ui/core";

const Copyright = () => {
  return (
    <Box mt={5}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <MLink href="https://lithiumsoft.com/es/inicio/">
          Lithium Software
        </MLink>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

const Index = () => {
  const theme = useTheme();
  const [isLogin, changeComponent] = useState(true);

  const RootGrid = matStyled(Grid)({
    display: "flex",
    height: "100vh"
  });

  const CenteredBox = matStyled(Box)({
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(8, 6),
    alignItems: "center"
  });

  const IndexPhoto = matStyled(Grid)({
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 1
  });

  const StyledAvatar = matStyled(Avatar)({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  });

  return (
    <>
      <CssBaseline />
      <Head>
        <title>Welcome to Lotion</title>
      </Head>

      <RootGrid container="true" component="main">
        <IndexPhoto item xs={false} sm={4} md={7} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <CenteredBox>
            <StyledAvatar>
              <LockOutlinedIcon />
            </StyledAvatar>
            {isLogin ? (
              <Login changeComponent={changeComponent} />
            ) : (
              <SignUp changeComponent={changeComponent} />
            )}
            <Copyright />
          </CenteredBox>
        </Grid>
      </RootGrid>
    </>
  );
};

export default Index;
