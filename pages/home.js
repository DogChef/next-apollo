import React, { useEffect } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
import Router from "next/router";
import Users from "../components/users";
import Layout from "../components/core/layout";

const Home = () => {
  if (!Cookies.get("signedIn")) {
    useEffect(() => {
      Router.push("/");
    });
  }

  return (
    <div>
      <Head>
        <title>Welcome to Lotion</title>
      </Head>

      <h1>Welcome!</h1>
      <Layout>
        <Users />
      </Layout>
    </div>
  );
};

export default Home;
