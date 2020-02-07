import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import Router from "next/router";
import {
  Box,
  Button,
  Grid,
  Link as MLink,
  styled as matStyled,
  TextField,
  Typography,
  useTheme
} from "@material-ui/core";

const CREATE_USER = gql`
  mutation signup($name: String, $email: String!, $password: String!) {
    signUpUser(userInput: { name: $name, email: $email, password: $password }) {
      id
    }
  }
`;

const signupSchema = Yup.object().shape({
  fname: Yup.string()
    .required("Please enter your name")
    .min(4, "Name is too short")
    .max(12, "Thats a long name you have there"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string().required("Required"),
  passwordConfirmation: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Password does not match")
});

const SignUp = props => {
  const theme = useTheme();
  const [signUpUser, { data }] = useMutation(CREATE_USER);

  const StyledButton = matStyled(Button)({
    margin: theme.spacing(3, 0, 2)
  });

  const NoPaddingGrid = matStyled(Grid)({
    padding: `${theme.spacing(0, 1)} !important`
  });

  const StyledForm = matStyled(Form)({
    width: "100%",
    marginTop: theme.spacing(1)
  });

  const submition = (values, { setSubmitting, setErrors }) => {
    signUpUser({
      variables: {
        name: values.fname,
        email: values.email,
        password: values.password
      }
    })
      .then(
        ({
          data: {
            signUpUser: { id }
          }
        }) => {
          if (id) {
            Cookies.set("signedIn", true);
            Router.push("/users");
          }
        }
      )
      .catch(err => {
        const error = err?.graphQLErrors?.map(x => x?.message);
        setErrors({ email: error[0] });
      });
  };

  return (
    <>
      <Head>
        <title>Create an account</title>
      </Head>

      <Typography component="h1" variant="h4">
        Create an account
      </Typography>
      <Typography component="h2" variant="h5">
        Get started with your free account
      </Typography>
      <Formik
        initialValues={{
          fname: "",
          email: "",
          password: "",
          passwordConfirmation: ""
        }}
        validationSchema={signupSchema}
        onSubmit={submition}
        validateOnBlur={false}
      >
        {({
          values: { fname, email, password, passwordConfirmation },
          errors,
          touched,
          handleBlur,
          handleChange
        }) => (
          <StyledForm noValidate>
            <Grid container spacing={2}>
              <NoPaddingGrid item xs={12}>
                <Field
                  id="fname"
                  label="Name"
                  placeholder={"Enter your name"}
                  variant="outlined"
                  margin="normal"
                  value={fname}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  component={TextField}
                  error={touched["fname"] && errors["fname"]?.length > 0}
                  helperText={touched["fname"] && errors["fname"]}
                  autoFocus
                  fullWidth
                />
              </NoPaddingGrid>
              <NoPaddingGrid item xs={12}>
                <Field
                  id="email"
                  type="email"
                  label="Email Address"
                  placeholder={"Enter your email"}
                  variant="outlined"
                  margin="normal"
                  autoComplete="email"
                  value={email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  component={TextField}
                  error={touched["email"] && errors["email"]?.length > 0}
                  helperText={touched["email"] && errors["email"]}
                  fullWidth
                  required
                />
              </NoPaddingGrid>
              <NoPaddingGrid item xs={12} sm={6}>
                <Field
                  id="password"
                  type="password"
                  label="Password"
                  placeholder={"Enter a Password"}
                  variant="outlined"
                  margin="normal"
                  autoComplete="new-password"
                  value={password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  component={TextField}
                  error={touched["password"] && errors["password"]?.length > 0}
                  helperText={touched["password"] && errors["password"]}
                  fullWidth
                  required
                />
              </NoPaddingGrid>
              <NoPaddingGrid item xs={12} sm={6}>
                <Field
                  id="passwordConfirmation"
                  type="password"
                  label="Password Confirmation"
                  placeholder={"Confirm your password"}
                  variant="outlined"
                  margin="normal"
                  value={passwordConfirmation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  component={TextField}
                  error={
                    touched["passwordConfirmation"] &&
                    errors["passwordConfirmation"]
                  }
                  helperText={
                    touched["passwordConfirmation"] &&
                    errors["passwordConfirmation"]
                  }
                  fullWidth
                  required
                />
              </NoPaddingGrid>
            </Grid>
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit
            </StyledButton>
            <Grid container justify="flex-end">
              <Grid item>
                <MLink
                  onClick={() => {
                    props.changeComponent(true);
                  }}
                >
                  Already an account? Log In
                </MLink>
              </Grid>
            </Grid>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
