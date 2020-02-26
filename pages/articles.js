import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import ArticlesComponent from "../components/Articles";
import Layout from "../components/core/Layout";
import withAuth from "../lib/withAuth";

const Articles = () => <ArticlesComponent />;

Articles.getLayout = page => (
  <Layout title="View articles" selected="view_articles">
    {page}
  </Layout>
);

export default withAuth({})(Articles);
