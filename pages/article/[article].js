import React from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import Layout from "../../components/core/Layout";
import ArticleEditor from "../../components/ArticleEditor";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Count,
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar
} from "@syncfusion/ej2-react-richtexteditor";
import withAuth from "../../lib/withAuth";

const GET_ARTICLE = gql`
  query getArticle($id: ID!) {
    getArticle(id: $id) {
      id
      title
      body
      author {
        id
        name
      }
      updatedAt
    }
  }
`;

const mainStyles = `
  text-align: center;
`;

const Article = () => {
  const { article } = useRouter().query;

  const idRegEx = /(.*)\-(\d+)$/;
  const [string, title, id] = idRegEx.exec(article);

  const queryData = useQuery(GET_ARTICLE, {
    variables: { id }
  });

  const status =
    (queryData.loading && "Loading...") ||
    (queryData.error && `Error! ${queryData.error.message}`);

  const queryArticle = queryData.data?.getArticle;

  return (
    <Layout title="View Article" selected={string} mainStyles={mainStyles}>
      <ArticleEditor status={status} article={queryArticle} />
    </Layout>
  );
};

export default withAuth({})(Article);
