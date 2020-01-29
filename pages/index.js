import React from "react";
import Head from "next/head";
import gql from "graphql-tag";
import BasicForm from "../components/core/form";
import * as Yup from "yup";
import Link from "next/link";
import Users from "../components/users";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, styled as matStyled } from "@material-ui/core/styles";
import { withFormik, Formik, Form, Field, ErrorMessage } from "formik";

const StyledGrid = matStyled(Grid)({
  display: "flex",
  height: "100vh"
});

const StyledDiv = matStyled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "64px 32px"
});

const StyledDivLeft = matStyled(Box)({
  display: "flex",
  flexDirection: "column",
  margin: "64px 32px"
});

const StyledForm = matStyled(Form)({
  width: "100%"
});

const StyledButton = matStyled(Button)({
  margin: "24px 0px 16px"
});

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link href="#">
        <a>Lithium Software</a>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string().required("Required")
});

const submition = (values, { setSubmitting }) => {
  console.log(values);

  setTimeout(() => {
    alert(`There's no login method!. ${JSON.stringify(values, null, 5)}`);
    setSubmitting(false);
  }, 400);
};

const Login = () => (
  <>
    <CssBaseline />
    <Head>
      <title>Welcome to Lotion</title>
    </Head>

    <StyledGrid container="true" component="main">
      <Grid item xs={false} sm={4} md={7}>
        <StyledDivLeft>
          <Users />
        </StyledDivLeft>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <StyledDiv>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Welcome!
          </Typography>
          <Typography component="h2" variant="h5">
            Login to know more about Lotion
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={submition}
            validateOnBlur={false}
          >
            {({
              values: { email, password },
              errors,
              touched,
              handleChange
            }) => (
              <StyledForm>
                <Field
                  id="email"
                  label="Email Address"
                  helperText={errors.email && touched.email && email.name}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder={"Enter your email"}
                  type="email"
                  component={TextField}
                />
                {errors["email"] && touched["email"] ? (
                  <div>{errors["email"]}</div>
                ) : null}
                <Field
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  placeholder={"Enter a Password"}
                  value={password}
                  onChange={handleChange}
                  component={TextField}
                />
                {errors["password"] && touched["password"] ? (
                  <div>{errors["password"]}</div>
                ) : null}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Submit
                </StyledButton>
                <Grid container>
                  <Grid item xs>
                    <Link href="#">
                      <a>Forgot password?</a>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register">
                      <a>Don't have an account? Sign Up</a>
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </StyledForm>
            )}
          </Formik>
        </StyledDiv>
      </Grid>
    </StyledGrid>
  </>
);

export default Login;
