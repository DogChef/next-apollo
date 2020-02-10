import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import ArticlesComponent from "../components/Articles";
import Layout from "../components/core/Layout";
import withAuth from "../lib/withAuth";

const Articles = () => {
  return (
    <Layout title="View articles" selected="view_articles">
      <h1> la vista cambio </h1>
      <ArticlesComponent />
    </Layout>
  );
};

export default withAuth()(Articles);
