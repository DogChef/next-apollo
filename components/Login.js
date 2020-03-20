import React from "react";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Cookies from "js-cookie";
import Router from "next/router";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link as MLink,
  makeStyles,
  styled as matStyled,
  TextField,
  Typography
} from "@material-ui/core";

import { LOG_IN } from "./core/mutations";

const loginSchema = Yup.object().shape({
  identifier: Yup.string().required("Please enter your identifier"),
  password: Yup.string().required("Required")
});

const RightLabel = matStyled(FormControlLabel)({
  float: "right"
});

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(3, 0, 2)
  },

  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  }
}));

const Login = ({ changeComponent }) => {
  const [logInUser, { data }] = useMutation(LOG_IN);
  const classes = useStyles();

  const submition = (values, { setErrors }) => {
    logInUser({
      variables: {
        identifier: values.identifier,
        password: values.password
      }
    })
      .then(
        ({
          data: {
            loggedUser: { id }
          }
        }) => {
          Cookies.set("signedIn", "true");

          if (id) Router.push("/welcome");
        }
      )
      .catch(({ graphQLErrors }) => {
        const error = graphQLErrors?.map(err => err?.message);
        setErrors({ identifier: " ", password: error[0] });
      });
  };

  return (
    <>
      <Typography component="h1" variant="h4">
        Welcome!
      </Typography>
      <Typography component="h2" variant="h5">
        Login to know more about Lotion
      </Typography>

      <Formik
        initialValues={{ identifier: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={submition}
        validateOnBlur={false}
      >
        {({
          values: { identifier, password },
          errors,
          touched,
          handleBlur,
          handleChange
        }) => (
          <Form className={classes.form} noValidate>
            <Field
              id="identifier"
              type="text"
              label="Username/Email Address"
              placeholder="Enter your identifier"
              variant="outlined"
              margin="normal"
              autoComplete="email"
              value={identifier}
              onBlur={handleBlur}
              onChange={handleChange}
              component={TextField}
              error={touched["identifier"] && errors["identifier"]?.length > 0}
              helperText={
                touched["identifier"] &&
                errors["identifier"] !== " " &&
                errors["identifier"]
              }
              autoFocus
              fullWidth
            />
            <Field
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your Password"
              variant="outlined"
              margin="normal"
              autoComplete="current-password"
              value={password}
              onBlur={handleBlur}
              onChange={handleChange}
              component={TextField}
              error={touched["password"] && errors["password"]?.length > 0}
              helperText={touched["password"] && errors["password"]}
              fullWidth
            />
            <RightLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#">
                  <MLink>Forgot password?</MLink>
                </Link>
              </Grid>
              <Grid item>
                <MLink
                  onClick={() => {
                    changeComponent(false);
                  }}
                >
                  Don't have an account? Sign Up
                </MLink>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
