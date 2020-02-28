import React from "react";
import Router, { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {
  Button,
  Breadcrumbs,
  Typography,
  Link,
  styled as matStyled,
  SwipeableDrawer
} from "@material-ui/core";
import { MoveToInbox as InboxIcon, Mail as MailIcon } from "@material-ui/icons";

import Layout from "../../components/core/Layout";
import ArticleEditor from "../../components/ArticleEditor";
import ArticleModifications from "../../components/ArticleModifications";
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

const StyledBreadcrumbs = matStyled(Breadcrumbs)({
  flexGrow: 1,
  flexBasis: "80%",
  marginBottom: "10px"
});

const StyledButton = matStyled(Button)({
  flexGrow: 1,
  flexBasis: "20%",
  marginBottom: "10px",
  float: "right",
  padding: "0"
});

const Article = ({ setRootPath }) => {
  const { article } = useRouter().query;
  const [openHistory, setHistorySidebar] = React.useState(false);
  const queryData = useQuery(GET_ARTICLE, {
    variables: { id: /(.*)\-(\d+)$/.exec(article)[2] }
  });

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setHistorySidebar(open);
  };

  const status =
    (queryData.loading && "Loading...") ||
    (queryData.error && `Error! ${queryData.error.message}`);

  const queryArticle = queryData.data?.getArticle;
  queryArticle && setRootPath(queryArticle.rootPath);

  return (
    <>
      {queryArticle && (
        <>
          <StyledBreadcrumbs separator="›" aria-label="breadcrumb">
            {queryArticle.rootPath.map((article, index) => (
              <Link color="inherit" key={index} href={`/article/${article}`}>
                {/(.*)\-(\d+)$/.exec(article)[1]}
              </Link>
            ))}
            <Typography color="textPrimary">{queryArticle.title}</Typography>
          </StyledBreadcrumbs>
          <StyledButton onClick={toggleDrawer(true)}>Open History</StyledButton>
        </>
      )}
      <ArticleEditor status={status} article={queryArticle} />;
      <SwipeableDrawer
        anchor="right"
        open={openHistory}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <ArticleModifications id={queryArticle?.id} />
      </SwipeableDrawer>
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
