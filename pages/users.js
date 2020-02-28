import React from "react";
import UsersComponent from "../components/Users";
import Layout from "../components/core/Layout";
import withAuth from "../lib/withAuth";
import { Breadcrumbs, Typography } from "@material-ui/core";

const Users = () => (
  <>
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Typography color="textPrimary">Users</Typography>
    </Breadcrumbs>
    <UsersComponent />
  </>
);

Users.getLayout = page => (
  <Layout title="Welcome to Lotion" selected="users">
    {page}
  </Layout>
);

export default withAuth({})(Users);
