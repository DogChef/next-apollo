import React from "react";
import Router from "next/router";
import Layout from "../../components/core/Layout";
import ArticleEditor from "../../components/ArticleEditor";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import withAuth from "../../lib/withAuth";
import {
  Breadcrumbs,
  Typography,
  Link,
  styled as matStyled
} from "@material-ui/core";

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

const StyledBreadcrumbs = matStyled(Breadcrumbs)({
  flexGrow: 1,
  flexBasis: "100%",
  marginBottom: "10px"
});

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

  return (
    <>
      {queryArticle && (
        <StyledBreadcrumbs separator="›" aria-label="breadcrumb">
          {queryArticle.rootPath.map((article, index) => (
            <Link color="inherit" key={index} href={`/article/${article}`}>
              {/(.*)\-(\d+)$/.exec(article)[1]}
            </Link>
          ))}
          <Typography color="textPrimary">{queryArticle.title}</Typography>
        </StyledBreadcrumbs>
      )}
      <ArticleEditor status={status} article={queryArticle} />;
    </>
  );
};

Article.getLayout = (page, test) => {
  const { article } = useRouter().query;
  return (
    <Layout title="View Article" mainStyles={mainStyles} selected={article}>
      {page}
    </Layout>
  );
};

export default withAuth({})(Article);
