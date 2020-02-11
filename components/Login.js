import React from "react";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Cookies from "js-cookie";
import Router from "next/router";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link as MLink,
  styled as matStyled,
  TextField,
  Typography,
  useTheme
} from "@material-ui/core";

const LOG_IN = gql`
  mutation login($email: String!, $password: String!) {
    logInUser(userInput: { email: $email, password: $password }) {
      id
    }
  }
`;

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string().required("Required")
});

const Login = props => {
  const theme = useTheme();
  const [logInUser, { data }] = useMutation(LOG_IN);

  const RightLabel = matStyled(FormControlLabel)({
    float: "right"
  });

  const StyledButton = matStyled(Button)({
    margin: theme.spacing(3, 0, 2)
  });

  const StyledForm = matStyled(Form)({
    width: "100%",
    marginTop: theme.spacing(1)
  });

  const submition = (values, { setSubmitting, setErrors }) => {
    logInUser({
      variables: {
        email: values.email,
        password: values.password
      }
    })
      .then(
        ({
          data: {
            logInUser: { id }
          }
        }) => {
          Cookies.set("signedIn", "true");

          if (id) {
            Router.push("/users");
          }
        }
      )
      .catch(err => {
        const error = err.graphQLErrors.map(x => x.message);
        setErrors({ email: " ", password: error[0] });
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
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={submition}
        validateOnBlur={false}
      >
        {({
          values: { email, password },
          errors,
          touched,
          handleBlur,
          handleChange
        }) => (
          <StyledForm noValidate>
            <Field
              id="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              variant="outlined"
              margin="normal"
              autoComplete="email"
              value={email}
              onBlur={handleBlur}
              onChange={handleChange}
              component={TextField}
              error={touched["email"] && errors["email"]?.length > 0}
              helperText={
                touched["email"] && errors["email"] !== " " && errors["email"]
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
                  <MLink>Forgot password?</MLink>
                </Link>
              </Grid>
              <Grid item>
                <MLink
                  onClick={() => {
                    props.changeComponent(false);
                  }}
                >
                  Don't have an account? Sign Up
                </MLink>
              </Grid>
            </Grid>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default Login;
