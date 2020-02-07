import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import ArticlesComponent from "../components/users";
import Layout from "../components/core/layout";

const Articles = () => {
  if (!Cookies.get("signedIn")) {
    useEffect(() => {
      Router.push("/");
    });
  }

  return (
    <Layout title="View articles" selected="view_articles">
      <h1> la vista cambio </h1>
      <ArticlesComponent />
    </Layout>
  );
};

export default Articles;
