import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import Layout from "../../components/core/Layout";
import { useRouter } from "next/router";
import DanteEditor from "Dante2";

const GET_ARTICLES = gql`
  {
    getArticle() {
      id
      name
      email
    }
  }
`;

const Article = () => {
  const { article } = useRouter().query;

  const idRegEx = /(.*)\-(\d+)$/;
  const [string, title, id] = idRegEx.exec(article);

  return (
    <Layout title="View Article" selected={string}>
      <h1>Title: {title}</h1>
      <h1>Article id: {id}</h1>

      <DanteEditor />
    </Layout>
  );
};

export default Article;
