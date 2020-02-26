import React from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import Layout from "../../components/core/Layout";
import SideBarArticles from "../../components/SideBarArticles";
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
      rootPath
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
  display: flex;
  flex-wrap: wrap;
`;

const Article = props => {
  const { article } = useRouter().query;
  const queryData = useQuery(GET_ARTICLE, {
    variables: { id: /(.*)\-(\d+)$/.exec(article)[2] }
  });

  const status =
    (queryData.loading && "Loading...") ||
    (queryData.error && `Error! ${queryData.error.message}`);

  const queryArticle = queryData.data?.getArticle;
  queryArticle && props.setRootPath(queryArticle.rootPath);

  return <ArticleEditor status={status} article={queryArticle} />;
};

Article.getLayout = (page, test) => {
  const { article } = useRouter().query;
  return (
    <Layout title="View Article" mainStyles={mainStyles} selected={article}>
      {page}
    </Layout>
  );
};

export default Article;
