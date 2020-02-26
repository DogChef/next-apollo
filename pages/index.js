import React, { useState, useEffect } from "react";
import Head from "next/head";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Cookies from "js-cookie";
import Router from "next/router";
import { Avatar, Box, Grid, Link, Paper, Typography } from "@material-ui/core";

const Copyright = () => (
  <Box mt={5}>
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link href="https://lithiumsoft.com/es/inicio/">
        Lithium Software
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  </Box>
);

const Index = () => {
  const theme = useTheme();
  const [isLogin, changeComponent] = useState(true);

  useEffect(() => {
    if (Cookies.get("signedIn")) {
      Router.push("/users");
    }
  }, []);

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
    !Cookies.get("signedIn") && (
      <>
        <Head>
          <title>Welcome to Lotion</title>
        </Head>

        <RootGrid container="true" component="main">
          <IndexPhoto item xs={false} sm={4} md={7} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
    )
  );
};

export default Index;
