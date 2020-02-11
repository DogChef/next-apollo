import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import UsersComponent from "../components/Users";
import Layout from "../components/core/Layout";

const Users = () => {
  if (!Cookies.get("signedIn")) {
    useEffect(() => {
      Router.push("/");
    });
  }

  return (
    <Layout title="Welcome to Lotion" selected="users">
      <UsersComponent />
    </Layout>
  );
};

export default Users;
