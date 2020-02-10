import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import ArticlesComponent from "../components/Users";
import Layout from "../components/core/Layout";
import { useRouter } from "next/router";

const Article = () => {
  const { article } = useRouter().query;

  return (
    <Layout title="View Article" selected="view_articles">
      <h1>Article id: {article}</h1>
    </Layout>
  );
};

export default Article;
