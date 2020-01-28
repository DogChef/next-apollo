import React from "react";
import Head from "next/head";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import BasicForm from "../components/core/form";
import * as Yup from "yup";
import Link from "next/link";

const GET_USERS = gql`
  {
    getUsers {
      id
      name
      email
      password
    }
  }
`;

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string().required("Required")
});

const submition = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(`There's no login method!. ${JSON.stringify(values, null, 5)}`);
    setSubmitting(false);
  }, 400);
};

const fields = [
  { name: "email", placeholder: "Enter your email", type: "email" },
  { name: "password", placeholder: "Enter a password", type: "password" }
];

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <h2>
        There are currently {data.getUsers.length} users registered in the
        system.
      </h2>
      <h3>They are:</h3>
      {data.getUsers.map(({ id, name, email, password }, index) => (
        <ul key={index}>
          <li>id: {id} </li>
          <li>name: {name} </li>
          <li>email: {email} </li>
          <li>password: {password} </li>
        </ul>
      ))}
    </>
  );
};

const Home = () => (
  <div>
    <Head>
      <title>Welcome to Lotion</title>
    </Head>

    <h1>Welcome!</h1>
    <Users />
    <h2>Login to know more about Lotion</h2>
    <BasicForm
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={submition}
      fields={fields}
    />
    <p>
      Dont have an account? &nbsp;
      <Link href="/register">
        <a>Register here</a>
      </Link>
    </p>
  </div>
);

export default Home;
