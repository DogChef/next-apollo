import React, { useState, useEffect } from "react";
import Head from "next/head";
import BasicForm from "../components/core/form";
import * as Yup from "yup";
import Link from "next/link";

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name is too short")
    .max(12, "Thats a long name you have there")
    .required("Please enter your name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string().required("Required")
});

const submition = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(`There's no register method!. ${JSON.stringify(values, null, 5)}`);
    setSubmitting(false);
  }, 400);
};

const fields = [
  { name: "name", placeholder: "Enter your name", type: "text" },
  { name: "email", placeholder: "Enter your email", type: "email" },
  { name: "password", placeholder: "Enter a password", type: "password" },
  {
    name: "confirmPassword",
    placeholder: "Confirm your password",
    type: "password"
  }
];

const Register = () => {
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
