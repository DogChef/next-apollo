import React, { useState, useEffect } from "react";
import Head from "next/head";
import { styled as matStyled, makeStyles } from "@material-ui/core/styles";
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

const RootGrid = matStyled(Grid)({
  display: "flex",
  height: "100vh"
});

const IndexPhoto = matStyled(Grid)({
  backgroundImage: "url(https://source.unsplash.com/random)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: 1
});

const useStyles = makeStyles(theme => ({
  centered: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(8, 6),
    alignItems: "center"
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.main
  }
}));

const Index = () => {
  const [isLogin, changeComponent] = useState(true);

  useEffect(() => {
    if (Cookies.get("signedIn")) {
      Router.push("/welcome");
    }
  }, []);

  const classes = useStyles();

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
            <Box className={classes.centered}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              {isLogin ? (
                <Login changeComponent={changeComponent} />
              ) : (
                <SignUp changeComponent={changeComponent} />
              )}
              <Copyright />
            </Box>
          </Grid>
        </RootGrid>
      </>
    )
  );
};

export default Index;
