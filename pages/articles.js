import React from "react";
import ArticlesComponent from "../components/Articles";
import Layout from "../components/common/Layout";
import withAuth from "../lib/withAuth";
import { Breadcrumbs, Typography } from "@material-ui/core";

const Articles = () => (
  <>
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Typography color="textPrimary">Articles</Typography>
    </Breadcrumbs>
    <ArticlesComponent />
  </>
);

Articles.getLayout = page => (
  <Layout title="View articles" selected="view_articles">
    {page}
  </Layout>
);

export default withAuth({})(Articles);
