import React from "react";
import Head from "next/head";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_USERS = gql`
  {
    getUsers {
      id
      name
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <h2>There are currently {data.getUsers.length} registered in the system</h2>
  );
};

const Home = () => (
  <div>
    <Head>
      <title>Welcome to Lotion</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <h1> Welcome! </h1>
    <Users />
  </div>
);

export default Home;
