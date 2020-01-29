import React, { useState, useEffect } from "react";
import Head from "next/head";
import BasicForm from "../components/core/form";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";
import gql from "graphql-tag";
import Router from "next/router";

const CREATE_USER = gql`
  mutation pepito($name: String, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
    }
  }
`;

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name is too short")
    .max(12, "Thats a long name you have there"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string().required("Required"),
  passwordConfirmation: Yup.string().required("Required")
});

const fields = [
  { name: "name", placeholder: "Your name", type: "text" },
  { name: "email", placeholder: "Your email address", type: "email" },
  { name: "password", placeholder: "Choose a safe password", type: "password" },
  {
    name: "passwordConfirmation",
    placeholder: "Confirm your password",
    type: "password"
  }
];

const Register = () => {
  const [createUser, { data }] = useMutation(CREATE_USER);

  const submition = (values, { setSubmitting }) => {
    if (values.password !== values.passwordConfirmation) {
      setTimeout(() => {
        alert(`Password dont match`);
        setSubmitting(false);
      }, 400);
    } else {
      createUser({
        variables: {
          name: values.name,
          email: values.email,
          password: values.password
        }
      })
        .then(
          ({
            data: {
              createUser: { id }
            }
          }) => {
            if (id) {
              // Add user to context
              Router.push("/home");
            }
          }
        )
        .catch(error => {
          // Add error management
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Head>
        <title>Create an account</title>
      </Head>

      <h1>Create an account</h1>
      <h2>Get started with your free acount</h2>
      <BasicForm
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirmation: ""
        }}
        validationSchema={signupSchema}
        onSubmit={submition}
        fields={fields}
      />
      <p>
        Already an account? &nbsp;
        <Link href="/">
          <a>Login here</a>
        </Link>
      </p>
    </div>
  );
};

export default Register;
