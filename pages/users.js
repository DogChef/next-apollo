import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import UsersComponent from "../components/Users";
import Layout from "../components/core/Layout";
import withAuth from "../lib/withAuth";

const Users = () => {
  return (
    <Layout title="Welcome to Lotion" selected="users">
      <UsersComponent />
    </Layout>
  );
};

export default withAuth({})(Users);
