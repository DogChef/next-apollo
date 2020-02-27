import React from "react";
import Router from "next/router";
import Layout from "../../components/core/Layout";
import ArticleEditor from "../../components/ArticleEditor";
import ArticleModifications from "../../components/ArticleModifications";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import withAuth from "../../lib/withAuth";
import {
  Button,
  Breadcrumbs,
  Typography,
  Link,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled as matStyled,
  SwipeableDrawer
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

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
  float: "right"
});

const Article = props => {
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
  queryArticle && props.setRootPath(queryArticle.rootPath);

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
